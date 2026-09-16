import Image from "next/image";
import {
  roomTypeLabels,
  type PortfolioImageView,
} from "@/content/portfolio";

export function PortfolioGallery({
  images,
  onSelect,
}: {
  images: PortfolioImageView[];
  onSelect: (index: number) => void;
}) {
  if (images.length === 0) {
    return (
      <p className="mt-12 text-[1.05rem] leading-[1.9] text-muted">
        No photographs in this room yet.
      </p>
    );
  }

  return (
    <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
      {images.map((image, index) => (
        <figure key={image.id} className="mb-5 break-inside-avoid lg:mb-6">
          <button
            type="button"
            className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
            onClick={() => onSelect(index)}
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.015] group-hover:opacity-95"
            />
          </button>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[0.65rem] tracking-[0.16em] text-taupe-dark uppercase">
            <span>{image.projectName}</span>
            <span>{roomTypeLabels[image.roomType]}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
