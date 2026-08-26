"use client";

import { motion, useReducedMotion } from "framer-motion";

const SILK = [0.16, 1, 0.3, 1] as const;

/**
 * Feiner vertikaler Gold-Strich als Abschnitts-Akzent (wie der Hero-Scroll-Hinweis).
 * Zeichnet sich beim Scrollen ein. Reduced-motion: statisch sichtbar.
 */
export function Divider({ height = 72 }: { height?: number }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden style={{ display: "flex", justifyContent: "center", padding: "var(--space-12) 0" }}>
      <motion.div
        initial={reduce ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: SILK }}
        style={{ width: 1, height, transformOrigin: "top", background: "linear-gradient(var(--gold-300), transparent)" }}
      />
    </div>
  );
}
