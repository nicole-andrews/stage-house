import { site } from "@/content/site";

export function Testimonials({
  eyebrow = "Testimonials",
}: {
  eyebrow?: string;
}) {
  return (
    <section className="bg-background-warm">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="text-center text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
          {eyebrow}
        </p>
        <div className="mt-14 grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-16">
          {site.testimonials.map((item, index) => (
            <blockquote key={item.name} className="relative flex h-full flex-col">
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute top-0 left-0 hidden h-full w-px -translate-x-5 bg-line md:block lg:-translate-x-8"
                />
              ) : null}
              <p className="font-serif text-2xl font-normal leading-snug text-balance">
                “{item.quote}”
              </p>
              <footer className="mt-8 md:mt-auto md:pt-8">
                <cite className="not-italic">
                  <span className="block font-serif text-xl">{item.name}</span>
                  <span className="mt-2 block text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
                    {item.role}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
