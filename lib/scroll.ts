import type { MouseEvent } from "react";

/**
 * Click handler for in-page section links (`href="#id"`).
 *
 * Scrolls to the target smoothly but never touches the URL, so the address
 * bar stays hash-free. That's what lets a reload always land back on Hero —
 * there's simply no fragment for the browser to jump to on the next load.
 */
export function handleSectionLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#") || href.length < 2) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
