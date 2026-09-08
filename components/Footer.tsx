"use client";

import { motion } from "framer-motion";
import { TextHoverEffect } from "@/components/ui/hover-footer";
import { FOOTER_INFO, FOOTER_NAV, FOOTER_SOCIAL } from "@/data/footer";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";
import { FOCUS_RING_ACCENT } from "@/lib/styles";
import { handleSectionLinkClick } from "@/lib/scroll";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-brand text-brand-base">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-3"
      >
        <div>
          <p className="text-2xl font-black tracking-tight">NEWVA CAFE</p>
          <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-brand-base/70">
            コーヒーとケーキを気軽に楽しめるカフェです。
            <br />
            朝8時から夜8時まで営業しています。
          </p>
        </div>

        <nav aria-label="フッターナビゲーション">
          <p className="text-xs font-bold tracking-[0.2em] text-brand-base/40">
            MENU
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleSectionLinkClick}
                  className={`rounded text-sm text-brand-base/85 transition-colors hover:text-brand-accent ${FOCUS_RING_ACCENT}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-brand-base/40">
            INFO
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-brand-base/85">
            {FOOTER_INFO.map((row) => (
              <li key={row.label} className="flex gap-2">
                <span className="text-brand-base/50">{row.label}</span>
                <span>{row.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-3">
            {FOOTER_SOCIAL.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-brand-base/25 text-brand-base transition-colors hover:border-brand-accent hover:text-brand-accent ${FOCUS_RING_ACCENT}`}
              >
                <InstagramIcon />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="border-t border-brand-base/10 px-5 py-6 text-center text-xs text-brand-base/50 sm:px-8">
        © {year} NEWVA CAFE. All rights reserved.
      </div>

      {/* Desktop: interactive hover wordmark */}
      <div className="hidden h-[220px] w-full items-center justify-center overflow-hidden md:flex lg:h-[260px]">
        <div className="h-full w-full max-w-6xl">
          <TextHoverEffect text="NEWVA CAFE" />
        </div>
      </div>

      {/* Mobile: static large wordmark, no hover dependency */}
      <div className="flex flex-col items-center gap-1 pb-10 pt-2 md:hidden">
        <span className="text-[clamp(2.75rem,17vw,4.5rem)] font-black leading-[0.9] tracking-tight text-brand-base/95">
          NEWVA
        </span>
        <span className="text-[clamp(2.75rem,17vw,4.5rem)] font-black leading-[0.9] tracking-tight text-brand-accent">
          CAFE
        </span>
      </div>
    </footer>
  );
}
