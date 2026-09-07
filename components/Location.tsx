"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";

const INFO_ROWS = [
  { label: "住所", value: "OSAKA / SAMPLE LOCATION" },
  { label: "アクセス", value: "最寄駅から徒歩8分" },
  { label: "営業時間", value: "8:00 - 20:00（L.O. 19:30）" },
  { label: "定休日", value: "不定休" },
];

export function Location() {
  return (
    <section id="access" className="bg-brand-sub py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        >
          <span className="text-sm font-bold tracking-[0.2em] text-brand/60">
            VISIT US
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            NEWVA CAFE
          </h2>

          <dl className="mt-8 flex flex-col gap-4">
            {INFO_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-b border-brand/10 pb-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="w-24 shrink-0 text-sm font-bold text-brand/50">
                  {row.label}
                </dt>
                <dd className="text-brand">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-brand/50">
            ※本サイトは制作サンプルのため、架空の店舗情報を掲載しています。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.base, delay: 0.1, ease: EASE_SMOOTH }}
          className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-brand-base"
          style={{
            backgroundImage:
              "linear-gradient(rgba(38,22,6,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(38,22,6,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-brand shadow-sm">
            <MapPin size={26} strokeWidth={2.25} />
          </span>
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-brand">
              OSAKA
            </p>
            <p className="mt-1 text-xs font-bold tracking-[0.25em] text-brand/50">
              SAMPLE LOCATION
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
