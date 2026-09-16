<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Stage House

Marketing site for a home staging business. Goal: generate consultation leads and showcase work.

## Stack

- Next.js App Router (src/), React, TypeScript, Tailwind CSS v4
- Commands: `npm run dev`, `npm run build`, `npm run lint`

## Product source of truth

- `Requirements.md` — pages and primary CTA
- `src/content/site.ts` — name, nav, copy, services, portfolio, testimonials, contact
- Do not hardcode marketing copy in components when it belongs in `site.ts`

## Site map

Home, About, Services, Portfolio, Testimonials, Contact. Primary CTA is always **Request a Consultation** → `/contact`.

## Conventions

- Server components by default; `"use client"` only for forms, menus, and other interactive UI
- Shared chrome lives in `src/components/`
- Brand assets: `public/brand/` (logo from `icons/`)
- Portfolio photos go in `public/` and are referenced from `site.ts`
- Keep the look: dark background, cream text, gold accents, serif headlines

## Working with this agent

1. Change copy or listings in `src/content/site.ts` unless a new page or layout is required.
2. After UI work, run the site and check the changed route plus nav/CTA.
3. Do not invent a city, founder name, or real client quotes — ask or leave a clear placeholder.
4. Consultation submissions hit `POST /api/consultation` (placeholder; no email yet).
