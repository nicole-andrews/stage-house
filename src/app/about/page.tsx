import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`Staging with a quiet, considered eye.`}
        body={`${site.name} helps listings feel finished — not decorated for the camera, but ready for real life. Replace this copy with the founder story, service area, and point of view.`}
      />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 md:grid-cols-2">
        <article className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-serif text-2xl">The approach</h2>
          <p className="mt-3 leading-7 text-muted">
            Edit first. Then add only what earns its place: scale, texture, and a
            clear path through the home.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-serif text-2xl">Who we work with</h2>
          <p className="mt-3 leading-7 text-muted">
            Homeowners, listing agents, and anyone preparing a property to go on
            the market.
          </p>
        </article>
      </section>
    </>
  );
}
