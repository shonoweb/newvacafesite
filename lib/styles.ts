/** Shared focus-visible ring classes. Kept explicit (not a plain CSS
 * `:focus-visible` rule) because Tailwind v4's own outline utilities need to
 * win the cascade against Tailwind's generated base layer reliably. */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#261606]";

export const FOCUS_RING_ACCENT =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbe311]";
