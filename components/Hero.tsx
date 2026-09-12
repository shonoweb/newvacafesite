"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { IMAGES } from "@/data/images";
import { EASE_SMOOTH } from "@/lib/motion";
import { FOCUS_RING } from "@/lib/styles";
import { handleSectionLinkClick } from "@/lib/scroll";

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
        className="object-cover brightness-[1.16] saturate-[1.05]"
      />
      {/* Bottom fade: keeps the title/copy/button readable against the photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand/65 via-brand/10 to-brand/15" />
      {/* Top fade: on its own, separate from the bottom one, so it stays very
          light and fades out well before the mid-point — just enough to lift
          the white nav text off the bright ceiling behind it, not a general
          darkening of the upper photo. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42svh] bg-gradient-to-b from-brand/40 via-brand/10 to-transparent" />

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
          <p className="max-w-lg text-balance text-base leading-relaxed text-brand-base/90 sm:text-lg">
            コーヒーとケーキを気軽に楽しめる、街なかのカフェ。
            <br />
            朝8時から夜8時まで営業しています。
          </p>

          <a
            href="#menu"
            onClick={handleSectionLinkClick}
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
