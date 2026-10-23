import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_US, placedPhoto } from "@/content/page-photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  const { about } = site;
  const images = {
    hero: placedPhoto(ABOUT_US.hero_photo),
    differentiator: placedPhoto(ABOUT_US.differentiator_photo),
    greenery: placedPhoto(ABOUT_US.greenery_photo),
    kitchen: placedPhoto(ABOUT_US.kitchen_photo),
    closing: placedPhoto(ABOUT_US.closing_photo),
  };

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
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

      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={images.differentiator.src}
          alt={images.differentiator.alt}
          fill
          sizes="100vw"
          className="object-cover object-[30%_center]"
        />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-16 lg:px-10 lg:py-24">
          <div className="ml-auto w-full max-w-lg bg-white/90 px-7 py-8 sm:px-10 sm:py-12">
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

      <section className="bg-background-warm">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 sm:grid-cols-2 lg:gap-8 lg:px-10 lg:py-28">
          <div className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src={images.greenery.src}
              alt={images.greenery.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src={images.kitchen.src}
              alt={images.kitchen.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>
      {/* <section className="relative min-h-[32rem] overflow-hidden lg:min-h-[40rem]">
        <Image
          src={images.closing.src}
          alt={images.closing.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-7xl items-center justify-center px-6 py-24 lg:min-h-[40rem] lg:px-10 lg:py-32">
          <div className="w-full max-w-4xl bg-white/90 px-7 py-8 text-center sm:px-10 sm:py-12">
            <h2 className="font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
              {about.tagline}
            </h2>
            <p className="mt-6 text-[1.05rem] leading-[1.9] text-muted">
              {about.clients}
            </p>
            <Link href={site.primaryCta.href} className="btn-primary mt-8">
              {site.primaryCta.label}
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
}
