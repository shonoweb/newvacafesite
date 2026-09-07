"use client";

import { useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

export function TextHoverEffect({ text, className = "" }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(event: React.MouseEvent<SVGSVGElement>) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((event.clientX - rect.left) / rect.width) * 100;
    const cy = ((event.clientY - rect.top) / rect.height) * 100;
    setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 700 180"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      onMouseEnter={() => !prefersReducedMotion && setHovered(true)}
      onMouseLeave={() => !prefersReducedMotion && setHovered(false)}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
    >
      <defs>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="black" />
          <circle
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            r={hovered ? "220" : "0"}
            fill="white"
            style={{ transition: "r 0.4s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="640"
        lengthAdjust="spacingAndGlyphs"
        className="fill-transparent font-black"
        stroke="#FFFDF7"
        strokeWidth="1"
        style={{ fontSize: 132, fontFamily: "var(--font-noto-sans-jp)" }}
      >
        {text}
      </text>

      {/*
        Always rendered (never gated on the `prefersReducedMotion` boolean):
        that hook reads the real media query synchronously on the client's
        first render, so branching the SVG tree on it here would mismatch
        the server-rendered markup and break hydration. Reduced-motion users
        simply never get `hovered=true` (mouse handlers above are no-ops for
        them), so this layer stays fully masked and invisible regardless.
      */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="640"
        lengthAdjust="spacingAndGlyphs"
        fill="#FBE311"
        mask={`url(#${maskId})`}
        className="font-black"
        style={{ fontSize: 132, fontFamily: "var(--font-noto-sans-jp)" }}
      >
        {text}
      </text>
    </svg>
  );
}
