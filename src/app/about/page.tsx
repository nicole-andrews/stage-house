import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  const { about } = site;

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={about.images.hero.src}
          alt={about.images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-lg bg-white/90 px-7 py-8 sm:px-10 sm:py-12">
            <h1 className="font-serif text-4xl font-normal leading-[1.12] text-balance sm:text-5xl">
              {about.headline}
            </h1>
            <p className="mt-5 font-serif text-2xl font-normal leading-snug text-balance">
              {about.tagline}
            </p>
            <p className="mt-6 text-[1.05rem] leading-[1.9] text-muted">
              {about.body}
            </p>
            <Link href={site.primaryCta.href} className="btn-primary mt-8">
              {site.primaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-3 md:gap-0 lg:px-10 lg:py-28">
          {about.stats.map((stat, index) => (
            <article key={stat.label} className="relative px-4 text-center md:px-8">
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-0 hidden h-14 w-px -translate-y-1/2 bg-line md:block"
                />
              ) : null}
              <p className="font-serif text-5xl font-normal sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-4 text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={about.images.livingDining.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <Image
            src={about.images.overlay.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-7xl items-center px-6 py-24 lg:min-h-[40rem] lg:px-10 lg:py-32">
          <div className="ml-auto w-full max-w-xl">
            <h2 className="font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
              {about.differentiator.headline}
            </h2>
            <p className="mt-7 text-[1.05rem] leading-[1.9] text-muted">
              {about.differentiator.inventory}
            </p>
            <p className="mt-6 text-[1.05rem] leading-[1.9] text-muted">
              {about.differentiator.company}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 lg:gap-20 lg:px-10 lg:py-32">
        <div className="group relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
          <Image
            src={about.images.kitchenDining.src}
            alt={about.images.kitchenDining.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[center_40%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
            {site.contact.serviceArea}
          </p>
          <p className="mt-7 text-[1.05rem] leading-[1.9] text-muted">
            {about.clients}
          </p>
          <Link href="/services" className="btn-outline mt-10">
            Explore services
          </Link>
        </div>
      </section>

      <section className="bg-background-warm">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 sm:grid-cols-2 lg:gap-8 lg:px-10 lg:py-28">
          <div className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src={about.images.greenery.src}
              alt={about.images.greenery.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src={about.images.kitchen.src}
              alt={about.images.kitchen.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          {/* <div className="group relative aspect-[4/5] overflow-hidden sm:col-span-2 sm:aspect-[3/2]">
            <Image
              src={about.images.wine.src}
              alt={about.images.wine.alt}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div> */}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="group relative aspect-[3/2] overflow-hidden">
          <Image
            src={about.images.outdoor.src}
            alt={about.images.outdoor.alt}
            fill
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        </div>
      </section>

      <section className="border-t border-line bg-background-warm">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-28">
          <h2 className="font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
            {about.tagline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.9] text-muted">
            {about.clients}
          </p>
          <Link href={site.primaryCta.href} className="btn-primary mt-10">
            {site.primaryCta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
