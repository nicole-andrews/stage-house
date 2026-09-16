import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Staging support from walkthrough to listing day."
        body="Start with the service that matches the home. Every engagement still points toward a consultation."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-2">
        {site.services.map((service) => (
          <article key={service.title} className="rounded-2xl border border-line p-6">
            <h2 className="font-serif text-2xl">{service.title}</h2>
            <p className="mt-3 leading-7 text-muted">{service.body}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Link
          href={site.primaryCta.href}
          className="inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-background hover:bg-gold-strong"
        >
          {site.primaryCta.label}
        </Link>
      </section>
    </>
  );
}
