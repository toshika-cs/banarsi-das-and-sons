import Link from "next/link";

import {
  CustomerCareIcon,
  SecurePaymentsIcon,
  WorldwideShippingIcon,
} from "@/components/ui/icons";
import { revealDelay } from "@/lib/motion";
import { trustBadges } from "@/lib/home-content";

const BADGE_ICONS = [
  WorldwideShippingIcon,
  SecurePaymentsIcon,
  CustomerCareIcon,
] as const;

/**
 * Figma 699:3224 — full-bleed #e9e0d2 band, 1280 x 216.
 *
 * This block was retrieved in full before the Figma call limit, so every value
 * here is exact: 50/44 padding, a 1180 inner row split 1.2fr / 1.6fr, and three
 * trust cells each opening with a left rule and 26px inset.
 *
 * RESPONSIVE
 *
 * The band stays full-bleed; only its inset narrows, from 50 + 40 of desktop
 * padding to a single 20 gutter below lg — 90 a side would eat two thirds of a
 * 375 screen.
 *
 * The 1.2fr / 1.6fr split holds from lg up and stacks below it: at md the copy
 * column would be 267 and each trust cell 118 inside a 26 inset, i.e. 66 of
 * usable width for an 11px line. Stacked, the copy block sits above a trust row
 * that keeps all three cells side by side from sm up — 222 of usable width at
 * 768 — and goes to one cell per row below sm, where three abreast would leave
 * 96 each on a 375 screen.
 *
 * The two fixed heights — 128 on the row, 102.78 on the trust list — are
 * Figma's one-line measurements and only hold while the layout is the desktop
 * one, so they apply from lg. Below that the content sets the height, otherwise
 * a stacked block would be clipped.
 *
 * Each cell keeps its left rule at every width. Stacked, three rules down the
 * left edge read as the same bracketed list the row does, so the band needs no
 * new device to hold together.
 */
export function BeginYourJourney() {
  return (
    <section className="bg-sand-300 px-5 py-[34px] lg:px-[50px] lg:py-[44px]">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-y-[30px] lg:h-[128px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)] lg:gap-y-0 lg:px-[40px]">
        <div
          data-reveal="up"
          className="flex flex-col items-start gap-[10px] lg:self-center"
        >
          <h2 className="w-full font-display text-[32px] leading-[normal] font-light text-ink-600">
            Begin Your Journey
          </h2>

          <p className="w-full pb-[12px] text-[12px] leading-[normal] text-ink-300">
            Explore our complete collection of handcrafted Chikankari.
          </p>

          <Link
            href="/collections"
            className="bg-ink-900 px-[22px] py-[12px] text-[10.5px] tracking-[1.68px] text-white uppercase transition-[background-color,translate] duration-[400ms] ease-out hover:-translate-y-px hover:bg-ink-800"
          >
            Shop Collections
          </Link>
        </div>

        <ul className="grid gap-y-[24px] sm:grid-cols-3 sm:gap-y-0 lg:flex lg:h-[102.78px] lg:items-start lg:justify-center lg:self-center">
          {trustBadges.map((badge, i) => {
            const Icon = BADGE_ICONS[i]!;
            return (
              <li
                key={badge.title}
                data-reveal="up"
                style={revealDelay(i)}
                className="flex min-w-px flex-col items-start gap-[7.4px] border-l border-sand-400 pl-[16px] sm:pl-[20px] lg:h-full lg:flex-1 lg:px-[26px]"
              >
                <span className="block size-[26px] text-gold-600">
                  <Icon />
                </span>

                <h3 className="w-full pt-[4.6px] text-[10px] tracking-[1.8px] text-gold-600 uppercase">
                  {badge.title}
                </h3>

                <p className="w-full text-[11px] leading-[20.9px] text-ink-200">
                  {badge.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
