import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MenuPageHeader } from "@/components/MenuPageHeader";
import { MenuPageProductCard } from "@/components/MenuPageProductCard";
import { Footer } from "@/components/Footer";
import { DRINK_ITEMS, CAKE_ITEMS } from "@/data/menu";
import { FOCUS_RING } from "@/lib/styles";

export const metadata: Metadata = {
  title: "MENU | NEWVA CAFE",
  description:
    "NEWVA CAFEのドリンク・ケーキメニュー一覧。エスプレッソを使ったドリンク10種と、自家製ケーキ3種の価格と説明をご紹介します。",
};

const GRID_CLASSES =
  "mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function MenuPage() {
  return (
    <>
      <MenuPageHeader />

      <main className="flex flex-1 flex-col">
        <section className="pb-8 pt-14 sm:pb-11 sm:pt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <span className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-brand/60">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brand-accent"
              />
              NEWVA CAFE
            </span>
            <h1 className="mt-3 text-[clamp(3rem,10vw,5.5rem)] font-black leading-[0.95] tracking-tight text-brand">
              MENU
            </h1>
            <p className="mt-3 text-sm font-bold tracking-[0.2em] text-brand/50">
              DRINK &amp; CAKE — 全13品
            </p>
          </div>
        </section>

        <section id="drink" className="py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-brand/10 pb-4">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                DRINK
              </h2>
              <span className="text-xs font-bold tracking-[0.15em] text-brand/40">
                {DRINK_ITEMS.length} ITEMS
              </span>
            </div>
            <div className={GRID_CLASSES}>
              {DRINK_ITEMS.map((item) => (
                <MenuPageProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="cake" className="py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-brand/10 pb-4">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                CAKE
              </h2>
              <span className="text-xs font-bold tracking-[0.15em] text-brand/40">
                {CAKE_ITEMS.length} ITEMS
              </span>
            </div>
            <div className={GRID_CLASSES}>
              {CAKE_ITEMS.map((item) => (
                <MenuPageProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-4 sm:px-8">
          <Link
            href="/"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/20 px-5 py-2.5 text-sm font-bold tracking-wide text-brand transition-colors hover:border-brand hover:bg-brand hover:text-brand-base ${FOCUS_RING}`}
          >
            <ArrowLeft size={16} />
            BACK TO HOME
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
