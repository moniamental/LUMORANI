import Link from "next/link";
import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IMG } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";

const CONTENT: Record<Locale, {
  eyebrow: string; title: string; subtitle: string;
  steps: [string, string][];
  h1: string; p1: string; p2: string;
  h2: string; cta: string;
}> = {
  de: {
    eyebrow: "Rückgaberichtlinien",
    title: "Zeit, in Ruhe anzukommen",
    subtitle: "Schmuck ist etwas Persönliches. Wenn dein Stück doch nicht das richtige ist, machen wir die Rückgabe so einfach wie möglich.",
    steps: [
      ["01 · Melden", "Schreib uns innerhalb von 14 Tagen nach Erhalt kurz an info@lumorani.com. Nenn uns deine Bestellung – mehr braucht es zunächst nicht."],
      ["02 · Zurücksenden", "Verpacke das Stück sicher im ungetragenen Originalzustand. Wir schicken dir alle Infos für den Rückversand."],
      ["03 · Erstattung", "Sobald dein Stück bei uns angekommen und geprüft ist, erstatten wir dir den Kaufbetrag über dasselbe Zahlungsmittel zurück."],
    ],
    h1: "Gut zu wissen",
    p1: "Damit wir dir den Kaufbetrag erstatten können, sollte das Stück ungetragen und unbeschädigt sein. Bitte bewahre die Verpackung bis zum Abschluss der Rückgabe auf.",
    p2: "Da jedes Stück ein Naturstein-Unikat ist, können Farbe und Maserung leicht von den Fotos abweichen – das ist kein Mangel, sondern das Wesen echter Steine. Sollte dennoch einmal etwas nicht stimmen, melde dich einfach: Wir finden eine Lösung.",
    h2: "Kontakt für Rückgaben",
    cta: "Rückgabe anfragen",
  },
  en: {
    eyebrow: "Returns policy",
    title: "Time to settle in",
    subtitle: "Jewellery is something personal. If your piece turns out not to be the right one, we make returns as simple as possible.",
    steps: [
      ["01 · Get in touch", "Write to us briefly within 14 days of receipt at info@lumorani.com. Just tell us your order — that’s all it takes to start."],
      ["02 · Send it back", "Pack the piece safely in unworn, original condition. We’ll send you all the details for the return."],
      ["03 · Refund", "As soon as your piece has arrived with us and been checked, we’ll refund the purchase amount to the same payment method."],
    ],
    h1: "Good to know",
    p1: "So we can refund the purchase amount, the piece should be unworn and undamaged. Please keep the packaging until the return is complete.",
    p2: "Because every piece is a one-of-a-kind natural stone, colour and banding may differ slightly from the photos — that isn’t a defect, it’s the nature of real stones. If something isn’t right after all, just get in touch: we’ll find a solution.",
    h2: "Contact for returns",
    cta: "Request a return",
  },
};

export function RueckgabeView({ lang }: { lang: Locale }) {
  const t = CONTENT[lang];
  return (
    <main>
      <section style={{ position: "relative", padding: "var(--space-24) var(--page-pad)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.silk} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: "var(--page-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        </Reveal>
      </section>

      <section className="lum-page" style={{ paddingBottom: "var(--space-16)" }}>
        <RevealGroup className="lum-grid-3" style={{ marginTop: "calc(var(--space-12) * -1)", position: "relative" }}>
          {t.steps.map((s) => (
            <RevealItem key={s[0]}>
              <div style={{ background: "var(--surface-card-solid)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", padding: "var(--space-8)", height: "100%" }}>
                <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>{s[0]}</div>
                <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{s[1]}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="lum-page" style={{ paddingBottom: "var(--section-y)" }}>
        <Reveal>
          <div className="lum-prose" style={{ margin: "0 auto" }}>
            <h2>{t.h1}</h2>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <h2>{t.h2}</h2>
            <p><a href="mailto:info@lumorani.com">info@lumorani.com</a></p>
          </div>
        </Reveal>
        <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
          <Link href={localePath(lang, "/kontakt")} style={{ textDecoration: "none" }}>
            <Button size="lg" variant="secondary">{t.cta}</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
