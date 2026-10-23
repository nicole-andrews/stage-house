---
name: import-listing-photos
description: >-
  Download staging photos from a home listing URL into the gitignored images/
  archive. Use when Nicole pastes a listing link (Zillow, Redfin, Realtor,
  Compass, MLS, or similar) and wants the photos extracted, filtered to staged
  rooms, renamed like livingroom-01-main-ct.jpg, and saved under images/<street-name>/
  for review before they go on the site.
---

# Import listing photos

Save review copies only. Do not copy anything into `public/photos/`, and do not edit `site.ts`, `photos.ts`, or `portfolio.ts`. Publishing is the add-portfolio-project skill, after Nicole picks the frames.

Use only the listing URL she gives you. If the page shows a captcha, login wall, or block, stop and tell her. Do not try to get around it.

## Names

Each file is `roomType-specifics-street-name.jpg`. The street name is the folder too.

`Main Ct` → `images/main-ct/`. Drop the house number, city, state, and ZIP.

| Photo | Filename |
| --- | --- |
| First living room | `livingroom-01-main-ct.jpg` |
| Second living room | `livingroom-02-main-ct.jpg` |
| Kids bedroom | `bedroom-kids-main-ct.jpg` |
| Outdoor furniture | `outdoor-furniture-main-ct.jpg` |
| Laundry styling | `details-laundry-main-ct.jpg` |
| Styled plants | `details-plants-main-ct.jpg` |
| Knick-knack close-up | `details-knickknacks-main-ct.jpg` |

- Room category is one of: `bedroom`, `kitchen`, `livingroom`, `diningroom`, `outdoor`, `details`. Use a room category only when the photo is clearly that room. If it is unclear, use `details`. Close-ups of knick-knacks, accessories, and styled objects are `details`.
- Specifics is what makes this frame different: `kids`, `laundry`, `plants`, `knickknacks`. When several frames are the same room, use `01`, `02`, and so on instead.
- Street name is lowercase kebab case: `main-ct`, `deodara-drive`.

If `images/<street-name>/` already has files, stop and ask before writing.

## What to keep

Look at every candidate. Keep a photo only when staging is visible: sofa, bed, dining set, accent chairs, lounge furniture, or a room styled with plants, textiles, and accessories.

Name the room only when it is obvious: a bed is `bedroom`, a kitchen is `kitchen`, a living room is `livingroom`, a dining room is `diningroom`, and staged outdoor furniture is `outdoor`. Anything uncertain goes in `details`, including close-ups of knick-knacks, plants, laundry, a bath, or an office.

Leave these out of the review folder:

- The house itself: front, side, rear, roof, drone, driveway, yard, pool, or garage with no staged furniture
- Vacant rooms and plain fixture photos
- Floor plans, maps, agent photos, logos
- Blurry, dark, or tiny frames
- A second frame of the same corner. Keep the one that shows the staging most clearly

## Steps

1. Open the listing and read the street address. Build the slug.
2. Collect photo URLs with `scripts/extract-page-images.js` (`extractListingImageUrls`) in the page. Write them one per line to a temp file.
3. Download candidates:

```bash
node .cursor/skills/import-listing-photos/scripts/listing-photos.mjs download \
  --dir images/.incoming/<street-name> \
  --urls <urls.txt> \
  --referer <listing-url>
```

`plan` prints the URLs it would download. The script drops thumbnails, size duplicates, and identical files. Candidates stay in `images/.incoming/` only long enough to be judged.

4. Open every downloaded file and decide. Write `keep.json` with a room and a specific for each keeper. Use `01`, `02` when the room repeats, and a word when the frame has a clearer subject.

```json
[
  { "file": "003.webp", "room": "livingroom", "specific": "01" },
  { "file": "004.webp", "room": "livingroom", "specific": "02" },
  { "file": "007.jpg", "room": "bedroom", "specific": "kids" },
  { "file": "011.jpg", "room": "outdoor", "specific": "furniture" },
  { "file": "012.jpg", "room": "details", "specific": "laundry" }
]
```

5. Copy the keepers into the review folder and delete the incoming folder, including every rejected file:

```bash
node .cursor/skills/import-listing-photos/scripts/listing-photos.mjs finalize \
  --from images/.incoming/<street-name> \
  --to images/<street-name> \
  --keep keep.json
```

An empty list still deletes the incoming folder and writes nothing.

6. Tell Nicole the folder path, each kept filename and room, and how many frames were left out (exterior, empty, or duplicate). These files are for her to look through. They are not on the site until she asks.