---
name: add-portfolio-project
description: Add a staged-home project to the Stage House portfolio from photos and short copy.
---

# Add a portfolio project

1. Read `src/content/site.ts` and `src/content/portfolio.ts`.
2. Copy images into `public/portfolio/<slug>/` using predictable names (`living-01.jpg`, `bedroom-01.jpg`).
3. Append copy to `site.portfolio` with `slug`, `title`, `location`, and `summary`. Do not invent client names or addresses.
4. In `src/content/portfolio.ts`:
   - Add `projectSettings` for the slug (`id`, `coverImageId`, `featured`, `order`).
   - Append each photo to `portfolioImages` with `id`, `src`, `alt`, `projectId`, `roomType`, `featured`, `portfolioOrder`, `width`, and `height`.
5. Do not edit portfolio React components unless the data model itself needs a new field.
