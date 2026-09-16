import {
  galleryFilters,
  type GalleryFilter,
} from "@/content/portfolio";

export function PortfolioFilters({
  value,
  onChange,
  available,
}: {
  value: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
  available?: GalleryFilter[];
}) {
  const filters = available
    ? galleryFilters.filter((filter) => available.includes(filter.id))
    : galleryFilters;

  return (
    <div
      role="tablist"
      aria-label="Filter gallery by room"
      className="flex flex-wrap gap-x-7 gap-y-3 border-b border-line"
    >
      {filters.map((filter) => {
        const selected = value === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={selected}
            id={`portfolio-filter-${filter.id}`}
            className={`-mb-px border-b pb-3 text-[0.72rem] tracking-[0.18em] uppercase transition-colors ${
              selected
                ? "border-foreground text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
