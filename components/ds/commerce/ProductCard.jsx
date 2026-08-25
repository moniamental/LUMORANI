"use client";
import React from "react";
import { Badge } from "../core/Badge.jsx";
import { PriceTag } from "./PriceTag.jsx";

export function ProductCard({ image, name, stone, price, compareAt, badge, ratio = "3 / 4", onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#" onClick={function (e) { e.preventDefault(); if (onClick) onClick(); }}
      onMouseEnter={function () { setHover(true); }} onMouseLeave={function () { setHover(false); }}
      style={{ display: "block", textDecoration: "none", color: "inherit", ...style }}
    >
      <div style={{ position: "relative", aspectRatio: ratio, overflow: "hidden", background: "var(--ink-800)", borderRadius: "var(--radius-image)" }}>
        <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hover ? "var(--image-zoom)" : "none", transition: "transform var(--duration-slow) var(--ease-out-silk)" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-veil)", opacity: hover ? .55 : .25, transition: "var(--transition-hover)" }} />
        {badge ? <div style={{ position: "absolute", top: 14, left: 14 }}><Badge tone="outline">{badge}</Badge></div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "14px 16px", textAlign: "center", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--marble-050)", background: "rgba(7,7,8,.55)", backdropFilter: "blur(var(--blur-glass))", opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(8px)", transition: "var(--transition-hover)" }}>In den Warenkorb</div>
      </div>
      <div style={{ paddingTop: "var(--space-5)", display: "flex", flexDirection: "column", gap: "6px" }}>
        {stone ? <span style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>{stone}</span> : null}
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-snug)", color: hover ? "var(--gold-100)" : "var(--text-primary)", transition: "var(--transition-hover)" }}>{name}</span>
        <PriceTag value={price} compareAt={compareAt} size="sm" />
      </div>
    </a>
  );
}
