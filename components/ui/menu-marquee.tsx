"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MarqueeTrackProps {
  children: ReactNode;
  /** Seconds for one full autoplay loop. Lower is faster. */
  duration?: number;
}

/** How long to wait after the user's last manual scroll before autoplay resumes. */
const RESUME_DELAY_MS = 900;
/** Tolerance (px) for recognizing a `scroll` event as one *we* just caused. */
const OWN_WRITE_EPSILON = 1;

/**
 * A bidirectional infinite carousel: three identical copies of `children`
 * sit side by side, and the *native* `scrollLeft` of the outer container is
 * the single source of truth for position — for both autoplay and manual
 * scrolling (trackpad, mouse wheel, drag, touch swipe). Autoplay advances
 * `scrollLeft` directly instead of animating a separate `transform`, so the
 * two can never fight over "where the content actually is".
 *
 * `singleSetWidth` is the *measured* pixel distance from the start of copy
 * A to the start of copy B (offsetLeft difference) — copy A's own width
 * plus the one gap connecting it to copy B. Whenever `scrollLeft` drifts out
 * of the middle copy's range, it's corrected back into it by exactly that
 * width, via a plain property assignment (`scrollLeft = x`), which is
 * always instant — there's no "smooth" variant for the property setter,
 * only for `scrollTo()`/`scrollBy()` — so the correction can never animate
 * or show a scroll-position "jump". Content is identical between copies, so
 * landing on the equivalent spot one copy over is visually invisible.
 */
export function MarqueeTrack({ children, duration = 42 }: MarqueeTrackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setARef = useRef<HTMLDivElement>(null);
  const setBRef = useRef<HTMLDivElement>(null);

  const setWidthRef = useRef(0);
  const hoveredRef = useRef(false);
  const userActiveRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const lastOwnWriteRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const setA = setARef.current;
    const setB = setBRef.current;
    if (!scroller || !setA || !setB) return;

    function writeScrollLeft(value: number) {
      // Round to a whole pixel: writing fractional scrollLeft values every
      // animation frame forces WebKit to keep re-rasterizing text at
      // sub-pixel offsets while autoplay runs, which is what produces the
      // intermittent "glyph doesn't fully paint" glitches during scroll.
      // Whole-pixel positions let a card's content settle into one stable
      // compositor layer instead.
      const rounded = Math.round(value);
      lastOwnWriteRef.current = rounded;
      scroller!.scrollLeft = rounded;
    }

    function measureAndInit() {
      const width = setB!.offsetLeft - setA!.offsetLeft;
      if (width <= 0) return;
      const previousWidth = setWidthRef.current;
      setWidthRef.current = width;

      if (previousWidth === 0) {
        // First measurement: start on the middle copy, no transition.
        writeScrollLeft(width);
      } else if (previousWidth !== width) {
        // A resize changed card sizing (e.g. crossing a breakpoint) —
        // preserve the same relative position within the loop instead of
        // snapping back to the exact start of the middle copy.
        const ratio = scroller!.scrollLeft / previousWidth;
        writeScrollLeft(ratio * width);
      }
    }

    measureAndInit();

    const resizeObserver = new ResizeObserver(measureAndInit);
    resizeObserver.observe(setA);

    function markUserActive() {
      userActiveRef.current = true;
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
      resumeTimerRef.current = window.setTimeout(() => {
        userActiveRef.current = false;
      }, RESUME_DELAY_MS);
    }

    function handleScroll() {
      const width = setWidthRef.current;
      if (width <= 0) return;
      const current = scroller!.scrollLeft;

      const isOwnWrite =
        lastOwnWriteRef.current !== null &&
        Math.abs(current - lastOwnWriteRef.current) < OWN_WRITE_EPSILON;
      lastOwnWriteRef.current = null;
      if (isOwnWrite) return;

      // Genuine user-driven scroll: fold back into the middle copy the
      // instant we leave it, then treat this as "the user is interacting".
      if (current >= width * 2) {
        writeScrollLeft(current - width);
      } else if (current < width) {
        writeScrollLeft(current + width);
      }
      markUserActive();
    }

    scroller.addEventListener("scroll", handleScroll, { passive: true });

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    // Touch-primary devices (no real hover, often no precise pointer) drive
    // the loop entirely by swipe; autoplay only runs where hover-to-pause
    // actually makes sense.
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function tick(timestamp: number) {
      const last = lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const width = setWidthRef.current;
      const shouldAdvance =
        last !== null &&
        width > 0 &&
        !hoveredRef.current &&
        !userActiveRef.current &&
        !reducedMotionQuery.matches &&
        finePointerQuery.matches;

      if (shouldAdvance) {
        const pxPerMs = width / (duration * 1000);
        let next = scroller!.scrollLeft + pxPerMs * (timestamp - last);
        if (next >= width * 2) next -= width;
        writeScrollLeft(next);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      scroller.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, [duration]);

  function handleHoverStart() {
    hoveredRef.current = true;
  }

  function handleHoverEnd() {
    hoveredRef.current = false;
  }

  return (
    <div
      ref={scrollerRef}
      data-marquee-scroller
      className="overflow-x-auto overscroll-x-contain no-scrollbar"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
    >
      <div className="flex w-max gap-5">
        <div ref={setARef} className="flex shrink-0 gap-5">
          {children}
        </div>
        <div ref={setBRef} className="flex shrink-0 gap-5">
          {children}
        </div>
        <div aria-hidden="true" className="flex shrink-0 gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
