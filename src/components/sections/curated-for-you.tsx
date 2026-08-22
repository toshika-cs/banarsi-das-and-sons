import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { collections } from "@/lib/home-content";

/**
 * Figma 699:3053 (heading) + 699:3066 (cards).
 *
 * Three equal cards on a cream ground, 360px image over a centred caption.
 */
export function CuratedForYou() {
  return (
    <section className="content-container">
      <SectionHeading
        eyebrow="Featured Collection"
        title="Curated for You"
        paddingTop={56}
        ornament={{ src: "/ornaments/divider.svg", height: 84.733 }}
      />

      <div className="flex items-start justify-center gap-[26px] pt-[34px]">
        {collections.map((collection) => (
          <article
            key={collection.slug}
            className="flex flex-1 flex-col self-stretch bg-sand-100"
          >
            <div className="relative h-[360px] w-full overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="360px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex w-full flex-col items-center gap-[9px] px-[10px] pt-[18px] pb-[24px]">
              <h3 className="text-center text-[12px] tracking-[2.4px] text-ink-700 uppercase">
                {collection.title}
              </h3>

              <p className="pb-[9px] text-center text-[11.5px] text-stone-500">
                {collection.description}
                {collection.descriptionAccent ? (
                  <span className="text-gold-400">
                    {collection.descriptionAccent}
                  </span>
                ) : null}
              </p>

              <Link
                href={collection.href}
                className="text-center text-[10px] tracking-[1.8px] whitespace-pre text-gold-500 uppercase transition-colors hover:text-gold-700"
              >
                {"Explore Collection  ⟶"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
