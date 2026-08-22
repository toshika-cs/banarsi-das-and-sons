import { site } from "@/lib/site";

/**
 * Figma node 699:2985 — full-bleed ink bar, 1280 x 27.
 * 6px vertical padding around a 15px line box.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-ink-900 py-1.5">
      <p className="text-center text-[10.5px] leading-[15px] tracking-[0.63px] text-cream-50">
        {site.announcement}
      </p>
    </div>
  );
}
