export function LegalShell({
  eyebrow = "Rechtliches",
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="lum-page" style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--space-32)" }}>
      <span className="lum-eyebrow">{eyebrow}</span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-display-2)",
          fontWeight: "var(--weight-light)",
          margin: "var(--space-4) 0 var(--space-12)",
        }}
      >
        {title}
      </h1>
      <div className="lum-prose">{children}</div>
    </main>
  );
}
