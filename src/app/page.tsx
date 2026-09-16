import Link from "next/link";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs tracking-[0.22em] text-gold uppercase">
            Home staging
          </p>
          <h1 className="font-serif text-5xl leading-tight text-balance sm:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={site.primaryCta.href}
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-background hover:bg-gold-strong"
            >
              {site.primaryCta.label}
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-gold"
            >
              View the work
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-panel p-8">
          <p className="font-serif text-3xl leading-snug">
            Staging that helps buyers feel at home before they make an offer.
          </p>
          <p className="mt-4 text-muted">
            Built around one action: request a consultation.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          {site.services.slice(0, 3).map((service) => (
            <article key={service.title} className="rounded-2xl border border-line p-6">
              <h2 className="font-serif text-2xl">{service.title}</h2>
              <p className="mt-3 leading-7 text-muted">{service.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
