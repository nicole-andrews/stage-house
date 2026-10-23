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
Deploy with CloudFlare

Server components are the default. `"use client"` is used only for the header menu, consultation form, and portfolio browse/lightbox.

# Run & Deploy
* Build Command - `npm run build`
* Deploy Command - `npx wrangler deploy`
* Preview Command - `npx wrangler preview`