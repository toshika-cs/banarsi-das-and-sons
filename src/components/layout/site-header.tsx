import Image from "next/image";
import Link from "next/link";

import { AccountIcon, BagIcon, SearchIcon } from "@/components/ui/icons";
import { mainNav, site } from "@/lib/site";

/**
 * Figma node 699:2987 — 1280 x 57 nav.
 *
 * Three-column justify-between row: 52x36 logo, link list, icon cluster. The
 * link list sits at x=320.5 in the design, which is exactly where
 * justify-between places it between the logo and the icons, so no explicit
 * offset is needed.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-sand-200 bg-sand-25">
      <div className="site-container flex items-center justify-between py-2.5">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={52}
            height={36}
            priority
            className="h-9 w-[52px] object-cover"
          />
        </Link>

        <nav aria-label="Main">
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

        <div className="flex items-center gap-[22px] text-ink-800 opacity-80">
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
      className="flex size-[17px] items-center justify-center transition-colors duration-[400ms] hover:text-gold-500"
    >
      {children}
    </button>
  );
}
