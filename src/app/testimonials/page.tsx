import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What clients notice after the rooms are finished."
        body="Swap these quotes for real agent and homeowner feedback."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-2">
        {site.testimonials.map((item) => (
          <blockquote key={item.quote} className="rounded-2xl border border-line bg-panel p-6">
            <p className="font-serif text-2xl leading-snug">“{item.quote}”</p>
            <footer className="mt-4 text-sm text-muted">
              {item.name} · {item.role}
            </footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
