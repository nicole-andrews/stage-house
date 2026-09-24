import { site } from "@/content/site";

export const roomTypes = [
  "living",
  "bedroom",
  "dining",
  "kitchen",
  "details",
] as const;

export type RoomType = (typeof roomTypes)[number];

export type GalleryFilter = "all" | RoomType;

export type PortfolioImage = {
  id: string;
  src: string;
  alt: string;
  projectId: string;
  roomType: RoomType;
  featured: boolean;
  portfolioOrder: number;
  width: number;
  height: number;
};

export type PortfolioProject = {
  id: string;
  name: string;
  slug: string;
  coverImageId: string;
  location?: string;
  description?: string;
  featured: boolean;
  order: number;
};

export const roomTypeLabels: Record<RoomType, string> = {
  living: "Living",
  bedroom: "Bedroom",
  dining: "Dining",
  kitchen: "Kitchen",
  details: "Details",
};

export const galleryFilters: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...roomTypes.map((id) => ({ id, label: roomTypeLabels[id] })),
];

const projectSettings: Record<
  (typeof site.portfolio)[number]["slug"],
  {
    id: string;
    coverImageId: string;
    featured: boolean;
    order: number;
  }
> = {
  "deodara-drive": {
    id: "proj-deodara-drive",
    coverImageId: "img-deodara-drive-living-01",
    featured: true,
    order: 1,
  },
  "3rd-st-campbell": {
    id: "proj-3rd-st-campbell",
    coverImageId: "img-3rd-st-campbell-living-02",
    featured: true,
    order: 2,
  },
  "quiet-primary-suite": {
    id: "proj-quiet-primary-suite",
    coverImageId: "img-quiet-primary-suite-bedroom-01",
    featured: true,
    order: 4,
  },
  "gathering-kitchen": {
    id: "proj-gathering-kitchen",
    coverImageId: "img-gathering-kitchen-kitchen-01",
    featured: true,
    order: 3,
  },
};

export const portfolioImages: PortfolioImage[] = [
  {
    id: "img-deodara-drive-living-01",
    src: "/portfolio/deodara-drive/living-01.jpg",
    alt: "A staged living room with beige seating, a fiddle leaf fig, and a gold-framed painting",
    projectId: "proj-deodara-drive",
    roomType: "living",
    featured: true,
    portfolioOrder: 1,
    width: 3024,
    height: 4032,
  },
  {
    id: "img-deodara-drive-living-02",
    src: "/portfolio/deodara-drive/living-02.jpg",
    alt: "A staged living room with a brick fireplace, cream seating, and a wide garden window",
    projectId: "proj-deodara-drive",
    roomType: "living",
    featured: true,
    portfolioOrder: 2,
    width: 1280,
    height: 852,
  },
  {
    id: "img-deodara-drive-living-03",
    src: "/portfolio/deodara-drive/living-03.jpg",
    alt: "A staged living room looking through to dining, with a white brick fireplace and cream seating",
    projectId: "proj-deodara-drive",
    roomType: "living",
    featured: true,
    portfolioOrder: 3,
    width: 1280,
    height: 853,
  },
  {
    id: "img-deodara-drive-living-04",
    src: "/portfolio/deodara-drive/living-04.jpg",
    alt: "A staged living room opening to a patio, with a white brick fireplace and cream seating",
    projectId: "proj-deodara-drive",
    roomType: "living",
    featured: false,
    portfolioOrder: 4,
    width: 665,
    height: 441,
  },
  {
    id: "img-deodara-drive-bedroom-01",
    src: "/portfolio/deodara-drive/bedroom-01.jpg",
    alt: "A primary bedroom staged with a tufted bench, layered bedding, and garden windows",
    projectId: "proj-deodara-drive",
    roomType: "bedroom",
    featured: true,
    portfolioOrder: 5,
    width: 665,
    height: 441,
  },
  {
    id: "img-deodara-drive-bedroom-02",
    src: "/portfolio/deodara-drive/bedroom-02.jpg",
    alt: "A guest bedroom staged with rust bedding, white nightstands, and a landscape photograph",
    projectId: "proj-deodara-drive",
    roomType: "bedroom",
    featured: false,
    portfolioOrder: 6,
    width: 665,
    height: 441,
  },
  {
    id: "img-deodara-drive-bedroom-03",
    src: "/portfolio/deodara-drive/bedroom-03.jpg",
    alt: "A bedroom staged as a quiet office, with a twin bed, desk, and garden window",
    projectId: "proj-deodara-drive",
    roomType: "bedroom",
    featured: false,
    portfolioOrder: 7,
    width: 665,
    height: 441,
  },
  {
    id: "img-deodara-drive-details-01",
    src: "/portfolio/deodara-drive/details-01.jpg",
    alt: "A staged dressing area with a clothing rack, ottoman, and greenery",
    projectId: "proj-deodara-drive",
    roomType: "details",
    featured: false,
    portfolioOrder: 8,
    width: 1280,
    height: 852,
  },
  {
    id: "img-deodara-drive-details-02",
    src: "/portfolio/deodara-drive/details-02.jpg",
    alt: "An outdoor dining table with woven chairs under a fruit tree",
    projectId: "proj-deodara-drive",
    roomType: "details",
    featured: true,
    portfolioOrder: 9,
    width: 1280,
    height: 853,
  },
  {
    id: "img-deodara-drive-details-03",
    src: "/portfolio/deodara-drive/details-03.jpg",
    alt: "A patio dining table looking through sliding doors into the kitchen",
    projectId: "proj-deodara-drive",
    roomType: "details",
    featured: false,
    portfolioOrder: 10,
    width: 665,
    height: 441,
  },
  {
    id: "img-deodara-drive-details-04",
    src: "/portfolio/deodara-drive/details-04.jpg",
    alt: "A backyard patio staged with dining and lounge seating beside a fruit tree",
    projectId: "proj-deodara-drive",
    roomType: "details",
    featured: false,
    portfolioOrder: 11,
    width: 665,
    height: 441,
  },
  {
    id: "img-3rd-st-campbell-living-01",
    src: "/portfolio/3rd-st-campbell/living-01.png",
    alt: "A staged living room with white sofas, a glass coffee table, and abstract artwork",
    projectId: "proj-3rd-st-campbell",
    roomType: "living",
    featured: true,
    portfolioOrder: 1,
    width: 2032,
    height: 1340,
  },
  {
    id: "img-3rd-st-campbell-living-02",
    src: "/portfolio/3rd-st-campbell/living-02.png",
    alt: "An open living room looking through to the dining table and kitchen",
    projectId: "proj-3rd-st-campbell",
    roomType: "living",
    featured: true,
    portfolioOrder: 4,
    width: 2040,
    height: 1346,
  },
  {
    id: "img-3rd-st-campbell-living-03",
    src: "/portfolio/3rd-st-campbell/living-03.png",
    alt: "A living room seating area with a white sofa, glass coffee table, and window light",
    projectId: "proj-3rd-st-campbell",
    roomType: "living",
    featured: false,
    portfolioOrder: 7,
    width: 2052,
    height: 1352,
  },
  {
    id: "img-3rd-st-campbell-living-04",
    src: "/portfolio/3rd-st-campbell/living-04.png",
    alt: "A living room staged beside a wood front door, with white seating and a fiddle leaf fig",
    projectId: "proj-3rd-st-campbell",
    roomType: "living",
    featured: false,
    portfolioOrder: 11,
    width: 2028,
    height: 1346,
  },
  {
    id: "img-3rd-st-campbell-kitchen-01",
    src: "/portfolio/3rd-st-campbell/kitchen-01.png",
    alt: "A white kitchen with a granite island, pendant lights, and stainless appliances",
    projectId: "proj-3rd-st-campbell",
    roomType: "kitchen",
    featured: true,
    portfolioOrder: 6,
    width: 2032,
    height: 1346,
  },
  {
    id: "img-3rd-st-campbell-kitchen-02",
    src: "/portfolio/3rd-st-campbell/kitchen-02.png",
    alt: "A kitchen island with white stools, looking toward the range and refrigerator",
    projectId: "proj-3rd-st-campbell",
    roomType: "kitchen",
    featured: false,
    portfolioOrder: 10,
    width: 2026,
    height: 1340,
  },
  {
    id: "img-3rd-st-campbell-kitchen-03",
    src: "/portfolio/3rd-st-campbell/kitchen-03.png",
    alt: "A kitchen range with patterned tile, wood shelves, and a stainless hood",
    projectId: "proj-3rd-st-campbell",
    roomType: "kitchen",
    featured: false,
    portfolioOrder: 13,
    width: 2036,
    height: 1348,
  },
  {
    id: "img-3rd-st-campbell-kitchen-04",
    src: "/portfolio/3rd-st-campbell/kitchen-04.png",
    alt: "A kitchen sink and dishwasher along a granite counter with a garden window",
    projectId: "proj-3rd-st-campbell",
    roomType: "kitchen",
    featured: false,
    portfolioOrder: 16,
    width: 2030,
    height: 1352,
  },
  {
    id: "img-3rd-st-campbell-kitchen-05",
    src: "/portfolio/3rd-st-campbell/kitchen-05.png",
    alt: "Kitchen details with patterned tile, open wood shelves, and a gas range",
    projectId: "proj-3rd-st-campbell",
    roomType: "kitchen",
    featured: false,
    portfolioOrder: 18,
    width: 2034,
    height: 1358,
  },
  {
    id: "img-3rd-st-campbell-dining-01",
    src: "/portfolio/3rd-st-campbell/dining-01.png",
    alt: "A dining table with white chairs staged in front of the kitchen island",
    projectId: "proj-3rd-st-campbell",
    roomType: "dining",
    featured: true,
    portfolioOrder: 15,
    width: 2028,
    height: 1312,
  },
  {
    id: "img-3rd-st-campbell-dining-02",
    src: "/portfolio/3rd-st-campbell/dining-02.png",
    alt: "An open dining area looking toward the kitchen, with artwork and a glass table",
    projectId: "proj-3rd-st-campbell",
    roomType: "dining",
    featured: false,
    portfolioOrder: 19,
    width: 2034,
    height: 1356,
  },
  {
    id: "img-3rd-st-campbell-dining-03",
    src: "/portfolio/3rd-st-campbell/dining-03.jpg",
    alt: "A dining room with a dark table, white chairs, and a window garden view",
    projectId: "proj-3rd-st-campbell",
    roomType: "dining",
    featured: false,
    portfolioOrder: 21,
    width: 665,
    height: 441,
  },
  {
    id: "img-3rd-st-campbell-bedroom-01",
    src: "/portfolio/3rd-st-campbell/bedroom-01.png",
    alt: "A primary bedroom staged with layered white and navy bedding",
    projectId: "proj-3rd-st-campbell",
    roomType: "bedroom",
    featured: true,
    portfolioOrder: 22,
    width: 2040,
    height: 1356,
  },
  {
    id: "img-3rd-st-campbell-bedroom-02",
    src: "/portfolio/3rd-st-campbell/bedroom-02.png",
    alt: "A bedroom detail with a linen headboard, navy pillows, and a bedside lamp",
    projectId: "proj-3rd-st-campbell",
    roomType: "bedroom",
    featured: false,
    portfolioOrder: 23,
    width: 2040,
    height: 1348,
  },
  {
    id: "img-3rd-st-campbell-bedroom-03",
    src: "/portfolio/3rd-st-campbell/bedroom-03.png",
    alt: "A bedroom staged with a desk nook, ceiling fan, and layered bedding",
    projectId: "proj-3rd-st-campbell",
    roomType: "bedroom",
    featured: false,
    portfolioOrder: 24,
    width: 2022,
    height: 1336,
  },
  {
    id: "img-3rd-st-campbell-details-01",
    src: "/portfolio/3rd-st-campbell/details-01.png",
    alt: "A bathroom with a double vanity, glass shower, and tiled soaking tub",
    projectId: "proj-3rd-st-campbell",
    roomType: "details",
    featured: false,
    portfolioOrder: 25,
    width: 2050,
    height: 1350,
  },
  {
    id: "img-3rd-st-campbell-details-02",
    src: "/portfolio/3rd-st-campbell/details-02.png",
    alt: "A covered patio staged with lounge chairs beside a wood fence",
    projectId: "proj-3rd-st-campbell",
    roomType: "details",
    featured: false,
    portfolioOrder: 26,
    width: 2032,
    height: 1348,
  },
  {
    id: "img-3rd-st-campbell-details-03",
    src: "/portfolio/3rd-st-campbell/details-03.png",
    alt: "An outdoor dining table on a paver patio beside the house",
    projectId: "proj-3rd-st-campbell",
    roomType: "details",
    featured: false,
    portfolioOrder: 27,
    width: 2036,
    height: 1338,
  },
  {
    id: "img-quiet-primary-suite-bedroom-01",
    src: "/portfolio/quiet-primary-suite/bedroom-01.png",
    alt: "A child's bedroom staged with yellow bedding, artwork, and a reading nook",
    projectId: "proj-quiet-primary-suite",
    roomType: "bedroom",
    featured: true,
    portfolioOrder: 3,
    width: 1848,
    height: 1216,
  },
  {
    id: "img-quiet-primary-suite-bedroom-02",
    src: "/portfolio/quiet-primary-suite/bedroom-02.png",
    alt: "A modern bedroom staged with a low platform bed and quiet, layered textiles",
    projectId: "proj-quiet-primary-suite",
    roomType: "bedroom",
    featured: false,
    portfolioOrder: 14,
    width: 992,
    height: 544,
  },
  {
    id: "img-gathering-kitchen-kitchen-01",
    src: "/portfolio/gathering-kitchen/kitchen-01.png",
    alt: "A staged kitchen with blue cabinetry, a marble island, and a rustic dining table under glass pendant lights",
    projectId: "proj-gathering-kitchen",
    roomType: "kitchen",
    featured: true,
    portfolioOrder: 2,
    width: 1840,
    height: 1226,
  },
  {
    id: "img-gathering-kitchen-kitchen-02",
    src: "/portfolio/gathering-kitchen/kitchen-02.png",
    alt: "A blue kitchen with marble counters, a herringbone backsplash, and styled accessories",
    projectId: "proj-gathering-kitchen",
    roomType: "kitchen",
    featured: false,
    portfolioOrder: 8,
    width: 1842,
    height: 1220,
  },
  {
    id: "img-gathering-kitchen-kitchen-03",
    src: "/portfolio/gathering-kitchen/kitchen-03.png",
    alt: "A staged kitchen and dining area with blue cabinetry, a rustic wood table, and glass pendant lights",
    projectId: "proj-gathering-kitchen",
    roomType: "kitchen",
    featured: false,
    portfolioOrder: 12,
    width: 1672,
    height: 941,
  },
  {
    id: "img-gathering-kitchen-dining-01",
    src: "/portfolio/gathering-kitchen/dining-01.jpg",
    alt: "A dining room with a wood table, cream chairs, and an arched mirror",
    projectId: "proj-gathering-kitchen",
    roomType: "dining",
    featured: true,
    portfolioOrder: 5,
    width: 1350,
    height: 1800,
  },
  {
    id: "img-gathering-kitchen-dining-02",
    src: "/portfolio/gathering-kitchen/dining-02.png",
    alt: "A dining room with a rustic wood table beside a blue kitchen and wood-framed glass doors",
    projectId: "proj-gathering-kitchen",
    roomType: "dining",
    featured: false,
    portfolioOrder: 9,
    width: 1828,
    height: 1216,
  },
  {
    id: "img-gathering-kitchen-details-01",
    src: "/portfolio/gathering-kitchen/details-01.png",
    alt: "A wine cellar staged with a high table, bar stools, and a barrel beside lit bottle racks",
    projectId: "proj-gathering-kitchen",
    roomType: "details",
    featured: false,
    portfolioOrder: 17,
    width: 1572,
    height: 1172,
  },
  {
    id: "img-gathering-kitchen-details-02",
    src: "/portfolio/gathering-kitchen/details-02.png",
    alt: "A modern outdoor seating area opening into a staged kitchen and living room",
    projectId: "proj-gathering-kitchen",
    roomType: "details",
    featured: false,
    portfolioOrder: 20,
    width: 1728,
    height: 1152,
  },
];

const imagesById = new Map(
  portfolioImages.map((image) => [image.id, image] as const),
);

export const portfolioProjects: PortfolioProject[] = [...site.portfolio]
  .map((project) => {
    const settings = projectSettings[project.slug];
    return {
      id: settings.id,
      name: project.title,
      slug: project.slug,
      coverImageId: settings.coverImageId,
      location: project.location,
      description: project.summary,
      featured: settings.featured,
      order: settings.order,
    };
  })
  .sort((a, b) => a.order - b.order);

const projectsById = new Map(
  portfolioProjects.map((project) => [project.id, project] as const),
);

const projectsBySlug = new Map(
  portfolioProjects.map((project) => [project.slug, project] as const),
);

export type PortfolioImageView = PortfolioImage & {
  projectName: string;
  projectSlug: string;
};

export function withProjectMeta(image: PortfolioImage): PortfolioImageView {
  const project = projectsById.get(image.projectId);
  return {
    ...image,
    projectName: project?.name ?? "",
    projectSlug: project?.slug ?? "",
  };
}

export function getImageById(id: string) {
  return imagesById.get(id);
}

export function getProjectBySlug(slug: string) {
  return projectsBySlug.get(slug);
}

export function getFeaturedProjects() {
  return portfolioProjects.filter((project) => project.featured);
}

export function getProjectCover(project: PortfolioProject) {
  return imagesById.get(project.coverImageId);
}

export function getProjectImages(projectId: string) {
  return portfolioImages
    .filter((image) => image.projectId === projectId)
    .sort((a, b) => a.portfolioOrder - b.portfolioOrder)
    .map(withProjectMeta);
}

export function getGalleryImages(filter: GalleryFilter = "all") {
  return portfolioImages
    .filter((image) => filter === "all" || image.roomType === filter)
    .sort((a, b) => a.portfolioOrder - b.portfolioOrder)
    .map(withProjectMeta);
}
