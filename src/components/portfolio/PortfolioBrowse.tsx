"use client";

import { useMemo, useState } from "react";
import { PortfolioFilters } from "@/components/portfolio/PortfolioFilters";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { PortfolioLightbox } from "@/components/portfolio/PortfolioLightbox";
import {
  getGalleryImages,
  type GalleryFilter,
  type PortfolioImageView,
} from "@/content/portfolio";

export function PortfolioBrowse({
  images,
  eyebrow = "Browse all work",
}: {
  images?: PortfolioImageView[];
  eyebrow?: string;
}) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const gallery = useMemo(() => {
    if (images) {
      return filter === "all"
        ? images
        : images.filter((image) => image.roomType === filter);
    }
    return getGalleryImages(filter);
  }, [filter, images]);

  const source = useMemo(
    () => images ?? getGalleryImages("all"),
    [images],
  );

  const roomTypesInSource = useMemo(
    () => [...new Set(source.map((image) => image.roomType))],
    [source],
  );

  const availableFilters = useMemo<GalleryFilter[]>(
    () => ["all", ...roomTypesInSource],
    [roomTypesInSource],
  );

  const hasMultipleRoomTypes = roomTypesInSource.length > 1;

  function select(index: number) {
    setActiveIndex(index);
  }

  function close() {
    setActiveIndex(null);
  }

  function prev() {
    setActiveIndex((current) => {
      if (current === null || gallery.length === 0) {
        return current;
      }
      return (current - 1 + gallery.length) % gallery.length;
    });
  }

  function next() {
    setActiveIndex((current) => {
      if (current === null || gallery.length === 0) {
        return current;
      }
      return (current + 1) % gallery.length;
    });
  }

  return (
    <section className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 lg:px-10 lg:pb-32">
      <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
        {eyebrow}
      </p>
      {hasMultipleRoomTypes ? (
        <div className="mt-10">
          <PortfolioFilters
            value={filter}
            available={availableFilters}
            onChange={(next) => {
              setFilter(next);
              setActiveIndex(null);
            }}
          />
        </div>
      ) : (
        <div className="mt-6 border-b border-line" />
      )}
      <PortfolioGallery images={gallery} onSelect={select} />
      <PortfolioLightbox
        images={gallery}
        index={activeIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
