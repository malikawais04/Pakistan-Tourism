# Pakistan Tourism — Constitution

## Mission
Give travelers a considered, trustworthy starting point for exploring Pakistan — grounded, editorial content paired with an AI guide that only answers from reviewed notes — built and documented the AI-native way, with Claude Code and Spec-Kit Plus.

## Core Principles
1. **Editorial honesty over hype.** Every page states clearly that it is editorial context, not a booking or safety service, and points travelers to official sources for anything time-sensitive (visas, weather, prices, access).
2. **Grounded AI, not a black box.** The RAG guide answers only from the reviewed notes retrieved from Qdrant. It never invents prices, schedules, or safety guarantees, and every answer can show which notes it drew from.
3. **Calm, editorial design.** Warm paper tones, ink-black type, hairline rules, and generous whitespace — the interface should feel like a well-made travel journal, not a booking engine.
4. **Small, inspectable surface area.** Prefer a few well-documented pages and services over a sprawling feature set. Every route, endpoint, and task should be traceable back to a requirement in this repo's `.spec/` folder.
5. **Accessible and responsive by default.** Every page works on mobile and desktop, respects `prefers-reduced-motion`, and keeps visible focus states.

## Technical Standards
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS + a hand-authored design-system stylesheet (`app/globals.css`), React Server Components by default, Client Components only where interactivity requires it (forms, the chat widget, listings/filtering, the lightbox).
- **Backend:** Python FastAPI, async end to end (`asyncpg`, `AsyncOpenAI`, `AsyncQdrantClient`).
- **Data:** Qdrant Cloud for note embeddings/retrieval; Neon Serverless Postgres for chat history.
- **Type safety:** Pydantic models on the backend, TypeScript types on the frontend — the `/chat` request/response shape is mirrored on both sides.
- **Clean code:** Small, single-purpose modules (`services/`, `routers/`, `core/`), comments explaining *why* not *what*, no dead code left in the repo.

## Design Guidelines
- Mobile-first layout; breakpoint at 800px covers the phone/tablet split used throughout `globals.css`.
- Typography: DM Serif Display for headlines, Manrope for body copy, IBM Plex Mono for small mono labels — loaded via `next/font` for performance.
- Consistent spacing scale driven by the existing hairline-rule / eyebrow-label editorial system — do not introduce a second, competing visual language.
- Every interactive element has a visible focus state and an accessible label.

## Development Rules
- Frontend and backend are developed and deployed independently; the frontend talks to the backend only through `NEXT_PUBLIC_API_URL` and the documented `/chat` contract.
- No secrets committed to the repo — `.env.local` and `backend/.env` are git-ignored; `.env.example` files document every required variable.
- Every task in `.spec/tasks/` must be updated (status, acceptance criteria) as work happens — the task files are the source of truth for project status, not tribal knowledge.
