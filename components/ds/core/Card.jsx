"use client";
import React from "react";

export function Card({ children, variant = "glass", padding = "var(--space-8)", interactive = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    glass: { background: "var(--surface-card)", border: "1px solid var(--border-hairline)", backdropFilter: "blur(var(--blur-glass))" },
    solid: { background: "var(--surface-card-solid)", border: "1px solid var(--border-hairline)" },
    hairline: { background: "transparent", border: "1px solid var(--border-hairline)" },
    gold: { background: "rgba(201,162,74,.07)", border: "1px solid var(--border-gold)" },
    inverse: { background: "var(--marble-100)", border: "1px solid var(--border-inverse)", color: "var(--text-on-inverse)" }
  };
  return (
    <div
      onMouseEnter={function () { setHover(true); }} onMouseLeave={function () { setHover(false); }}
      style={{
        borderRadius: "var(--radius-card)", padding: padding, boxShadow: "var(--shadow-md)",
        transition: "var(--transition-hover)", ...variants[variant],
        ...(interactive && hover ? { transform: "var(--hover-lift)", borderColor: "var(--border-gold)", boxShadow: "var(--shadow-lg)" } : null),
        ...style
      }}
      {...rest}
    >{children}</div>
  );
}
