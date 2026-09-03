from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import get_settings
from core.database import init_db
from routers import chat

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="Pakistan Tourism — RAG Guide API",
    description="FastAPI backend powering the Pakistan Tourism chatbot: OpenAI + Qdrant Cloud + Neon Postgres.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin, "http://localhost:3000"],
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
    return {"status": "healthy"}
