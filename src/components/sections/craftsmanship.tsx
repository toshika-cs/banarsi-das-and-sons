import Image from "next/image";
import Link from "next/link";

import { ArrowText } from "@/components/ui/arrow-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealDelay } from "@/lib/motion";
import { craftImages } from "@/lib/home-content";
import { unverified } from "@/lib/unverified";
import { cn } from "@/lib/utils";

/**
 * Figma 699:3190 (heading) + 699:3205 (artisan strip) + 699:3210 (CTA).
 *
 * The heading sits in the 1132 content column; the strip is full-bleed 1280
 * with four equal 320x200 tiles and no gaps. Spacing between the three blocks
 * comes from their absolute positions in the frame: 31px then 32px.
 *
 * The four strip photographs were extracted from the node's exported SVG, where
 * each is a pattern fill on a rect at x = 0 / 320 / 640 / 960. Figma's pattern
 * transforms scale each to fill the width and centre it vertically, which is
 * what object-cover / object-center reproduces.
 *
 * RESPONSIVE
 *
 * The heading's measure replaces the shared `.content-container` (a fixed 1132,
 * still used by the sections without a pass) with a fluid one resolving to the
 * same 1132 at desktop.
 *
 * The strip stays full-bleed at every width — that edge-to-edge band is the
 * composition — and only changes how many tiles share the row: four across from
 * md up, two-by-two below. Four across at 375 would be 93.75 per tile against
 * 200 of height, and the sources are ~1.4 landscape, so all but a sliver of
 * each photograph would be cropped away.
 *
 * The tiles carry the desktop 320:200 as an aspect ratio rather than a fixed
 * 200px height, so every tile at every width crops exactly what the desktop
 * crops — a 1.4 source into a 1.6 box, trimming the sides — instead of turning
 * portrait as the columns narrow. Two-by-two at 375 comes to 234 of total strip
 * height against the desktop 200, so the band does not grow much either.
 */

/**
 * The CTA colour is unconfirmed and now lives with every other inferred value
 * in `unverified` — everything else in this section is measured.
 */
export function Craftsmanship() {
  return (
    <section>
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-[34px]">
        <SectionHeading
          eyebrow="The Craftsmanship"
          title="Made by Hand. Worn with Pride."
          paddingTop={60}
          ornament={{ src: "/ornaments/divider-craft.svg", height: 78.273 }}
        />
      </div>

      <div className="grid grid-cols-2 pt-[31px] md:grid-cols-4">
        {craftImages.map((item, i) => (
          <div
            key={item.alt}
            data-reveal="up"
            style={revealDelay(i)}
            className="relative aspect-[320/200] w-full xl:aspect-auto xl:h-[200px]"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-[32px]">
        <Link
          href="/craftsmanship"
          className={cn(
            "arrow-link text-center text-[10.5px] leading-[15px] tracking-[2.31px] whitespace-pre uppercase transition-colors",
            unverified.craftCtaColor,
          )}
        >
          <ArrowText>{"EXPLORE OUR CRAFT  ⟶"}</ArrowText>
        </Link>
      </div>
    </section>
  );
}
