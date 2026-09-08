"use client";

import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { FOCUS_RING_ACCENT } from "@/lib/styles";
import { handleSectionLinkClick } from "@/lib/scroll";
import { useNavMenu } from "@/components/nav-menu-context";

export function Header() {
  const { isOpen, toggle } = useNavMenu();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a
          href="#hero"
          onClick={handleSectionLinkClick}
          className={`rounded text-lg font-black tracking-tight text-brand-base drop-shadow-sm sm:text-xl ${FOCUS_RING_ACCENT}`}
        >
          NEWVA CAFE
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleSectionLinkClick}
              className={`rounded text-sm font-medium tracking-wide text-brand-base/90 drop-shadow-sm transition-colors hover:text-brand-accent ${FOCUS_RING_ACCENT}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="メニューを開く"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="nav-overlay"
          onClick={toggle}
          className={`flex h-11 w-11 items-center justify-center rounded-full text-brand-base md:hidden ${FOCUS_RING_ACCENT}`}
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
