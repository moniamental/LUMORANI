"use client";
import React from "react";

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "dark", size = "lg", rule = true, style }) {
  const light = tone === "light";
  const sizes = { sm: "var(--text-title)", md: "var(--text-display-3)", lg: "var(--text-display-2)" };
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? "760px" : undefined, margin: align === "center" ? "0 auto" : undefined, ...style }}>
      {eyebrow ? (
        <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)", marginBottom: "var(--space-5)" }}>{eyebrow}</div>
      ) : null}
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: sizes[size], lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)", color: light ? "var(--text-on-inverse)" : "var(--text-primary)" }}>{title}</h2>
      {rule ? (
        <div style={{ width: 64, height: 1, background: "var(--gradient-gold)", margin: align === "center" ? "var(--space-6) auto 0" : "var(--space-6) 0 0" }} />
      ) : null}
      {subtitle ? (
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: light ? "var(--text-on-inverse-muted)" : "var(--text-secondary)" }}>{subtitle}</p>
      ) : null}
    </div>
  );
}
