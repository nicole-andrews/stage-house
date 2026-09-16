import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortfolioBrowse } from "@/components/portfolio/PortfolioBrowse";
import {
  getProjectBySlug,
  getProjectCover,
  getProjectImages,
  portfolioProjects,
} from "@/content/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Portfolio" };
  }
  return { title: project.name };
}

export default async function PortfolioProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cover = getProjectCover(project);
  const images = getProjectImages(project.id);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10 lg:pt-28">
        <p className="mb-4 text-[0.7rem] tracking-[0.28em] text-taupe-dark uppercase">
          <Link href="/portfolio" className="transition-colors hover:text-foreground">
            Portfolio
          </Link>
          {project.location ? ` · ${project.location}` : ""}
        </p>
        <h1 className="max-w-3xl font-serif text-5xl font-normal leading-[1.12] text-balance sm:text-6xl">
          {project.name}
        </h1>
        {project.description ? (
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.9] text-muted">
            {project.description}
          </p>
        ) : null}
      </section>

      {cover ? (
        <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </section>
      ) : null}

      <PortfolioBrowse images={images} eyebrow="In this project" />
    </>
  );
}
