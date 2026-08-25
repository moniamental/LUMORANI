import type { Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string[]> = {
  de: [
    "Echte Natursteine · Handgefertigte Unikate",
    "Sichere Zahlung über Stripe",
    "Versichert & kostenfrei in DE",
    "14 Tage Rückgabe",
  ],
  en: [
    "Real natural stones · Handmade one-of-a-kind pieces",
    "Secure payment via Stripe",
    "Insured & free within Germany",
    "14-day returns",
  ],
};

export function TrustBand({ lang = "de" }: { lang?: Locale }) {
  const icons = [<GemIcon key="g" />, <LockIcon key="l" />, <TruckIcon key="t" />, <ReturnIcon key="r" />];
  const ITEMS = LABELS[lang].map((label, i) => ({ icon: icons[i], label }));
  return (
    <section style={{ borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)", background: "var(--ink-1000)" }}>
      <div
        className="lum-trust"
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-6) var(--page-pad)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--space-6)",
        }}
      >
        {ITEMS.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", textAlign: "center" }}>
            <span style={{ color: "var(--text-gold)", flexShrink: 0, display: "grid", placeItems: "center" }}>{it.icon}</span>
            <span style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-secondary)" }}>
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function GemIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l3 6-9 12L3 9l3-6z" /><path d="M3 9h18" /><path d="M9 3l3 6 3-6" /><path d="M12 9v12" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h11a5 5 0 0 1 0 10H9" /><path d="M7 5L4 8l3 3" />
    </svg>
  );
}
