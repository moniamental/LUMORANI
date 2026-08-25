import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import { Accordion, type QA } from "@/components/site/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { IMG } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";

const CONTENT: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: QA[];
  moreQ: string;
  writeUs: string;
}> = {
  de: {
    eyebrow: "Häufige Fragen",
    title: "Alles, was du wissen möchtest",
    subtitle: "Und wenn deine Frage nicht dabei ist: Wir sind nur eine Nachricht entfernt.",
    items: [
      { q: "Sind die Steine wirklich echt?", a: "Ja. Wir führen ausschließlich echte Natursteine – kein Glas, keine Imitate. Jeder Stein wird von Samir von Hand ausgewählt. Weil es Natursteine sind, ist jedes Stück ein Unikat mit eigener Farbe, Maserung und Charakter." },
      { q: "Wie werden eure Schmuckstücke gefertigt?", a: "In kleiner Handarbeit. Vom Rohstein bis zur fertigen Fassung entsteht jedes Stück in unserer Familienmanufaktur – oft als Einzelstück. Manche Steine belassen wir bewusst naturbelassen, andere werden geschliffen und poliert." },
      { q: "Wie lange dauert der Versand?", a: "Innerhalb Deutschlands liefern wir in der Regel in 3–5 Werktagen, versichert und sorgfältig verpackt. Innerhalb Deutschlands ist der Versand kostenfrei. Sobald dein Paket unterwegs ist, erhältst du eine Sendungsverfolgung." },
      { q: "Kommt mein Schmuck in einer Geschenkverpackung?", a: "Jedes Stück wird von Hand in unserer emeraldgrünen LUMORANI-Box mit Goldplakette verpackt – bereit zum Verschenken, ganz ohne Aufpreis. Bitte beachte: Die Verpackung kann von der Abbildung leicht abweichen." },
      { q: "Kann ich etwas zurückgeben?", a: "Selbstverständlich. Du hast 14 Tage Zeit, dein Stück in unbenutztem Zustand zurückzusenden. Melde dich einfach kurz bei uns, und wir kümmern uns um den Rest. Alle Details findest du auf unserer Seite zu den Rückgaberichtlinien." },
      { q: "Wie pflege ich meinen Edelstein-Schmuck?", a: "Am besten mit einem weichen Tuch und lauwarmem Wasser. Einige Steine (z. B. Malachit) sind empfindlicher – vermeide dort Wasser, Chemikalien und harte Stöße. Den passenden Pflegehinweis findest du auf jeder Produktseite." },
      { q: "Ich suche etwas Bestimmtes, das ich nicht finde. Geht das?", a: "Sehr gern. Sag uns, wonach du suchst – Stein, Farbe, Anlass – und wir schauen, was sich finden oder von Hand fertigen lässt. Schreib uns einfach über die Kontaktseite oder an info@lumorani.com." },
      { q: "Ist der Bezahlvorgang sicher?", a: "Ja. Die Zahlung wird verschlüsselt über einen etablierten Zahlungsdienstleister abgewickelt. Deine Zahlungsdaten werden dort sicher verarbeitet – wir selbst sehen und speichern keine vollständigen Kartendaten." },
    ],
    moreQ: "Noch eine Frage offen?",
    writeUs: "Schreib uns",
  },
  en: {
    eyebrow: "Frequently asked questions",
    title: "Everything you’d like to know",
    subtitle: "And if your question isn’t here: we’re only a message away.",
    items: [
      { q: "Are the stones really real?", a: "Yes. We only carry real natural stones — no glass, no imitations. Every stone is chosen by Samir by hand. Because they are natural stones, each piece is one of a kind, with its own colour, banding and character." },
      { q: "How is your jewellery made?", a: "In small-batch handwork. From the raw stone to the finished setting, every piece is made in our family manufactory — often as a single piece. Some stones we deliberately leave natural, others are faceted and polished." },
      { q: "How long does shipping take?", a: "Within Germany we usually deliver in 3–5 business days, insured and carefully packed. Shipping within Germany is free. As soon as your parcel is on its way, you’ll receive tracking." },
      { q: "Does my jewellery come gift-wrapped?", a: "Every piece is wrapped by hand in our emerald-green LUMORANI box with a gold plaque — ready to gift, at no extra cost. Please note: packaging may differ slightly from the image." },
      { q: "Can I return something?", a: "Of course. You have 14 days to return your piece in unused condition. Just get in touch briefly and we’ll take care of the rest. You’ll find all the details on our returns policy page." },
      { q: "How do I care for my gemstone jewellery?", a: "Best with a soft cloth and lukewarm water. Some stones (e.g. malachite) are more sensitive — there, avoid water, chemicals and hard knocks. You’ll find the right care note on every product page." },
      { q: "I’m looking for something specific that I can’t find. Is that possible?", a: "Gladly. Tell us what you’re looking for — stone, colour, occasion — and we’ll see what we can find or craft by hand. Just write to us via the contact page or at info@lumorani.com." },
      { q: "Is the payment process secure?", a: "Yes. Payment is handled encrypted through an established payment provider. Your payment details are processed securely there — we ourselves never see or store full card data." },
    ],
    moreQ: "Still have a question?",
    writeUs: "Write to us",
  },
};

export function FaqView({ lang }: { lang: Locale }) {
  const t = CONTENT[lang];
  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", padding: "var(--space-24) var(--page-pad)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.tray} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: "var(--page-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        </Reveal>
      </section>

      {/* Accordion */}
      <section className="lum-page" style={{ paddingBottom: "var(--section-y)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", marginTop: "calc(var(--space-12) * -1)", position: "relative" }}>
          <Reveal>
            <Accordion items={t.items} />
          </Reveal>

          <div style={{ marginTop: "var(--space-16)", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}>{t.moreQ}</p>
            <Button href={localePath(lang, "/kontakt")} size="lg" style={{ marginTop: "var(--space-6)" }}>{t.writeUs}</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
