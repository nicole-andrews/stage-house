import type { RoomType } from "@/content/portfolio-types";

/**
 * Optional descriptions for portfolio photos, keyed by the path under
 * `public/photos/`. A file with no entry still appears in the gallery.
 */
export const photoAlts: Record<string, string> = {
  "deodara-drive/living-01.jpg":
    "A staged living room with beige seating, a fiddle leaf fig, and a gold-framed painting",
  "deodara-drive/living-02.jpg":
    "A staged living room with a brick fireplace, cream seating, and a wide garden window",
  "deodara-drive/living-03.jpg":
    "A staged living room looking through to dining, with a white brick fireplace and cream seating",
  "deodara-drive/living-04.jpg":
    "A staged living room opening to a patio, with a white brick fireplace and cream seating",
  "deodara-drive/bedroom-01.jpg":
    "A primary bedroom staged with a tufted bench, layered bedding, and garden windows",
  "deodara-drive/bedroom-02.jpg":
    "A guest bedroom staged with rust bedding, white nightstands, and a landscape photograph",
  "deodara-drive/bedroom-03.jpg":
    "A bedroom staged as a quiet office, with a twin bed, desk, and garden window",
  "deodara-drive/details-01.jpg":
    "A staged dressing area with a clothing rack, ottoman, and greenery",
  "deodara-drive/details-02.jpg":
    "An outdoor dining table with woven chairs under a fruit tree",
  "deodara-drive/details-03.jpg":
    "A patio dining table looking through sliding doors into the kitchen",
  "deodara-drive/details-04.jpg":
    "A backyard patio staged with dining and lounge seating beside a fruit tree",
  "3rd-st-campbell/living-01.png":
    "A staged living room with white sofas, a glass coffee table, and abstract artwork",
  "3rd-st-campbell/living-02.png":
    "An open living room looking through to the dining table and kitchen",
  "3rd-st-campbell/living-03.png":
    "A living room seating area with a white sofa, glass coffee table, and window light",
  "3rd-st-campbell/living-04.png":
    "A living room staged beside a wood front door, with white seating and a fiddle leaf fig",
  "3rd-st-campbell/kitchen-01.png":
    "A white kitchen with a granite island, pendant lights, and stainless appliances",
  "3rd-st-campbell/kitchen-02.png":
    "A kitchen island with white stools, looking toward the range and refrigerator",
  "3rd-st-campbell/kitchen-03.png":
    "A kitchen range with patterned tile, wood shelves, and a stainless hood",
  "3rd-st-campbell/kitchen-04.png":
    "A kitchen sink and dishwasher along a granite counter with a garden window",
  "3rd-st-campbell/kitchen-05.png":
    "Kitchen details with patterned tile, open wood shelves, and a gas range",
  "3rd-st-campbell/dining-01.png":
    "A dining table with white chairs staged in front of the kitchen island",
  "3rd-st-campbell/dining-02.png":
    "An open dining area looking toward the kitchen, with artwork and a glass table",
  "3rd-st-campbell/dining-03.jpg":
    "A dining room with a dark table, white chairs, and a window garden view",
  "3rd-st-campbell/bedroom-01.png":
    "A primary bedroom staged with layered white and navy bedding",
  "3rd-st-campbell/bedroom-02.png":
    "A bedroom detail with a linen headboard, navy pillows, and a bedside lamp",
  "3rd-st-campbell/bedroom-03.png":
    "A bedroom staged with a desk nook, ceiling fan, and layered bedding",
  "3rd-st-campbell/desk-3rd-campbell.png":
    "A bedroom desk with a boucle chair, a wood lamp, and a large abstract painting",
  "3rd-st-campbell/desk-close-3rd-campbell.png":
    "A close view of a bedroom desk with a clock, books, and a boucle chair",
  "3rd-st-campbell/details-01.png":
    "A bathroom with a double vanity, glass shower, and a tiled soaking tub",
  "3rd-st-campbell/details-02.png":
    "A covered patio staged with lounge chairs beside a wood fence",
  "3rd-st-campbell/details-03.png":
    "An outdoor dining table on a paver patio beside the house",
  "wakefield-tr/livingroom-01-wakefield-tr.jpg":
    "A staged living room with cream sofas facing glass doors that open to a pool and patio",
  "wakefield-tr/livingroom-02-wakefield-tr.jpg":
    "Two white chairs with velvet pillows beneath a large textured painting",
  "wakefield-tr/livingroom-02-wakefield-ter.jpg":
    "An open living room with white sofas, a fireplace wall, and a view through to dining",
  "wakefield-tr/living-04-wakefield-tr.png":
    "A living room with white seating, a linear fireplace, and sliding doors opening to a pool",
  "wakefield-tr/diningroom-01-wakefield-tr.jpg":
    "A glass dining table with beige chairs, a geometric chandelier, and abstract art",
  "wakefield-tr/dining-02-wakefield-tr.png":
    "A glass dining table with taupe chairs, looking through to a white living room and the garden",
  "wakefield-tr/bedroom-01-wakefield-tr.jpg":
    "A neutral bedroom with a beige throw, white nightstands, and a tall potted tree",
  "wakefield-tr/bedroom-01-wakefield-ter.jpg":
    "A primary bedroom with a gray headboard, white bedding, and a fireplace wall",
  "wakefield-tr/outdoor-chaises-wakefield-tr.jpg":
    "Two lounge chairs beside a pool, styled with pillows and a side table",
  "wakefield-tr/outdoor-dining-wakefield-tr.jpg":
    "An outdoor dining table with a succulent centerpiece, looking toward a pool and lounge",
  "marilyn-ave-mv/living-room-01-marilyn-ave-mv.jpeg":
    "A staged living room with a light sofa, brass coffee table, and an arched wood mirror",
  "marilyn-ave-mv/living-room-02-marilyn-ave-mv.jpeg":
    "A living room seating area with a light sofa, brass coffee table, and abstract artwork",
  "marilyn-ave-mv/living-room-03-marilyn-ave-mv.jpeg":
    "A fireplace seating nook with a round mirror, tufted ottomans, and a tall plant",
  "marilyn-ave-mv/dining-room-marilyn-ave-mv.jpeg":
    "A black dining table with cream chairs, a geometric chandelier, and sunburst art",
  "marilyn-ave-mv/dining-room-01-marilyn-ave-mv.jpeg":
    "A wood dining table looking through to a fireplace seating area",
  "marilyn-ave-mv/kitchen-marilyn-ave-mv.jpeg":
    "A white kitchen with a granite island, wood bar stools, and a garden window",
  "marilyn-ave-mv/bedroom-master-marilyn-ave-mv.jpeg":
    "A primary bedroom staged with layered cream bedding and a bench at the foot of the bed",
  "marilyn-ave-mv/bedroom-marilyn-ave-mv.jpeg":
    "A bedroom staged with white bedding, a rust throw, and mirrored nightstands",
  "marilyn-ave-mv/bedroom-twin-marilyn-ave-mv.jpeg":
    "A twin bedroom staged with a mustard throw, a lion pillow, and a woven ottoman",
  "marilyn-ave-mv/office-marilyn-ave-mv.jpeg":
    "An office staged with a wood desk, boucle chairs, and a black-and-white photograph",
  "marilyn-ave-mv/details-marilyn-ave-mv.jpeg":
    "A hallway console with a round mirror, books, and a small plant",
  "marilyn-ave-mv/outdoor-marilyn-ave-mv.jpeg":
    "An outdoor dining table with woven chairs under oaks, beside a covered lounge",
  "sf/living-01.png":
    "A pale living room with a wood coffee table, swivel chairs, and sliding doors to a balcony",
  "sf/living-02.png":
    "A living room with a white sofa, a black-and-white painting, and a round mirror",
  "sf/living-03.png":
    "A living room looking toward a balcony, with cream chairs and a black-and-white painting",
  "sf/living-04.png":
    "A living room opening toward a dining area, with cream seating and a round mirror",
  "sf/dining-01.png":
    "A glass dining table with cream chairs, a mirrored wall, and a large abstract painting",
  "sf/bedroom-01.png":
    "A bedroom staged with white bedding, a beige throw, and a window looking onto trees",
  "living/living-room-dining-clean.jpg":
    "An open living and dining room with blue pillows, a glass coffee table, and French doors",
  "living/living-room-zoomed-out.png":
    "An open living room looking through to dining and the kitchen, with cream seating",
  "dining/dining-huntersons-place.png":
    "A round black dining table with gray chairs beside a kitchenette",
  "dining/dining-table-granada-ave.jpg":
    "A round glass dining table with white chairs and a woven pendant",
  "dining/dining-modern-white.png":
    "A glass dining table with white nailhead chairs, opening to a living room",
  "dining/dining-wood-table.png":
    "A wood dining table with gray chairs, looking through glass doors to a garden patio",
};

const fallbackAlt: Record<RoomType, string> = {
  living: "A staged living room",
  dining: "A staged dining area",
  bedroom: "A staged bedroom",
  kitchen: "A staged kitchen",
  details: "A staged detail",
};

export function altFor(file: string, roomType: RoomType) {
  return photoAlts[file] ?? fallbackAlt[roomType];
}
