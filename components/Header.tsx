"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { FOCUS_RING_ACCENT } from "@/lib/styles";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a
          href="#hero"
          className={`rounded text-lg font-black tracking-tight text-brand-base drop-shadow-sm sm:text-xl ${FOCUS_RING_ACCENT}`}
        >
          NEWVA CAFE
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded text-sm font-medium tracking-wide text-brand-base/90 drop-shadow-sm transition-colors hover:text-brand-accent ${FOCUS_RING_ACCENT}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-full text-brand-base md:hidden ${FOCUS_RING_ACCENT}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col bg-brand transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="flex flex-1 flex-col items-center justify-center gap-8"
          aria-label="モバイルナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded text-2xl font-bold tracking-wide text-brand-base transition-colors hover:text-brand-accent ${FOCUS_RING_ACCENT}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
