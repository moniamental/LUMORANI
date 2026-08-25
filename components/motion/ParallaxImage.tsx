"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Bild mit scroll-gekoppeltem Parallax-Drift. Das Bild überscannt seinen Rahmen
 * (Height 132 %), damit beim Verschieben keine Kanten sichtbar werden.
 * `amount` = Drift in % der Bildhöhe (Standard 8). Respektiert reduced-motion.
 */
export function ParallaxImage({
  src,
  alt = "",
  amount = 8,
  className,
  style,
  priority = false,
}: {
  src: string;
  alt?: string;
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={{
          position: "absolute",
          left: 0,
          top: "-16%",
          width: "100%",
          height: "132%",
          objectFit: "cover",
          y: reduce ? 0 : y,
          willChange: "transform",
        }}
      />
    </div>
  );
}
