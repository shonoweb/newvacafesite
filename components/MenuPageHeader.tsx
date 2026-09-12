"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOCUS_RING } from "@/lib/styles";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#about" },
  { label: "MENU", href: "/menu" },
  { label: "GALLERY", href: "/#gallery" },
  { label: "ACCESS", href: "/#access" },
];

/**
 * A static (non-overlay) header for /menu and any other page that isn't
 * sitting on top of Hero's photo. Hero's own <Header> is absolutely
 * positioned with white, drop-shadowed text for that specific use case —
 * this one is plain brand-on-brand-base, in normal document flow.
 */
export function MenuPageHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-brand/10 bg-brand-base">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
        <Link
          href="/"
          className={`w-fit rounded text-lg font-black tracking-tight text-brand sm:text-xl ${FOCUS_RING}`}
        >
          NEWVA CAFE
        </Link>

        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6"
          aria-label="メインナビゲーション"
        >
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-block rounded text-sm font-medium tracking-wide transition-colors ${FOCUS_RING} ${
                  isActive ? "text-brand" : "text-brand/70 hover:text-brand"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-2 h-[2px] rounded-full bg-brand-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
