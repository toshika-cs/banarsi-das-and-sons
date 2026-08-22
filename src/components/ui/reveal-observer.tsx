"use client";

import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements as they scroll into view.
 *
 * The homepage is otherwise entirely server-rendered; this is the single client
 * island. It exists because the reveals are time-based — a ~100ms stagger over
 * a 700ms ease — which CSS scroll-driven animations cannot express (they are
 * progress-based, and Chromium-only).
 *
 * Deliberately a passive scroll listener rather than IntersectionObserver, and
 * deliberately free of requestAnimationFrame. The pattern hides content until
 * script runs, so the trigger must be as simple and dependency-free as
 * possible. The pending list only shrinks, and the listeners detach the moment
 * the last element is revealed, so the per-scroll cost is small and finite.
 *
 * The hidden state lives behind `html[data-reveal-ready]`, set by a blocking
 * script in <head>, so content is never trapped invisible if this never runs.
 */
export function RevealObserver() {
  useEffect(() => {
    let pending = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])",
      ),
    );
    if (pending.length === 0) return;

    const reveal = (el: HTMLElement) => el.setAttribute("data-revealed", "");

    // Honour the OS setting: show everything at once, no transition.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.forEach(reveal);
      return;
    }

    const teardown = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    function check() {
      if (pending.length === 0) return;
      // Trigger slightly before the element is fully in view, so the reveal has
      // settled by the time it reaches comfortable reading position.
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) {
          reveal(el);
          return false;
        }
        return true;
      });
      if (pending.length === 0) teardown();
    }

    check(); // reveal whatever is already on screen
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return teardown;
  }, []);

  return null;
}
