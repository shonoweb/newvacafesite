"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MarqueeTrackProps {
  children: ReactNode;
  /** Seconds for one full loop. Lower is faster. */
  duration?: number;
}

/**
 * Renders two identical copies of `children` side by side and drives the
 * loop with a manual requestAnimationFrame position, not a CSS/Web
 * Animations keyframe. `position` is advanced every frame and wrapped the
 * moment it reaches `setWidth` — the *measured* pixel distance from the
 * start of copy A to the start of copy B (offsetLeft difference), i.e. copy
 * A's own width plus the single gap connecting it to copy B. Because copy B
 * is an exact duplicate of copy A, wrapping at exactly that distance means
 * the frame right after the wrap is pixel-identical to the frame at
 * position 0 — there is no seam to see, at any point, indefinitely, however
 * long it runs.
 */
export function MarqueeTrack({ children, duration = 42 }: MarqueeTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const secondSetRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef(0);
  const setWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trackRef.current || !firstSetRef.current || !secondSetRef.current) {
      return;
    }
    // Narrowed just above, but TS doesn't carry that narrowing into the
    // nested closures below (they may run later, e.g. from a resize), so
    // these are re-bound as definitely-non-null for the rest of the effect.
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    const secondSet = secondSetRef.current;

    function measure() {
      const width = secondSet.offsetLeft - firstSet.offsetLeft;
      if (width <= 0) return;
      setWidthRef.current = width;
      // If a resize shrank the set width below the current position, wrap
      // immediately so we never render past the end of the real content.
      if (positionRef.current >= width) {
        positionRef.current = positionRef.current % width;
      }
    }

    function tick(timestamp: number) {
      const last = lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const width = setWidthRef.current;
      if (last !== null && !pausedRef.current && width > 0) {
        const pxPerMs = width / (duration * 1000);
        let next = positionRef.current + pxPerMs * (timestamp - last);
        if (next >= width) next -= width;
        positionRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    measure();

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function start() {
      if (rafIdRef.current !== null) return;
      lastTimeRef.current = null;
      rafIdRef.current = requestAnimationFrame(tick);
    }

    function stop() {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = null;
    }

    function syncToPreference() {
      if (reducedMotionQuery.matches) {
        stop();
        track.style.transform = "";
      } else {
        start();
      }
    }

    syncToPreference();
    reducedMotionQuery.addEventListener("change", syncToPreference);

    // Card widths are fixed at every viewport where this desktop marquee is
    // shown, so in practice this only ever re-fires from a late web-font
    // swap — but re-measuring costs nothing and keeps the loop exact if
    // that ever changes.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(firstSet);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncToPreference);
      resizeObserver.disconnect();
      stop();
    };
  }, [duration]);

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    pausedRef.current = false;
  }

  return (
    <div
      className="overflow-x-auto no-scrollbar"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div ref={trackRef} data-marquee-track className="flex w-max gap-5">
        <div ref={firstSetRef} className="flex shrink-0 gap-5">
          {children}
        </div>
        <div
          ref={secondSetRef}
          aria-hidden="true"
          className="flex shrink-0 gap-5"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
