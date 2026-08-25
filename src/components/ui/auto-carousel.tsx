"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Horizontal scroll track that advances itself, used for the card rows that
 * become a one-at-a-time carousel on phones and revert to a plain flex row on
 * desktop.
 *
 * The track is a real overflow scroller with CSS scroll snapping, so touch and
 * trackpad swiping is the native behaviour and works with no JavaScript at all.
 * This component only adds the automatic advance on top.
 *
 * It is inert above the `carousel` media query: at those widths the row has
 * `overflow: visible` and no scrollable overflow, so the timer is not even
 * started. That keeps the desktop layout completely untouched.
 *
 * Auto-advance stops when: the user reduces motion, the track is off-screen,
 * the tab is hidden, or the user has just interacted (for `RESUME_MS`). The
 * slide itself is animated on rAF rather than with `scroll-behavior: smooth`
 * so the duration and easing are ours to set — the native smooth scroll is a
 * fixed, much faster curve.
 */

/** Time a card rests before the next one slides in. */
const STEP_MS = 3600;
/** Slide duration for a single card advance. Slow on purpose. */
const SLIDE_MS = 1100;
/** How long auto-advance stays out of the way after a manual swipe. */
const RESUME_MS = 6000;
/** The wrap-around from last card back to first covers more ground; let it
 *  take proportionally longer, up to this multiple, rather than racing. */
const MAX_STRETCH = 1.6;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type AutoCarouselProps = {
  /** Media query that describes the widths where the carousel is live. */
  carousel: string;
  className?: string;
  children: ReactNode;
};

export function AutoCarousel({
  carousel,
  className,
  children,
}: AutoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const carouselMq = window.matchMedia(carousel);
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let timer = 0;
    let pausedUntil = 0;
    let onScreen = true;

    /**
     * Snapping has to come off while we drive `scrollLeft` frame by frame —
     * with `mandatory` still on, engines re-snap on every write and the slide
     * turns into a jump.
     */
    const releaseSnap = () => {
      track.style.scrollSnapType = "none";
    };
    const restoreSnap = () => {
      track.style.removeProperty("scroll-snap-type");
    };

    const stopAnimation = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      restoreSnap();
    };

    /** Scroll offset that brings each card flush to the track's left edge,
     *  clamped to what the scroller can actually reach. Recomputed per advance
     *  so resizing never leaves us with stale geometry. */
    const stops = () => {
      const max = track.scrollWidth - track.clientWidth;
      const left = track.getBoundingClientRect().left;
      return Array.from(track.children).map((el) =>
        Math.max(
          0,
          Math.min(
            max,
            track.scrollLeft + el.getBoundingClientRect().left - left,
          ),
        ),
      );
    };

    const animateTo = (to: number, ms: number) => {
      const from = track.scrollLeft;
      const delta = to - from;
      if (Math.abs(delta) < 1) return;

      stopAnimation();
      releaseSnap();

      const startedAt = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - startedAt) / ms);
        track.scrollLeft = from + delta * easeInOutCubic(t);
        if (t < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          raf = 0;
          restoreSnap();
        }
      };
      raf = requestAnimationFrame(frame);
    };

    const advance = () => {
      const positions = stops();
      const first = positions[0];
      const second = positions[1];
      if (first === undefined || second === undefined) return;

      const here = track.scrollLeft;
      let current = 0;
      let bestGap = Math.abs(first - here);
      positions.forEach((p, i) => {
        const gap = Math.abs(p - here);
        if (gap < bestGap) {
          bestGap = gap;
          current = i;
        }
      });

      const target = positions[(current + 1) % positions.length];
      if (target === undefined) return;

      const span = Math.abs(second - first) || 1;
      const stretch = Math.min(
        MAX_STRETCH,
        Math.max(1, Math.abs(target - here) / span),
      );
      animateTo(target, SLIDE_MS * stretch);
    };

    /**
     * Every condition is re-read on each tick rather than latched when the
     * timer is armed, so a missed `change` event cannot strand the carousel in
     * the wrong mode — it simply corrects itself on the next pass. The timer
     * keeps ticking above md and under reduced motion, but does nothing there;
     * one no-op timeout every few seconds is cheaper than being wrong.
     */
    const canAdvance = () =>
      carouselMq.matches &&
      !reduceMq.matches &&
      onScreen &&
      !document.hidden &&
      Date.now() >= pausedUntil;

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (canAdvance()) advance();
        schedule();
      }, STEP_MS);
    };

    /** Reacts to a mode change at once instead of waiting for the next tick. */
    const sync = () => {
      stopAnimation();
      schedule();
    };

    /** Any manual input wins immediately and buys the user quiet time. */
    const interrupt = () => {
      stopAnimation();
      pausedUntil = Date.now() + RESUME_MS;
    };

    const opts = { passive: true } as const;
    track.addEventListener("pointerdown", interrupt, opts);
    track.addEventListener("touchstart", interrupt, opts);
    track.addEventListener("wheel", interrupt, opts);
    track.addEventListener("keydown", interrupt);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) onScreen = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );
    io.observe(track);

    carouselMq.addEventListener("change", sync);
    reduceMq.addEventListener("change", sync);
    document.addEventListener("visibilitychange", stopAnimation);

    sync();

    return () => {
      window.clearTimeout(timer);
      stopAnimation();
      io.disconnect();
      track.removeEventListener("pointerdown", interrupt);
      track.removeEventListener("touchstart", interrupt);
      track.removeEventListener("wheel", interrupt);
      track.removeEventListener("keydown", interrupt);
      carouselMq.removeEventListener("change", sync);
      reduceMq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", stopAnimation);
    };
  }, [carousel]);

  return (
    <div ref={trackRef} className={className}>
      {children}
    </div>
  );
}
