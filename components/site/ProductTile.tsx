"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Badge } from "@/components/ds/core/Badge.jsx";
import { PriceTag } from "@/components/ds/commerce/PriceTag.jsx";
import { type Product, productName, gemName } from "@/lib/catalog";
import { localePath } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

export function ProductTile({ product, ratio = "3 / 4" }: { product: Product; ratio?: string }) {
  const cart = useCart();
  const locale = useLocale();
  const [hover, setHover] = React.useState(false);
  const name = productName(product, locale);
  const addLabel = locale === "en" ? "Add to cart" : "In den Warenkorb";

  const href = localePath(locale, `/produkt/${product.slug}`);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "block", color: "inherit" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          overflow: "hidden",
          background: "var(--ink-800)",
          borderRadius: "var(--radius-image)",
        }}
      >
        <Link href={href} aria-label={name} style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hover ? "var(--image-zoom)" : "none",
              transition: "transform var(--duration-slow) var(--ease-out-silk)",
            }}
          />
        </Link>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "var(--gradient-ink-veil)",
            opacity: hover ? 0.55 : 0.25,
            transition: "var(--transition-hover)",
          }}
        />
        {product.badge ? (
          <div style={{ position: "absolute", top: 14, left: 14, pointerEvents: "none" }}>
            <Badge tone="outline">{product.badge}</Badge>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => cart.add(product)}
          aria-label={`${name} — ${addLabel}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "14px 16px",
            textAlign: "center",
            fontSize: "var(--text-micro)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-caps)",
            color: "var(--marble-050)",
            background: "rgba(7,7,8,.55)",
            backdropFilter: "blur(var(--blur-glass))",
            WebkitBackdropFilter: "blur(var(--blur-glass))",
            border: "none",
            cursor: "pointer",
            minHeight: 46,
            opacity: hover ? 1 : 0.86,
            transform: "translateY(0)",
            transition: "var(--transition-hover)",
          }}
        >
          {addLabel}
        </button>
      </div>
      <div style={{ paddingTop: "var(--space-5)", display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
          {gemName(product.gem, locale)}
        </span>
        <Link
          href={href}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-subtitle)",
            fontWeight: "var(--weight-light)",
            lineHeight: "var(--leading-snug)",
            color: hover ? "var(--gold-100)" : "var(--text-primary)",
            transition: "var(--transition-hover)",
            textDecoration: "none",
          }}
        >
          {name}
        </Link>
        <PriceTag value={product.price} compareAt={product.compareAt} size="sm" locale={locale} />
      </div>
    </article>
  );
}
