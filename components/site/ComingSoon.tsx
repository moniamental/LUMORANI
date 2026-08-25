import { Button } from "@/components/ds/core/Button.jsx";

export function ComingSoon({
  eyebrow = "In Kürze",
  title,
  note = "Dieser Bereich wird gerade gebaut. Schau bald wieder vorbei.",
}: {
  eyebrow?: string;
  title: string;
  note?: string;
}) {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "var(--space-6)",
        padding: "var(--space-32) var(--page-pad)",
      }}
    >
      <span className="lum-eyebrow">{eyebrow}</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-2)", maxWidth: "18ch" }}>{title}</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44ch", fontSize: "var(--text-body-sm)" }}>{note}</p>
      <Button href="/" variant="secondary" style={{ marginTop: "var(--space-4)" }}>Zur Startseite</Button>
    </main>
  );
}
