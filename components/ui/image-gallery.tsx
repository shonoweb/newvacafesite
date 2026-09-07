"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/lib/styles";
import type { GalleryImage } from "@/data/gallery";

interface ExpandingImageRowProps {
  images: GalleryImage[];
}

export function ExpandingImageRow({ images }: ExpandingImageRowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex h-[420px] w-full items-stretch gap-2">
      {images.map((image, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={image.id}
            type="button"
            aria-label={image.alt}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            className={cn(
              "group relative h-full flex-grow overflow-hidden rounded-2xl transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isActive ? "w-full" : "w-24 sm:w-40",
              FOCUS_RING,
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 40vw"
              className={cn(
                "object-cover object-center transition-transform duration-700",
                isActive ? "scale-100" : "scale-105",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 bg-brand/25 transition-opacity duration-500",
                isActive ? "opacity-0" : "opacity-100",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
