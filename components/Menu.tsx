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
    <article className="group w-64 min-w-64 max-w-64 shrink-0 sm:w-72 sm:min-w-72 sm:max-w-72">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-sub">
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

      {/* Text content is a plain block at the card's full width — never
          narrower than the image above it — so the name column always has
          the entire card width (minus the price column) to lay out in. */}
      <div className="mt-4 w-full">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="min-w-0 whitespace-normal break-words font-bold leading-tight text-brand">
            {item.nameJa}
          </h3>
          <span className="shrink-0 whitespace-nowrap font-bold text-brand">
            ¥{item.price.toLocaleString()}
          </span>
        </div>
        <p className="min-w-0 whitespace-normal break-words text-xs text-brand/50">
          {item.name}
        </p>

        {item.description && (
          <p className="mt-1.5 line-clamp-1 text-sm text-brand/60">
            {item.description}
          </p>
        )}
      </div>

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
        {/* These fades are edge vignettes for the IMAGE row only — their
            height is pinned to exactly the image block's height (aspect-[4/5]
            of the card width: 256px card -> 320px tall, 288px card -> 360px
            tall). Never stretch them with inset-y-0/h-full: a full-height
            overlay sits (at z-10) on top of the name/price text below the
            image too, and visibly washes it out whenever a card is near
            either edge — even while the card itself is fully on screen. */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-80 w-10 bg-gradient-to-r from-brand-sub to-transparent sm:h-[360px] sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-80 w-10 bg-gradient-to-l from-brand-sub to-transparent sm:h-[360px] sm:w-24" />
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
