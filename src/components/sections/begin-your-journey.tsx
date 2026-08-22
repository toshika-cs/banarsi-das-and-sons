import Link from "next/link";

import {
  CustomerCareIcon,
  SecurePaymentsIcon,
  WorldwideShippingIcon,
} from "@/components/ui/icons";
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
 */
export function BeginYourJourney() {
  return (
    <section className="bg-sand-300 px-[50px] py-[44px]">
      <div className="mx-auto grid h-[128px] w-full max-w-[1180px] grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)] px-[40px]">
        <div className="flex flex-col items-start gap-[10px] self-center">
          <h2 className="w-full font-display text-[32px] leading-[normal] font-light text-ink-600">
            Begin Your Journey
          </h2>

          <p className="w-full pb-[12px] text-[12px] leading-[normal] text-ink-300">
            Explore our complete collection of handcrafted Chikankari.
          </p>

          <Link
            href="/collections"
            className="bg-ink-900 px-[22px] py-[12px] text-[10.5px] tracking-[1.68px] text-white uppercase transition-colors hover:bg-ink-800"
          >
            Shop Collections
          </Link>
        </div>

        <ul className="flex h-[102.78px] items-start justify-center self-center">
          {trustBadges.map((badge, i) => {
            const Icon = BADGE_ICONS[i]!;
            return (
              <li
                key={badge.title}
                className="flex h-full min-w-px flex-1 flex-col items-start gap-[7.4px] border-l border-sand-400 px-[26px]"
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
