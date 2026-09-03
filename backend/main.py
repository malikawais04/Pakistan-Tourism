from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import get_settings
from core.database import init_db
from routers import chat
from services import bm25_service

settings = get_settings()

# Clean frontend URL to remove trailing slashes (e.g. 'https://site.vercel.app/' -> 'https://site.vercel.app')
clean_frontend_origin = (
    settings.frontend_origin.rstrip("/") if getattr(settings, "frontend_origin", None) else ""
)

# Build dynamic allowed origins list
origins = [
    clean_frontend_origin,
    "https://pakistan-tourism-awais.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
# Filter out empty strings
allowed_origins = list({o for o in origins if o})


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    try:
        await bm25_service.refresh_index()
    except Exception:
        pass
    yield


app = FastAPI(
    title="Pakistan Tourism — RAG Guide API",
    description="FastAPI backend powering the Pakistan Tourism chatbot: Groq + Qdrant Cloud (hybrid dense/BM25 retrieval) + Neon Postgres.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows EVERYTHING
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/")
async def root():
    return {"status": "ok", "service": "pakistan-tourism-api"}


@app.get("/health")
async def health():
    return {"status": "healthy", "bm25_ready": bm25_service.is_ready()}

#force commit