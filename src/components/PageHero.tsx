export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-10">
      <p className="mb-3 text-xs tracking-[0.22em] text-gold uppercase">{eyebrow}</p>
      <h1 className="max-w-3xl font-serif text-5xl leading-tight text-balance sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{body}</p>
    </section>
  );
}
