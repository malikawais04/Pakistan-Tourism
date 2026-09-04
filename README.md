# Pakistan Tourism — a living atlas

A considered starting point for exploring Pakistan's places, stories, and routes, with a Retrieval-Augmented-Generation (RAG) travel guide grounded in reviewed editorial notes.

Built for the *AI Driven Website Development Project with Spec-Kit and Claude Code* assignment: Next.js 14 (App Router) frontend, FastAPI + OpenAI + Qdrant Cloud + Neon Postgres backend, documented with Spec-Kit Plus under `.spec/`.

> **Migration note:** this repository was migrated from an earlier Vite + React + Express/tRPC prototype to match the assignment's required stack. All original pages, copy, the destination/experience catalog, and the RAG chat widget's behavior were preserved — only the underlying framework and chatbot backend changed. See `.spec/plan.md` for the full before/after mapping.

---

## Project overview

Pakistan Tourism is an editorial travel site covering six destinations and six curated "experiences" across Pakistan, plus an AI guide that only answers from a small set of reviewed notes — never inventing prices, schedules, or safety claims.

## Features

- Home, Destinations (list + detail), Experiences (list + detail), About, and Contact pages — 7 routes / 5+ page types
- Search + tag filtering on both listing pages
- Destination/experience detail pages with an image gallery and keyboard-navigable lightbox
- A floating "Ask the guide" chat widget, backed by a real RAG pipeline (retrieval → generation → persistence)
- Fully responsive, mobile-first layout
- Editorial design system: DM Serif Display, Manrope, IBM Plex Mono, warm paper tones, pomegranate-red accents

## Technology stack

**Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · lucide-react · sonner · Radix UI (tooltip)
**Backend:** Python · FastAPI · OpenAI API (chat + embeddings) · Qdrant Cloud (vector search) · Neon Serverless Postgres (chat history) · SQLAlchemy (async) + asyncpg
**Tooling:** Claude Code · Spec-Kit Plus · Git & GitHub

## Project structure

```
.
├── .spec/                  # Spec-Kit Plus documentation (constitution, plan, tasks)
├── app/                    # Next.js App Router pages
├── components/             # Shared React components (Header, Footer, Detail, Listing, GuideProvider, …)
├── lib/                    # Data (destinations/experiences), API client, utils
├── public/images/          # Local placeholder imagery (swap for real photography anytime)
├── backend/                # FastAPI service
│   ├── main.py
│   ├── models.py
│   ├── seed_data.py
│   ├── routers/chat.py
│   ├── services/{openai_service.py, qdrant_service.py}
│   └── core/{config.py, database.py}
├── package.json
└── README.md
```

## Setup instructions

### Prerequisites
- Node.js 18.18+ and npm
- Python 3.11+
- An OpenAI API key
- A free [Qdrant Cloud](https://cloud.qdrant.io) cluster
- A free [Neon](https://neon.tech) Postgres database

### 1. Frontend

```bash
npm install
cp .env.local.example .env.local
# edit .env.local if your backend runs somewhere other than localhost:8000
npm run dev
# → http://localhost:3000
```

### 2. Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# edit .env with your OpenAI, Qdrant, and Neon credentials
```

Seed the reviewed travel notes into Qdrant (run once, and again any time you edit `backend/seed_data.py`):

```bash
python -m seed_data
```

Start the API:

```bash
uvicorn main:app --reload --port 8000
# → http://localhost:8000  (docs at /docs)
```

With both running, open http://localhost:3000 and click **Ask the guide**.

## API setup instructions

| Variable | Where to get it |
|---|---|
| `OPENAI_API_KEY` | https://platform.openai.com/api-keys |
| `QDRANT_URL`, `QDRANT_API_KEY` | Qdrant Cloud cluster dashboard → free tier cluster |
| `DATABASE_URL` | Neon project → Connection string (use the pooled `postgres://` URL) |

## Environment variables

**Frontend** (`.env.local`):
- `NEXT_PUBLIC_API_URL` — base URL of the FastAPI backend

**Backend** (`backend/.env`):
- `OPENAI_API_KEY`, `OPENAI_CHAT_MODEL`, `OPENAI_EMBEDDING_MODEL`
- `QDRANT_URL`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`
- `DATABASE_URL`
- `FRONTEND_ORIGIN` (CORS)

## How the RAG chatbot works

`POST /chat` (`backend/routers/chat.py`):
1. Embeds the traveler's question and searches Qdrant for the closest reviewed notes.
2. Builds a system prompt that restricts the model to those notes and calls OpenAI's chat completions API.
3. Persists both turns of the conversation to Neon Postgres (`chat_messages` table).
4. Returns `{ conversationId, answer, sources }` to the frontend, which renders the answer plus clickable source chips.

If Qdrant isn't reachable (e.g. local dev without a seeded collection), the backend falls back to simple keyword matching over the same reviewed notes so the feature still works.

## Deployment

**Frontend → Vercel**
1. Import this repo in Vercel, framework preset "Next.js".
2. Set `NEXT_PUBLIC_API_URL` to your deployed backend's URL.
3. Deploy.

**Backend → Render / Railway / Fly.io (or any ASGI-friendly host)**
1. Create a new Python web service pointing at `backend/`, start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.
2. Set the environment variables listed above.
3. After the first deploy, run `python -m seed_data` once (locally, pointed at production Qdrant, or via a one-off job) to populate the collection.
4. Update `FRONTEND_ORIGIN` to your Vercel URL and redeploy so CORS allows it.

## Screenshots

_Add screenshots of the homepage, a destination detail page, and the open chat guide here before submission._

## Live links

- GitHub repository(Front-end): https://github.com/malikawais04/Pakistan-Tourism.git
- GitHub repository(Back-end): https://github.com/malikawais04/Pakistan-Tourism-Backend
- Deployed website (Vercel): https://pakistan-tourism-awais.vercel.app/
- Demo video: https://drive.google.com/file/d/1GCICB6XhSpeMjrpRS1XiSnF9Aa1n1i8K/view?usp=sharing
