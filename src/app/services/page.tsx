import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Testimonials } from "@/components/Testimonials";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  const { servicesPage } = site;
  const { hero } = servicesPage.images;

  return (
    <>
      <section className="relative min-h-[68vh] overflow-hidden sm:min-h-[78vh]">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
        />
        <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-7xl items-center px-6 py-16 sm:min-h-[78vh] lg:px-10 lg:py-24">
          <div className="max-w-lg">
            <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
              {servicesPage.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[1.12] text-balance sm:text-6xl lg:text-[4.25rem]">
              {servicesPage.headline}
            </h1>
            <p className="mt-8 text-[1.05rem] leading-[1.9] text-muted">
              {servicesPage.body}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {servicesPage.offerings.map((offering) => (
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
              <p className="mt-5 text-[1.05rem] leading-[1.9] text-muted">
                {offering.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="relative min-h-[32rem] overflow-hidden lg:min-h-[40rem]">
        <Image
          src={servicesPage.images.approach.src}
          alt={servicesPage.images.approach.alt}
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
        <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-7xl items-center px-6 py-24 lg:min-h-[40rem] lg:px-10 lg:py-32">
          <div className="max-w-lg">
            <h2 className="font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
              {servicesPage.approach.headline}
            </h2>
            <p className="mt-7 text-[1.05rem] leading-[1.9] text-muted">
              {servicesPage.approach.body}
            </p>
            <Link href={site.primaryCta.href} className="btn-primary mt-10">
              {site.primaryCta.label}
            </Link>
            <p className="mt-6 text-[1.05rem] leading-[1.9] text-muted">
              {servicesPage.approach.prompt}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
