import Image from "next/image";
import Link from "next/link";

import { ArrowText } from "@/components/ui/arrow-text";
import { site } from "@/lib/site";

/**
 * Figma node 699:3370 — 1280 x 600 full-bleed image.
 *
 * Copy block (699:3372) is 337 wide at x=150, vertically centred, laid out as a
 * 9px-gap column: eyebrow 20, heading 80.8, subtitle wrapper 58 (5 top / 31
 * bottom), link 16.
 *
 * The image fill is w-[101%] left-[-0.5%] in the design, which is what
 * object-cover centred produces for a 1504x698 source in a 1280x600 box. At xl
 * and above every value below resolves to that design untouched.
 *
 * Below xl the section keeps the same ingredients — full-bleed photo, ink copy
 * set directly on it, no scrim — and only rescales.
 *
 * SUBJECT SAFETY (phone widths)
 *
 * Measured off the 1504x698 source: the model's hair mass runs x 769-960 from
 * y 35, and with the face profile and earring the head reads as x 730-1020,
 * y 0-270. That box must survive every crop.
 *
 * object-cover on this source only ever trims width — 1504/698 is wider than
 * any phone box — so the head is never cut off the top or bottom. The risk is
 * purely horizontal, and it is driven by the box's aspect ratio: a taller box
 * means a narrower slice of the source. Pinning a fixed pixel height therefore
 * makes the crop depend on the viewport, which is what has to be avoided.
 *
 * So below sm the height comes from `aspect-[3/4]`, not from pixels. The slice
 * is then a constant 698 x 0.75 = 523 source px at every phone width, and
 * `object-[62%_50%]` places it at x 608-1131 — the head box sits inside with
 * 122px of margin on the left and 111px on the right.
 *
 * That holds far past the phones in use. With the position at 62% the head box
 * stays whole for any slice >= 327 source px, i.e. any box down to a 0.468
 * ratio — a hero up to 2.14x as tall as it is wide. At 375 that is 802px of
 * height before the face is at risk; the ratio asks for 500. `max-h-[600px]`
 * only ever shortens the box, which widens the slice, so the cap cannot break
 * the guarantee either.
 *
 * The rest of the responsive behaviour:
 *
 * - The copy column keeps its 337 measure wherever it fits and otherwise falls
 *   back to the viewport gutter, so it can never overflow. The 116px inset past
 *   the gutter is desktop-only — below lg the copy sits on the gutter, aligned
 *   with the header's logo and menu button.
 * - Below md the copy is bottom-aligned. The head box occupies the top 270/698
 *   = 39% of the frame, so bottom alignment keeps the copy clear of the face by
 *   84px at 375 and more as the screen grows, and it sets the copy on the pale
 *   fabric sweep — the same ground it has at 1280.
 */
export function Hero() {
  return (
    <section className="relative aspect-[3/4] max-h-[600px] w-full overflow-hidden sm:aspect-auto sm:h-[500px] sm:max-h-none lg:h-[560px] xl:h-[600px]">
      <Image
        src="/images/hero.png"
        alt="Model wearing a white Chikankari kurta in a colonnaded courtyard"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_50%] sm:object-center"
      />

      <div className="site-container relative flex h-full flex-col justify-end pb-[52px] md:justify-center md:pb-0">
        {/* x=150 from the canvas edge, i.e. 116px past the 34px container gutter. */}
        <div className="hero-reveal flex w-full max-w-[337px] flex-col items-start gap-[9px] lg:ml-[116px]">
          <p className="text-[12px] leading-[18px] tracking-[3.36px] text-ink-400 sm:text-[14px] sm:leading-[20px] sm:tracking-[3.92px]">
            THE ART OF
          </p>

          <h1 className="pb-[0.8px] font-display text-[52px] leading-[56px] font-light text-ink-800 sm:text-[60px] sm:leading-[64px] md:text-[68px] md:leading-[72px] xl:text-[76px] xl:leading-[79.8px]">
            Chikankari
          </h1>

          <p className="pt-[5px] pb-[24px] text-[14px] leading-[20px] tracking-[0.3px] text-ink-410 sm:pb-[31px] sm:text-[15px] sm:leading-[22px]">
            {site.tagline}
          </p>

          <Link
            href="/our-story"
            className="arrow-link -my-3 flex min-h-11 items-center text-[11px] leading-[16px] tracking-[2.42px] whitespace-pre text-gold-700 transition-colors hover:text-gold-500 lg:my-0 lg:block lg:min-h-0"
          >
            <ArrowText>{"DISCOVER THE STORY  ⟶"}</ArrowText>
          </Link>
        </div>
      </div>
    </section>
  );
}
