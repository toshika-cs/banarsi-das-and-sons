import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

/**
 * Figma node 699:3370 — 1280 x 600 full-bleed image.
 *
 * Copy block (699:3372) is 337 wide at x=150, vertically centred, laid out as a
 * 9px-gap column: eyebrow 20, heading 80.8, subtitle wrapper 58 (5 top / 31
 * bottom), link 16.
 *
 * The image fill is w-[101%] left-[-0.5%] in the design, which is what
 * object-cover centred produces for a 1504x698 source in a 1280x600 box.
 */
export function Hero() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Model wearing a white Chikankari kurta in a colonnaded courtyard"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="site-container relative flex h-full flex-col justify-center">
        {/* x=150 from the canvas edge, i.e. 116px past the 34px container gutter. */}
        <div className="ml-[116px] flex w-[337px] flex-col items-start gap-[9px]">
          <p className="text-[14px] leading-[20px] tracking-[3.92px] text-ink-400">
            THE ART OF
          </p>

          <h1 className="pb-[0.8px] font-display text-[76px] leading-[79.8px] font-light text-ink-800">
            Chikankari
          </h1>

          <p className="pt-[5px] pb-[31px] text-[15px] leading-[22px] tracking-[0.3px] text-ink-410">
            {site.tagline}
          </p>

          <Link
            href="/our-story"
            className="text-[11px] leading-[16px] tracking-[2.42px] whitespace-pre text-gold-700 transition-colors hover:text-gold-500"
          >
            {"DISCOVER THE STORY  ⟶"}
          </Link>
        </div>
      </div>
    </section>
  );
}
