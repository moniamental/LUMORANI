import Link from "next/link";
import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Card } from "@/components/ds/core/Card.jsx";
import { GemCard } from "@/components/ds/commerce/GemCard.jsx";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GEMS, IMG, gemName, gemLoreFor, type Cut } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import Image from "next/image";

/**
 * Ehrlicher Alt-Text für die Steinkarten.
 *
 * Für sechs der neun Steine liegt bislang kein Foto des losen Steins vor —
 * dort zeigt die Karte den Stein, wie er in einem Armband verarbeitet ist.
 * Der Alt-Text darf das nicht verschweigen: „Amazonit" als Beschreibung eines
 * Armbandfotos wäre für Screenreader schlicht falsch.
 *
 * Sobald echte Fotos der losen Steine vorliegen, greift automatisch der
 * „lose"-Zweig — es ist dann nur der Dateiname im Katalog zu tauschen.
 */
function gemImageAlt(image: string, name: string, lang: Locale): string {
  const armband = /-armband/.test(image);
  if (lang === "en") {
    return armband
      ? `${name} worked into a LUMORANI bracelet`
      : `Loose ${name} gemstone from LUMORANI`;
  }
  return armband
    ? `${name}, verarbeitet in einem Armband von LUMORANI`
    : `Loser ${name} von LUMORANI`;
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

        {/* Steine */}
        <RevealGroup className="lum-grid-4" style={{ marginTop: "var(--section-y-tight)", gridAutoRows: "1fr" }} stagger={0.06}>
          {GEMS.map((g) => (
            <RevealItem key={g.name} style={{ height: "100%" }}>
              <Link href={localePath(lang, `/shop?stein=${encodeURIComponent(g.name)}`)} style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>
                <GemCard
                  name={gemName(g.name, lang)}
                  description={gemLoreFor(g.name, lang)?.bedeutung ?? g.description}
                  image={g.image}
                  imageAlt={gemImageAlt(g.image, gemName(g.name, lang), lang)}
                  cuts={cutLabels}
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
