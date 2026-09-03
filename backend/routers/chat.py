"""Chat endpoint: the RAG pipeline described in the assignment.

1. Get relevant content from Qdrant
2. Generate a response using OpenAI
3. Save the turn to Neon Postgres
4. Return the response
"""
import time

from fastapi import APIRouter, HTTPException

from ..core.database import save_turn
from ..models import ChatRequest, ChatResponse, Source
from ..seed_data import GUIDE_NOTES
from ..services import qdrant_service
from ..services.openai_service import generate_answer

router = APIRouter(tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    conversation_id = f"guide_{int(time.time() * 1000)}"

    # 1. Get relevant content from Qdrant (falls back to the static reviewed
    #    notes if the collection hasn't been seeded / Qdrant isn't reachable
    #    yet, so local development works without extra setup).
    try:
        hits = await qdrant_service.search_notes(payload.query, top_k=3)
    except Exception:
        hits = []

    if hits:
        sources = hits
    else:
        normalized = payload.query.lower()
        keyword_matches = [
            note
            for note in GUIDE_NOTES
            if normalized in note["text"].lower()
            or any(len(word) > 3 and word in note["text"].lower() for word in normalized.split())
        ]
        sources = (keyword_matches or GUIDE_NOTES)[:3]

    context = "\n".join(f"[{s['title']}] {s['text']}" for s in sources)

    # 2. Generate a response using OpenAI, grounded in the retrieved notes.
    try:
        answer = await generate_answer(
            payload.query,
            context,
            [turn.model_dump() for turn in payload.history],
        )
    except Exception as exc:  # OpenAI/network error
        raise HTTPException(status_code=502, detail="The guide could not reach its reviewed notes just now.") from exc

    # 3. Save to Neon Postgres (no-op if DATABASE_URL isn't configured).
    await save_turn(conversation_id, "user", payload.query)
    await save_turn(conversation_id, "assistant", answer)

    # 4. Return the response.
    return ChatResponse(
        conversationId=conversation_id,
        answer=answer,
        sources=[Source(id=s["id"], title=s["title"], url=s["url"], text=s["text"]) for s in sources],
    )
