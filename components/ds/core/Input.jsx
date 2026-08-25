"use client";
import React from "react";

export function Input({ label, value, onChange, placeholder, type = "text", hint, error, disabled, tone = "dark", fullWidth = true, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const light = tone === "light";
  return (
    <label style={{ display: "block", width: fullWidth ? "100%" : undefined, ...style }}>
      {label ? (
        <span style={{
          display: "block", marginBottom: "10px", fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)",
          textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)",
          color: light ? "var(--text-on-inverse-muted)" : "var(--text-muted)"
        }}>{label}</span>
      ) : null}
      <input
        type={type} value={value} placeholder={placeholder} disabled={disabled}
        onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", background: "transparent", color: light ? "var(--text-on-inverse)" : "var(--text-primary)",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)",
          letterSpacing: "var(--tracking-body)", padding: "12px 0", border: "none",
          borderBottom: `1px solid ${error ? "var(--status-error)" : focus ? "var(--gold-300)" : light ? "var(--border-inverse)" : "var(--border-hairline)"}`,
          borderRadius: 0, outline: "none", transition: "var(--transition-hover)", opacity: disabled ? 0.4 : 1
        }}
        {...rest}
      />
      {hint || error ? (
        <span style={{
          display: "block", marginTop: "8px", fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-body)",
          color: error ? "var(--status-error)" : light ? "var(--text-on-inverse-muted)" : "var(--text-muted)"
        }}>{error || hint}</span>
      ) : null}
    </label>
  );
}
