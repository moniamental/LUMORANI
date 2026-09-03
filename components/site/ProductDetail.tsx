"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ds/core/Button.jsx";
import { Badge } from "@/components/ds/core/Badge.jsx";
import { PriceTag } from "@/components/ds/commerce/PriceTag.jsx";
import { QuantityStepper } from "@/components/ds/commerce/QuantityStepper.jsx";
import { ProductTile } from "@/components/site/ProductTile";
import { Reveal } from "@/components/motion/Reveal";
import {
  type Product,
  productName,
  productDescription,
  gemName,
  categoryLabel,
  gemLoreFor,
  VOICES,
} from "@/lib/catalog";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";
import { priceNote } from "@/lib/tax";
import Image from "next/image";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const cart = useCart();
  const locale = useLocale();
  const t = getDict(locale).product;
  const [qty, setQty] = React.useState(1);
  const [shot, setShot] = React.useState(0);

  const name = productName(product, locale);
  const gem = gemName(product.gem, locale);
  const lore = gemLoreFor(product.gem, locale);
  const note = priceNote(locale);
  // Nur das echte Produktbild — keine generischen Box-/Collage-Bilder mehr,
  // die auf jedem Produkt gleich (und damit „falsch") wirkten.
  const shots = [product.image];

  const facts: [string, string][] = [
    [t.factMaterial, lore?.herkunft ?? t.factMaterialFallback],
    [t.factCharacter, lore?.bedeutung ?? t.factCharacterFallback],
    [t.factMaking, t.factMakingValue],
    [t.factCare, lore?.pflege ?? t.factCareFallback],
    [t.factDelivery, t.factDeliveryValue],
  ];

  return (
    <main className="lum-page" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--section-y-tight)" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)" }}>
        <Link href={localePath(locale, "/")} style={{ color: "var(--text-muted)" }}>{getDict(locale).nav.start}</Link>
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>/</span>
        <Link href={localePath(locale, `/shop?kategorie=${encodeURIComponent(product.category)}`)} style={{ color: "var(--text-muted)" }}>{categoryLabel(product.category, locale)}</Link>
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>/</span>
        <span style={{ color: "var(--text-secondary)" }}>{name}</span>
      </nav>

      <div className="lum-split" style={{ marginTop: "var(--space-8)", alignItems: "start" }}>
        {/* Galerie */}
        <div>
          <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", background: "var(--ink-800)" }}>
            <Image fill sizes="(max-width: 900px) 100vw, 50vw" src={shots[shot]} alt={name} style={{ objectFit: "cover" }} />
            {product.badge ? (
              <div style={{ position: "absolute", top: 18, left: 18 }}>
                <Badge tone="outline">{product.badge}</Badge>
              </div>
            ) : null}
          </div>
          {shots.length > 1 ? (
            <div style={{ marginTop: "var(--space-3)", display: "grid", gridTemplateColumns: `repeat(${shots.length}, 1fr)`, gap: "var(--space-3)" }}>
              {shots.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={t.shotProduct}
                  style={{ position: "relative", padding: 0, aspectRatio: "1 / 1", overflow: "hidden", cursor: "pointer", background: "none", border: "1px solid " + (i === shot ? "var(--gold-300)" : "var(--border-hairline)") }}
                >
                  <Image fill sizes="120px" src={s} alt="" style={{ objectFit: "cover", opacity: i === shot ? 1 : 0.6 }} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Kaufspalte */}
        <div className="lum-product-buybox">
          <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
            {gem}
          </div>
          <h1 style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--text-display-3)", fontWeight: "var(--weight-light)" }}>
            {name}
          </h1>
          <div style={{ marginTop: "var(--space-5)" }}>
            <PriceTag value={product.price} compareAt={product.compareAt} size="lg" locale={locale} />
            {/* Pflichtangabe nach § 6 PAngV — Text zentral in lib/tax.ts umschaltbar. */}
            <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-micro)", color: "var(--text-muted)", lineHeight: 1.5 }}>
              {note.text}{" "}
              <Link href={localePath(locale, "/versand")} style={{ color: "var(--text-muted)", textDecoration: "underline" }}>
                {note.linkLabel}
              </Link>
            </p>
          </div>
          <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>
            {productDescription(product, locale)}
          </p>

          {/* Verknappung ist hier keine Masche, sondern die Wahrheit:
              jedes Stück wird einmal von Hand gefertigt. */}
          <p style={{ marginTop: "var(--space-8)", display: "inline-flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3) var(--space-5)", border: "1px solid var(--border-gold)", borderRadius: "var(--radius-button)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-gold)" }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-gold)" }} />
            {t.unique}
          </p>

          <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <QuantityStepper value={qty} onChange={setQty} max={5} />
            <Button size="lg" fullWidth onClick={() => cart.add(product, qty)}>
              {t.add}
            </Button>
          </div>

          {/* Vertrauens-Signale */}
          <div style={{ marginTop: "var(--space-6)", display: "flex", flexWrap: "wrap", gap: "var(--space-5)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
            <span>✓ {t.trust1}</span>
            <span>✓ {t.trust2}</span>
            <span>✓ {t.trust3}</span>
          </div>

          {/* Fakten */}
          <dl style={{ marginTop: "var(--space-10)", borderTop: "1px solid var(--border-hairline)" }}>
            {facts.map((row) => (
              <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "var(--space-5)", padding: "var(--space-5) 0", borderBottom: "1px solid var(--border-hairline)" }}>
                <dt style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>{row[0]}</dt>
                <dd style={{ margin: 0, fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "var(--text-secondary)" }}>{row[1]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Samirs Notiz */}
      {lore?.samir ? (
        <Reveal>
          <section
            style={{
              marginTop: "var(--section-y-tight)",
              padding: "var(--space-16)",
              background: "var(--surface-page-alt)",
              borderTop: "1px solid var(--border-gold)",
            }}
          >
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
                {t.samirNote}
              </div>
              <p style={{ marginTop: "var(--space-6)", fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-snug)", color: "var(--text-primary)" }}>
                {locale === "en" ? `“${lore.samir}”` : `„${lore.samir}"`}
              </p>
              <div style={{ marginTop: "var(--space-6)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
                {t.samirRole}
              </div>
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* Kundenstimmen — Vertrauen genau dort, wo entschieden wird.
          Bisher standen sie nur auf der Startseite. */}
      {VOICES.length ? (
        <Reveal>
          <section style={{ marginTop: "var(--section-y-tight)", paddingTop: "var(--space-12)", borderTop: "1px solid var(--border-hairline)" }}>
            <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
              {t.voicesTitle}
            </div>
            <div className="lum-grid-3" style={{ marginTop: "var(--space-8)" }}>
              {VOICES.map((v) => (
                <figure key={v.name} style={{ margin: 0 }}>
                  <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>
                    {locale === "en" ? `“${v.quote}”` : `„${v.quote}"`}
                  </blockquote>
                  <figcaption style={{ marginTop: "var(--space-4)", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
                    {v.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* Passt dazu */}
      {related.length ? (
        <div style={{ marginTop: "var(--section-y-tight)" }}>
          <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
            {t.related}
          </div>
          <div className="lum-grid-4" style={{ marginTop: "var(--space-8)" }}>
            {related.map((x) => (
              <ProductTile key={x.id} product={x} />
            ))}
          </div>
        </div>
      ) : null}
      {/* Mitlaufender Kauf-Balken auf schmalen Bildschirmen. Der eigentliche
          CTA liegt weit unten in der Kaufspalte — mobil sonst außer Sichtweite. */}
      <div className="lum-buybar" aria-hidden={false}>
        <div className="lum-buybar__info">
          <span className="lum-buybar__name">{name}</span>
          <span className="lum-buybar__price">{new Intl.NumberFormat(locale === "en" ? "en-DE" : "de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</span>
        </div>
        <Button size="md" onClick={() => cart.add(product, qty)}>{t.add}</Button>
      </div>
    </main>
  );
}
