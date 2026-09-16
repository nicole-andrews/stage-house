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
        body="Tell us about the property and timeline. This form currently stores nothing — it is a working front-end ready for email or CRM."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-muted">
          <p>Email: {site.contact.email}</p>
          <p className="mt-2">{site.contact.serviceArea}</p>
        </div>
        <ConsultationForm />
      </section>
    </>
  );
}
