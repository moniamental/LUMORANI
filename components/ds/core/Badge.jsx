"use client";
import React from "react";

const tones = {
  gold: { background: "var(--gradient-gold)", color: "var(--text-on-gold)", border: "1px solid transparent" },
  ink: { background: "var(--ink-1000)", color: "var(--marble-050)", border: "1px solid transparent" },
  outline: { background: "rgba(11,11,12,.45)", color: "var(--marble-050)", border: "1px solid var(--border-hairline-strong)" },
  ruby: { background: "var(--gem-ruby)", color: "var(--marble-050)", border: "1px solid transparent" },
  emerald: { background: "var(--gem-emerald)", color: "var(--marble-050)", border: "1px solid transparent" }
};

export function Badge({ children, tone = "gold", style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "5px 10px",
      fontFamily: "var(--font-sans)", fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)",
      textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)",
      borderRadius: "var(--radius-xs)", lineHeight: 1, ...tones[tone], ...style
    }}>{children}</span>
  );
}
