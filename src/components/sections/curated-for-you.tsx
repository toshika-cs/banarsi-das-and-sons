import Image from "next/image";
import Link from "next/link";

import { ArrowText } from "@/components/ui/arrow-text";
import { AutoCarousel } from "@/components/ui/auto-carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealDelay } from "@/lib/motion";
import { collections } from "@/lib/home-content";

/**
 * Figma 699:3053 (heading) + 699:3066 (cards).
 *
 * Three equal cards on a cream ground, 360px image over a centred caption.
 *
 * RESPONSIVE
 *
 * The measure replaces the shared `.content-container` (a fixed 1132px, still
 * used by the four sections that have not had their pass yet) with a fluid one
 * that resolves to the same 1132 at desktop: a 1200 cap plus the 34px gutter
 * puts the content at x=74..1206 in a 1280 canvas, which is exactly where the
 * 1132 centred column sits. Below that it tracks the viewport, on the same
 * 20px gutter the header and hero already use.
 *
 * Below md the row becomes a one-card-at-a-time carousel rather than a stack:
 * three full-width cards in a column made the section ~1450px tall, which is a
 * lot of scrolling for one row of a homepage. As a carousel it is one card
 * tall. Cards take 80% of the measure so the next one peeks by 0.2 * measure
 * minus the 26px gap — 41px at 375, 52px at 430 — which is the affordance that
 * says "this scrolls sideways".
 *
 * The track is a real overflow scroller with CSS scroll snapping, so swiping
 * is native and works with JavaScript off; AutoCarousel only adds the timed
 * advance, and only below md. See that component for the motion rules.
 *
 * From md up the three cards are 225 wide, at lg 311, at desktop the Figma
 * 360, laid out as the original flex row — `overflow: visible`, no snapping,
 * no timer.
 *
 * `flex-1` is written out as basis/grow/shrink so the md values cannot collide
 * with the base `shrink-0` the track needs, and `self-stretch` — which
 * equalises card heights across the desktop row — stays scoped to md and up.
 *
 * The image box is `aspect-square` at every width instead of a 360px height.
 * The sources are only ~217x228 (the desktop design already upscales them
 * ~1.67x), so a square box crops the same 4-5% off the height at every size —
 * the framing is identical from 375 to 1280, just at a different scale, and
 * nothing is zoomed further in than the desktop already is.
 *
 * Card type steps up one notch when stacked (13 / 12.5 / 11 against the Figma
 * 12 / 11.5 / 10). From md up, where the cards are narrower than the phone
 * card, the Figma values apply unchanged — so every value the desktop renders
 * is the designed one.
 */
/** Widths where the card row is a carousel. Mirrors Tailwind's `md`. */
const CAROUSEL_MQ = "(max-width: 767.98px)";

export function CuratedForYou() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 lg:px-[34px]">
      <SectionHeading
        eyebrow="Featured Collection"
        title="Curated for You"
        paddingTop={56}
        ornament={{ src: "/ornaments/divider.svg", height: 84.733 }}
      />

      <AutoCarousel
        carousel={CAROUSEL_MQ}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-[26px] overflow-x-auto overflow-y-clip pt-[34px] md:snap-none md:items-start md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {collections.map((collection, i) => (
          <article
            key={collection.slug}
            data-reveal="up"
            style={revealDelay(i)}
            className="group card-lift flex shrink-0 grow-0 basis-[80%] snap-start flex-col bg-sand-100 max-md:max-w-[360px] md:shrink md:grow md:basis-0 md:self-stretch"
          >
            <div className="relative aspect-square w-full overflow-hidden xl:aspect-auto xl:h-[360px]">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(min-width: 1280px) 360px, (min-width: 768px) 33vw, 80vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex w-full flex-col items-center gap-[9px] px-5 pt-[18px] pb-[24px] md:px-[10px]">
              <h3 className="text-center text-[13px] tracking-[2.4px] text-ink-700 uppercase md:text-[12px]">
                {collection.title}
              </h3>

              <p className="pb-[9px] text-center text-[12.5px] text-stone-500 md:text-[11.5px]">
                {collection.description}
                {collection.descriptionAccent ? (
                  <span className="text-gold-400">
                    {collection.descriptionAccent}
                  </span>
                ) : null}
              </p>

              {/*
                Below lg — the same touch boundary the header uses — the link
                keeps a 44px tap target. `-my-3` cancels the extra height back
                out, so the caption block measures the same as the 16px-tall
                inline link does from lg up, where the Figma geometry resumes.
              */}
              <Link
                href={collection.href}
                className="arrow-link -my-3 flex min-h-11 items-center justify-center text-center text-[11px] tracking-[1.8px] whitespace-pre text-gold-500 uppercase transition-colors hover:text-gold-700 md:text-[10px] lg:my-0 lg:block lg:min-h-0"
              >
                <ArrowText>{"Explore Collection  ⟶"}</ArrowText>
              </Link>
            </div>
          </article>
        ))}
      </AutoCarousel>
    </section>
  );
}
