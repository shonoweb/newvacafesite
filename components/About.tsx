"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/data/images";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="bg-brand-base py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(4% 4% 4% 4% round 1.5rem)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl md:col-span-7 md:aspect-[6/5] md:self-start"
          >
            <Image
              src={IMAGES.aboutInterior}
              alt="観葉植物とカウンターがあるNEWVA CAFEの店内"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.base, ease: EASE_SMOOTH, delay: 0.1 }}
            className="mt-8 flex flex-col md:col-span-5 md:mt-0 md:pl-1"
          >
            <span className="inline-flex w-fit items-center gap-2 text-sm font-bold tracking-[0.2em] text-brand/60">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              ABOUT
            </span>

            <h2 className="mt-4 text-3xl font-black leading-[1.2] [word-break:keep-all] sm:text-4xl md:text-[1.9rem] lg:text-4xl">
              コーヒーとケーキを、
              <br />
              いつでも気軽に。
            </h2>

            <p className="mt-5 max-w-sm leading-relaxed text-brand/80">
              NEWVA CAFEでは、定番のコーヒーと店内で仕上げるケーキをご用意しています。明るい店内で、朝の一杯にも、買い物途中の休憩にも気軽にお立ち寄りください。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-bold tracking-[0.15em] text-brand/45">
              <span>COFFEE / CAKE / OSAKA</span>
              <span aria-hidden="true" className="text-brand/25">
                ・
              </span>
              <span>OPEN 8:00 — 20:00</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
