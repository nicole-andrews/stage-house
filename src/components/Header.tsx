"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt={`${site.name} logo`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-serif text-xl tracking-wide">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-foreground"
                    : "transition-colors hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={site.primaryCta.href}
          className="hidden rounded-full bg-gold px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-gold-strong md:inline-flex"
        >
          {site.primaryCta.label}
        </Link>

        <button
          type="button"
          className="rounded-full border border-line px-3 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-3 border-t border-line px-5 py-4 text-sm md:hidden"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.primaryCta.href}
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex w-fit rounded-full bg-gold px-4 py-2 font-medium text-background"
          >
            {site.primaryCta.label}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
