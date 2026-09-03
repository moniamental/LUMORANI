import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Status deiner Newsletter-Anmeldung bei LUMORANI.",
  robots: { index: false },
};

import Link from "next/link";

export default async function NewsletterStatusPage({ params }: { params: Promise<{ status: string }> }) {
  const { status } = await params;
  const ok = status === "bestaetigt";

  return (
    <main className="lum-page" style={{ minHeight: "68vh", paddingTop: "var(--space-32)", paddingBottom: "var(--space-32)", textAlign: "center" }}>
      <span className="lum-eyebrow">Newsletter</span>
      <h1 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--text-display-2)", fontWeight: "var(--weight-light)" }}>
        {ok ? "Anmeldung bestätigt." : "Dieser Link ist nicht mehr gültig."}
      </h1>
      <p style={{ margin: "var(--space-6) auto 0", maxWidth: 560, color: "var(--text-secondary)", lineHeight: "var(--leading-body)" }}>
        {ok ? "Du erfährst künftig zuerst von neuen LUMORANI-Unikaten. Du kannst dich über den Link in jeder Newsletter-E-Mail wieder abmelden." : "Bitte fordere auf der Startseite eine neue Bestätigungs-E-Mail an."}
      </p>
      <Link href="/" style={{ display: "inline-block", marginTop: "var(--space-8)", color: "var(--text-gold)" }}>Zur Startseite</Link>
    </main>
  );
}
