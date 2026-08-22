import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { revealDelay } from "@/lib/motion";
import { categories } from "@/lib/home-content";

/**
 * Figma 699:3094 (heading) + 699:3107 (tiles).
 *
 * Six 140px circles on a sand ground, spread edge to edge inside a 30px inset.
 */
export function ShopByCategory() {
  return (
    <section className="content-container">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Find Your Perfect Piece"
        paddingTop={70}
        ornament={{ src: "/ornaments/divider.svg", height: 84.733 }}
      />

      <ul className="flex items-start justify-between px-[30px] pt-[34px]">
        {categories.map((category, i) => (
          <li
            key={category.href}
            data-reveal="up"
            style={revealDelay(i)}
            className="w-[140px]"
          >
            <Link
              href={category.href}
              className="group flex flex-col gap-[14px]"
            >
              <div className="relative size-[140px] overflow-hidden rounded-full bg-sand-150">
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
