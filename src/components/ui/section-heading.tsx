import Image from "next/image";

import { cn } from "@/lib/utils";

export type Ornament = {
  src: string;
  /** Figma renders these at a fixed 82px width; height varies per artwork. */
  height: number;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Top padding, which is what sets the rhythm between blocks in Figma. */
  paddingTop: number;
  ornament?: Ornament;
  className?: string;
};

/**
 * Shared section heading (Figma 699:3053, 699:3094, 699:3132, 699:3190).
 *
 * Eyebrow, display title and an optional ornamental divider. The blocks differ
 * only in top padding and which divider they carry — "Freshly Handcrafted"
 * carries none.
 */
export function SectionHeading({
  eyebrow,
  title,
  paddingTop,
  ornament,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col items-center", className)}
      style={{ paddingTop }}
    >
      <p className="text-center text-[10.5px] tracking-[2.31px] text-gold-600 uppercase">
        {eyebrow}
      </p>

      <h2 className="pt-[10px] text-center font-display text-[36px] leading-[normal] font-light text-ink-800">
        {title}
      </h2>

      {ornament ? (
        <div className="pt-[6px]">
          <Image
            src={ornament.src}
            alt=""
            aria-hidden="true"
            width={82}
            height={ornament.height}
            unoptimized
            className="opacity-80 mix-blend-multiply"
            style={{ width: 82, height: ornament.height }}
          />
        </div>
      ) : null}
    </div>
  );
}
