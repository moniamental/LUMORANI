import Link from "next/link";
import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Card } from "@/components/ds/core/Card.jsx";
import { GemCard } from "@/components/ds/commerce/GemCard.jsx";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GEMS, IMG, gemName, gemLoreFor } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";

export function EdelsteineView({ lang }: { lang: Locale }) {
  const t = getDict(lang).gemstones;
  const cutLabels = [t.cutRawT, t.cutFacetedT, t.cutHalfT];
  const cuts: [string, string][] = [
    [t.cutRawT, t.cutRawB],
    [t.cutFacetedT, t.cutFacetedB],
    [t.cutHalfT, t.cutHalfB],
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", padding: "var(--space-24) var(--page-pad)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.tray} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: "var(--page-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        </Reveal>
      </section>

      {/* Drei Schliffe */}
      <section style={{ padding: "0 var(--page-pad) var(--section-y-tight)", maxWidth: "var(--page-max)", margin: "0 auto" }}>
        <RevealGroup className="lum-grid-3" style={{ marginTop: "calc(var(--space-16) * -1)", position: "relative" }}>
          {cuts.map((c) => (
            <RevealItem key={c[0]}>
              <Card variant="solid" padding="var(--space-8)">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{c[0]}</div>
                <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{c[1]}</p>
              </Card>
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
