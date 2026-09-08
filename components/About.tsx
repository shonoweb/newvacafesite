"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/data/images";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="bg-brand-base py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,44%)_1fr] md:items-center md:gap-14 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(4% 4% 4% 4% round 1.5rem)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl md:aspect-[3/4] md:max-w-md"
        >
          <Image
            src={IMAGES.aboutInterior}
            alt="観葉植物とカウンターがあるNEWVA CAFEの店内"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        >
          <span className="text-sm font-bold tracking-[0.2em] text-brand/60">
            ABOUT
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            コーヒーとケーキを、いつでも気軽に。
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-brand/80">
            NEWVA CAFEでは、エスプレッソを使った定番ドリンクと、3種類のケーキをご用意しています。大きな窓のある明るい店内で、一人でも友人とでもゆっくり過ごせます。朝の一杯にも、買い物の途中の休憩にもどうぞ。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
