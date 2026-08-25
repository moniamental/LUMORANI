"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const SILK = [0.16, 1, 0.3, 1] as const;

export type QA = { q: string; a: string };

export function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border-hairline)" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-6)",
                padding: "var(--space-6) 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: isOpen ? "var(--gold-100)" : "var(--text-primary)",
                transition: "color var(--duration-base) var(--ease-out-silk)",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{it.q}</span>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 22,
                  height: 22,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--text-gold)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform var(--duration-base) var(--ease-out-silk)",
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: SILK }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ margin: 0, paddingBottom: "var(--space-6)", maxWidth: "60ch", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>
                    {it.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
