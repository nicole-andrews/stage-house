import Link from "next/link";
import { site } from "@/content/site";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-lockup.png"
              alt=""
              width={220}
              height={178}
              className="h-9 w-auto sm:h-10"
            />
            <p className="font-serif text-2xl tracking-[0.03em]">{site.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
            Based in {site.contact.basedIn}, serving {site.contact.serviceArea}.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-muted">
          <a className="transition-colors hover:text-foreground" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          <a className="transition-colors hover:text-foreground" href={site.contact.phoneHref}>
            {site.contact.phone}
          </a>
          <Link href={site.primaryCta.href} className="mt-2 w-fit text-[0.72rem] tracking-[0.16em] uppercase hover:text-taupe-dark">
            {site.primaryCta.label}
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs tracking-[0.08em] text-muted lg:px-10">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
