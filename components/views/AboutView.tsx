import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import { LoopVideo } from "@/components/site/LoopVideo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IMG } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";

type AboutCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  storyEyebrow: string;
  storyTitle: string;
  storyLead: string;
  storyBody: string;
  craftEyebrow: string;
  craftTitle: string;
  steps: [string, string][];
  valuesEyebrow: string;
  valuesTitle: string;
  values: [string, string][];
  quote: string;
  quoteRole: string;
  ctaTitle: string;
  ctaSub: string;
  ctaShop: string;
  ctaGems: string;
};

const CONTENT: Record<Locale, AboutCopy> = {
  de: {
    eyebrow: "Über uns",
    title: "Ein Familienbetrieb, geboren aus der Liebe zu echten Steinen.",
    intro:
      "LUMORANI begann nicht am Reißbrett, sondern am Küchentisch. Samir und sein Vater teilten schon immer eine Faszination für Edelsteine – für das, was die Natur in Millionen Jahren formt und kein Mensch nachmachen kann. Aus dieser Faszination wurde eine kleine Manufaktur. Und aus der Manufaktur ein Versprechen: nur Steine, die uns selbst berühren.",
    storyEyebrow: "Unsere Geschichte",
    storyTitle: "Momente, die bleiben",
    storyLead:
      "Schmuck begleitet uns in den Momenten, die zählen. Ein Geschenk. Ein Anfang. Ein Gefühl, das man nicht in Worte fasst. Genau dafür machen wir das – für Stücke, die Bedeutung tragen, nicht nur einen Preis.",
    storyBody:
      "Wir glauben nicht an Massenware und schnelle Trends. Wir glauben an Steine mit Charakter, an klare Formen und an Farben, die etwas in dir auslösen. Jedes LUMORANI-Stück trägt ein bisschen von der Geduld in sich, mit der es entstanden ist.",
    craftEyebrow: "Handarbeit",
    craftTitle: "Vom Rohstein zum Lieblingsstück",
    steps: [
      ["01 · Finden", "Samir wählt jeden Rohstein von Hand aus. Farbe, Struktur, Charakter – nichts davon lässt sich bestellen, es muss gefunden werden."],
      ["02 · Bearbeiten", "In der Werkstatt entscheidet sich, was ein Stein werden will: roh belassen, geschliffen oder beides. Gemeinsam mit seinem Vater bringt Samir ihn zur Geltung."],
      ["03 · Fassen", "Zum Schluss wird der Stein zu Schmuck – in kleinen Mengen, oft als Unikat. Handgefertigt, damit jedes Stück so besonders bleibt wie der Stein darin."],
    ],
    valuesEyebrow: "Wofür wir stehen",
    valuesTitle: "Echtheit, Tiefe und Persönlichkeit",
    values: [
      ["Echtheit", "Nur echte Natursteine, handverlesen. Kein Glas, keine Imitate. Was du trägst, ist über Jahrtausende in der Erde gewachsen."],
      ["Tiefe", "Jeder Stein wird ausgesucht, gedreht, ins Licht gehalten und geprüft. Erst wenn er lebt, wird er zu Schmuck."],
      ["Persönlichkeit", "Klare Formen, starke Farben, ehrliche Materialien. Schmuck, der dich nicht definiert – sondern dich ausdrückt."],
    ],
    quote:
      "„Ich verkaufe keinen Stein, den ich nicht selbst tragen würde. Für mich ist jedes Stück ein kleines Stück Vertrauen – und das gebe ich nicht leichtfertig weiter.“",
    quoteRole: "Samir · Gründer & Steinsucher",
    ctaTitle: "Finde deinen Stein",
    ctaSub: "Jedes Stück ist ein Unikat. Vielleicht wartet deins schon.",
    ctaShop: "Zum Shop",
    ctaGems: "Edelsteine entdecken",
  },
  en: {
    eyebrow: "About",
    title: "A family business, born from a love of real stones.",
    intro:
      "LUMORANI didn’t begin at a drawing board, but at the kitchen table. Samir and his father always shared a fascination for gemstones — for what nature forms over millions of years and no one can imitate. That fascination became a small manufactory. And the manufactory became a promise: only stones that move us, too.",
    storyEyebrow: "Our story",
    storyTitle: "Moments that stay",
    storyLead:
      "Jewellery accompanies us through the moments that matter. A gift. A beginning. A feeling you can’t quite put into words. That’s exactly why we do this — for pieces that carry meaning, not just a price.",
    storyBody:
      "We don’t believe in mass production or fast trends. We believe in stones with character, in clear forms and in colours that stir something in you. Every LUMORANI piece carries a little of the patience it was made with.",
    craftEyebrow: "Craft",
    craftTitle: "From raw stone to favourite piece",
    steps: [
      ["01 · Finding", "Samir chooses every raw stone by hand. Colour, structure, character — none of it can be ordered, it has to be found."],
      ["02 · Shaping", "In the workshop, it becomes clear what a stone wants to be: left raw, faceted, or both. Together with his father, Samir brings it to life."],
      ["03 · Setting", "Finally the stone becomes jewellery — in small numbers, often one of a kind. Handmade, so every piece stays as special as the stone within it."],
    ],
    valuesEyebrow: "What we stand for",
    valuesTitle: "Authenticity, depth and character",
    values: [
      ["Authenticity", "Only real natural stones, hand-picked. No glass, no imitations. What you wear grew in the earth over thousands of years."],
      ["Depth", "Every stone is chosen, turned, held to the light and checked. Only once it comes alive does it become jewellery."],
      ["Character", "Clear forms, strong colours, honest materials. Jewellery that doesn’t define you — it expresses you."],
    ],
    quote:
      "“I don’t sell a stone I wouldn’t wear myself. To me every piece is a small piece of trust — and I don’t pass that on lightly.”",
    quoteRole: "Samir · Founder & stone finder",
    ctaTitle: "Find your stone",
    ctaSub: "Every piece is one of a kind. Maybe yours is already waiting.",
    ctaShop: "To the shop",
    ctaGems: "Discover gemstones",
  },
};

export function AboutView({ lang }: { lang: Locale }) {
  const t = CONTENT[lang];
  const lp = (p: string) => localePath(lang, p);

  return (
    <main>
      {/* Intro */}
      <section className="lum-section" style={{ paddingBottom: "var(--space-12)" }}>
        <Reveal style={{ maxWidth: 860 }}>
          <span className="lum-eyebrow">{t.eyebrow}</span>
          <h1 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-1)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }}>
            {t.title}
          </h1>
          <p style={{ marginTop: "var(--space-8)", fontSize: "var(--text-body-lg)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)", maxWidth: 680 }}>
            {t.intro}
          </p>
        </Reveal>
      </section>

      {/* Story-Split mit Video */}
      <section style={{ background: "var(--surface-page-alt)", borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)" }}>
        <div className="lum-section lum-split">
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden" }}>
              <LoopVideo src="/assets/lifestyle/frau-schmuck.mp4" poster={IMG.silk} />
              <div style={{ position: "absolute", inset: 0, boxShadow: "var(--shadow-inset-hairline)" }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <SectionHeading align="left" size="md" eyebrow={t.storyEyebrow} title={t.storyTitle} />
              <p style={{ marginTop: "var(--space-8)", fontSize: "var(--text-body-lg)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>
                {t.storyLead}
              </p>
              <p style={{ marginTop: "var(--space-5)", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-muted)" }}>
                {t.storyBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vom Stein zum Schmuck */}
      <section className="lum-section">
        <Reveal>
          <SectionHeading eyebrow={t.craftEyebrow} title={t.craftTitle} size="md" />
        </Reveal>
        <RevealGroup className="lum-grid-3" style={{ marginTop: "var(--space-16)" }}>
          {t.steps.map((s) => (
            <RevealItem key={s[0]}>
              <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-6)" }}>
                <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>{s[0]}</div>
                <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{s[1]}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Werte */}
      <section style={{ background: "var(--surface-page-alt)", borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)" }}>
        <div className="lum-section">
          <Reveal>
            <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} size="md" />
          </Reveal>
          <RevealGroup className="lum-grid-3" style={{ marginTop: "var(--space-16)" }}>
            {t.values.map((v) => (
              <RevealItem key={v[0]}>
                <div style={{ borderTop: "1px solid var(--border-gold)", paddingTop: "var(--space-6)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-title)", fontWeight: "var(--weight-light)" }}>{v[0]}</div>
                  <p style={{ margin: "var(--space-4) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{v[1]}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Samir-Zitat */}
      <section style={{ position: "relative", padding: "var(--section-y) var(--page-pad)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.tray} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-3)", lineHeight: "var(--leading-display)" }}>
            {t.quote}
          </p>
          <div style={{ marginTop: "var(--space-8)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-secondary)" }}>
            {t.quoteRole}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="lum-section" style={{ textAlign: "center", paddingTop: "var(--section-y-tight)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-3)", fontWeight: "var(--weight-light)" }}>{t.ctaTitle}</h2>
          <p style={{ margin: "var(--space-5) auto 0", maxWidth: 460, color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }}>
            {t.ctaSub}
          </p>
          <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Button href={lp("/shop")} size="lg">{t.ctaShop}</Button>
            <Button href={lp("/edelsteine")} size="lg" variant="outline">{t.ctaGems}</Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
