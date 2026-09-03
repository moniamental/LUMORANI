import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IMG } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";
import Image from "next/image";

const CONTENT: Record<Locale, {
  eyebrow: string; title: string; subtitle: string;
  cards: [string, string][];
  h1: string; p1: React.ReactNode;
  h2: string; p2: string;
  h3: string; p3: React.ReactNode;
  cta: string;
}> = {
  de: {
    eyebrow: "Lieferung und Versand",
    title: "Sicher verpackt. Sorgfältig verschickt.",
    subtitle: "Ein Stück, das mit so viel Sorgfalt entsteht, verdient auch einen sorgfältigen Weg zu dir.",
    cards: [
      ["Kostenfrei in Deutschland", "Innerhalb Deutschlands liefern wir versandkostenfrei. Kein Kleingedrucktes, keine Überraschungen an der Kasse."],
      ["Versichert verpackt", "Jedes Stück reist versichert und gut geschützt. Sollte doch einmal etwas passieren, kümmern wir uns."],
      ["In der LUMORANI-Box", "Von Hand verpackt in unserer emeraldgrünen Box mit Goldplakette – bereit zum Auspacken oder Verschenken."],
    ],
    h1: "Lieferzeit & Versandpartner",
    p1: (<>Nach deiner Bestellung bereiten wir dein Stück von Hand vor. In der Regel ist es innerhalb von <strong>3–5 Werktagen</strong> bei dir. Wir versenden versichert mit <strong>DHL</strong> und <strong>Hermes</strong>. Sobald dein Paket unterwegs ist, erhältst du eine Sendungsverfolgung per E-Mail.</>),
    h2: "Versand ins Ausland",
    p2: "Du möchtest LUMORANI außerhalb Deutschlands bestellen? Schreib uns kurz – wir finden gemeinsam den besten Weg und nennen dir Kosten und Laufzeit, bevor du bestellst.",
    h3: "Fragen zu deiner Bestellung?",
    p3: (<>Wir sind für dich da. Melde dich jederzeit unter <a href="mailto:info@lumorani.com">info@lumorani.com</a>.</>),
    cta: "Jetzt entdecken",
  },
  en: {
    eyebrow: "Delivery and shipping",
    title: "Safely packed. Carefully sent.",
    subtitle: "A piece made with so much care deserves a careful journey to you, too.",
    cards: [
      ["Free within Germany", "Within Germany we deliver free of shipping costs. No small print, no surprises at checkout."],
      ["Insured packaging", "Every piece travels insured and well protected. And if something ever does happen, we’ll take care of it."],
      ["In the LUMORANI box", "Wrapped by hand in our emerald-green box with a gold plaque — ready to unwrap or to gift."],
    ],
    h1: "Delivery time & shipping partners",
    p1: (<>After your order, we prepare your piece by hand. It usually reaches you within <strong>3–5 business days</strong>. We ship insured with <strong>DHL</strong> and <strong>Hermes</strong>. As soon as your parcel is on its way, you’ll receive tracking by email.</>),
    h2: "International shipping",
    p2: "Would you like to order LUMORANI outside Germany? Write us a short message — together we’ll find the best route and tell you the cost and delivery time before you order.",
    h3: "Questions about your order?",
    p3: (<>We’re here for you. Reach us any time at <a href="mailto:info@lumorani.com">info@lumorani.com</a>.</>),
    cta: "Explore now",
  },
};

export function VersandView({ lang }: { lang: Locale }) {
  const t = CONTENT[lang];
  return (
    <main>
      <section style={{ position: "relative", padding: "var(--space-24) var(--page-pad)", overflow: "hidden" }}>
        <Image fill sizes="100vw" src={IMG.box} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.45 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: "var(--page-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        </Reveal>
      </section>

      <section className="lum-page" style={{ paddingBottom: "var(--space-16)" }}>
        <RevealGroup className="lum-grid-3" style={{ marginTop: "calc(var(--space-12) * -1)", position: "relative" }}>
          {t.cards.map((c) => (
            <RevealItem key={c[0]}>
              <div style={{ background: "var(--surface-card-solid)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", padding: "var(--space-8)", height: "100%" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{c[0]}</div>
                <p style={{ margin: "var(--space-4) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{c[1]}</p>
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
            <h2>{t.h2}</h2>
            <p>{t.p2}</p>
            <h2>{t.h3}</h2>
            <p>{t.p3}</p>
          </div>
        </Reveal>
        <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
          <Button href={localePath(lang, "/shop")} size="lg">{t.cta}</Button>
        </div>
      </section>
    </main>
  );
}
