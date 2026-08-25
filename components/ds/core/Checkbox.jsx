"use client";
import React from "react";

export function Checkbox({ label, checked = false, onChange, disabled, tone = "dark", style }) {
  const light = tone === "light";
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "12px", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 16, height: 16, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center",
        border: "1px solid " + (checked ? "transparent" : light ? "var(--border-inverse)" : "var(--border-hairline-strong)"),
        background: checked ? "var(--gradient-gold)" : "transparent",
        borderRadius: "var(--radius-xs)", transition: "var(--transition-hover)"
      }}>
        {checked ? (
          <span style={{ width: 8, height: 4, borderLeft: "1.5px solid var(--text-on-gold)", borderBottom: "1.5px solid var(--text-on-gold)", transform: "rotate(-45deg) translateY(-1px)" }} />
        ) : null}
      </span>
      <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: light ? "var(--text-on-inverse)" : "var(--text-secondary)" }}>{label}</span>
    </label>
  );
}
