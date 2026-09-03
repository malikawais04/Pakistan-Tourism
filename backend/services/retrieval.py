from services import bm25_service, qdrant_service

RRF_K = 60


async def hybrid_search(query: str, candidate_limit: int) -> list[dict]:
    try:
        dense_hits = await qdrant_service.search_notes(query, candidate_limit=candidate_limit)
    except Exception:
        dense_hits = []

    sparse_hits = bm25_service.search(query, top_k=candidate_limit)

    if not dense_hits and not sparse_hits:
        return []

    scores: dict[str, float] = {}
    notes: dict[str, dict] = {}

    for rank, hit in enumerate(dense_hits):
        scores[hit["id"]] = scores.get(hit["id"], 0.0) + 1.0 / (RRF_K + rank + 1)
        notes[hit["id"]] = hit

    for rank, hit in enumerate(sparse_hits):
        scores[hit["id"]] = scores.get(hit["id"], 0.0) + 1.0 / (RRF_K + rank + 1)
        notes.setdefault(hit["id"], hit)

    ranked_ids = sorted(scores, key=lambda note_id: scores[note_id], reverse=True)
    return [notes[note_id] for note_id in ranked_ids[:candidate_limit]]
