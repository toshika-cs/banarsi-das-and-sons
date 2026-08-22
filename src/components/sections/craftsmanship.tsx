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
 */

/**
 * The CTA colour is unconfirmed and now lives with every other inferred value
 * in `unverified` — everything else in this section is measured.
 */
export function Craftsmanship() {
  return (
    <section>
      <div className="content-container">
        <SectionHeading
          eyebrow="The Craftsmanship"
          title="Made by Hand. Worn with Pride."
          paddingTop={60}
          ornament={{ src: "/ornaments/divider-craft.svg", height: 78.273 }}
        />
      </div>

      <div className="flex pt-[31px]">
        {craftImages.map((item, i) => (
          <div
            key={item.alt}
            data-reveal="up"
            style={revealDelay(i)}
            className="relative h-[200px] flex-1"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="320px"
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
