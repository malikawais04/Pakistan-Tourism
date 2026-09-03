# Task 006: Integrate the RAG Chatbot

## Status
Completed

## Priority
High

## Description
Replace the previous Express + tRPC chat mutation with a dedicated FastAPI backend implementing retrieval-augmented generation: Qdrant Cloud for retrieval, OpenAI for generation, Neon Postgres for history. Wire the frontend `GuideProvider` widget to the new `/chat` endpoint.

## Acceptance Criteria
- [x] `backend/main.py` — FastAPI app, CORS, `/health` route
- [x] `backend/routers/chat.py` — `POST /chat` implementing the 4-step flow from the assignment brief (retrieve → generate → save → return)
- [x] `backend/services/qdrant_service.py` — embed + upsert + search reviewed notes in Qdrant Cloud
- [x] `backend/services/openai_service.py` — embeddings + grounded chat completion
- [x] `backend/core/database.py` — Neon Postgres async session, `chat_messages` table, history persistence
- [x] `backend/seed_data.py` — reviewed notes + one-command Qdrant ingestion script
- [x] `components/GuideProvider.tsx` — launcher, sliding chat panel, message thread, typing state, error/retry, source chips
- [x] `lib/api.ts` — typed client calling `NEXT_PUBLIC_API_URL/chat`
- [x] Chat widget mobile-responsive, keyboard-accessible (Enter to send, Esc-safe)

## Time Estimation
6 hours
