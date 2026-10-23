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
- `src/content/site.ts` — name, nav, copy, services, portfolio titles, testimonials, contact
- `src/content/page-photos.json` — photos on Home, About, and Services. Each key is a slot (`hero_photo`, `intro_photo`). The value is the file, alt text, pixel size, and where that slot sits. Change a page photo here.
- `src/content/photos.ts` — optional alt text for portfolio photos, keyed by the file path under `public/photos/`
- `src/content/portfolio.ts` — reads `public/photos/` and builds each project, room filter, and order
- Do not hardcode marketing copy in components when it belongs in `site.ts`

## Site map

Home, About, Services, Portfolio, Testimonials, Contact. Primary CTA is always **Contact Us** → `/contact`.

## Conventions

- Server components by default; `"use client"` only for forms, menus, and other interactive UI
- Shared chrome lives in `src/components/`
- Brand assets: `public/brand/` (logo from `icons/`)
- Portfolio photos live in `public/photos/`. A featured house is a folder named with its `site.portfolio` slug (`public/photos/sf/`). The filename sets the filter: start it with `living`, `dining`, `bedroom`, `kitchen`, or `details`. `livingroom`, `diningroom`, `outdoor`, `office`, and `desk` count too (`outdoor`, `office`, and `desk` are Details). A photo that is not part of a featured house goes in `public/photos/living/`, `dining/`, `bedroom/`, `kitchen/`, or `details/` — the folder is the filter. Dropping a file in the right place adds it to the portfolio.
- Home, About, and Services slots are set in `page-photos.json`; `placedPhoto()` resolves the file. Those paths can point at the same photos. The gitignored `images/` folder is the archive and is not deployed.
- A listing URL is intake only. Follow `.cursor/skills/import-listing-photos`: save staged photos under `images/<street-name>/` as `roomType-specifics-street-name.jpg` (`livingroom-01-main-ct.jpg`, `bedroom-kids-main-ct.jpg`). Do not publish them until asked.
- Keep the look: warm white, charcoal text, taupe accents, serif headlines, photography-first layouts

## Working with this agent

1. Change copy or listings in `src/content/site.ts` unless a new page or layout is required.
2. After UI work, run the site and check the changed route plus nav/CTA.
3. Do not invent a city, founder name, or real client quotes — ask or leave a clear placeholder.
4. Consultation submissions hit `POST /api/consultation`, which emails `site.contact.email` via Resend (`RESEND_API_KEY`, `RESEND_FROM`).
