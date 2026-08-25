import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { CategoryTile } from "@/components/site/CategoryTile";
import { ProductTile } from "@/components/site/ProductTile";
import { TrustBand } from "@/components/site/TrustBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ds/core/SectionHeading.jsx";
import { Card } from "@/components/ds/core/Card.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import {
  OCCASIONS,
  PRODUCTS,
  VOICES,
  IMG,
  occasionLabel,
  occasionTagline,
  voiceQuote,
} from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";

export function HomeView({ lang }: { lang: Locale }) {
  const t = getDict(lang).home;
  const lp = (p: string) => localePath(lang, p);

  return (
    <main>
      <Hero />

      <TrustBand lang={lang} />

      {/* Kollektionen nach Anlass */}
      <section className="lum-section">
        <Reveal>
          <SectionHeading eyebrow={t.collectionsEyebrow} title={t.collectionsTitle} />
        </Reveal>
        <RevealGroup className="lum-grid-4" style={{ marginTop: "var(--space-16)" }}>
          {OCCASIONS.map((o) => (
            <RevealItem key={o.slug}>
              <CategoryTile
                data={{
                  label: occasionLabel(o, lang),
                  sub: occasionTagline(o, lang),
                  image: o.image,
                  href: lp(o.href),
                }}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Unsere Geschichte */}
      <section
        style={{
          background: "var(--surface-page-alt)",
          borderTop: "1px solid var(--border-hairline)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <div className="lum-section lum-split">
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.silk} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
              <Link href={lp("/ueber-uns")} style={{ textDecoration: "none" }}>
                <Button variant="ghost" style={{ marginTop: "var(--space-8)" }}>
                  {t.storyCta}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Neuheiten */}
      <section className="lum-section">
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
            <SectionHeading align="left" size="md" eyebrow={t.newsEyebrow} title={t.newsTitle} rule={false} />
            <Link href={lp("/shop")} style={{ textDecoration: "none", flexShrink: 0 }}>
              <Button variant="ghost" size="sm">
                {getDict(lang).common.shopAll}
              </Button>
            </Link>
          </div>
        </Reveal>
        <RevealGroup className="lum-grid-4" style={{ marginTop: "var(--space-12)" }}>
          {PRODUCTS.slice(0, 4).map((p) => (
            <RevealItem key={p.id}>
              <ProductTile product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Zitat-Band */}
      <section style={{ position: "relative", padding: "var(--section-y) var(--page-pad)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.tray} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <Reveal style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-3)", lineHeight: "var(--leading-display)" }}>
            {t.quote}
          </h2>
          <Link href={lp("/edelsteine")} style={{ textDecoration: "none" }}>
            <Button variant="secondary" style={{ marginTop: "var(--space-10)" }}>
              {getDict(lang).common.viewGemstones}
            </Button>
          </Link>
        </Reveal>
      </section>

      {/* Kundenstimmen */}
      <section className="lum-section" style={{ paddingTop: "var(--section-y-tight)" }}>
        <Reveal>
          <SectionHeading eyebrow={t.voicesEyebrow} title={t.voicesTitle} size="md" />
        </Reveal>
        <RevealGroup className="lum-grid-3" style={{ marginTop: "var(--space-16)" }}>
          {VOICES.map((v) => (
            <RevealItem key={v.name}>
              <Card variant="hairline" padding="var(--space-10)">
                <div style={{ color: "var(--gold-300)", letterSpacing: "0.3em", fontSize: 11 }}>★★★★★</div>
                <p style={{ margin: "var(--space-5) 0 0", fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-snug)" }}>
                  {voiceQuote(v, lang)}
                </p>
                <div style={{ marginTop: "var(--space-6)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
                  {v.name}
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <Newsletter />
    </main>
  );
}
