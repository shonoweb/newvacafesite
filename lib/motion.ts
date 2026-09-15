export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.5,
  base: 0.6,
  slow: 0.8,
} as const;

export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/**
 * Add to any motion element whose `initial`/`whileInView` animates `y`.
 * Pairs with the `.section-reveal-y` rule in globals.css, which forces
 * `transform: none` below 768px — so on mobile these sections only ever
 * animate opacity, never position.
 *
 * This is a CSS override rather than a JS `isMobile` branch on the
 * initial/whileInView values themselves — that was tried first and had a
 * real bug: Framer Motion renders `initial` into the server-rendered HTML
 * for SSR, and the server has no way to know the client's viewport width,
 * so `initial` always bakes in the desktop (with-`y`) value there. A
 * client-side `isMobile` check only becomes correct after hydration, by
 * which point that first `y` offset is already committed to the DOM —
 * and a `whileInView` target that simply omits `y` doesn't reset it back
 * to 0, it just stops mentioning it, so the section was left permanently
 * offset on mobile instead of unmoving. A CSS media query has no such
 * gap: it's correct from the very first paint, independent of any JS
 * execution or hydration timing.
 */
export const SECTION_REVEAL_Y = "section-reveal-y";
