"use client";

import { useState, type ReactNode } from "react";

interface MarqueeTrackProps {
  children: ReactNode;
  /** Seconds for one full loop. Lower is faster. */
  duration?: number;
}

export function MarqueeTrack({ children, duration = 42 }: MarqueeTrackProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="overflow-x-auto no-scrollbar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/*
        Looping is CSS-driven (`.animate-marquee`), which is disabled globally
        under `prefers-reduced-motion: reduce` (see globals.css). Gating this
        on the `useReducedMotion()` hook instead would branch the rendered
        tree between server and client and break hydration, since the hook
        reads the real media query synchronously on the client's first render.
      */}
      <div
        className="animate-marquee flex w-max gap-5"
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex shrink-0 gap-5">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
