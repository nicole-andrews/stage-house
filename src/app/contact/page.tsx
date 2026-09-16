import type { Metadata } from "next";
import { ConsultationForm } from "@/components/ConsultationForm";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a consultation."
        body="Tell us about the property and timeline. We’ll email you back after we review the details."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-muted">
          <p>
            Email:{" "}
            <a className="hover:text-foreground" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </p>
          <p className="mt-2">
            Phone:{" "}
            <a className="hover:text-foreground" href={site.contact.phoneHref}>
              {site.contact.phone}
            </a>
          </p>
          <p className="mt-2">Based in {site.contact.basedIn}</p>
          <p className="mt-2">{site.contact.serviceArea}</p>
        </div>
        <ConsultationForm />
      </section>
    </>
  );
}
