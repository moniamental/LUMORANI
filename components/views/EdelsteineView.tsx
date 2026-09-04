import Link from "next/link";
import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Card } from "@/components/ds/core/Card.jsx";
import { GemCard } from "@/components/ds/commerce/GemCard.jsx";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LOOSE_GEMS, JEWELLERY_GEMS, IMG, gemName, gemLoreFor, type Cut } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import Image from "next/image";

/**
 * Ehrlicher Alt-Text für die Steinkarten.
 *
 * Drei Bildzustände, und der Alt-Text muss jeden korrekt benennen:
 *
 *   -nahaufnahme  Makro auf die Perlen eines Armbands. Zeigt Farbe und
 *                 Oberfläche des Steins, ist aber kein loser Stein — das
 *                 gehört in den Alt-Text, sonst beschreibt er etwas anderes,
 *                 als zu sehen ist.
 *   -armband      ganzes Schmuckstück im Bild.
 *   sonst         loser Stein (Lapislazuli, Malachit, Rosenquarz).
 *
 * Sobald für einen Stein ein eigener Render des losen Steins vorliegt, greift
 * der dritte Zweig automatisch — es ist nur der Dateiname im Katalog zu
 * tauschen, hier ist nichts zu ändern.
 */
function gemImageAlt(image: string, name: string, lang: Locale): string {
  const nah = /-nahaufnahme/.test(image);
  const armband = /-armband/.test(image);
  if (lang === "en") {
    if (nah) return `Close-up of ${name} beads from a LUMORANI bracelet`;
    return armband
      ? `${name} worked into a LUMORANI bracelet`
      : `Loose ${name} gemstone from LUMORANI`;
  }
  if (nah) return `${name} in Nahaufnahme — Perlen eines LUMORANI-Armbands`;
  return armband
    ? `${name}, verarbeitet in einem Armband von LUMORANI`
    : `Loser ${name} von LUMORANI`;
}

/** Alt-Text für die losen Steine — alle liegen in der LUMORANI-Schatulle. */
function looseGemAlt(name: string, lang: Locale): string {
  return lang === "en"
    ? `Loose ${name} gemstone in a LUMORANI presentation box`
    : `Loser ${name} in der LUMORANI-Schatulle`;
}

export function EdelsteineView({ lang }: { lang: Locale }) {
  const t = getDict(lang).gemstones;
  const cutLabels = [t.cutRawT, t.cutFacetedT, t.cutHalfT];
  const cuts: { title: string; body: string; cut: Cut }[] = [
    { title: t.cutRawT, body: t.cutRawB, cut: "ungeschliffen" },
    { title: t.cutFacetedT, body: t.cutFacetedB, cut: "geschliffen" },
    { title: t.cutHalfT, body: t.cutHalfB, cut: "halfhalf" },
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", padding: "var(--space-24) var(--page-pad)", overflow: "hidden" }}>
        <Image fill sizes="100vw" src={IMG.tray} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.45 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: "var(--page-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        </Reveal>
      </section>

      {/* Drei Schliffe */}
      <section style={{ padding: "0 var(--page-pad) var(--section-y-tight)", maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <RevealGroup className="lum-grid-3" style={{ marginTop: "calc(var(--space-16) * -1)", position: "relative" }}>
          {cuts.map((c) => (
            <RevealItem key={c.title}>
              <Link
                href={localePath(lang, `/shop?schliff=${c.cut}`)}
                className="lum-cut-card"
                style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}
              >
                <Card variant="solid" padding="var(--space-8)" interactive style={{ height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{c.title}</span>
                    <span aria-hidden className="lum-cut-arrow" style={{ fontSize: "var(--text-body-sm)", color: "var(--text-gold)" }}>→</span>
                  </div>
                  <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{c.body}</p>
                  <span style={{ display: "inline-block", marginTop: "var(--space-5)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
                    {t.cutFilterCta}
                  </span>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ——— Lose Edelsteine ——— */}
        <Reveal style={{ marginTop: "var(--section-y)" }}>
          <SectionHeading title={t.looseT} subtitle={t.looseB} />
        </Reveal>

        <RevealGroup className="lum-grid-4" style={{ marginTop: "var(--space-10)", gridAutoRows: "1fr" }} stagger={0.06}>
          {LOOSE_GEMS.map((g) => (
            <RevealItem key={g.name} style={{ height: "100%" }}>
              {/* Diese Steine stehen nicht im Shop — der Weg führt zur Anfrage. */}
              <Link href={localePath(lang, "/kontakt")} style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>
                <GemCard
                  name={gemName(g.name, lang)}
                  description={gemLoreFor(g.name, lang)?.bedeutung ?? g.description}
                  image={g.image}
                  imageAlt={looseGemAlt(gemName(g.name, lang), lang)}
                  cuts={[...cutLabels, t.looseCta]}
                  style={{ height: "100%" }}
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ——— Steine im Schmuck ——— */}
        <Reveal style={{ marginTop: "var(--section-y)" }}>
          <SectionHeading title={t.jewelT} subtitle={t.jewelB} />
        </Reveal>

        <RevealGroup className="lum-grid-4" style={{ marginTop: "var(--space-10)", gridAutoRows: "1fr" }} stagger={0.06}>
          {JEWELLERY_GEMS.map((g) => (
            <RevealItem key={g.name} style={{ height: "100%" }}>
              <Link href={localePath(lang, `/shop?stein=${encodeURIComponent(g.name)}`)} style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>
                <GemCard
                  name={gemName(g.name, lang)}
                  description={gemLoreFor(g.name, lang)?.bedeutung ?? g.description}
                  image={g.image}
                  imageAlt={gemImageAlt(g.image, gemName(g.name, lang), lang)}
                  style={{ height: "100%" }}
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <p style={{ margin: "var(--space-16) auto 0", maxWidth: 720, textAlign: "center", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>
          {t.closing}
        </p>
      </section>
    </main>
  );
}
