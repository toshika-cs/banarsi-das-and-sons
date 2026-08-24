"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { AccountIcon, BagIcon, SearchIcon } from "@/components/ui/icons";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Figma node 699:2987 — 1280 x 57 nav.
 *
 * At lg and above this is the design untouched: a justify-between row of 52x36
 * logo, link list and icon cluster, inside a 1280 measure with 34 gutters. The
 * link list lands at x=320.5 exactly where justify-between puts it.
 *
 * Below lg the row cannot hold: logo 52 + links 596 + icons 95 = 743, plus 68
 * of gutter, needs 811px. So from 1024 down the links collapse into a
 * disclosure panel, the menu button takes the left slot and the logo centres
 * between it and the icons. Typography, colours and icon sizes are unchanged at
 * every width — only the arrangement differs.
 *
 * The menu button keeps a full 44x44 tap target but carries -my-1 so it
 * contributes only 36px of row height — the same as the logo — which holds the
 * header at exactly 57px tall at every width. -ml-3 offsets the button so its
 * 20px glyph, not its 44px box, lines up with the 20px gutter, matching the
 * icon cluster on the right and the panel links below.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Resizing up to the desktop layout reveals the full nav; drop the panel.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="relative border-b border-sand-200 bg-sand-25">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-2.5 lg:px-[34px]">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="-my-1 -ml-3 flex size-11 shrink-0 items-center justify-center text-ink-750 transition-colors duration-[400ms] hover:text-gold-300 lg:hidden"
        >
          <MenuGlyph open={menuOpen} />
        </button>

        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="shrink-0 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
        >
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={52}
            height={36}
            priority
            className="h-9 w-[52px] object-cover"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-[30px]">
            {mainNav.map((item) => (
              <li key={item.href}>
                {/*
                  -mr cancels the trailing letter-spacing CSS adds after the
                  last glyph, which Figma's text measurements exclude.

                  The muted gold on JOURNAL in the design is the hover state,
                  not a per-item style, so every item shares one treatment.
                */}
                <Link
                  href={item.href}
                  className="-mr-[1.43px] text-[11px] tracking-[1.43px] whitespace-nowrap text-ink-750 uppercase transition-colors duration-[400ms] hover:text-gold-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-[22px] text-ink-800 opacity-80">
          <IconButton label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton label="Account">
            <AccountIcon />
          </IconButton>
          <IconButton label="Bag">
            <BagIcon />
          </IconButton>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full z-50 border-b border-sand-200 bg-sand-25 shadow-sm lg:hidden"
      >
        <nav aria-label="Main" className="mx-auto w-full max-w-[1280px] px-5">
          <ul className="flex flex-col py-1">
            {mainNav.map((item) => (
              <li
                key={item.href}
                className="border-b border-sand-200/70 last:border-b-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center text-[11px] tracking-[1.43px] text-ink-750 uppercase transition-colors duration-[400ms] hover:text-gold-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      // `tap-expand` widens the hit area to 39x39 below lg via an absolutely
      // positioned pseudo-element, so the 17px glyph, its spacing and the Figma
      // geometry are all untouched.
      className="tap-expand flex size-[17px] items-center justify-center transition-colors duration-[400ms] hover:text-gold-500"
    >
      {children}
    </button>
  );
}

/** Two rules that cross into an X — matches the header's thin-line language. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-5">
      <span
        className={cn(
          "absolute left-0 block h-px w-full bg-current transition-transform duration-300",
          open ? "top-1/2 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-px w-full bg-current transition-transform duration-300",
          open ? "top-1/2 -rotate-45" : "top-full",
        )}
      />
    </span>
  );
}
