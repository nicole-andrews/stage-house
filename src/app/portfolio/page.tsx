import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that lets the rooms speak."
        body="These are layout placeholders. Add photos to /public and project entries in src/content/site.ts."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-3">
        {site.portfolio.map((project) => (
          <article key={project.slug} className="overflow-hidden rounded-2xl border border-line">
            <div className="aspect-[4/3] bg-panel" />
            <div className="p-5">
              <p className="text-xs tracking-[0.18em] text-gold uppercase">
                {project.location}
              </p>
              <h2 className="mt-2 font-serif text-2xl">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
