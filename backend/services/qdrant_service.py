from qdrant_client import AsyncQdrantClient
from qdrant_client.http import models as qmodels

from core.config import get_settings
from services.openai_service import embed_text

settings = get_settings()

_client: AsyncQdrantClient | None = None

EMBEDDING_DIM = 384


def get_client() -> AsyncQdrantClient:
    global _client
    if _client is None:
        _client = AsyncQdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key or None)
    return _client


async def ensure_collection(vector_size: int = EMBEDDING_DIM) -> None:
    client = get_client()
    collections = await client.get_collections()
    names = [c.name for c in collections.collections]
    if settings.qdrant_collection not in names:
        await client.create_collection(
            collection_name=settings.qdrant_collection,
            vectors_config=qmodels.VectorParams(size=vector_size, distance=qmodels.Distance.COSINE),
        )


async def upsert_notes(notes: list[dict]) -> None:
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


def _to_note(payload: dict, score: float | None = None) -> dict:
    note = {
        "id": payload["note_id"],
        "title": payload["title"],
        "url": payload["url"],
        "text": payload["text"],
    }
    if score is not None:
        note["score"] = score
    return note


async def search_notes(query: str, top_k: int = 3, candidate_limit: int | None = None) -> list[dict]:
    client = get_client()
    vector = await embed_text(query)
    hits = await client.search(
        collection_name=settings.qdrant_collection,
        query_vector=vector,
        limit=candidate_limit or top_k,
    )
    return [_to_note(hit.payload, hit.score) for hit in hits]


async def fetch_all_notes() -> list[dict]:
    client = get_client()
    notes: list[dict] = []
    offset = None
    while True:
        points, offset = await client.scroll(
            collection_name=settings.qdrant_collection,
            limit=256,
            offset=offset,
            with_payload=True,
            with_vectors=False,
        )
        notes.extend(_to_note(point.payload) for point in points)
        if offset is None:
            break
    return notes
