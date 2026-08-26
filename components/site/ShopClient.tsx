"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ds/core/Tag.jsx";
import { Select } from "@/components/ds/core/Select.jsx";
import { Button } from "@/components/ds/core/Button.jsx";
import { ProductTile } from "@/components/site/ProductTile";
import {
  PRODUCTS,
  CATEGORIES,
  STONES,
  getOccasion,
  productName,
  categoryLabel,
  gemName,
  occasionLabel,
  occasionCopy,
  type Category,
  type OccasionSlug,
} from "@/lib/catalog";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

const SORTS = ["Empfohlen", "Preis aufsteigend", "Preis absteigend"] as const;
const PRICE_BRACKETS = ["Alle Preise", "bis 25 €", "25–60 €", "über 60 €"] as const;

function inBracket(price: number, b: string): boolean {
  if (b === "bis 25 €") return price <= 25;
  if (b === "25–60 €") return price > 25 && price <= 60;
  if (b === "über 60 €") return price > 60;
  return true;
}

export function ShopClient() {
  const locale = useLocale();
  const t = getDict(locale).shop;
  const lp = (p: string) => localePath(locale, p);
  const priceLabel: Record<string, string> = {
    "Alle Preise": t.priceAll,
    "bis 25 €": t.priceUnder25,
    "25–60 €": t.price25to60,
    "über 60 €": t.priceOver60,
  };
  const sortLabel: Record<string, string> = {
    Empfohlen: t.sortRecommended,
    "Preis aufsteigend": t.sortPriceAsc,
    "Preis absteigend": t.sortPriceDesc,
  };
  const params = useSearchParams();
  const urlOccasion = (params.get("anlass") as OccasionSlug | null) ?? null;
  const urlKategorie = params.get("kategorie");
  const urlStein = params.get("stein");

  const [category, setCategory] = React.useState<Category | null>(
    urlKategorie && (CATEGORIES as string[]).includes(urlKategorie) ? (urlKategorie as Category) : null,
  );
  const [gem, setGem] = React.useState<string | null>(
    urlStein && STONES.includes(urlStein) ? urlStein : null,
  );
  const [occasion, setOccasion] = React.useState<OccasionSlug | null>(urlOccasion);
  const [price, setPrice] = React.useState<string>("Alle Preise");
  const [sort, setSort] = React.useState<(typeof SORTS)[number]>("Empfohlen");
  const [query, setQuery] = React.useState("");

  const activeOccasion = occasion ? getOccasion(occasion) : undefined;

  let list = PRODUCTS.filter(
    (p) =>
      (!category || p.category === category) &&
      (!gem || p.gem === gem) &&
      (!occasion || p.occasion === occasion) &&
      (!query || `${productName(p, locale)} ${p.name} ${p.gem} ${categoryLabel(p.category, locale)} ${p.description}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale).trim())) &&
      inBracket(p.price, price),
  );
  if (sort === "Preis aufsteigend") list = list.slice().sort((a, b) => a.price - b.price);
  if (sort === "Preis absteigend") list = list.slice().sort((a, b) => b.price - a.price);

  const resetOccasion = () => setOccasion(null);

  return (
    <main className="lum-page" style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--section-y)" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", gap: 10, alignItems: "center", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)" }}>
        <Link href={lp("/")} style={{ color: "var(--text-muted)" }}>{getDict(locale).nav.start}</Link>
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>/</span>
        <span style={{ color: "var(--text-secondary)" }}>{activeOccasion ? occasionLabel(activeOccasion, locale) : t.crumbShop}</span>
      </nav>

      {/* Header */}
      <div style={{ marginTop: "var(--space-8)", maxWidth: 680 }}>
        <div className="lum-eyebrow">{activeOccasion ? t.eyebrowCollection : t.eyebrowShop}</div>
        <h1 style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--text-display-2)", fontWeight: "var(--weight-light)" }}>
          {activeOccasion ? occasionLabel(activeOccasion, locale) : t.titleAll}
        </h1>
        {activeOccasion ? (
          <p style={{ marginTop: "var(--space-5)", color: "var(--text-secondary)", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}>
            {occasionCopy(activeOccasion, locale)}{" "}
            <button onClick={resetOccasion} style={{ background: "none", border: "none", color: "var(--text-gold)", cursor: "pointer", fontSize: "inherit", padding: 0, textDecoration: "underline" }}>
              {t.showAll}
            </button>
          </p>
        ) : null}
      </div>

      {/* Filter-Toolbar: Suche wächst mit, Selects rechts, auf einer Reihe */}
      <div style={{ marginTop: "var(--space-12)", display: "flex", flexWrap: "wrap", gap: "var(--space-5)", alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 280px", minWidth: 240 }}>
          <label htmlFor="produktsuche" style={{ display: "block", marginBottom: 8, fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
            {t.searchLabel}
          </label>
          <input
            id="produktsuche"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            style={{ width: "100%", minHeight: 48, padding: "12px 14px", background: "var(--ink-800)", border: "1px solid var(--border-hairline-strong)", color: "var(--text-primary)", font: "inherit" }}
          />
        </div>
        <Select
          label={t.selStone}
          value={gem ?? "Alle Steine"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGem(e.target.value === "Alle Steine" ? null : e.target.value)}
          options={[{ value: "Alle Steine", label: t.allStones }, ...STONES.map((s) => ({ value: s, label: gemName(s, locale) }))]}
          style={{ width: 160 }}
        />
        <Select
          label={t.selPrice}
          value={price}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPrice(e.target.value)}
          options={PRICE_BRACKETS.map((b) => ({ value: b, label: priceLabel[b] }))}
          style={{ width: 148 }}
        />
        <Select
          label={t.selSort}
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as (typeof SORTS)[number])}
          options={SORTS.map((s) => ({ value: s, label: sortLabel[s] }))}
          style={{ width: 180 }}
        />
      </div>

      {/* Kategorie-Chips */}
      <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
        <Tag selected={!category} onClick={() => setCategory(null)}>{t.filterAll}</Tag>
        {CATEGORIES.map((c) => (
          <Tag key={c} selected={category === c} onClick={() => setCategory(c)}>
            {categoryLabel(c, locale)}
          </Tag>
        ))}
      </div>

      <div style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-hairline)", fontSize: "var(--text-caption)", color: "var(--text-muted)" }}>
        {list.length} {list.length === 1 ? t.countOne : t.countMany}
      </div>

      {list.length === 0 ? (
        <div style={{ maxWidth: 520, margin: "var(--space-24) auto", textAlign: "center" }}>
          <div className="lum-eyebrow">{t.emptyEyebrow}</div>
          <h2 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--text-title)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-snug)" }}>
            {t.emptyTitle}
          </h2>
          <p style={{ marginTop: "var(--space-5)", color: "var(--text-secondary)", fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body)" }}>
            {t.emptyBody}
          </p>
          <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Button href={lp("/kontakt")} size="lg">{t.emptyCta}</Button>
            <button
              onClick={() => { setCategory(null); setGem(null); setOccasion(null); setPrice("Alle Preise"); setQuery(""); }}
              style={{ background: "none", border: "1px solid var(--border-hairline-strong)", borderRadius: "var(--radius-button)", color: "var(--text-primary)", padding: "15px 32px", fontFamily: "var(--font-sans)", fontSize: 11, textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", cursor: "pointer" }}
            >
              {t.resetFilters}
            </button>
          </div>
        </div>
      ) : (
        <div className="lum-shop-grid" style={{ marginTop: "var(--space-16)" }}>
          {list.map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
