"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const SILK = [0.16, 1, 0.3, 1] as const;

/**
 * Zeilen-Maske: Text steigt hinter overflow:hidden hervor (editorial, cinematic).
 * Mehrzeilig über `lines`. whileInView, einmalig. Respektiert reduced-motion.
 */
export function MaskReveal({
  lines,
  delay = 0,
  style,
  className,
  as = "h2",
}: {
  lines: string[];
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
  };
  const line: Variants = {
    hidden: { y: reduce ? "0%" : "115%" },
    show: { y: "0%", transition: { duration: 0.9, ease: SILK } },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {lines.map((text, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span variants={line} style={{ display: "block", willChange: "transform" }}>
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
