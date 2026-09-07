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
    <span
      ref={ref}
      aria-label={text}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;

        return (
          <motion.span
            key={`${word}-${i}`}
            aria-hidden="true"
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
  );
}
