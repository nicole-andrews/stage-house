import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { PortfolioBrowse } from "@/components/portfolio/PortfolioBrowse";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHeader />
      <FeaturedProjects />
      <PortfolioBrowse />
      <section className="border-t border-line bg-background-warm">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-28">
          <h2 className="font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
            Let’s prepare the home to be seen.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.9] text-muted">
            Request a consultation to talk through the property, timeline, and
            the rooms that need the most care.
          </p>
          <Link href={site.primaryCta.href} className="btn-primary mt-10">
            {site.primaryCta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
