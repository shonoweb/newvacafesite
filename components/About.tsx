"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/data/images";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";

export function About() {
  const textContent = (
    <>
      <span className="inline-flex w-fit items-center gap-2 text-sm font-bold tracking-[0.2em] text-brand/60">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
        ABOUT
      </span>

      <h2 className="mt-4 text-3xl font-black leading-[1.2] [word-break:keep-all] sm:text-4xl md:text-[1.9rem] lg:text-4xl">
        朝のコーヒーも、
        <br />
        午後のケーキも。
      </h2>

      <p className="mt-5 max-w-sm leading-relaxed text-brand/80">
        エスプレッソを使った定番のドリンクと、店内で仕上げる3種類のケーキをご用意しています。朝のコーヒーにも、買い物途中の休憩にもどうぞ。
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-bold tracking-[0.15em] text-brand/45">
        <span>COFFEE / CAKE / OSAKA</span>
        <span aria-hidden="true" className="text-brand/25">
          ・
        </span>
        <span>OPEN 8:00 — 20:00</span>
      </div>
    </>
  );

  return (
    <section id="about" className="bg-brand-base py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
          {/* Desktop (>=768px): clipPath reveal, untouched. */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(4% 4% 4% 4% round 1.5rem)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }}
            className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-3xl md:col-span-7 md:block md:aspect-[6/5] md:self-start"
          >
            <Image
              src={IMAGES.aboutInterior}
              alt="観葉植物とカウンターがあるNEWVA CAFEの店内"
              fill
              sizes="58vw"
              className="object-cover"
            />
          </motion.div>

          {/* Mobile (<768px) diagnostic: a plain static element, not a
              motion component — no initial/whileInView/clipPath animation
              of any kind runs here. This renders already in its final
              state from the first frame, to test whether the
              viewport-entry animation itself (not just the Y movement
              fixed previously) contributes to the "screen tugged"
              feeling reported at mobile section boundaries. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl md:hidden">
            <Image
              src={IMAGES.aboutInterior}
              alt="観葉植物とカウンターがあるNEWVA CAFEの店内"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Desktop: fade-up reveal, untouched. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.base, ease: EASE_SMOOTH, delay: 0.1 }}
            className="mt-8 hidden flex-col md:col-span-5 md:mt-0 md:flex md:pl-1"
          >
            {textContent}
          </motion.div>

          {/* Mobile diagnostic: plain static element, no motion. */}
          <div className="mt-8 flex flex-col md:hidden">{textContent}</div>
        </div>
      </div>
    </section>
  );
}
