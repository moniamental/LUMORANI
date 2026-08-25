"use client";
import React from "react";
import { PriceTag } from "./PriceTag.jsx";
import { QuantityStepper } from "./QuantityStepper.jsx";

export function CartLineItem({ image, name, stone, price, qty = 1, onQtyChange, onRemove, style }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "84px 1fr auto", gap: "var(--space-5)", padding: "var(--space-5) 0", borderBottom: "1px solid var(--border-hairline)", ...style }}>
      <img src={image} alt={name} style={{ width: 84, height: 108, objectFit: "cover", borderRadius: "var(--radius-image)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
        {stone ? <span style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-gold)" }}>{stone}</span> : null}
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-body-lg)", fontWeight: "var(--weight-light)" }}>{name}</span>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <QuantityStepper value={qty} onChange={onQtyChange} />
          <button type="button" onClick={onRemove} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>Entfernen</button>
        </div>
      </div>
      <PriceTag value={price} size="sm" style={{ alignSelf: "flex-start" }} />
    </div>
  );
}
