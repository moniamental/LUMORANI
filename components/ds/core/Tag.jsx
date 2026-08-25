"use client";
import React from "react";

export function Tag({ children, selected = false, onClick, disabled, style }) {
  const [hover, setHover] = React.useState(false);
  const interactive = Boolean(onClick);
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} aria-pressed={interactive ? selected : undefined}
      onMouseEnter={function () { setHover(true); }} onMouseLeave={function () { setHover(false); }}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44, gap: "8px", padding: "9px 16px",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)",
        textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)",
        borderRadius: "var(--radius-pill)", cursor: interactive && !disabled ? "pointer" : "default",
        transition: "var(--transition-hover)", opacity: disabled ? 0.35 : 1,
        border: "1px solid " + (selected ? "var(--gold-300)" : hover && interactive ? "var(--border-hairline-strong)" : "var(--border-hairline)"),
        background: selected ? "rgba(201,162,74,.14)" : "transparent",
        color: selected ? "var(--gold-100)" : "var(--text-secondary)", ...style
      }}
    >{children}</button>
  );
}
