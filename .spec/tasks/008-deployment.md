# Task 008: Deployment

## Status
Not Started

## Priority
High

## Description
Deploy the frontend to Vercel and the FastAPI backend to a Python-friendly host, wire the production environment variables, seed production Qdrant, and finalize submission materials (README, demo video, links).

## Acceptance Criteria
- [ ] Frontend deployed to Vercel with `NEXT_PUBLIC_API_URL` pointing at the live backend
- [ ] Backend deployed (Render/Railway/Fly.io/other) with `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`, `FRONTEND_ORIGIN` set
- [ ] `python -m backend.seed_data` run once against production Qdrant
- [ ] Live site checked for console errors and broken links
- [ ] README updated with the live URLs
- [ ] Demo video recorded (2–3 minutes) and linked in the README
- [ ] Repository made public and pushed

## Time Estimation
3 hours
