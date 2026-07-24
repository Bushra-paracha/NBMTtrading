# NBMT Trading Co. — Product Requirements Document

## Original Problem Statement
Build a premium, modern, minimalist B2B trading company website for NBMT Trading Co., an independent trading company based in Dubai, UAE, that sources and exports agricultural commodities (basmati rice, non-basmati rice, Himalayan/edible salt, wheat, yellow corn maize, natural white hulled sesame seeds) to international buyers. Full-stack with admin CMS.

## Architecture
- Frontend: React 19 (CRA + craco), Tailwind, framer-motion, react-simple-maps, sonner. Fonts: Cormorant Garamond (serif headings) + Manrope (body). Palette: warm stone bg, deep navy, gold accents.
- Backend: FastAPI, Motor/MongoDB. All routes under /api.
- Auth: Emergent-managed Google OAuth, restricted to whitelisted admin emails (ADMIN_EMAILS env). Session token in httpOnly cookie + Bearer fallback.
- Storage: Emergent object storage for admin image uploads (certificates, updates); served via /api/files/{path}. External image URLs pass through.

## User Personas
- International buyers / importers / distributors seeking quotes and product specs.
- Admins (whitelisted) managing enquiries, updates, and certificates.

## Core Requirements (static)
- Public pages: Home, About, Products, Product Detail, Global Reach (interactive map), Certificates, Gallery, Updates (list + detail), Catalogs, Contact, Request a Quote.
- Contact + Quote forms with validation, success states, saved to DB.
- Admin dashboard: enquiry status workflow (new/in_progress/quoted/closed), CRUD for Updates and Certificates with image upload.
- Sticky mobile action bar (WhatsApp + Quote), floating WhatsApp, SEO meta + branded favicon.

## Implemented (2026-06-24)
- Full public marketing site (11 pages) with editorial premium design, scroll reveals, product catalog (14 products / 6 categories, filterable), product detail with specs + packaging + enquiry.
- Interactive Global Reach world map (react-simple-maps) with 7 regions and detail panel.
- Contact + Quote forms -> POST /api/enquiries (validated, success states).
- Admin: Google sign-in (whitelist enforced), Enquiries panel (status workflow, expand, delete), Updates CMS, Certificates CMS, both with image upload.
- Seeded 3 updates + 4 certificate placeholders.
- SEO title/description/OG tags, NBMT favicon (uploaded logo). Company contact details wired (phone/WhatsApp/email).
- Tested: backend 28/28 pytest pass; frontend 23/23 functional Playwright checks pass.

## Backlog / Remaining
- P1: Real certificate scans (admin to upload, current are placeholders). Real office address (currently "Business Bay, Dubai" placeholder).
- P1: Downloadable catalog PDFs (currently request-via-WhatsApp).
- P2: Enquiry email notifications (e.g. Resend/SendGrid) to admin on new submission.
- P2: Gallery managed via admin (currently static). Rate limiting/captcha on public enquiry endpoint.
- P2: Set explicit CORS origins for production (currently '*').

## Next Tasks
- Await real company address, certificate scans, and catalog PDFs from client, then replace placeholders.
