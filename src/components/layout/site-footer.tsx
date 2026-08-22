import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import { socialLinks } from "@/lib/home-content";
import { footerNav, site } from "@/lib/site";
import { unverified } from "@/lib/unverified";
import { cn } from "@/lib/utils";

/**
 * Figma 699:3258 — 1280 x 313 on the page ground (#fcfaf3, sampled from the
 * full-page render and calibrated against the known #e9e0d2 CTA band).
 *
 * Geometry from layer metadata: a 1200 row inset 40, five columns at
 * x = 0 / 340 / 500 / 660 / 820, then a ruled legal bar at y = 253.
 *
 * The legal bar (699:3362) was retrieved in full and is exact. Column
 * typography and colours are inferred — see `unverified`.
 *
 * The wordmark (699:3262) and the four social glyphs (699:3297 / 3300 / 3303 /
 * 3306) were supplied manually and are now wired; no assets are outstanding
 * here. The glyph fill (#5c6570) came from the artwork, so it is measured
 * rather than inferred.
 */
const SOCIAL_ICONS = [
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  YouTubeIcon,
] as const;

export function SiteFooter() {
  return (
    <footer className="px-[40px] pt-[40px]">
      {/* 699:3259 is 1200 x 179 — 10 taller than its tallest column, so the
          height is set rather than left to the content. */}
      <div className="flex h-[179px] w-[1200px]">
        <div className="w-[300px]">
          {/* 699:3261 — wordmark, 174.78 x 26 */}
          <Image
            src="/images/footer-wordmark.svg"
            alt={site.name}
            width={174.78}
            height={26}
            unoptimized
            style={{ width: 174.78, height: 26 }}
          />

          <ul className="mt-[34px] flex gap-[14px]">
            {socialLinks.map((social, i) => {
              const Icon = SOCIAL_ICONS[i]!;
              return (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-[22px] items-center justify-center rounded-[4px] border border-sand-500 transition-colors hover:border-gold-500"
                  >
                    {/*
                    Figma gives each glyph a 12x12 frame; the artwork inside is
                    smaller and varies per network, so the box and the leaf are
                    sized separately rather than stretching one to the other.
                  */}
                    <span className="flex size-[12px] items-center justify-center text-ink-320">
                      <Icon />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <FooterColumn
          heading="Shop"
          links={footerNav.shop}
          className="ml-[40px] w-[120px]"
        />
        <FooterColumn
          heading="Customer Care"
          links={footerNav.customerCare}
          className="ml-[40px] w-[120px]"
        />
        <FooterColumn
          heading="About"
          links={footerNav.about}
          className="ml-[40px] w-[120px]"
        />

        <div className="ml-[40px] w-[220px]">
          <h2
            className={cn(
              "text-[10px] leading-[14px] tracking-[1.7px] uppercase",
              unverified.footerHeadingColor,
            )}
          >
            Stay Connected
          </h2>

          <p
            className={cn(
              "mt-[13px] text-[11px] leading-[20.9px]",
              unverified.footerBodyColor,
            )}
          >
            Subscribe to our newsletter for updates and exclusives.
          </p>

          {/*
            699:3356 — 220 x 37.1: a 189 field plus a 29 submit button.
            Figma seats both at y=2.1 with height 34, i.e. the 1px border
            plus a 1.1 inset, sitting flush to the bottom of the box.
          */}
          <form
            className={cn(
              "mt-[13px] flex h-[37.1px] w-[220px] border bg-white pt-[1.1px]",
              unverified.newsletterBorderColor,
            )}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className={cn(
                "h-[34px] min-w-px flex-1 bg-transparent px-[10px] text-[11px] outline-none",
                unverified.footerBodyColor,
              )}
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="h-[34px] w-[29px] shrink-0 text-[11px] leading-none text-gold-600"
            >
              <span aria-hidden="true">⟫</span>
            </button>
          </form>
        </div>
      </div>

      {/* 699:3362 — retrieved in full; these values are exact. */}
      <div className="mt-[34px] flex items-start justify-between border-t border-sand-200 pt-[18px] pb-[26px]">
        <p className="text-[10.5px] leading-[15px] whitespace-nowrap text-ink-100">
          © 2024 {site.name}. All rights reserved.
        </p>

        <ul className="flex gap-[34px]">
          {footerNav.legal.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-[10.5px] leading-[15px] whitespace-nowrap text-ink-100 transition-colors hover:text-gold-500"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
  className,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2
        className={cn(
          "text-[10px] leading-[14px] tracking-[1.7px] uppercase",
          unverified.footerHeadingColor,
        )}
      >
        {heading}
      </h2>

      {/*
        Figma 699:3311 and siblings: links open 9 below the heading on a 9 gap,
        and the first carries 5 of extra lead-in (its frame is 21 tall against
        16 for the rest). `block` is needed so the link's own line-height drives
        the row height instead of the list item's inherited strut.
      */}
      <ul className="mt-[9px] flex flex-col gap-[9px]">
        {links.map((link, i) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "block text-[11px] leading-[16px] transition-colors hover:text-gold-500",
                i === 0 && "pt-[5px]",
                unverified.footerLinkColor,
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
