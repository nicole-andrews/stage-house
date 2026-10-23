import fs from "node:fs";
import path from "node:path";
import { imageSize } from "@/content/image-size";
import { altFor } from "@/content/photos";
import {
  roomTypes,
  type PortfolioImage,
  type PortfolioImageView,
  type PortfolioProject,
  type RoomType,
  type GalleryFilter,
} from "@/content/portfolio-types";
import { site } from "@/content/site";

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const roomFolders = new Set<string>(roomTypes);

/**
 * Leading word of the filename. `outdoor`, `office`, and `desk` are Details.
 * `living-room` / `livingroom` and `dining-room` / `diningroom` count too.
 * A later word is used when the name starts with the house, as in `sf-living-01`.
 */
const roomWords: Record<string, RoomType> = {
  living: "living",
  livingroom: "living",
  dining: "dining",
  diningroom: "dining",
  bedroom: "bedroom",
  kitchen: "kitchen",
  details: "details",
  outdoor: "details",
  office: "details",
  desk: "details",
};

const coverFile: Partial<Record<(typeof site.portfolio)[number]["slug"], string>> = {
  "3rd-st-campbell": "living-02.png",
};

type Scanned = {
  images: PortfolioImage[];
  projects: PortfolioProject[];
};

let cached: { signature: string; scanned: Scanned } | null = null;

function directorySignature(dir: string) {
  const lines: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const name of fs.readdirSync(full)) {
        if (name.startsWith(".")) {
          continue;
        }
        const stat = fs.statSync(path.join(full, name));
        lines.push(`${entry.name}/${name}:${stat.mtimeMs}:${stat.size}`);
      }
      continue;
    }
    if (entry.isFile()) {
      const stat = fs.statSync(full);
      lines.push(`${entry.name}:${stat.mtimeMs}:${stat.size}`);
    }
  }
  return lines.sort().join("\n");
}

function roomTypeFromName(filename: string): RoomType | null {
  const stem = filename
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[\s_]+/g, "-");
  const tokens = stem.split("-").filter(Boolean);
  if (tokens[0] === "living" && tokens[1] === "room") {
    return "living";
  }
  if (tokens[0] === "dining" && tokens[1] === "room") {
    return "dining";
  }
  if (tokens[0] && roomWords[tokens[0]]) {
    return roomWords[tokens[0]];
  }
  for (const token of tokens) {
    if (token === "room") {
      continue;
    }
    if (roomWords[token]) {
      return roomWords[token];
    }
  }
  return null;
}

function firstNumber(filename: string) {
  const match = filename.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function scan(): Scanned {
  const problems: string[] = [];
  const entries = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true });
  const loose: { file: string; roomType: RoomType; filename: string }[] = [];
  const byHouse = new Map<string, { file: string; roomType: RoomType; filename: string }[]>();

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const full = path.join(PHOTOS_DIR, entry.name);
    if (entry.isFile()) {
      problems.push(
        `${entry.name} is sitting in public/photos/. Move it into living, dining, bedroom, kitchen, or details, or into a house folder.`,
      );
      continue;
    }
    if (!entry.isDirectory()) {
      continue;
    }

    const files = fs.readdirSync(full, { withFileTypes: true });
    for (const file of files) {
      if (file.name.startsWith(".")) {
        continue;
      }
      if (!file.isFile()) {
        problems.push(`${entry.name}/${file.name} is not a photo file.`);
        continue;
      }
      const ext = path.extname(file.name).toLowerCase();
      if (!IMAGE_EXT.has(ext)) {
        continue;
      }
      const relative = `${entry.name}/${file.name}`;
      const fromName = roomTypeFromName(file.name);
      if (roomFolders.has(entry.name)) {
        const roomType = entry.name as RoomType;
        if (fromName && fromName !== roomType) {
          problems.push(
            `${relative} is in ${entry.name}/, but the name reads as ${fromName}. Rename it so the name and folder agree.`,
          );
          continue;
        }
        loose.push({ file: relative, roomType, filename: file.name });
        continue;
      }
      if (!fromName) {
        problems.push(
          `${relative} needs a room in the name: living, dining, bedroom, kitchen, or details.`,
        );
        continue;
      }
      const house = byHouse.get(entry.name) ?? [];
      house.push({ file: relative, roomType: fromName, filename: file.name });
      byHouse.set(entry.name, house);
    }
  }

  if (problems.length > 0) {
    throw new Error(`Portfolio photos:\n${problems.join("\n")}`);
  }

  const knownSlugs = new Set(site.portfolio.map((project) => project.slug));
  const projectRank = new Map(site.portfolio.map((project, index) => [project.slug, index]));

  const drafts: {
    file: string;
    roomType: RoomType;
    filename: string;
    slug: string;
    group: number;
  }[] = [];

  for (const [slug, photos] of byHouse) {
    const group = projectRank.get(slug as (typeof site.portfolio)[number]["slug"]) ?? 500;
    for (const photo of photos) {
      drafts.push({ ...photo, slug, group });
    }
  }
  for (const photo of loose) {
    drafts.push({ ...photo, slug: "", group: 1000 });
  }

  drafts.sort((a, b) => {
    if (a.group !== b.group) {
      return a.group - b.group;
    }
    if (!a.slug && !b.slug) {
      return (
        roomTypes.indexOf(a.roomType) - roomTypes.indexOf(b.roomType) ||
        firstNumber(a.filename) - firstNumber(b.filename) ||
        a.filename.localeCompare(b.filename)
      );
    }
    if (a.slug !== b.slug) {
      return a.slug.localeCompare(b.slug);
    }
    return (
      roomTypes.indexOf(a.roomType) - roomTypes.indexOf(b.roomType) ||
      firstNumber(a.filename) - firstNumber(b.filename) ||
      a.filename.localeCompare(b.filename)
    );
  });

  const images: PortfolioImage[] = drafts.map((draft, index) => {
    const size = imageSize(path.join(PHOTOS_DIR, draft.file));
    const id = draft.file.replace(/\.[^.]+$/, "").replaceAll("/", "-");
    return {
      id,
      src: `/photos/${draft.file}`,
      alt: altFor(draft.file, draft.roomType),
      projectId: draft.slug ? `proj-${draft.slug}` : "",
      roomType: draft.roomType,
      featured: false,
      portfolioOrder: index + 1,
      width: size.width,
      height: size.height,
    };
  });

  const projects: PortfolioProject[] = site.portfolio.map((project, index) => {
    const projectImages = images.filter((image) => image.projectId === `proj-${project.slug}`);
    const preferred = coverFile[project.slug];
    const cover =
      projectImages.find((image) => preferred && image.src.endsWith(`/${preferred}`)) ??
      projectImages.find((image) => image.roomType === "living") ??
      projectImages[0];
    if (cover) {
      cover.featured = true;
    }
    return {
      id: `proj-${project.slug}`,
      name: project.title,
      slug: project.slug,
      coverImageId: cover?.id ?? "",
      location: "location" in project ? project.location : undefined,
      description: project.summary,
      featured: true,
      order: index + 1,
    };
  });

  for (const slug of byHouse.keys()) {
    if (knownSlugs.has(slug as (typeof site.portfolio)[number]["slug"])) {
      continue;
    }
    problems.push(
      `public/photos/${slug}/ is a house folder, but ${slug} is not in site.portfolio. Add the project there, or move the photos into a room folder.`,
    );
  }
  if (problems.length > 0) {
    throw new Error(`Portfolio photos:\n${problems.join("\n")}`);
  }

  return { images, projects };
}

function catalog(): Scanned {
  const signature = directorySignature(PHOTOS_DIR);
  if (cached?.signature === signature) {
    return cached.scanned;
  }
  const scanned = scan();
  cached = { signature, scanned };
  return scanned;
}

const imagesById = () => new Map(catalog().images.map((image) => [image.id, image] as const));

const projectsById = () =>
  new Map(catalog().projects.map((project) => [project.id, project] as const));

const projectsBySlug = () =>
  new Map(catalog().projects.map((project) => [project.slug, project] as const));

export function withProjectMeta(image: PortfolioImage): PortfolioImageView {
  const project = projectsById().get(image.projectId);
  return {
    ...image,
    projectName: project?.name ?? "",
    projectSlug: project?.slug ?? "",
  };
}

export function getImageById(id: string) {
  return imagesById().get(id);
}

export function getProjectBySlug(slug: string) {
  return projectsBySlug().get(slug);
}

export function getFeaturedProjects() {
  return catalog()
    .projects.filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectCover(project: PortfolioProject) {
  return imagesById().get(project.coverImageId);
}

export function getProjectImages(projectId: string) {
  return catalog()
    .images.filter((image) => image.projectId === projectId)
    .sort((a, b) => a.portfolioOrder - b.portfolioOrder)
    .map(withProjectMeta);
}

export function getGalleryImages(filter: GalleryFilter = "all") {
  return catalog()
    .images.filter((image) => filter === "all" || image.roomType === filter)
    .sort((a, b) => a.portfolioOrder - b.portfolioOrder)
    .map(withProjectMeta);
}
