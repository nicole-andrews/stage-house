"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const isContact= pathname === "/contact";

  return (
    <header
      className={
        isHome
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-20 border-b border-line/50 backdrop-blur-md"
      }
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-6 py-2.5 md:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 justify-self-start"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-lockup.png"
            alt=""
            width={220}
            height={178}
            className="h-9 w-auto sm:h-10"
            priority
          />
          <span className="font-serif text-base leading-tight tracking-[0.03em] text-foreground sm:text-lg">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 justify-self-center text-[0.68rem] tracking-[0.18em] text-muted uppercase md:flex">
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
        <div className="flex items-center justify-end justify-self-end">
          {!isHome && !isContact && (
            <Link
              href={site.primaryCta.href}
              className="btn-primary hidden !px-4 !py-2 md:inline-flex"
            >
              {site.primaryCta.label}
            </Link>
          )}
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
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-5 border-t border-line bg-[#faf7f2] px-6 py-8 text-[0.8rem] tracking-[0.16em] text-muted uppercase md:hidden"
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
          {!isHome && !isContact && (
            <Link
              href={site.primaryCta.href}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-fit"
            >
              {site.primaryCta.label}
            </Link>
          )}
        </nav>
      ) : null}
    </header>
  );
}
