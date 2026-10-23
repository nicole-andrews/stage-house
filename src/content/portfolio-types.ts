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

export type PortfolioImageView = PortfolioImage & {
  projectName: string;
  projectSlug: string;
};
