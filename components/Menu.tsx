"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MarqueeTrack } from "@/components/ui/menu-marquee";
import { MENU_ITEMS, type MenuItem } from "@/data/menu";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";
import { FOCUS_RING } from "@/lib/styles";
import { handleSectionLinkClick } from "@/lib/scroll";

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group w-64 shrink-0 sm:w-72">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-sub">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-base/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-brand/70">
          {item.no}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 min-h-11 font-bold leading-tight text-brand">
            {item.nameJa}
          </h3>
          <p className="line-clamp-1 text-xs text-brand/50">{item.name}</p>
        </div>
        <p className="shrink-0 font-bold text-brand">
          ¥{item.price.toLocaleString()}
        </p>
      </div>

      {item.description && (
        <p className="mt-1.5 line-clamp-1 text-sm text-brand/60">
          {item.description}
        </p>
      )}

      <span
        aria-hidden="true"
        className="mt-2 block h-0.5 w-0 bg-brand-accent transition-all duration-300 group-hover:w-8"
      />
    </article>
  );
}

export function Menu() {
  return (
    <section id="menu" className="bg-brand-sub py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8"
      >
        <span className="text-sm font-bold tracking-[0.2em] text-brand/60">
          MENU
        </span>
        <h2 className="text-3xl font-black leading-tight sm:text-4xl">
          コーヒーとケーキ。
        </h2>
        <p className="max-w-md leading-relaxed text-brand/70">
          エスプレッソ、カフェラテ、コールドブリューなどのドリンク10種と、ケーキ3種をご用意しています。
        </p>
      </motion.div>

      {/* Infinite carousel: auto-scrolls on pointer/hover devices (paused
          on hover/focus), and always swipeable/scrollable by hand — on any
          device — with no physical start or end. */}
      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-sub to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-sub to-transparent sm:w-24" />
        <div className="px-5 sm:px-8">
          <MarqueeTrack duration={48}>
            {MENU_ITEMS.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </MarqueeTrack>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl justify-center px-5 sm:px-8">
        <a
          href="#menu"
          onClick={handleSectionLinkClick}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/20 px-6 py-2.5 text-sm font-bold tracking-wide text-brand transition-colors hover:border-brand hover:bg-brand hover:text-brand-base ${FOCUS_RING}`}
        >
          VIEW ALL MENU
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
