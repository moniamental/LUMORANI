"use client";
import React from "react";

export function Switch({ label, checked = false, onChange, disabled, style }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "14px", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, ...style }}>
      <button
        type="button" role="switch" aria-checked={checked} disabled={disabled}
        onClick={function () { if (onChange) onChange(!checked); }}
        style={{
          width: 44, height: 22, padding: 2, borderRadius: "var(--radius-pill)", cursor: "inherit",
          border: "1px solid " + (checked ? "transparent" : "var(--border-hairline-strong)"),
          background: checked ? "var(--gradient-gold)" : "transparent",
          transition: "var(--transition-hover)", display: "flex", alignItems: "center"
        }}
      >
        <span style={{
          width: 16, height: 16, borderRadius: "var(--radius-pill)",
          background: checked ? "var(--ink-1000)" : "var(--marble-300)",
          transform: "translateX(" + (checked ? "22px" : "0") + ")",
          transition: "transform var(--duration-base) var(--ease-out-silk)"
        }} />
      </button>
      {label ? <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "var(--text-secondary)" }}>{label}</span> : null}
    </label>
  );
}
