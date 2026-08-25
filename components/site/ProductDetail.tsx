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
  IMG,
  type Product,
  productName,
  productDescription,
  gemName,
  categoryLabel,
  gemLoreFor,
} from "@/lib/catalog";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

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
  const shots = [product.image, IMG.box, IMG.tray];

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shots[shot]} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {product.badge ? (
              <div style={{ position: "absolute", top: 18, left: 18 }}>
                <Badge tone="outline">{product.badge}</Badge>
              </div>
            ) : null}
          </div>
          <div style={{ marginTop: "var(--space-3)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-3)" }}>
            {shots.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setShot(i)}
                aria-label={i === 0 ? t.shotProduct : i === 1 ? t.shotBox : t.shotCollection}
                style={{ padding: 0, aspectRatio: "1 / 1", overflow: "hidden", cursor: "pointer", background: "none", border: "1px solid " + (i === shot ? "var(--gold-300)" : "var(--border-hairline)") }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: i === shot ? 1 : 0.6 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Kaufspalte */}
        <div>
          <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
            {gem}
          </div>
          <h1 style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--text-display-3)", fontWeight: "var(--weight-light)" }}>
            {name}
          </h1>
          <div style={{ marginTop: "var(--space-5)" }}>
            <PriceTag value={product.price} compareAt={product.compareAt} size="lg" locale={locale} />
          </div>
          <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)" }}>
            {productDescription(product, locale)}
          </p>

          <div style={{ marginTop: "var(--space-10)", display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
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
    </main>
  );
}
