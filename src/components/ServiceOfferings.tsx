import Image from "next/image";
import { site } from "@/content/site";

export function ServiceOfferings({ showBody = true }: { showBody?: boolean }) {
  return (
    <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
      {site.servicesPage.offerings.map((offering) => (
        <article key={offering.title}>
          <div className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src={offering.image.src}
              alt={offering.image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <p className="mt-8 text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
            {offering.eyebrow}
          </p>
          <h2 className="mt-4 scroll-mt-28 font-serif text-3xl font-normal leading-snug text-balance lg:text-4xl">
            {offering.title}
          </h2>
          {showBody ? (
            <p className="mt-5 text-[1.05rem] leading-[1.9] text-muted">
              {offering.body}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
