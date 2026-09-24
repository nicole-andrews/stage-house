# Stage House Interiors

A photography-first marketing site for Stage House Interiors, a boutique home staging company. The site showcases staging work, explains services, and captures consultation requests.

---

# Overview

This is the public website for Stage House Interiors. It is meant for real estate agents, homeowners, investors, and developers who need staging in Santa Clara, Silicon Valley, and the greater Bay Area.

The primary purpose is lead generation: every major page points to **Request a Consultation** (`/contact`). Secondary goals are to show completed work and describe services.

Visual direction is modern, minimal, warm, and editorial. Layouts are image-focused, with a white and taupe palette, charcoal text, generous whitespace, and serif headlines.

Product pages are listed in [`Requirements.md`](./Requirements.md). Marketing copy lives in structured content files, not in page components.

---

# Tech Stack

| Technology | Role |
| --- | --- |
| [Next.js](https://nextjs.org/) 16 (App Router) | Routing, pages, metadata, image optimization, API route |
| [React](https://react.dev/) 19 | UI |
| [TypeScript](https://www.typescriptlang.org/) | Typed app and content models |
| [Tailwind CSS](https://tailwindcss.com/) v4 | Styling via `@import "tailwindcss"` and theme tokens in `src/app/globals.css` |
| [Resend](https://resend.com) | Consultation form email delivery |
| npm | Package manager (`package-lock.json`) |
| GitHub | Source remote (`nicole-andrews/stage-house`) |

Server components are the default. `"use client"` is used only for the header menu, consultation form, and portfolio browse/lightbox.

---

# Project Structure

```text
src/
  app/                    # App Router pages, layout, global CSS, API route
    about/
    contact/
    portfolio/
      [slug]/             # Per-project pages
    services/
    testimonials/
    api/consultation/     # POST consultation emails
  components/             # Shared chrome and portfolio UI
    portfolio/
  content/
    site.ts               # Name, nav, copy, services, testimonials, project blurbs
    portfolio.ts          # Images, room types, project settings, gallery helpers
public/
  brand/                  # Site logos and overlays
  images/                 # Home, About, and Services photography
  portfolio/              # Portfolio photos grouped by project slug
icons/                    # Source logo files
.cursor/
  rules/                  # Project conventions for Cursor
  skills/                 # Agent skill for adding a portfolio project
Requirements.md           # Pages and primary CTA
AGENTS.md                 # Agent-oriented project notes
```

- `src/app/` — routes. Each public page is `src/app/<route>/page.tsx`.
- `src/components/` — reusable UI (header, footer, page hero, testimonials, consultation form, portfolio gallery).
- `src/content/` — structured site and portfolio data. Prefer editing these files over hardcoding copy in components.
- `public/portfolio/<slug>/` — portfolio image files. Paths in `portfolio.ts` must match these files.
- `public/images/` — marketing photography referenced from `site.ts`.
- `public/brand/` — logos served by the site. Source files also exist under `icons/`.
- `.cursor/skills/add-portfolio-project/` — step-by-step skill for adding a project from photos.

There is no `docs/` directory and no CMS.

---

# Getting Started

**Prerequisites:** Node.js 20+ (required by Next.js 16) and npm.

```bash
git clone git@github.com:nicole-andrews/stage-house.git
cd stage-house
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The contact form needs Resend credentials to send mail. Local browsing of the rest of the site does not.

---

# Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| Development | `npm run dev` | Next.js dev server |
| Production build | `npm run build` | Production build |
| Start | `npm start` | Serve the production build |
| Lint | `npm run lint` | ESLint (`eslint-config-next`) |

There is no dedicated test or type-check script. TypeScript is checked as part of `next build`.

---

# Site Architecture

## Routing

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/portfolio` | Portfolio index (featured projects + filterable gallery) |
| `/portfolio/[slug]` | Individual project |
| `/testimonials` | Testimonials |
| `/contact` | Consultation form |
| `POST /api/consultation` | Emails the request to `site.contact.email` |

`src/app/layout.tsx` wraps every page with `Header` and `Footer`. Root metadata uses `site.name` and `site.description`. Fonts are **Cormorant Garamond** (serif headlines) and **Manrope** (body and nav).

## Components vs content

Pages compose shared components and read from `src/content/`. Do not hardcode marketing copy or large amounts of portfolio data in React files.

| What to change | Where |
| --- | --- |
| Business name, nav, CTAs, services, testimonials, page copy, marketing images | `src/content/site.ts` |
| Portfolio photos, room types, featured projects, gallery order | `src/content/portfolio.ts` |
| Page layout and UI | `src/app/` and `src/components/` |
| Color tokens and button styles | `src/app/globals.css` |

## Styling

Tailwind v4 tokens are defined in `src/app/globals.css`: `background`, `background-warm`, `foreground`, `muted`, `taupe`, `taupe-light`, `taupe-dark`, `panel`, `line`. Shared buttons are `.btn-primary` and `.btn-outline`.

---

# Portfolio System

Portfolio data is split on purpose:

1. **Copy** in `site.portfolio` (`slug`, `title`, `location`, `summary`).
2. **Settings and images** in `src/content/portfolio.ts`.
3. **Files** in `public/portfolio/<slug>/`.

`portfolioProjects` merges those sources. Components import helpers from `portfolio.ts`; they should not list photos inline.

### Projects

Each entry in `site.portfolio` needs matching `projectSettings` keyed by slug:

- `id` — stable project id (`proj-<slug>`)
- `coverImageId` — id of the cover photo
- `featured` — if `true`, the project can appear in **Featured projects** (the UI shows up to four)
- `order` — display order among projects

Project pages are generated from `portfolioProjects` via `generateStaticParams`.

### Images

Each `PortfolioImage` has:

| Field | Meaning |
| --- | --- |
| `id` | Stable image id (`img-<slug>-<room>-<nn>`) |
| `src` | Public path, e.g. `/portfolio/light-filled-living/living-01.jpg` |
| `alt` | Accessible description |
| `projectId` | Must match the project `id` |
| `roomType` | One of `living`, `bedroom`, `dining`, `kitchen`, `details` |
| `featured` | Stored on the image; **not currently used** by the gallery UI |
| `portfolioOrder` | Sort order in the all-work gallery and on the project page |
| `width` / `height` | Intrinsic dimensions for `next/image` |

### Room types and filtering

`roomTypes` and `galleryFilters` live in `portfolio.ts`. `PortfolioBrowse` filters the current image set by room. Filters only render when more than one room type is present. Project pages pass that project’s images into the same browse UI.

### Featured selection

- **Featured projects:** `projectSettings.featured` + `getFeaturedProjects()`. Cover comes from `coverImageId`, not from image `featured`.
- **Gallery:** all images sorted by `portfolioOrder`. Image-level `featured` is metadata for future use.

### Add a New Portfolio Image

1. Add an optimized file under `public/portfolio/<slug>/`. Recommended names: `living-01.jpg`, `bedroom-01.jpg` (jpg or png are both used today).
2. Append an object to `portfolioImages` in `src/content/portfolio.ts`.
3. Set `projectId` to the project’s `id`.
4. Set `roomType` to one of the allowed values.
5. Write meaningful `alt` text.
6. Set `portfolioOrder` (and `featured` if you want the flag stored).
7. Set `width` and `height` to the file’s pixel size.
8. If this photo should be the project cover, set `coverImageId` on that project in `projectSettings`.

Do not edit portfolio React components unless the data model itself needs a new field.

### Add a New Project

1. Choose a URL slug (`light-filled-living` style).
2. Copy images into `public/portfolio/<slug>/`.
3. Append `{ slug, title, location, summary }` to `site.portfolio` in `src/content/site.ts`. Do not invent client names or street addresses.
4. In `src/content/portfolio.ts`, add `projectSettings` for the slug (`id`, `coverImageId`, `featured`, `order`).
5. Append each photo to `portfolioImages` as above.

A Cursor skill at `.cursor/skills/add-portfolio-project/SKILL.md` follows these same steps.

---

# Content Management Philosophy

Keep content in `src/content/` and files in `public/`. Presentation stays in components.

That split is intentional so future tooling can update project metadata, photos, order, room categories, alt text, and featured status without rewriting React.

Do not invent business facts (city, founder, client quotes). Ask, or leave a clear placeholder.

---

# Consultation emails

The contact form posts to `/api/consultation`, which sends mail through [Resend](https://resend.com) to `site.contact.email`. `replyTo` is the visitor’s address.

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. Verify a sending domain at [resend.com/domains](https://resend.com/domains). Yahoo cannot be used as the *from* address.
3. Create `.env.local` with:

   ```bash
   RESEND_API_KEY=...
   RESEND_FROM=Stage House Interiors <hello@yourdomain.com>
   ```

4. Set the same variables on the production host.

There is currently no committed `.env.example` in the repository.

---

# AI-Assisted Development

This repo is maintained with an AI-assisted workflow. Treat the following as engineering guidance:

- Review AI-generated code before merging.
- Prefer small, scoped changes.
- Preserve the existing App Router + content-file architecture.
- Avoid new dependencies unless they are clearly needed.
- Reuse components instead of duplicating markup.
- Content updates should change `site.ts` / `portfolio.ts` (and `public/` files), not page components.
- Significant automated changes should go through a branch or pull request.
- After UI work, check the changed route plus shared nav and the consultation CTA.
- For Next.js API details, read the local docs under `node_modules/next/dist/docs/` rather than assuming older Next.js conventions.

---

# Future AI Portfolio Agent

**Planned, not implemented.** The intended workflow is an agent that receives new photos and can help with:

- room-type classification
- alt-text generation
- project assignment
- filename normalization
- image metadata (`width`, `height`, `portfolioOrder`, ids)
- featured / cover selection
- updates to structured portfolio content
- a Git commit or pull request for review

The agent should write to `src/content/` and `public/portfolio/`, not rewrite gallery or page components.

---

# Design Guidelines

Tokens: `src/app/globals.css`. UI notes: `.cursor/rules/react-next.mdc`.

- White is the dominant background; warm taupe is an accent, not a fill.
- Charcoal (`foreground`) for text; muted taupe-gray for supporting copy.
- Photography first; generous whitespace; minimal shadows.
- Restrained motion (opacity/scale on image hover, ~200–700ms).
- Serif headlines at regular/medium weight; sans for body and nav.
- Buttons are slightly rounded rectangles (`.btn-primary`, `.btn-outline`), not pills. The consultation form currently uses a more rounded local style; new chrome should follow the shared button classes.
- Keep layouts strong on small screens. Header includes a mobile menu.

---

# Image Guidelines

**Current conventions** (not a build-enforced pipeline):

- Portfolio files: `public/portfolio/<slug>/<room>-<nn>.jpg` or `.png`.
- Marketing files: `public/images/{home,about,services}/`.
- Formats in use: JPEG and PNG.
- Mixed portrait and landscape; galleries use intrinsic `width`/`height`.
- `next/image` handles optimization. Pass `sizes` on large photos (already done on main galleries and heroes).
- Every visible photo needs descriptive `alt` text. Decorative overlays may use empty alt (see the about overlay in `site.ts`).

**Recommended:** compress before commit; avoid dumping unoptimized camera originals into `public/`. There is no separate originals folder and no CDN/image CMS.

---

# Deployment

In-repo deployment config is thin: no `vercel.json`, no GitHub Actions workflow.

`.gitignore` includes `.vercel`, and production env vars were previously documented for Vercel. Treat Vercel as the likely host, but confirm the live project in the Vercel dashboard.

When a host is connected to this GitHub repo, typical behavior is production deploys from `main` and preview deploys for pull requests — verify that in the host, do not assume it from this README.

Required production secrets if the contact form should work: `RESEND_API_KEY`, `RESEND_FROM`.

---

# Git Workflow

Recommended (not enforced by CI):

```text
main
  ↑
pull request
  ↑
feature branch
```

Keep commits small and descriptive, for example:

```text
feat: add portfolio filters
fix: improve mobile gallery spacing
refactor: extract reusable project card
content: add lakeview portfolio images
```

---

# Accessibility

- Images need meaningful alt text (stored on each `PortfolioImage` and marketing image).
- Interactive controls must be keyboard accessible.
- Prefer semantic HTML and sufficient contrast (charcoal on white/warm white).

Implemented today: mobile nav `aria-expanded` / `aria-controls`; gallery filter `tablist`; lightbox as `role="dialog"` with Escape, arrow keys, focus restore, and labeled prev/next; gallery buttons include `aria-label`.

---

# Performance

This site is photo-heavy. Priorities already in the code:

- `next/image` for optimization
- `sizes` on heroes and galleries
- `priority` on above-the-fold heroes and featured covers
- Lazy loading for non-priority images (Next.js default)

Avoid adding large unoptimized assets. There is no separate image CDN.

---

# Roadmap

Future ideas (not built):

- Richer per-project pages (more copy, room sections)
- Use or drop the unused image `featured` flag
- CMS if nontechnical editing becomes necessary
- Cloud image storage / optimization
- Consultation form alignment with the rest of the design system
- `.env.example` for Resend variables
- AI-assisted portfolio ingestion and metadata
- Analytics
- SEO beyond basic title/description metadata
- Document the production host and preview-deploy setup

---

# Contribution / Development Notes

When changing the project:

1. Inspect existing pages and components first.
2. Reuse `src/components/` and the tokens in `globals.css`.
3. Put copy and listings in `src/content/`, not in JSX.
4. Do not add packages without a clear need.
5. Preserve responsive layout and the consultation CTA.
6. Run `npm run lint` and `npm run build` before pushing UI or content that could break types.
7. For agent work, also see `AGENTS.md` and `.cursor/rules/`.
