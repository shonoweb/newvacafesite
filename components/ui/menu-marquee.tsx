"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MarqueeTrackProps {
  children: ReactNode;
  /** Seconds for one full loop. Lower is faster. */
  duration?: number;
}

/**
 * Renders two identical copies of `children` side by side and animates the
 * track from translateX(0) to translateX(-distance), where `distance` is the
 * *measured* pixel gap between the start of copy A and the start of copy B
 * (offsetLeft difference) — not an assumed 50%. A 50% guess only lines up
 * with "exactly one copy width" when there's zero gap between the two
 * copies; with a real gap between them (from the track's own `gap-5`), 50%
 * of the combined width undershoots the true repeat distance, so the loop
 * snaps a few pixels short every cycle. Measuring the actual DOM distance
 * is immune to that regardless of gap, card count, or viewport width, so
 * copy B always lands exactly where copy A started — the reset is
 * invisible, forever.
 */
export function MarqueeTrack({ children, duration = 42 }: MarqueeTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const secondSetRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const userPausedRef = useRef(false);

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

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function start() {
      const distance = secondSet.offsetLeft - firstSet.offsetLeft;
      if (distance <= 0) return;

      const previous = animationRef.current;
      const resumeAt = previous ? Number(previous.currentTime) || 0 : 0;
      const wasPaused = previous ? previous.playState === "paused" : false;
      previous?.cancel();

      const next = track.animate(
        [
          { transform: "translateX(0px)" },
          { transform: `translateX(-${distance}px)` },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: "linear",
        },
      );

      next.currentTime = resumeAt % (duration * 1000);
      if (wasPaused || userPausedRef.current) next.pause();

      animationRef.current = next;
    }

    function stop() {
      animationRef.current?.cancel();
      animationRef.current = null;
      track.style.transform = "";
    }

    function syncToPreference() {
      if (reducedMotionQuery.matches) {
        stop();
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
    const resizeObserver = new ResizeObserver(() => {
      if (!reducedMotionQuery.matches) start();
    });
    resizeObserver.observe(firstSet);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncToPreference);
      resizeObserver.disconnect();
      animationRef.current?.cancel();
      animationRef.current = null;
    };
  }, [duration]);

  function pause() {
    userPausedRef.current = true;
    animationRef.current?.pause();
  }

  function resume() {
    userPausedRef.current = false;
    animationRef.current?.play();
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
