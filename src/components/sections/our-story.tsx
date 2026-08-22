import Image from "next/image";
import Link from "next/link";

import { ourStory } from "@/lib/home-content";
import { unverified } from "@/lib/unverified";
import { cn } from "@/lib/utils";

/**
 * Figma 699:3212 — 1132 wide, two 496 columns with a 60 gutter inside a 40
 * inset, on the page ground.
 *
 * Geometry from layer metadata: text column starts 84.655 down, image column
 * 60 down, 70 of bottom padding. Every text node in the left column is centred.
 *
 * Type sizes were tuned so rendered widths match the widths Figma records:
 * eyebrow 70, heading 235, CTA 189. Colours are inferred — see `unverified`.
 *
 * The "Since 1957" photograph (699:3223) was extracted from the node's exported
 * SVG. Its source is 992x551 — exactly 2x the 496x275.59 box, and the same
 * aspect, so it needs no crop and is retina-sharp.
 */
export function OurStory() {
  return (
    <section className="content-container flex gap-[60px] px-[40px] pb-[70px]">
      <div className="mt-[84.655px] flex w-[496px] flex-col items-center">
        <p
          className={cn(
            "text-center text-[10px] leading-[14px] tracking-[2.2px] uppercase",
            unverified.ourStoryEyebrowColor,
          )}
        >
          {ourStory.eyebrow}
        </p>

        <h2
          className={cn(
            "mt-[10px] text-center font-display text-[34px] leading-[41px] font-light",
            unverified.ourStoryTitleColor,
          )}
        >
          {ourStory.title}
        </h2>

        <p
          className={cn(
            // 19.28 = the 10 gap after the heading plus the 9.28 inset the text
            // carries inside its container in Figma (699:3218 -> 699:3219).
            "mt-[19.28px] w-[327px] text-center text-[11px] leading-[25.25px]",
            unverified.ourStoryBodyColor,
          )}
        >
          {ourStory.body}
        </p>

        <Link
          href={ourStory.href}
          className={cn(
            "mt-[24px] text-center text-[10.5px] leading-[15px] tracking-[2.31px] whitespace-pre uppercase transition-colors",
            unverified.ourStoryCtaColor,
          )}
        >
          {ourStory.cta}
        </Link>
      </div>

      <div className="relative mt-[60px] h-[275.59px] w-[496px]">
        <Image
          src={ourStory.image}
          alt={ourStory.imageAlt}
          fill
          sizes="496px"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
