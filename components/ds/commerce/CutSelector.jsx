"use client";
import React from "react";

const CUTS = [
  { value: "ungeschliffen", label: "Ungeschliffen", hint: "roh, naturbelassen" },
  { value: "geschliffen", label: "Geschliffen", hint: "facettiert, poliert" },
  { value: "half", label: "Half & Half", hint: "halb roh, halb geschliffen" }
];

export function CutSelector({ value = "geschliffen", onChange, options = CUTS, label = "Schliff", style }) {
  return (
    <div style={style}>
      {label ? (
        <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)", marginBottom: "var(--space-4)" }}>{label}</div>
      ) : null}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + options.length + ", 1fr)", gap: "var(--space-3)" }}>
        {options.map(function (o) {
          const active = o.value === value;
          return (
            <button
              key={o.value} type="button" onClick={function () { if (onChange) onChange(o.value); }}
              style={{
                textAlign: "left", padding: "var(--space-4)", cursor: "pointer",
                background: active ? "rgba(201,162,74,.1)" : "transparent",
                border: "1px solid " + (active ? "var(--gold-300)" : "var(--border-hairline)"),
                borderRadius: "var(--radius-xs)", transition: "var(--transition-hover)"
              }}
            >
              <span style={{ display: "block", fontSize: "var(--text-caption)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-caps-tight)", textTransform: "uppercase", color: active ? "var(--gold-100)" : "var(--text-primary)" }}>{o.label}</span>
              {o.hint ? <span style={{ display: "block", marginTop: "6px", fontSize: "var(--text-micro)", color: "var(--text-muted)" }}>{o.hint}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
