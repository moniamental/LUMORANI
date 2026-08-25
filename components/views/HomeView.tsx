import { Hero } from "@/components/home/Hero";
import { GemstoneMoment } from "@/components/home/GemstoneMoment";
import { Newsletter } from "@/components/home/Newsletter";
import { CategoryTile } from "@/components/site/CategoryTile";
import { ProductTile } from "@/components/site/ProductTile";
import { TrustBand } from "@/components/site/TrustBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { MaskReveal } from "@/components/motion/MaskReveal";
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
              <ParallaxImage src={IMG.silk} amount={10} style={{ position: "absolute", inset: 0 }} />
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
              <Button href={lp("/ueber-uns")} variant="ghost" style={{ marginTop: "var(--space-8)" }}>
                {t.storyCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Signature-Scroll-Moment — Edelstein morpht in 3D beim Scrollen */}
      <GemstoneMoment lang={lang} />

      {/* Neuheiten */}
      <section className="lum-section">
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
            <SectionHeading align="left" size="md" eyebrow={t.newsEyebrow} title={t.newsTitle} rule={false} />
            <Button href={lp("/shop")} variant="ghost" size="sm" style={{ flexShrink: 0 }}>
              {getDict(lang).common.shopAll}
            </Button>
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
        <ParallaxImage src={IMG.tray} amount={8} style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <MaskReveal
            as="h2"
            lines={[t.quote]}
            style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-3)", lineHeight: "var(--leading-display)" }}
          />
          <Reveal delay={0.15}>
            <Button href={lp("/edelsteine")} variant="secondary" style={{ marginTop: "var(--space-10)" }}>
              {getDict(lang).common.viewGemstones}
            </Button>
          </Reveal>
        </div>
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
