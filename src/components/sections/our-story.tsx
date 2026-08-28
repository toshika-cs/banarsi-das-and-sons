import Image from "next/image";
import Link from "next/link";

import { ArrowText } from "@/components/ui/arrow-text";
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
 *
 * RESPONSIVE
 *
 * The measure replaces the shared `.content-container` with a fluid one that
 * folds the 40 inset into the gutter: a 1200 cap plus 74 of padding puts the
 * content at x=114, exactly where 1132-centred-then-inset-40 put it.
 *
 * Two columns hold down to md, where they are 334 each — still wider than the
 * 327 the body copy is set to, so nothing reflows. Stacking at md instead would
 * put a 728-wide photograph on the page and roughly double the section height
 * for no gain. Between md and xl the columns are `flex-1` rather than a fixed
 * 496: 496 + 60 + 496 is 1052, which does not fit until the measure reaches it
 * at 1200, so a fixed width would overflow every width below that. Sharing the
 * row equally resolves to exactly 496 once the measure is 1052, and xl pins the
 * literal width anyway.
 *
 * Below md the two columns stack with the photograph first. The CTA closes the
 * text column, so text-then-image would strand the picture after the link and
 * end the section on it; image first keeps the block reading eyebrow -> title
 * -> body -> CTA straight into whatever follows. `order` moves it visually
 * only, so the DOM and tab order are untouched.
 *
 * The 84.655 / 60 column offsets are the Figma stagger between the two columns
 * and only mean anything side by side, so they apply from md up; stacked, the
 * photograph sits at the top of the section and the text opens 34 below it.
 *
 * The photograph carries its 496:275.59 as a ratio rather than a fixed height.
 * The source is exactly that aspect, so it is never cropped at any width — it
 * only rescales.
 *
 * `overflow-x-clip` contains the scroll reveal. This is the only section whose
 * reveal moves horizontally — the columns open from ±28px — and at 1280 that
 * was invisible because the 1132 column left 74 of slack either side. Flush to
 * a 20px gutter there is no slack, so the incoming column would have hung 8px
 * past a 768 viewport and put a scrollbar on the page for the length of the
 * animation. Clipping the section contains it without touching the motion; at
 * desktop the offset still lands well inside the box, so nothing is clipped
 * there at all. `clip` rather than `hidden` so the section never becomes a
 * scroll container, and the vertical axis stays visible.
 */
export function OurStory() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-[34px] overflow-x-clip px-5 pb-[70px] md:flex-row md:gap-[60px] lg:px-[74px]">
      <div
        data-reveal="left"
        className="flex w-full flex-col items-center md:mt-[84.655px] md:flex-1 xl:w-[496px] xl:flex-none"
      >
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
            "mt-[19.28px] w-full max-w-[327px] text-center text-[11px] leading-[25.25px]",
            unverified.ourStoryBodyColor,
          )}
        >
          {ourStory.body}
        </p>

        <Link
          href={ourStory.href}
          className={cn(
            "arrow-link mt-[24px] text-center text-[10.5px] leading-[15px] tracking-[2.31px] whitespace-pre uppercase transition-colors",
            unverified.ourStoryCtaColor,
          )}
        >
          <ArrowText>{ourStory.cta}</ArrowText>
        </Link>
      </div>

      <div
        data-reveal="right"
        className="relative aspect-[496/275.59] w-full max-xl:self-start max-md:order-first md:mt-[60px] md:flex-1 xl:aspect-auto xl:h-[275.59px] xl:w-[496px] xl:flex-none"
      >
        <Image
          src={ourStory.image}
          alt={ourStory.imageAlt}
          fill
          sizes="(min-width: 1280px) 496px, (min-width: 768px) 44vw, calc(100vw - 40px)"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
