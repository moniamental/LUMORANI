"use client";
import React from "react";

export function Select({ label, value, onChange, options = [], tone = "dark", disabled, style, ...rest }) {
  const light = tone === "light";
  return (
    <label style={{ display: "block", ...style }}>
      {label ? (
        <span style={{ display: "block", marginBottom: "10px", fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: light ? "var(--text-on-inverse-muted)" : "var(--text-muted)" }}>{label}</span>
      ) : null}
      <span style={{ position: "relative", display: "block" }}>
        <select
          value={value} onChange={onChange} disabled={disabled}
          style={{
            width: "100%", appearance: "none", background: "transparent",
            color: light ? "var(--text-on-inverse)" : "var(--text-primary)",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)",
            padding: "12px 28px 12px 0", border: "none",
            borderBottom: "1px solid " + (light ? "var(--border-inverse)" : "var(--border-hairline)"),
            borderRadius: 0, outline: "none", opacity: disabled ? 0.4 : 1
          }}
          {...rest}
        >
          {options.map(function (o) {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v} style={{ background: "var(--ink-800)", color: "var(--marble-050)" }}>{l}</option>;
          })}
        </select>
        <span aria-hidden="true" style={{ position: "absolute", right: 2, top: "50%", marginTop: "-3px", width: 7, height: 7, borderRight: "1px solid var(--text-gold)", borderBottom: "1px solid var(--text-gold)", transform: "rotate(45deg)" }} />
      </span>
    </label>
  );
}
