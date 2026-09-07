"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { IMAGES } from "@/data/images";
import { EASE_SMOOTH } from "@/lib/motion";
import { FOCUS_RING } from "@/lib/styles";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-brand"
    >
      <Image
        src={IMAGES.heroInterior}
        alt="自然光が差し込むNEWVA CAFEの明るい店内"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/20 to-brand/10" />

      <Header />

      <div className="relative z-10 mt-auto flex flex-col gap-6 px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <h1>
          <WordsPullUp
            text="NEWVA CAFE"
            delay={0.15}
            className="text-[clamp(3rem,13vw,8rem)] font-black leading-[0.95] tracking-tight text-brand-base"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.9,
            ease: EASE_SMOOTH,
          }}
          className="flex max-w-xl flex-col gap-6"
        >
          <p className="max-w-md text-base leading-relaxed text-brand-base/90 sm:text-lg">
            大阪の中心部にある、コーヒーと自家製ケーキの店。開放的な店内で、朝から夜まで気軽に過ごせます。
          </p>

          <a
            href="#menu"
            className={`inline-flex w-fit items-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-bold tracking-wide text-brand transition-transform duration-300 hover:scale-[1.03] focus-visible:scale-[1.03] ${FOCUS_RING}`}
          >
            VIEW MENU
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
