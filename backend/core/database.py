"""Neon Serverless Postgres access for chat history storage."""
from datetime import datetime

from sqlalchemy import DateTime, String, Text, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from .config import get_settings

settings = get_settings()

# Neon connection strings are typically postgres://... ; SQLAlchemy's async
# driver needs the postgresql+asyncpg:// scheme.
_db_url = settings.database_url.replace("postgres://", "postgresql+asyncpg://").replace(
    "postgresql://", "postgresql+asyncpg://"
)

engine = create_async_engine(_db_url, echo=False, pool_pre_ping=True) if _db_url else None
async_session = async_sessionmaker(engine, expire_on_commit=False) if engine else None


class Base(DeclarativeBase):
    pass


class ChatMessage(Base):
    """A single turn of a guide conversation, kept for history + review."""

    __tablename__ = "chat_messages"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    conversation_id: Mapped[str] = mapped_column(String(64), index=True)
    role: Mapped[str] = mapped_column(String(16))
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


async def init_db() -> None:
    """Create tables on startup if they don't already exist."""
    if engine is None:
        return
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_session() -> AsyncSession:
    if async_session is None:
        raise RuntimeError("DATABASE_URL is not configured")
    async with async_session() as session:
        yield session


async def save_turn(conversation_id: str, role: str, content: str) -> None:
    if async_session is None:
        return
    async with async_session() as session:
        session.add(ChatMessage(conversation_id=conversation_id, role=role, content=content))
        await session.commit()


async def get_history(conversation_id: str, limit: int = 20) -> list[ChatMessage]:
    if async_session is None:
        return []
    async with async_session() as session:
        result = await session.execute(
            select(ChatMessage)
            .where(ChatMessage.conversation_id == conversation_id)
            .order_by(ChatMessage.created_at)
            .limit(limit)
        )
        return list(result.scalars().all())
