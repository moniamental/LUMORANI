import Link from "next/link";
import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import { ProductTile } from "@/components/site/ProductTile";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PRODUCTS, IMG } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";

const gifts = PRODUCTS.filter((p) => p.occasion === "geschenk");

export function GeschenksetsView({ lang }: { lang: Locale }) {
  const t = getDict(lang).gift;
  const lp = (p: string) => localePath(lang, p);
  const promises: [string, string][] = [
    [t.p1t, t.p1b],
    [t.p2t, t.p2b],
    [t.p3t, t.p3b],
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", padding: "var(--space-32) var(--page-pad)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.box} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <span className="lum-eyebrow">{t.eyebrow}</span>
          <h1 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-hero)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-hero)" }}>
            {t.title}
          </h1>
          <p style={{ margin: "var(--space-6) auto 0", maxWidth: 520, fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", color: "var(--text-secondary)" }}>
            {t.sub}
          </p>
        </Reveal>
      </section>

      {/* Versprechen */}
      <section className="lum-section" style={{ paddingTop: "var(--section-y-tight)" }}>
        <RevealGroup className="lum-grid-3">
          {promises.map((p) => (
            <RevealItem key={p[0]}>
              <div style={{ borderTop: "1px solid var(--border-gold)", paddingTop: "var(--space-6)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{p[0]}</div>
                <p style={{ margin: "var(--space-4) 0 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>{p[1]}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Kuratierte Geschenke */}
      <section className="lum-section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)", flexWrap: "wrap" }}>
            <SectionHeading align="left" size="md" eyebrow={t.recEyebrow} title={t.recTitle} rule={false} />
            <Link href={lp("/shop?anlass=geschenk")} style={{ textDecoration: "none", flexShrink: 0 }}>
              <Button variant="ghost" size="sm">{t.allGifts}</Button>
            </Link>
          </div>
        </Reveal>
        <RevealGroup className="lum-shop-grid" style={{ marginTop: "var(--space-16)" }} stagger={0.06}>
          {gifts.map((p) => (
            <RevealItem key={p.id}>
              <ProductTile product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Nach Anlass / Budget */}
      <section style={{ background: "var(--surface-inverse)", color: "var(--text-on-inverse)" }}>
        <div className="lum-section" style={{ textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--gold-600)" }}>
              {t.undecidedEyebrow}
            </div>
            <h2 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--text-display-3)", fontWeight: "var(--weight-light)", color: "var(--text-on-inverse)" }}>
              {t.undecidedTitle}
            </h2>
            <div style={{ marginTop: "var(--space-10)", display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={lp("/shop?anlass=anfang")} style={{ textDecoration: "none" }}>
                <Button variant="inverse">{t.ctaMilestone}</Button>
              </Link>
              <Link href={lp("/shop?anlass=alltag")} style={{ textDecoration: "none" }}>
                <Button variant="inverse">{t.ctaEveryday}</Button>
              </Link>
              <Link href={lp("/edelsteine")} style={{ textDecoration: "none" }}>
                <Button variant="inverse">{t.ctaByStone}</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
