"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE_SMOOTH } from "@/lib/motion";

interface WordsPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function WordsPullUp({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {/* Accessible name via plain visually-hidden text content, not
          aria-label: a bare <span> has no ARIA role, and aria-label is
          prohibited on elements without an accessible-name-supporting
          role (axe-core: aria-prohibited-attr). Native text content
          needs no ARIA at all — screen readers just read it — so this
          reads "NEWVA CAFE" once, cleanly, while the decorative
          word-by-word animation below is hidden from assistive tech as
          a single group. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {words.map((word, i) => {
          const isLast = i === words.length - 1;

          return (
            <motion.span
              key={`${word}-${i}`}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : delay + i * 0.08,
                ease: EASE_SMOOTH,
              }}
              className={`inline-block ${wordClassName}`}
              style={{ marginRight: isLast ? 0 : "0.28em" }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
