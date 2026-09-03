import time
import traceback

from fastapi import APIRouter, HTTPException

from core.database import save_turn
from models import ChatRequest, ChatResponse, Source
from seed_data import GUIDE_NOTES
from services.openai_service import generate_answer, rerank_chunks, rewrite_query
from services.retrieval import hybrid_search

router = APIRouter(tags=["chat"])

CANDIDATE_POOL = 10
FINAL_TOP_K = 3


def _keyword_fallback(query: str) -> list[dict]:
    normalized = query.lower()
    keyword_matches = [
        note
        for note in GUIDE_NOTES
        if normalized in note["text"].lower()
        or any(len(word) > 3 and word in note["text"].lower() for word in normalized.split())
    ]
    return (keyword_matches or GUIDE_NOTES)[:FINAL_TOP_K]


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    conversation_id = f"guide_{int(time.time() * 1000)}"
    history = [turn.model_dump() for turn in payload.history]

    try:
        standalone_query = await rewrite_query(payload.query, history)
    except Exception:
        traceback.print_exc()
        standalone_query = payload.query

    try:
        candidates = await hybrid_search(standalone_query, candidate_limit=CANDIDATE_POOL)
        sources = rerank_chunks(standalone_query, candidates, top_k=FINAL_TOP_K) if candidates else []
    except Exception:
        traceback.print_exc()
        sources = []

    if not sources:
        sources = _keyword_fallback(standalone_query)

    try:
        result = await generate_answer(standalone_query, sources)
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=502, detail="The guide could not reach its reviewed notes just now.")

    await save_turn(conversation_id, "user", payload.query)
    await save_turn(conversation_id, "assistant", result["answer"])

    return ChatResponse(
        conversationId=conversation_id,
        answer=result["answer"],
        sources=[Source(id=s["id"], title=s["title"], url=s["url"], text=s["text"]) for s in sources],
    )
