import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { revealDelay } from "@/lib/motion";
import { newArrivals } from "@/lib/home-content";

/**
 * Figma 699:3132 (heading) + 699:3137 (cards) + 699:3188 (button).
 *
 * This heading is the one block with no ornamental divider. The card strip sits
 * on its own cream panel rather than the page ground.
 */
export function NewArrivals() {
  return (
    <section className="content-container">
      <SectionHeading
        eyebrow="New Arrivals"
        title="Freshly Handcrafted"
        paddingTop={56}
      />

      <div className="flex items-start justify-center gap-[14px] bg-sand-100 px-[8px] py-[34px]">
        {newArrivals.map((product, i) => (
          <article
            key={product.href}
            data-reveal="up"
            style={revealDelay(i)}
            className="card-lift flex flex-1 flex-col self-stretch"
          >
            <Link href={product.href} className="group flex flex-col">
              <div className="relative h-[230px] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="212px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex w-full flex-col gap-[5px] px-[4px] pt-[12px] pb-[14px]">
                <h3 className="text-center text-[11px] text-ink-730 transition-colors group-hover:text-gold-500">
                  {product.name}
                </h3>

                <p className="text-center text-[11px] text-ink-700">
                  {product.price}
                </p>

                {product.badge ? (
                  <p className="text-center text-[8.5px] tracking-[1.36px] text-gold-300 uppercase">
                    {product.badge}
                  </p>
                ) : null}
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/new-arrivals"
          className="w-[190px] bg-ink-900 py-[13px] text-center text-[10.5px] tracking-[1.89px] text-white uppercase transition-[background-color,translate] duration-[400ms] ease-out hover:-translate-y-px hover:bg-ink-800"
        >
          View All Arrivals
        </Link>
      </div>
    </section>
  );
}
