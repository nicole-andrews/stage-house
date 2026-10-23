---
name: add-portfolio-project
description: Add a staged-home project to the Stage House portfolio from photos and short copy.
---

# Add a portfolio project

1. Read `src/content/site.ts` and `src/content/photos.ts`.
2. Featured house: copy the photos into `public/photos/<slug>/`. The folder name is the slug. Name each file so the room comes first: `living`, `dining`, `bedroom`, `kitchen`, or `details` (`living-01-main-ct.jpg`, `diningroom-01-main-ct.jpg`). `livingroom`, `diningroom`, `outdoor`, `office`, and `desk` also work. `outdoor`, `office`, and `desk` show under Details.
3. A photo that is not part of a featured house goes in `public/photos/living/`, `dining/`, `bedroom/`, `kitchen/`, or `details/`. The folder is the filter. The filename should start with that same room.
4. The portfolio reads the folder. Width and height come from the file. Add an alt in `photoAlts` in `src/content/photos.ts`, keyed by the path under `public/photos/` (`sf/living-01.png`). Without an entry, the gallery uses a short description from the room.
5. For a featured house, append `site.portfolio` with `slug` (the folder name), `title`, `location`, and `summary`. Do not invent client names or addresses. The cover is the first living photo. To use a different file, set that filename in `coverFile` in `src/content/portfolio.ts`.
6. To use a photo on Home, About, or Services, set that slot’s `file`, `alt`, `width`, `height`, and `location` in `src/content/page-photos.json`. The file can be the same one the portfolio uses. Do not put a path in a page or in `site.ts`.
7. Do not edit portfolio React components unless the data model itself needs a new field.
