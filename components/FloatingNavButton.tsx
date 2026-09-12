"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/motion";
import { FOCUS_RING_ACCENT } from "@/lib/styles";
import { useNavMenu } from "@/components/nav-menu-context";

/**
 * Fixed top-right "MENU" button. Hero carries its own nav, but that nav
 * scrolls away with Hero — this fills the gap for every section after it,
 * on every breakpoint, reusing the same overlay Hero's mobile hamburger
 * opens. Hidden while Hero is in view and while the overlay itself is open.
 *
 * Lives in the root layout, so it's never unmounted by a client-side route
 * change — the `pathname` dependency below matters: without it, navigating
 * away from "/" (where Hero had already scrolled out of view) leaves the
 * observer watching a now-detached #hero node, which reports
 * isIntersecting: false forever, so the button would incorrectly keep
 * showing on pages — like /menu — that have no Hero at all. Re-running the
 * effect per route re-checks for #hero on whatever page is now mounted.
 */
export function FloatingNavButton() {
  const { isOpen, open } = useNavMenu();
  const [heroVisible, setHeroVisible] = useState(true);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => {
      observer.disconnect();
      // Leaving a page that had #hero: reset to the "hidden" default so a
      // route with no Hero at all doesn't inherit a stale false reading
      // from the disconnected observer.
      setHeroVisible(true);
    };
  }, [pathname]);

  const visible = !heroVisible && !isOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          id="floating-nav-button"
          onClick={open}
          aria-label="メニューを開く"
          aria-haspopup="dialog"
          aria-expanded={false}
          aria-controls="nav-overlay"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            ease: EASE_SMOOTH,
          }}
          className={`fixed right-5 top-5 z-50 flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-bold tracking-wide text-brand-base transition-colors hover:bg-brand-accent hover:text-brand sm:right-8 sm:top-6 ${FOCUS_RING_ACCENT}`}
        >
          <Menu size={18} strokeWidth={2.25} />
          MENU
        </motion.button>
      )}
    </AnimatePresence>
  );
}
