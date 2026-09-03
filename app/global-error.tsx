"use client";

// Letzte Instanz: greift, wenn das Layout selbst fehlschlägt. Muss html und body
// mitbringen, weil das Root-Layout in diesem Fall nicht gerendert wird.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, background: "#0B0B0C", color: "#F5F1EA", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "48px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 520 }}>
            <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A24A", margin: 0 }}>
              LUMORANI
            </p>
            <h1 style={{ marginTop: 20, fontWeight: 300, fontSize: 34, lineHeight: 1.2 }}>
              Die Seite konnte nicht geladen werden.
            </h1>
            <p style={{ marginTop: 20, fontWeight: 300, color: "#B9B2A8", lineHeight: 1.6 }}>
              Bitte lade die Seite neu. Bleibt es dabei, schreib uns an info@lumorani.com.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{ marginTop: 32, padding: "14px 28px", background: "#C9A24A", color: "#0B0B0C", border: "none", cursor: "pointer", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em" }}
            >
              Neu laden
            </button>
            {error.digest ? <p style={{ marginTop: 28, fontSize: 12, color: "#7C766D" }}>Kennung: {error.digest}</p> : null}
          </div>
        </main>
      </body>
    </html>
  );
}
