# NBMT Trading Co. — B2B Commodity Export Website

Full-stack B2B website for **NBMT Trading Co.**, a Dubai-based trading company exporting agricultural commodities — basmati and non-basmati rice, Himalayan salt, wheat, maize and sesame — to international buyers.

Built using [Emergent](https://emergent.sh), an AI app builder, with the requirements, content and testing driven by me.

## Features

- 11-page public site with an editorial design: products catalog (14 products across 6 categories, filterable), product specs and packaging, Global Reach map with 7 regions, certificates, gallery, updates, catalogs
- Contact and request-a-quote forms saved to the database
- Admin dashboard behind whitelisted Google sign-in: enquiry status workflow, CMS for updates and certificates with image upload
- SEO meta / Open Graph tags, floating WhatsApp and sticky mobile action bar

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Tailwind CSS, Framer Motion, react-simple-maps, shadcn/ui |
| Backend | FastAPI, Motor (async MongoDB) |
| Testing | pytest (28 API tests), Playwright functional checks |

## Project structure

```
backend/    FastAPI app (server.py), seed data, pytest suite
frontend/   React app — pages/, components/, data/ (products, markets, gallery)
memory/     Product requirements document (PRD.md)
```

## Running locally

```bash
cd backend && pip install -r requirements.txt && uvicorn server:app --reload --port 8001
cd frontend && yarn install && yarn start
```

Requires `MONGO_URL`, `DB_NAME` and `ADMIN_EMAILS` in `backend/.env`, and `REACT_APP_BACKEND_URL` in `frontend/.env`.
