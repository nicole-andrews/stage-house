---
name: add-portfolio-project
description: Add a staged-home project to the Stage House portfolio from photos and short copy.
---

# Add a portfolio project

1. Read `src/content/site.ts` and `src/app/portfolio/page.tsx`.
2. Copy images into `public/portfolio/<slug>/`.
3. Append an entry to `site.portfolio` with `slug`, `title`, `location`, `summary`, and image path(s).
4. If the card UI does not yet render images, update the portfolio page to show them with `next/image`.
5. Do not invent client names or addresses.
