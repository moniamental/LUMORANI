"use client";
import React from "react";

export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, style }) {
  function step(d) {
    const next = Math.min(max, Math.max(min, value + d));
    if (onChange && next !== value) onChange(next);
  }
  const btn = {
    width: 40, height: 40, background: "transparent", border: "none", cursor: "pointer",
    color: "var(--text-secondary)", fontSize: "16px", fontFamily: "var(--font-sans)", lineHeight: 1
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-xs)", ...style }}>
      <button type="button" aria-label="Weniger" onClick={function () { step(-1); }} style={btn}>−</button>
      <span style={{ minWidth: 32, textAlign: "center", fontSize: "var(--text-body-sm)", fontVariantNumeric: "tabular-nums" }}>{value}</span>
      <button type="button" aria-label="Mehr" onClick={function () { step(1); }} style={btn}>+</button>
    </div>
  );
}
