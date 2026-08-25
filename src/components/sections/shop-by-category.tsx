import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { revealDelay } from "@/lib/motion";
import { categories } from "@/lib/home-content";

/**
 * Figma 699:3094 (heading) + 699:3107 (tiles).
 *
 * Six 140px circles on a sand ground, spread edge to edge inside a 30px inset.
 *
 * RESPONSIVE
 *
 * The measure replaces the shared `.content-container` (a fixed 1132, still
 * used by the sections without a responsive pass) with a fluid one resolving
 * to the same 1132 at desktop — a 1200 cap plus the 34px gutter puts the
 * content at x=74..1206, exactly where the centred column sat.
 *
 * The row becomes a grid that reflows 2 -> 3 -> 6 across. The desktop row is a
 * `justify-between` flex, and a grid reproduces it exactly when the columns
 * come out at the tile width, because then a track edge and a tile edge are
 * the same line. That happens at every step here — the gap is chosen so the
 * arithmetic lands on 140:
 *
 *   lg    956 at 1024, no inset    ->  956 / gap 23.2 -> (956 - 116)/6  = 140
 *   md    grid capped at 520       ->  520 / gap 46.4 -> (520 - 92.8)/3 = 142.4
 *   base  grid capped at 340       ->  340 / gap 46.4 -> (340 - 46.4)/2 = 146.8
 *
 * At md and below the track runs a little wider than the tile, which
 * `justify-items-center` absorbs — the tile stays 140 and simply centres.
 *
 * xl stays the original `justify-between` flex rather than a sixth grid step.
 * A grid reproduced it to within 0.008px on the last three tiles — far below a
 * device pixel, so nothing would have painted differently — but flex free-space
 * distribution and grid track accumulation resolve subpixels by different
 * routes, and the desktop is meant to be untouched, not almost untouched. The
 * gap is zeroed there so `justify-between` does the spacing, exactly as before.
 *
 * Capping the grid rather than letting it span the viewport is what keeps the
 * spacing deliberate: the gap stays on the 46.4 the design uses between tiles
 * instead of stretching to fill a 430 or 768 screen. lg is the one step that
 * tightens to 23.2, because six 140s across 956 is the layout that actually
 * uses that width — 88% of it — rather than stranding the row in the middle.
 *
 * Tiles are `aspect-square w-full` capped at 140 rather than a fixed 140, so
 * on a sub-360 phone they scale down with the column instead of overflowing.
 * `rounded-full` on a square box keeps them exactly circular at any size.
 */
export function ShopByCategory() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 lg:px-[34px]">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Find Your Perfect Piece"
        paddingTop={70}
        ornament={{ src: "/ornaments/divider.svg", height: 84.733 }}
      />

      <ul className="mx-auto grid max-w-[340px] grid-cols-2 justify-items-center gap-x-[46.4px] gap-y-[34px] pt-[34px] md:max-w-[520px] md:grid-cols-3 lg:max-w-none lg:grid-cols-6 lg:gap-x-[23.2px] lg:gap-y-0 xl:flex xl:items-start xl:justify-between xl:gap-x-0 xl:px-[30px]">
        {categories.map((category, i) => (
          <li
            key={category.href}
            data-reveal="up"
            style={revealDelay(i)}
            className="w-full max-w-[140px]"
          >
            <Link
              href={category.href}
              className="group flex flex-col gap-[14px]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full bg-sand-150">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="140px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: category.objectPosition }}
                />
              </div>

              <span className="text-center text-[10.5px] tracking-[1.68px] text-ink-740 uppercase transition-colors group-hover:text-gold-500">
                {category.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
