"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExpandingImageRow } from "@/components/ui/image-gallery";
import { GALLERY_IMAGES } from "@/data/gallery";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";

export function Gallery() {
  return (
    <section id="gallery" className="bg-brand-base py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8"
      >
        <span className="text-sm font-bold tracking-[0.2em] text-brand/60">
          GALLERY
        </span>
        <h2 className="text-3xl font-black leading-tight sm:text-4xl">
          NEWVA CAFEの店内。
        </h2>
      </motion.div>

      {/* Desktop: hover to expand */}
      <div className="mx-auto mt-10 hidden max-w-6xl px-5 sm:px-8 md:block">
        <ExpandingImageRow images={GALLERY_IMAGES} />
      </div>

      {/* Mobile: horizontal swipe, scroll-snap. touch-action: pan-x tells
          the browser up front that only horizontal panning belongs to this
          row, so a swipe that starts over it is never ambiguous between
          this row and the page's own vertical scroll. overscroll-x-contain
          stops this row's scroll interaction from chaining out to the
          page — the standard mitigation for WebKit bug 240861 (any nested
          horizontal overflow container can make iOS Safari's address bar
          shift mid vertical-swipe; Apple resolved it as intentional Safari
          UI behavior, not something fixable from page code alone). */}
      <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 no-scrollbar [touch-action:pan-x] md:hidden">
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
