import Link from "next/link";
import { site } from "@/content/site";

export default function ConsultationEncourageSection() {
  return (
    <>
      <section className="border-t border-line bg-background-warm">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-28">
          <h2 className="font-serif text-4xl font-normal leading-snug text-balance sm:text-5xl">
            Let's Stage Your Next Listing.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.9] text-muted">
            We'd love to learn more about your property and how we can help.
          </p>
          <Link href={site.primaryCta.href} className="btn-primary mt-10">
            {site.primaryCta.label}
          </Link>
        </div>
      </section>
    </>
  );
}