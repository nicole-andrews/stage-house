import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function HomePage() {
  const { home } = site;

  return (
    <>
      <section className="relative h-[68vh] min-h-[420px] w-full overflow-hidden sm:h-[78vh]">
        <Image
          src={home.images.hero.src}
          alt={home.images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-32">
        <div className="lg:col-span-5">
          <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
            {home.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-5xl font-normal leading-[1.12] text-balance sm:text-6xl lg:text-[4.25rem]">
            {home.headline}
          </h1>
          <p className="mt-8 max-w-md text-[1.05rem] leading-[1.9] text-muted">
            {home.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={site.primaryCta.href} className="btn-primary">
              {site.primaryCta.label}
            </Link>
            <Link href="/portfolio" className="btn-outline">
              View the work
            </Link>
          </div>
        </div>
        <div className="group relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-[3/4]">
          <Image
            src={home.images.living.src}
            alt={home.images.living.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </section>

      <section className="bg-background-warm">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="group relative aspect-[3/2] overflow-hidden">
            <Image
              src={home.images.artwork.src}
              alt={home.images.artwork.alt}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 lg:gap-20 lg:px-10 lg:py-32">
        <div className="group relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
          <Image
            src={home.images.dining.src}
            alt={home.images.dining.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[center_40%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
            Santa Clara · Bay Area
          </p>
          <h2 className="mt-5 font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
            Polished rooms, ready for buyers.
          </h2>
          <p className="mt-7 text-[1.05rem] leading-[1.9] text-muted">
            Based in {site.contact.basedIn}, we stage homes across{" "}
            {site.contact.serviceArea} so each listing feels inviting, considered,
            and ready to sell.
          </p>
          <Link href="/services" className="btn-outline mt-10">
            Explore services
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-3 lg:gap-20 lg:px-10 lg:py-28">
          {site.services.slice(0, 3).map((service) => (
            <article key={service.title}>
              <h2 className="font-serif text-3xl font-normal">{service.title}</h2>
              <p className="mt-5 leading-[1.85] text-muted">{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background-warm">
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
