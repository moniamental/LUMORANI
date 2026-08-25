"use client";
import React from "react";
import { IconButton } from "../core/IconButton.jsx";

export function NavBar({
  logoSrc, brand = "LUMORANI",
  links = ["Start", "Shop", "Edelsteine", "Über Uns", "Geschenksets", "Kontakt"],
  active = "Start", onNavigate, cartCount = 0, onCartClick, transparent = true, announcement, style
}) {
  return (
    <header style={{ position: "relative", zIndex: 20, ...style }}>
      {announcement ? (
        <div style={{ textAlign: "center", padding: "10px 16px", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--text-secondary)", background: "var(--ink-1000)", borderBottom: "1px solid var(--border-hairline)" }}>{announcement}</div>
      ) : null}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
        padding: "var(--space-3) clamp(20px, 3vw, var(--page-pad))",
        columnGap: "var(--space-4)",
        background: transparent ? "rgba(7,7,8,.35)" : "var(--ink-900)",
        backdropFilter: transparent ? "blur(var(--blur-glass))" : "none",
        borderBottom: "1px solid var(--border-hairline)"
      }}>
        <nav style={{ display: "flex", gap: "clamp(14px, 1.8vw, 32px)", alignItems: "center" }}>
          {links.slice(0, 3).map(function (l) { return <NavLink key={l} label={l} active={l === active} onNavigate={onNavigate} />; })}
        </nav>
        <a href="#" onClick={function (e) { e.preventDefault(); if (onNavigate) onNavigate("Start"); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 var(--space-4)", height: 64, overflow: "hidden" }}>
          {logoSrc
            ? <img src={logoSrc} alt={brand} style={{ height: 128, width: "auto", margin: "-32px 0" }} />
            : <span style={{ fontFamily: "var(--font-wordmark)", fontSize: "20px", letterSpacing: "var(--tracking-caps)", color: "var(--gold-300)" }}>{brand}</span>}
        </a>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "clamp(14px, 2vw, 32px)" }}>
          <nav style={{ display: "flex", gap: "clamp(14px, 1.8vw, 32px)", alignItems: "center" }}>
            {links.slice(3).map(function (l) { return <NavLink key={l} label={l} active={l === active} onNavigate={onNavigate} />; })}
          </nav>
          <div style={{ display: "flex", gap: "var(--space-1)", alignItems: "center" }}>
            <IconButton label="Suche"><SearchGlyph /></IconButton>
            <span style={{ position: "relative" }}>
              <IconButton label="Warenkorb" onClick={onCartClick}><BagGlyph /></IconButton>
              {cartCount > 0 ? (
                <span style={{ position: "absolute", top: 2, right: 0, minWidth: 16, height: 16, padding: "0 4px", display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", background: "var(--gradient-gold)", color: "var(--text-on-gold)", fontSize: "9px", fontWeight: "var(--weight-semibold)" }}>{cartCount}</span>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ label, active, onNavigate }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#" onClick={function (e) { e.preventDefault(); if (onNavigate) onNavigate(label); }}
      onMouseEnter={function () { setHover(true); }} onMouseLeave={function () { setHover(false); }}
      style={{ position: "relative", fontFamily: "var(--font-sans)", fontSize: "var(--type-nav-size)", fontWeight: "var(--weight-regular)", textTransform: "uppercase", letterSpacing: "var(--type-nav-tracking)", textDecoration: "none", whiteSpace: "nowrap", color: active || hover ? "var(--gold-200)" : "var(--text-secondary)", transition: "var(--transition-hover)", paddingBottom: "4px" }}
    >
      {label}
      <span style={{ position: "absolute", left: 0, bottom: 0, height: 1, width: active ? "100%" : hover ? "100%" : "0%", background: "var(--gradient-gold)", transition: "width var(--duration-base) var(--ease-out-silk)" }} />
    </a>
  );
}

function SearchGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-4.2-4.2" />
    </svg>
  );
}
function BagGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}
