"use client";
import React from "react";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
  fontFamily: "var(--font-sans)", fontWeight: "var(--weight-medium)",
  textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
  borderRadius: "var(--radius-button)", border: "1px solid transparent",
  cursor: "pointer", transition: "var(--transition-hover)", textDecoration: "none",
  whiteSpace: "nowrap", background: "none"
};

const sizes = {
  sm: { fontSize: "10px", padding: "10px 20px" },
  md: { fontSize: "11px", padding: "15px 32px" },
  lg: { fontSize: "12px", padding: "19px 44px" }
};

const variants = {
  primary: { background: "var(--gradient-gold)", color: "var(--text-on-gold)", borderColor: "transparent" },
  secondary: { background: "transparent", color: "var(--text-gold)", borderColor: "var(--border-gold)" },
  outline: { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-hairline-strong)" },
  ghost: { background: "transparent", color: "var(--text-secondary)", padding: "10px 0", borderColor: "transparent" },
  inverse: { background: "var(--ink-900)", color: "var(--marble-050)", borderColor: "transparent" }
};

const hovers = {
  primary: { filter: "brightness(1.08)", boxShadow: "var(--glow-gold)", transform: "var(--hover-lift)" },
  secondary: { background: "rgba(201,162,74,.12)", borderColor: "var(--gold-300)", color: "var(--gold-100)" },
  outline: { borderColor: "var(--marble-050)", background: "rgba(244,241,236,.06)" },
  ghost: { color: "var(--text-primary)" },
  inverse: { background: "var(--ink-700)", transform: "var(--hover-lift)" }
};

export function Button({
  children, variant = "primary", size = "md", fullWidth = false, disabled = false,
  iconLeft, iconRight, href, onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? "a" : "button";
  const s = {
    ...base, ...sizes[size], ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(press && !disabled ? { transform: "var(--press-scale)", boxShadow: "none" } : null),
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.38 : 1,
    pointerEvents: disabled ? "none" : undefined,
    ...style
  };
  const underline = variant === "ghost" ? {
    position: "absolute", left: 0, bottom: 4, height: "1px", width: hover ? "100%" : "24px",
    background: "currentColor", transition: "width var(--duration-base) var(--ease-out-silk)"
  } : null;
  return (
    <Tag
      href={href} onClick={onClick} disabled={!href ? disabled : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ ...s, position: variant === "ghost" ? "relative" : undefined }} {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
      {underline ? <span style={underline} /> : null}
    </Tag>
  );
}
