import re

from rank_bm25 import BM25Okapi

from services import qdrant_service

_TOKEN_RE = re.compile(r"[a-z0-9]+")

_bm25: BM25Okapi | None = None
_notes_by_id: dict[str, dict] = {}
_corpus_ids: list[str] = []


def _tokenize(text: str) -> list[str]:
    return _TOKEN_RE.findall(text.lower())


async def refresh_index() -> None:
    global _bm25, _notes_by_id, _corpus_ids
    notes = await qdrant_service.fetch_all_notes()
    _notes_by_id = {note["id"]: note for note in notes}
    _corpus_ids = list(_notes_by_id.keys())
    tokenized = [_tokenize(_notes_by_id[note_id]["text"]) for note_id in _corpus_ids]
    _bm25 = BM25Okapi(tokenized) if tokenized else None


def is_ready() -> bool:
    return _bm25 is not None and bool(_corpus_ids)


def search(query: str, top_k: int) -> list[dict]:
    if not is_ready():
        return []
    scores = _bm25.get_scores(_tokenize(query))
    ranked = sorted(zip(_corpus_ids, scores), key=lambda pair: pair[1], reverse=True)
    results = []
    for note_id, score in ranked[:top_k]:
        if score <= 0:
            continue
        note = dict(_notes_by_id[note_id])
        note["score"] = float(score)
        results.append(note)
    return results
