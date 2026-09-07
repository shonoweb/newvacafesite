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
          店内とコーヒーの表情。
        </h2>
      </motion.div>

      {/* Desktop: hover to expand */}
      <div className="mx-auto mt-10 hidden max-w-6xl px-5 sm:px-8 md:block">
        <ExpandingImageRow images={GALLERY_IMAGES} />
      </div>

      {/* Mobile: horizontal swipe, scroll-snap */}
      <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 no-scrollbar md:hidden">
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
