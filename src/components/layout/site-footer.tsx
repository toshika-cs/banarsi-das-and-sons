import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import { revealDelay } from "@/lib/motion";
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
 *
 * RESPONSIVE
 *
 * The row is now a grid rather than a flex line of fixed widths, because a grid
 * can restate the same five columns as a template per breakpoint while the
 * markup stays put. At xl the template is the Figma one literally —
 * 300 / 120 / 120 / 120 / 220 on a 40 gap — which lays the columns out at
 * x = 0 / 340 / 500 / 660 / 820, the exact offsets the design records.
 *
 * lg keeps the same five-across composition on the narrower measure: brand and
 * newsletter hold their widths, the three link columns share what is left. At
 * 1024 that is 113 each, still wider than the longest label ("Shipping &
 * Delivery" sets at about 98).
 *
 * md gives the brand and the newsletter a full-width row each and puts the
 * three link columns across between them — 227 each at 768. Below md it folds
 * to two columns for the links, with the brand and the newsletter still
 * spanning. Five columns of anything useful do not fit in 335, and a single
 * stack would run the footer to roughly three screens.
 *
 * The newsletter spans rather than sharing a row because it is one of the
 * blocks that centres below lg: in a half-width cell beside a left-aligned link
 * column its centring read as an off-centre mistake rather than as centred. On
 * its own row it sits on the same axis as the wordmark, the socials and the
 * legal bar. The cost is that the three link columns no longer divide evenly at
 * base, so About trails with an empty cell beside it.
 *
 * The 179 row height is the Figma measurement of the tallest column plus 10 and
 * only describes the one-line layout, so it applies at xl alone; everywhere
 * else the content sets the height.
 *
 * Below lg the wordmark, the social row, the newsletter block and the legal bar
 * all centre; the three link columns stay left-aligned, since a column of links
 * reads down a common left edge. lg is the cut because that is where the
 * five-across desktop composition starts — centring a 300 and a 220 column
 * inside that row would pull them away from the columns they sit beside.
 *
 * The legal bar splits below lg. Side by side it needs the copyright's 216 plus
 * the links' 181 plus a gap, which is more than a phone has, and both halves
 * are `whitespace-nowrap` — they would not have wrapped, they would have
 * overflowed. Stacked, the links also wrap rather than holding one line.
 */
const SOCIAL_ICONS = [
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  YouTubeIcon,
] as const;

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1280px] px-5 pt-[40px] lg:px-[40px]">
      {/* 699:3259 is 1200 x 179 — 10 taller than its tallest column, so the
          height is set rather than left to the content. */}
      <div className="grid w-full max-w-[1200px] grid-cols-2 gap-x-[40px] gap-y-[34px] md:grid-cols-3 md:gap-x-[24px] lg:h-[179px] lg:grid-cols-[300px_repeat(3,minmax(0,1fr))_220px] lg:gap-y-0 xl:grid-cols-[300px_120px_120px_120px_220px] xl:gap-x-[40px]">
        <div
          data-reveal="up"
          style={revealDelay(0)}
          className="col-span-2 md:col-span-3 lg:col-span-1"
        >
          {/* 699:3261 — wordmark, 174.78 x 26 */}
          <Image
            src="/images/footer-wordmark.svg"
            alt={site.name}
            width={174.78}
            height={26}
            unoptimized
            className="mx-auto lg:mx-0"
            style={{ width: 174.78, height: 26 }}
          />

          <ul className="mt-[34px] flex justify-center gap-[14px] lg:justify-start">
            {socialLinks.map((social, i) => {
              const Icon = SOCIAL_ICONS[i]!;
              return (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="group flex size-[22px] items-center justify-center rounded-[4px] border border-sand-500 transition-colors duration-[400ms] hover:border-gold-500"
                  >
                    {/*
                    Figma gives each glyph a 12x12 frame; the artwork inside is
                    smaller and varies per network, so the box and the leaf are
                    sized separately rather than stretching one to the other.
                  */}
                    <span className="flex size-[12px] items-center justify-center text-ink-320 transition-colors duration-[400ms] group-hover:text-gold-600">
                      <Icon />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <FooterColumn heading="Shop" links={footerNav.shop} order={1} />
        <FooterColumn
          heading="Customer Care"
          links={footerNav.customerCare}
          order={2}
        />
        <FooterColumn heading="About" links={footerNav.about} order={3} />

        <div
          data-reveal="up"
          style={revealDelay(4)}
          className="col-span-2 md:col-span-3 lg:col-span-1"
        >
          <h2
            className={cn(
              "text-center text-[10px] leading-[14px] tracking-[1.7px] uppercase lg:text-left",
              unverified.footerHeadingColor,
            )}
          >
            Stay Connected
          </h2>

          <p
            className={cn(
              "mt-[13px] text-center text-[11px] leading-[20.9px] lg:text-left",
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
              "mx-auto mt-[13px] flex h-[37.1px] w-full max-w-[220px] border bg-white pt-[1.1px] lg:mx-0",
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
      <div className="mt-[34px] flex flex-col items-center gap-[14px] border-t border-sand-200 pt-[18px] pb-[26px] lg:flex-row lg:items-start lg:justify-between lg:gap-0">
        <p className="text-[10.5px] leading-[15px] whitespace-nowrap text-ink-100">
          © 2024 {site.name}. All rights reserved.
        </p>

        <ul className="flex flex-wrap justify-center gap-x-[20px] gap-y-[8px] lg:justify-start lg:gap-x-[34px]">
          {footerNav.legal.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-[10.5px] leading-[15px] whitespace-nowrap text-ink-100 transition-colors duration-[400ms] hover:text-gold-500"
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
  order,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
  /** Position in the footer's stagger sequence. */
  order: number;
}) {
  // Width and placement come from the grid template on the row.
  return (
    <div data-reveal="up" style={revealDelay(order)}>
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
                "block text-[11px] leading-[16px] transition-colors duration-[400ms] hover:text-gold-500",
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
