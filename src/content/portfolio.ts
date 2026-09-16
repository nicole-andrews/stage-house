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
  "light-filled-living": {
    id: "proj-light-filled-living",
    coverImageId: "img-light-filled-living-living-01",
    featured: true,
    order: 1,
  },
  "quiet-primary-suite": {
    id: "proj-quiet-primary-suite",
    coverImageId: "img-quiet-primary-suite-bedroom-01",
    featured: true,
    order: 3,
  },
  "gathering-kitchen": {
    id: "proj-gathering-kitchen",
    coverImageId: "img-gathering-kitchen-kitchen-01",
    featured: true,
    order: 2,
  },
};

export const portfolioImages: PortfolioImage[] = [
  {
    id: "img-light-filled-living-living-01",
    src: "/portfolio/light-filled-living/living-01.jpg",
    alt: "A warm, layered living room with beige seating, a fiddle leaf fig, and gold-framed art",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: true,
    portfolioOrder: 1,
    width: 1350,
    height: 1800,
  },
  {
    id: "img-light-filled-living-living-02",
    src: "/portfolio/light-filled-living/living-02.jpg",
    alt: "A living room centered on a sofa, oak table, and abstract artwork",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 4,
    width: 1800,
    height: 1350,
  },
  {
    id: "img-light-filled-living-living-03",
    src: "/portfolio/light-filled-living/living-03.jpg",
    alt: "A staged living room with a cream sofa, wood coffee table, and layered textiles",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 7,
    width: 2000,
    height: 1500,
  },
  {
    id: "img-light-filled-living-living-04",
    src: "/portfolio/light-filled-living/living-04.png",
    alt: "A staged living and dining room with cream seating, a glass coffee table, and tall windows looking onto trees",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 10,
    width: 1856,
    height: 1228,
  },
  {
    id: "img-light-filled-living-living-05",
    src: "/portfolio/light-filled-living/living-05.jpg",
    alt: "A vaulted living room staged with a cream sofa, wood coffee table, area rug, and large artwork",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: true,
    portfolioOrder: 13,
    width: 1800,
    height: 2400,
  },
  {
    id: "img-light-filled-living-living-06",
    src: "/portfolio/light-filled-living/living-06.jpg",
    alt: "A living room with a white sofa, nested wood tables, greenery, and abstract wall art",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 16,
    width: 1800,
    height: 2400,
  },
  {
    id: "img-light-filled-living-living-07",
    src: "/portfolio/light-filled-living/living-07.jpg",
    alt: "A living room with two armchairs, a sofa with rust pillows, lamps, and a throw blanket",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 18,
    width: 1800,
    height: 2400,
  },
  {
    id: "img-light-filled-living-living-08",
    src: "/portfolio/light-filled-living/living-08.png",
    alt: "A staged living and dining room with a white sofa, navy pillows, and windows looking onto a garden",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 11,
    width: 1672,
    height: 941,
  },
  {
    id: "img-light-filled-living-living-09",
    src: "/portfolio/light-filled-living/living-09.png",
    alt: "A modern dining and living room with white furniture and blue accents",
    projectId: "proj-light-filled-living",
    roomType: "living",
    featured: false,
    portfolioOrder: 6,
    width: 1854,
    height: 1228,
  },
  {
    id: "img-light-filled-living-details-01",
    src: "/portfolio/light-filled-living/details-01.png",
    alt: "A dining room with an orchid on a rustic table, looking through wood-framed doors to an outdoor seating area",
    projectId: "proj-light-filled-living",
    roomType: "dining",
    featured: false,
    portfolioOrder: 15,
    width: 1842,
    height: 1224,
  },
  {
    id: "img-light-filled-living-details-02",
    src: "/portfolio/light-filled-living/details-02.png",
    alt: "Outdoor greenery beside a staged interior",
    projectId: "proj-light-filled-living",
    roomType: "details",
    featured: false,
    portfolioOrder: 19,
    width: 1846,
    height: 1214,
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
