"use client";

import { useEffect } from "react";

const TOP = { top: 0, left: 0, behavior: "auto" as const };
const GUARD_MS = 2000;

/**
 * Belt-and-suspenders companion to the inline `beforeInteractive` script in
 * the root layout. That script strips any URL hash and forces scrollTo(0,0)
 * as early as possible (in <head>, before hydration). This effect covers
 * what it can't:
 *
 * - Browsers can perform their native "scroll to the fragment" pass well
 *   after our early script ran — it isn't reliably tied to a single point in
 *   the load timeline (web font swaps, image decode, and layout shifts can
 *   all cause it to re-fire), so a single reassertion isn't enough. A short
 *   rAF guard keeps forcing scrollTop back to 0 for the first ~1.5s of a
 *   fresh load, which is long enough to outlast that native pass. It cancels
 *   itself immediately on the first real user gesture (wheel/touch/key) so
 *   it never fights someone who's actually scrolling.
 * - Safari/Chrome back-forward-cache restores (`pageshow` with
 *   `persisted: true`) can reintroduce the old scroll offset even with
 *   `history.scrollRestoration = "manual"` set.
 *
 * The guard cancels itself on the first real user gesture — including a
 * `click`, captured before it bubbles to React's handler — so a nav link
 * clicked in that first couple of seconds still gets its own smooth
 * `scrollIntoView` instead of being fought back to the top.
 */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    window.scrollTo(TOP);

    let cancelled = false;
    const start = performance.now();

    function stop() {
      cancelled = true;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("click", stop, { capture: true });
    }

    function guard() {
      if (cancelled) return;
      if (performance.now() - start > GUARD_MS) return;
      if (window.scrollY !== 0) window.scrollTo(TOP);
      requestAnimationFrame(guard);
    }

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    // Capture phase: must cancel before the click reaches a nav link's own
    // (bubble-phase) React onClick, or the guard could win a single frame
    // against that link's scrollIntoView.
    window.addEventListener("click", stop, { capture: true });
    requestAnimationFrame(guard);

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) window.scrollTo(TOP);
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      stop();
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
