"use client";
import React from "react";

export function PriceTag({ value, compareAt, currency = "€", size = "md", tone = "dark", locale = "de", style }) {
  const sizes = { sm: "var(--text-body-sm)", md: "var(--text-body-lg)", lg: "var(--text-title)" };
  function fmt(n) {
    if (typeof n !== "number") return n;
    // EN: „€25.00" · DE: „25,00 €"
    return locale === "en" ? currency + n.toFixed(2) : n.toFixed(2).replace(".", ",") + " " + currency;
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: "10px", fontFamily: "var(--type-price-family)", ...style }}>
      <span style={{ fontSize: sizes[size], fontWeight: "var(--weight-regular)", letterSpacing: "var(--tracking-body)", color: tone === "light" ? "var(--text-on-inverse)" : "var(--text-primary)" }}>{fmt(value)}</span>
      {compareAt ? (
        <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)", textDecoration: "line-through" }}>{fmt(compareAt)}</span>
      ) : null}
    </span>
  );
}
