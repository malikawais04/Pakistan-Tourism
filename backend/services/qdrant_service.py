"""Qdrant Cloud vector store: stores and retrieves the reviewed travel notes
that ground the RAG chatbot's answers."""
from qdrant_client import AsyncQdrantClient
from qdrant_client.http import models as qmodels

from core.config import get_settings
from services.openai_service import embed_text

settings = get_settings()

_client: AsyncQdrantClient | None = None


def get_client() -> AsyncQdrantClient:
    global _client
    if _client is None:
        _client = AsyncQdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key or None)
    return _client


async def ensure_collection(vector_size: int = 1536) -> None:
    client = get_client()
    collections = await client.get_collections()
    names = [c.name for c in collections.collections]
    if settings.qdrant_collection not in names:
        await client.create_collection(
            collection_name=settings.qdrant_collection,
            vectors_config=qmodels.VectorParams(size=vector_size, distance=qmodels.Distance.COSINE),
        )


async def upsert_notes(notes: list[dict]) -> None:
    """notes: [{id, title, url, text}]. Embeds text and upserts into Qdrant."""
    client = get_client()
    points = []
    for i, note in enumerate(notes):
        vector = await embed_text(note["text"])
        points.append(
            qmodels.PointStruct(
                id=i,
                vector=vector,
                payload={"note_id": note["id"], "title": note["title"], "url": note["url"], "text": note["text"]},
            )
        )
    await client.upsert(collection_name=settings.qdrant_collection, points=points)


async def search_notes(query: str, top_k: int = 3) -> list[dict]:
    """Embed the query and return the closest reviewed notes with their scores."""
    client = get_client()
    vector = await embed_text(query)
    hits = await client.search(collection_name=settings.qdrant_collection, query_vector=vector, limit=top_k)
    return [
        {
            "id": hit.payload["note_id"],
            "title": hit.payload["title"],
            "url": hit.payload["url"],
            "text": hit.payload["text"],
            "score": hit.score,
        }
        for hit in hits
    ]
