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
    <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10 lg:pt-28">
      <p className="mb-4 text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
        {eyebrow}
      </p>
      <h1 className="max-w-3xl font-serif text-5xl font-normal leading-[1.12] text-balance sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.9] text-muted">{body}</p>
    </section>
  );
}
