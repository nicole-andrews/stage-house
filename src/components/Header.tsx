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
    <header className="sticky top-0 z-20 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-lockup.png"
            alt=""
            width={220}
            height={178}
            className="h-12 w-auto sm:h-14"
            priority
          />
          <span className="font-serif text-[1.15rem] leading-tight tracking-[0.03em] text-foreground sm:text-[1.35rem]">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-[0.72rem] tracking-[0.18em] text-muted uppercase md:flex">
          {site.headerNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-foreground"
                    : "transition-colors duration-200 hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href={site.primaryCta.href} className="btn-primary hidden md:inline-flex">
          {site.primaryCta.label}
        </Link>

        <button
          type="button"
          className="border border-foreground/20 px-3 py-2 text-[0.7rem] tracking-[0.16em] uppercase md:hidden"
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
          className="flex flex-col gap-5 border-t border-line px-6 py-8 text-[0.8rem] tracking-[0.16em] text-muted uppercase md:hidden"
        >
          {site.headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.primaryCta.href}
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-fit"
          >
            {site.primaryCta.label}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
