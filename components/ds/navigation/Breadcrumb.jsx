"use client";
import React from "react";

export function Breadcrumb({ items = [], onNavigate, style }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", ...style }}>
      {items.map(function (it, i) {
        const label = typeof it === "string" ? it : it.label;
        const last = i === items.length - 1;
        return (
          <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <a
              href="#" onClick={function (e) { e.preventDefault(); if (onNavigate) onNavigate(label); }}
              style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", textDecoration: "none", color: last ? "var(--text-secondary)" : "var(--text-muted)", pointerEvents: last ? "none" : "auto" }}
            >{label}</a>
            {last ? null : <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
