import Image from "next/image";
import type { MenuItem } from "@/data/menu";

/**
 * The full-menu-page equivalent of the homepage carousel's card — same
 * "photo / name+price / english name / description" reading order and the
 * same anti-truncation grid for name+price, but with no carousel-only
 * plumbing (no edge-fade, no fixed pixel width) and no SaaS-card chrome
 * (no white background, border, or shadow): it just sits on the page.
 */
export function MenuPageProductCard({ item }: { item: MenuItem }) {
  return (
    <article>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-sub">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-base/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-brand/70">
          {item.no}
        </span>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="min-w-0 whitespace-normal break-words text-lg font-bold leading-snug text-brand">
            {item.nameJa}
          </h3>
          <span className="shrink-0 whitespace-nowrap text-lg font-bold text-brand">
            ¥{item.price.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 min-w-0 whitespace-normal break-words text-xs font-medium tracking-wide text-brand/50">
          {item.name}
        </p>
        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-brand/70">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
