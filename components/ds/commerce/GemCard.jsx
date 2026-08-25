"use client";
import React from "react";

const gemColors = {
  rubin: "var(--gem-ruby)", smaragd: "var(--gem-emerald)", aquamarin: "var(--gem-aquamarine)",
  turmalin: "var(--gem-tourmaline)", achat: "var(--gem-agate)", calcit: "var(--gem-calcite)",
  diamant: "var(--gem-diamond)", quarz: "var(--gem-quartz)"
};

export function GemCard({ name, description, image, cuts = [], onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const key = String(name || "").toLowerCase();
  const hue = gemColors[key] || "var(--gold-400)";
  return (
    <div
      onClick={onClick}
      onMouseEnter={function () { setHover(true); }} onMouseLeave={function () { setHover(false); }}
      style={{
        position: "relative", overflow: "hidden", background: "var(--surface-card-solid)",
        border: "1px solid " + (hover ? "var(--border-gold)" : "var(--border-hairline)"),
        borderRadius: "var(--radius-card)", cursor: onClick ? "pointer" : "default",
        transition: "var(--transition-hover)", transform: hover ? "var(--hover-lift)" : "none", ...style
      }}
    >
      {image ? (
        <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden" }}>
          <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hover ? "var(--image-zoom)" : "none", transition: "transform var(--duration-slow) var(--ease-out-silk)" }} />
          <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-veil)", opacity: .7 }} />
        </div>
      ) : null}
      <div style={{ padding: "var(--space-6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: 10, height: 10, borderRadius: "var(--radius-pill)", background: hue, boxShadow: "0 0 12px -2px " + "rgba(255,255,255,.35)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{name}</span>
        </div>
        {description ? (
          <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{description}</p>
        ) : null}
        {cuts.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "var(--space-5)" }}>
            {cuts.map(function (c) {
              return <span key={c} style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-pill)", padding: "5px 10px" }}>{c}</span>;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
