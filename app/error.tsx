"use client";

// Fehlergrenze für alle Routen. Ohne sie sieht die Kundin bei einem
// unbehandelten Fehler die nackte Framework-Fehlerseite statt der Marke.
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Kein personenbezogener Inhalt, nur die Kennung für die Zuordnung im Log.
    console.error("Unbehandelter Fehler", error.digest ?? error.message);
  }, [error]);

  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "var(--space-24) var(--page-pad)", background: "var(--surface-page)" }}>
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <span style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
          Etwas ist schiefgelaufen
        </span>
        <h1 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-2)", lineHeight: "var(--leading-tight)" }}>
          Hier hakt gerade etwas.
        </h1>
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", color: "var(--text-secondary)" }}>
          Der Fehler liegt bei uns, nicht bei dir. Versuch es noch einmal — oder schreib uns kurz,
          dann kümmern wir uns darum.
        </p>
        <div style={{ marginTop: "var(--space-10)", display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reset}
            style={{ padding: "var(--space-4) var(--space-8)", background: "var(--gradient-gold)", color: "var(--ink-1000)", border: "none", cursor: "pointer", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}
          >
            Erneut versuchen
          </button>
          <a
            href="/kontakt"
            style={{ padding: "var(--space-4) var(--space-8)", border: "1px solid var(--border-gold)", color: "var(--text-primary)", textDecoration: "none", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}
          >
            Kontakt
          </a>
        </div>
        {error.digest ? (
          <p style={{ marginTop: "var(--space-8)", fontSize: "var(--text-micro)", color: "var(--text-muted)" }}>
            Kennung: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
