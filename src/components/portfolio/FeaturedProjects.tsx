import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedProjects,
  getProjectCover,
  type PortfolioProject,
} from "@/content/portfolio";

function FeaturedCaption({ project }: { project: PortfolioProject }) {
  return (
    <div>
      {project.location ? (
        <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
          {project.location}
        </p>
      ) : null}
      <h3 className="mt-3 font-serif text-3xl font-normal leading-snug text-balance lg:text-4xl">
        {project.name}
      </h3>
      {project.description ? (
        <p className="mt-4 max-w-md text-[1.05rem] leading-[1.9] text-muted">
          {project.description}
        </p>
      ) : null}
      <p className="mt-6 text-[0.72rem] tracking-[0.16em] text-foreground uppercase">
        View project
      </p>
    </div>
  );
}

export function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 4);
  const [lead, ...rest] = projects;

  if (!lead) {
    return null;
  }

  const leadCover = getProjectCover(lead);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
      <p className="text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
        Featured projects
      </p>

      {leadCover ? (
        <Link
          href={`/portfolio/${lead.slug}`}
          className="group mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-16"
        >
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-[3/4]">
            <Image
              src={leadCover.src}
              alt={leadCover.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div className="lg:col-span-5 lg:pb-6">
            <FeaturedCaption project={lead} />
          </div>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-24 lg:gap-16">
          {rest.map((project) => {
            const cover = getProjectCover(project);
            if (!cover) {
              return null;
            }

            return (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-7">
                  <FeaturedCaption project={project} />
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
