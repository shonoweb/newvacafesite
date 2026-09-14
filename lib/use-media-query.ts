"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches. Prefer this over a
 * `window` "resize" listener for gating scroll-adjacent effects: a
 * width-based query's `change` event only fires when the boolean result
 * actually flips (an actual breakpoint crossing), never from iOS Safari's
 * address bar show/hide while scrolling — that only changes viewport
 * *height*, which a `(min-width: ...)` query never observes. A `resize`
 * listener fires on every one of those height wobbles instead.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
