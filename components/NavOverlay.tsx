"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { EASE_SMOOTH } from "@/lib/motion";
import { FOCUS_RING_ACCENT } from "@/lib/styles";
import { handleSectionLinkClick } from "@/lib/scroll";
import { useNavMenu } from "@/components/nav-menu-context";

/**
 * Full-screen nav overlay shared by every open trigger on the site (see
 * NavMenuProvider). A right-hand drawer would read as SaaS-panel chrome;
 * this instead reuses the same bold, brand-colored full-screen treatment
 * the mobile menu already used, just scaled up for desktop — one nav
 * system, one visual language, at every breakpoint.
 */
export function NavOverlay() {
  const { isOpen, close } = useNavMenu();
  const prefersReducedMotion = useReducedMotion();
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="サイトナビゲーション"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.35,
            ease: EASE_SMOOTH,
          }}
          className="fixed inset-0 z-[70] flex flex-col bg-brand"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
            <span className="text-lg font-black tracking-tight text-brand-base sm:text-xl">
              NEWVA CAFE
            </span>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="メニューを閉じる"
              className={`flex h-11 w-11 items-center justify-center rounded-full text-brand-base transition-colors hover:text-brand-accent ${FOCUS_RING_ACCENT}`}
            >
              <X size={24} />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col items-center justify-center gap-3 px-5 sm:gap-5"
            aria-label="メインナビゲーション"
          >
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  close();
                  handleSectionLinkClick(event);
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05,
                  ease: EASE_SMOOTH,
                }}
                className={`group flex items-baseline gap-3 rounded text-3xl font-black tracking-tight text-brand-base transition-colors hover:text-brand-accent sm:gap-4 sm:text-5xl lg:text-6xl ${FOCUS_RING_ACCENT}`}
              >
                <span className="text-sm font-bold text-brand-base/40 transition-colors group-hover:text-brand-accent/60 sm:text-base">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
