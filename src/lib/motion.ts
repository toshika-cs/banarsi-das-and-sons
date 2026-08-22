import type { CSSProperties } from "react";

/**
 * Delay between consecutive items in a staggered reveal, in milliseconds.
 *
 * Durations live in `globals.css`; this is the one value the components need,
 * so it is defined once here rather than repeated at each call site.
 */
export const REVEAL_STAGGER_MS = 130;

/** Inline style setting a reveal's delay from its index within a group. */
export function revealDelay(index: number): CSSProperties {
  return {
    "--reveal-delay": `${index * REVEAL_STAGGER_MS}ms`,
  } as CSSProperties;
}
