"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExpandingImageRow } from "@/components/ui/image-gallery";
import { GALLERY_IMAGES } from "@/data/gallery";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";

export function Gallery() {
  const heading = (
    <>
      <span className="text-sm font-bold tracking-[0.2em] text-brand/60">
        GALLERY
      </span>
      <h2 className="text-3xl font-black leading-tight sm:text-4xl">
        NEWVA CAFEの店内。
      </h2>
    </>
  );

  return (
    <section id="gallery" className="bg-brand-base py-20 sm:py-28">
      {/* Desktop: fade-up reveal, untouched. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        className="mx-auto hidden max-w-6xl flex-col gap-3 px-5 sm:px-8 md:flex"
      >
        {heading}
      </motion.div>

      {/* Mobile diagnostic: plain static element, no motion. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8 md:hidden">
        {heading}
      </div>

      {/* Desktop: hover to expand */}
      <div className="mx-auto mt-10 hidden max-w-6xl px-5 sm:px-8 md:block">
        <ExpandingImageRow images={GALLERY_IMAGES} />
      </div>

      {/* Mobile: horizontal swipe, scroll-snap. overscroll-x-contain stops
          this row's scroll interaction from chaining out to the page — the
          standard mitigation for WebKit bug 240861 (any nested horizontal
          overflow container can make iOS Safari's address bar shift mid
          vertical-swipe; Apple resolved it as intentional Safari UI
          behavior, not something fixable from page code alone).
          Deliberately no `touch-action` override: `pan-x` was tried here
          first, but per the CSS Touch Action spec, once a touch starts on
          an element restricted to `pan-x`, the browser has no permitted
          native action for that gesture's vertical component for the rest
          of the touch — and that restriction doesn't fall through to the
          page underneath. On a real device that meant a vertical swipe
          starting on a photo didn't scroll the page at all. Leaving
          `touch-action` at its default `auto` lets the browser do its
          normal, correct per-gesture axis disambiguation instead. */}
      <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 no-scrollbar md:hidden">
        {GALLERY_IMAGES.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="78vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
