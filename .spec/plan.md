# Development Plan — Pakistan Tourism

## Phase 1: Foundation & Migration (Day 1)
- Stand up the Next.js 14 App Router project (TypeScript, Tailwind, ESLint).
- Port the existing editorial design system (`globals.css`, fonts, tokens) from the previous Vite build with zero visual regression.
- Establish the App Router route map and shared layout (`app/layout.tsx`, global providers).

## Phase 2: Core Pages (Day 2–3)
- Homepage: hero, intro, featured destinations, seasons strip, responsible-travel section, final CTA.
- Destinations listing + dynamic detail page (`/destinations`, `/destinations/[slug]`).
- Experiences listing + dynamic detail page (`/experiences`, `/experiences/[slug]`).
- About page and Contact page (client-side form with local success state).
- Shared components: `Header`, `Footer`, `DestinationCard`, `Detail`, `Listing`, `Lightbox`.

## Phase 3: RAG Chatbot (Day 4–5)
- **Backend:** scaffold FastAPI app (`backend/`) with `/chat`, `/health` routes.
- Integrate OpenAI (chat completions + embeddings) via `services/openai_service.py`.
- Integrate Qdrant Cloud for note storage/retrieval via `services/qdrant_service.py`; seed the six reviewed destination notes with `seed_data.py`.
- Integrate Neon Postgres for chat-history persistence via `core/database.py`.
- **Frontend:** `GuideProvider` client component — launcher button, sliding panel, message thread, source chips — calling the backend through `lib/api.ts`.

## Phase 4: Deployment (Day 6)
- Deploy frontend to Vercel (`vercel.com`), set `NEXT_PUBLIC_API_URL` to the deployed backend.
- Deploy backend to a Python-friendly host (Render/Railway/Fly.io) or as a second Vercel project using an ASGI adapter; set `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`, `FRONTEND_ORIGIN`.
- Run `python -m backend.seed_data` once against production Qdrant.
- Smoke-test every route, the chatbot, and mobile responsiveness; record the demo video.

## Feature Checklist
- [x] Next.js 14+ App Router, TypeScript, Tailwind CSS
- [x] Responsive design (mobile + desktop breakpoints preserved from original CSS)
- [x] 7 routes / 5+ distinct page types (Home, Destinations list + detail, Experiences list + detail, About, Contact)
- [x] FastAPI backend with `/chat` endpoint
- [x] OpenAI-powered, source-grounded chatbot
- [x] Qdrant Cloud vector retrieval
- [x] Neon Postgres chat-history persistence
- [x] `.spec/` documentation (this folder)
- [ ] Deployed to Vercel + backend host (see README "Deployment")
- [ ] Demo video recorded and linked in README

## Timeline Estimation
| Phase | Effort |
|---|---|
| Phase 1 — Foundation & migration | ~4 hours |
| Phase 2 — Core pages | ~6 hours |
| Phase 3 — RAG chatbot | ~6 hours |
| Phase 4 — Deployment & QA | ~3 hours |

## Tech Stack Documentation
**Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · lucide-react · sonner · Radix UI (tooltip)
**Backend:** FastAPI · OpenAI Python SDK (`AsyncOpenAI`) · Qdrant Client · SQLAlchemy (async) + asyncpg · Pydantic / pydantic-settings
**Data:** Qdrant Cloud (vector store) · Neon Serverless Postgres (chat history)
**Deployment:** Vercel (frontend) · Render/Railway/Fly.io or similar (FastAPI backend)
**Tooling:** Claude Code · Spec-Kit Plus · Git & GitHub · VS Code

## File Structure
```
pakistan-tourism/
├── .spec/
│   ├── constitution.md
│   ├── plan.md
│   └── tasks/
│       ├── 001-setup-project.md
│       ├── 002-create-navbar.md
│       ├── 003-build-homepage.md
│       ├── 004-implement-content-pages.md
│       ├── 005-add-styling.md
│       ├── 006-integrate-chatbot.md
│       ├── 007-testing.md
│       └── 008-deployment.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── destinations/{page.tsx, [slug]/page.tsx}
│   ├── experiences/{page.tsx, [slug]/page.tsx}
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
├── lib/
├── public/images/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── seed_data.py
│   ├── routers/chat.py
│   ├── services/{openai_service.py, qdrant_service.py}
│   └── core/{config.py, database.py}
├── package.json
└── README.md
```
