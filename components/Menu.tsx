"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MarqueeTrack } from "@/components/ui/menu-marquee";
import { MENU_ITEMS, type MenuItem } from "@/data/menu";
import { DURATION, EASE_SMOOTH, VIEWPORT_ONCE } from "@/lib/motion";
import { FOCUS_RING } from "@/lib/styles";
import { useMediaQuery } from "@/lib/use-media-query";

/** Width (px) of the fade zone at each edge of the carousel's true visible
 * area. A card's text ramps from fully hidden — right at the edge, exactly
 * where clipping would start — to fully shown over this distance. Opacity
 * is driven directly off the text block's real position on every scroll
 * event (autoplay's own writes fire native `scroll` events same as manual
 * scrolling does), not off a threshold-crossing + CSS transition: a CSS
 * transition was tried first and measurably reintroduced the exact bug
 * during a fast manual flick, because a 150-250ms fade responding to a
 * binary on/off flip can't keep up with the card's real position at flick
 * speed, leaving a semi-opaque, partially-clipped string visible for a
 * frame or two. Recomputing the exact ratio every frame instead means the
 * displayed opacity is never more than one frame behind reality at any
 * scroll speed, and — because the ramp is defined to reach 0 exactly at
 * the physical clip edge — a character is never both clipped and visible:
 * it fades below perceptibility before the overflow boundary reaches it. */
const TEXT_FADE_ZONE_PX = 64;
/** Small, subtle settle distance for the accompanying translateY — driven
 * by the same ratio as opacity so the two never fall out of sync. */
const TEXT_FADE_TRANSLATE_PX = 4;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function useEdgeFade<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Default to fully shown so a centered card's text isn't invisible on
  // first paint before the first measurement lands — worst case is one
  // frame of a peeking card showing its text a moment early.
  const [ratio, setRatio] = useState(1);

  // MenuCard (and this hook) is only ever rendered inside the desktop
  // `hidden md:block` marquee, but `display: none` doesn't stop effects
  // from running — every one of the 39 hidden instances (13 items x the
  // marquee's 3 duplicated sets) would otherwise keep a `scroll` listener
  // and a `window` "resize" listener live on mobile too. iOS Safari fires
  // `resize` repeatedly while its address bar animates during an ordinary
  // scroll, so that's up to 39 forced-layout reads plus React state
  // updates firing on the main thread in the middle of the user's own
  // scroll gesture — see the matching guard in menu-marquee.tsx for the
  // full reasoning.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const el = ref.current;
    const scroller = el?.closest("[data-marquee-scroller]") as HTMLElement | null;
    if (!isDesktop || !el || !scroller) return;

    function update() {
      const scrollerRect = scroller!.getBoundingClientRect();
      const textRect = el!.getBoundingClientRect();

      const hardLeft = scrollerRect.left;
      const hardRight = scrollerRect.right;
      const safeLeft = hardLeft + TEXT_FADE_ZONE_PX;
      const safeRight = hardRight - TEXT_FADE_ZONE_PX;

      const fromLeftEdge = clamp01((textRect.left - hardLeft) / (safeLeft - hardLeft));
      const fromRightEdge = clamp01((hardRight - textRect.right) / (hardRight - safeRight));

      setRatio(Math.min(fromLeftEdge, fromRightEdge));
    }

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isDesktop]);

  return {
    ref,
    style: {
      opacity: ratio,
      transform: `translateY(${(1 - ratio) * TEXT_FADE_TRANSLATE_PX}px)`,
      pointerEvents: ratio < 0.5 ? ("none" as const) : ("auto" as const),
    },
  };
}

function MenuCard({ item }: { item: MenuItem }) {
  const { ref: textRef, style: textStyle } = useEdgeFade<HTMLDivElement>();

  return (
    <article className="group w-64 min-w-64 max-w-64 shrink-0 sm:w-72 sm:min-w-72 sm:max-w-72">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-sub">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-base/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-brand/70">
          {item.no}
        </span>
      </div>

      {/* Text content is a plain block at the card's full width — never
          narrower than the image above it — so the name column always has
          the entire card width (minus the price column) to lay out in.
          Opacity/translateY are driven live by useEdgeFade above: fades in
          as the card clears each edge, fades out as it approaches one —
          see that function's comment for why it's a per-frame computed
          style rather than a CSS transition. */}
      <div ref={textRef} style={textStyle} className="mt-4 w-full">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="min-w-0 whitespace-normal break-words font-bold leading-tight text-brand">
            {item.nameJa}
          </h3>
          <span className="shrink-0 whitespace-nowrap font-bold text-brand">
            ¥{item.price.toLocaleString()}
          </span>
        </div>
        <p className="min-w-0 whitespace-normal break-words text-xs text-brand/50">
          {item.name}
        </p>

        {item.description && (
          <p className="mt-1.5 line-clamp-1 text-sm text-brand/60">
            {item.description}
          </p>
        )}
      </div>

      <span
        aria-hidden="true"
        className="mt-2 block h-0.5 w-0 bg-brand-accent transition-all duration-300 group-hover:w-8"
      />
    </article>
  );
}

/** Mobile card (<768px): plain, static markup — no `useEdgeFade`, no active-
 * index tracking, no scroll/resize listeners of any kind. Name, English
 * name, price, and description are always at full opacity from the first
 * frame the section is in view, which is the actual fix for "01 Espresso
 * is unreadably faded on mobile": that card was never dim on purpose, it
 * was the desktop edge-fade ratio (tuned for the 3x-duplicated marquee's
 * geometry) misreading a narrow phone viewport as "near an edge". Having
 * zero JS here also means this row can't be the source of the vertical
 * "jerk" entering/leaving the section — there's nothing that reads or
 * writes scroll position, so there's nothing to fight the page's own
 * scroll with. No `touch-action` override, deliberately: `pan-x` was
 * tried here first and was itself a bug — per the CSS Touch Action spec,
 * once a touch starts on an element restricted to `pan-x`, the browser
 * has no permitted native action for that gesture's vertical component
 * for the rest of the touch, and that restriction doesn't fall through
 * to the page underneath. On a real device that meant a vertical swipe
 * starting on a product photo didn't scroll the page at all. Leaving
 * `touch-action` at its default `auto` lets the browser do its normal,
 * correct per-gesture axis disambiguation instead.
 *
 * A/B diagnostic: no `snap-*` here either, temporarily — scroll-snap-align
 * removed to test whether it (or the row's overscroll-behavior-x, see the
 * row below) is a residual contributor to the section-boundary "jerk"
 * that persisted after the touch-action fix. Card width/gap/radius are
 * unchanged; only the snap alignment is gone for this test. */
function MobileMenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="w-[78vw] shrink-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-sub">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="78vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-base/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-brand/70">
          {item.no}
        </span>
      </div>

      <div className="mt-4 w-full">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="min-w-0 whitespace-normal break-words font-bold leading-tight text-brand">
            {item.nameJa}
          </h3>
          <span className="shrink-0 whitespace-nowrap font-bold text-brand">
            ¥{item.price.toLocaleString()}
          </span>
        </div>
        <p className="min-w-0 whitespace-normal break-words text-xs text-brand/50">
          {item.name}
        </p>

        {item.description && (
          <p className="mt-1.5 line-clamp-1 text-sm text-brand/60">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}

export function Menu() {
  const heading = (
    <>
      <span className="text-sm font-bold tracking-[0.2em] text-brand/60">
        MENU
      </span>
      <h2 className="text-3xl font-black leading-tight sm:text-4xl">
        コーヒーとケーキ。
      </h2>
      <p className="max-w-md leading-relaxed text-brand/70">
        エスプレッソ、カフェラテ、コールドブリューなどのドリンク10種と、ケーキ3種をご用意しています。
      </p>
    </>
  );

  return (
    <section id="menu" className="bg-brand-sub py-20 sm:py-28">
      {/* Desktop: fade-up reveal, untouched. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        viewport={VIEWPORT_ONCE}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE_SMOOTH }}
        className="mx-auto hidden max-w-6xl flex-col gap-3 px-5 sm:px-8 md:flex"
      >
        {heading}
      </motion.div>

      {/* Mobile diagnostic: plain static element, no motion. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8 md:hidden">
        {heading}
      </div>

      {/* Desktop (>=768px): infinite carousel, auto-scrolls on pointer/hover
          devices (paused on hover/focus), and always swipeable/scrollable
          by hand. Untouched — mobile now has its own simpler
          implementation below instead of sharing this one. */}
      <div className="relative mt-12 hidden md:block">
        {/* These fades are edge vignettes for the IMAGE row only — their
            height is pinned to exactly the image block's height (aspect-[4/5]
            of the card width: 256px card -> 320px tall, 288px card -> 360px
            tall). Never stretch them with inset-y-0/h-full: a full-height
            overlay sits (at z-10) on top of the name/price text below the
            image too, and visibly washes it out whenever a card is near
            either edge — even while the card itself is fully on screen. */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-80 w-10 bg-gradient-to-r from-brand-sub to-transparent sm:h-[360px] sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-80 w-10 bg-gradient-to-l from-brand-sub to-transparent sm:h-[360px] sm:w-24" />
        <div className="px-5 sm:px-8">
          <MarqueeTrack duration={48}>
            {MENU_ITEMS.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </MarqueeTrack>
        </div>
      </div>

      {/* Mobile (<768px): plain native horizontal scroll, no autoplay, no
          duplicated sets, no JS scroll/resize listeners. See
          MobileMenuCard above for why. No `touch-action` override — see
          MobileMenuCard above for why that's deliberate.
          A/B diagnostic: no `snap-x`/scroll-snap-type and no
          overscroll-x-contain here either, temporarily — testing whether
          either is a residual contributor to the section-boundary "jerk"
          that persisted after the touch-action fix. Pure
          `overflow-x: auto` only. If this turns out to help, contain
          should come back before snap does (per the requested next step)
          so each can be attributed individually. */}
      <div
        className="mt-12 flex gap-4 overflow-x-auto px-5 pb-2 no-scrollbar md:hidden"
      >
        {MENU_ITEMS.map((item) => (
          <MobileMenuCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl justify-center px-5 sm:px-8">
        <Link
          href="/menu"
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/20 px-6 py-2.5 text-sm font-bold tracking-wide text-brand transition-colors hover:border-brand hover:bg-brand hover:text-brand-base ${FOCUS_RING}`}
        >
          VIEW ALL MENU
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
