"use client";
import React from "react";

const sizes = { sm: 32, md: 40, lg: 48 };

export function IconButton({ children, label, variant = "ghost", size = "md", shape = "circle", onClick, disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const d = sizes[size];
  const variants = {
    ghost: { background: "transparent", border: "1px solid transparent", color: "var(--text-secondary)" },
    hairline: { background: "rgba(255,255,255,.03)", border: "1px solid var(--border-hairline)", color: "var(--text-primary)" },
    gold: { background: "var(--gradient-gold)", border: "1px solid transparent", color: "var(--text-on-gold)" },
    inverse: { background: "var(--ink-900)", border: "1px solid transparent", color: "var(--marble-050)" }
  };
  const hovers = {
    ghost: { color: "var(--text-primary)" },
    hairline: { borderColor: "var(--border-gold)", color: "var(--text-gold)" },
    gold: { filter: "brightness(1.08)", boxShadow: "var(--glow-gold)" },
    inverse: { background: "var(--ink-700)" }
  };
  return (
    <button
      aria-label={label} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: d, height: d, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: shape === "circle" ? "var(--radius-pill)" : "var(--radius-button)",
        cursor: "pointer", transition: "var(--transition-hover)", padding: 0,
        opacity: disabled ? 0.35 : 1, ...variants[variant], ...(hover && !disabled ? hovers[variant] : null), ...style
      }}
      {...rest}
    >{children}</button>
  );
}
