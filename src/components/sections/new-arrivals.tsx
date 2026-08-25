import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { revealDelay } from "@/lib/motion";
import { newArrivals } from "@/lib/home-content";

/**
 * Figma 699:3132 (heading) + 699:3137 (cards) + 699:3188 (button).
 *
 * This heading is the one block with no ornamental divider. The card strip sits
 * on its own cream panel rather than the page ground.
 *
 * RESPONSIVE
 *
 * The measure replaces the shared `.content-container` (a fixed 1132, still
 * used by the sections without a responsive pass) with a fluid one resolving to
 * the same 1132 at desktop — a 1200 cap plus the 34px gutter puts the content
 * at x=74..1206, exactly where the centred column sat.
 *
 * The strip is five flex-1 cards at lg and up, and a grid below:
 *
 *   lg     940 panel at 1024 -> (940 - 56)/5 = 176.8 per card, one row
 *   md     712 panel at 768  -> (712 - 28)/3 = 228 per card, 3 + 2
 *   base   319 panel at 375  -> (319 - 14)/2 = 152.5 per card, first two only
 *
 * Five across at md would put each card at 131, which is narrower than the
 * longest product name sets at 11px — every card would carry a three-line
 * title. Three across is the widest split that keeps titles to one line, and
 * two rows is the fewest 5 cards can occupy at a card width worth reading.
 *
 * Below md only the first two cards render at all. They are dropped with
 * `hidden` rather than by slicing the array, so the markup is identical at
 * every width and there is nothing for the server and client to disagree
 * about; `display: none` also keeps them out of the accessibility tree and
 * stops next/image from ever fetching them, since a display-none element never
 * trips the lazy-load observer.
 *
 * The image box trades its fixed 230px height for the same 212:230 ratio the
 * desktop card resolves to, so the crop stays identical in character at every
 * card width instead of squaring up as the cards narrow. At 1280 the card is
 * 212 wide, which is exactly 230 tall — but xl pins the literal height anyway
 * so the desktop cannot drift on a rounding change.
 */
export function NewArrivals() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 lg:px-[34px]">
      <SectionHeading
        eyebrow="New Arrivals"
        title="Freshly Handcrafted"
        paddingTop={56}
      />

      <div className="grid grid-cols-2 gap-[14px] bg-sand-100 px-[8px] py-[34px] md:grid-cols-3 lg:flex lg:items-start lg:justify-center">
        {newArrivals.map((product, i) => (
          <article
            key={product.href}
            data-reveal="up"
            style={revealDelay(i)}
            className={cn(
              "card-lift flex flex-1 flex-col self-stretch",
              // Mobile shows the first two arrivals and then goes straight to
              // the CTA; the rest are dropped rather than stacked.
              i >= 2 && "max-md:hidden",
            )}
          >
            <Link href={product.href} className="group flex flex-col">
              <div className="relative aspect-[212/230] w-full overflow-hidden xl:aspect-auto xl:h-[230px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 212px, (min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex w-full flex-col gap-[5px] px-[4px] pt-[12px] pb-[14px]">
                {/*
                  Two up, the longer names wrap and the shorter ones do not,
                  which would leave the two cards' prices and badges on
                  different lines. Reserving two lines of the same leading
                  settles them onto one baseline. `lh` is a text-relative unit,
                  so this tracks the type rather than a pixel guess, and a
                  browser without it simply falls back to natural height.
                */}
                <h3 className="text-center text-[11px] text-ink-730 transition-colors group-hover:text-gold-500 max-md:min-h-[2lh]">
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
