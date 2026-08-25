"use client";
import React from "react";

export function Dialog({ open = true, title, children, footer, onClose, width = 520 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-6)" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(7,7,8,.72)", backdropFilter: "blur(var(--blur-veil))" }} />
      <div role="dialog" aria-modal="true" style={{
        position: "relative", width: "100%", maxWidth: width, background: "var(--ink-800)",
        border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-lg)", padding: "var(--space-10)"
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "var(--gradient-gold)", opacity: .8 }} />
        {title ? (
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)", marginBottom: "var(--space-4)" }}>{title}</h3>
        ) : null}
        <div style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-body)" }}>{children}</div>
        {footer ? <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>{footer}</div> : null}
        <button aria-label="Schließen" onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "18px", cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>
    </div>
  );
}
