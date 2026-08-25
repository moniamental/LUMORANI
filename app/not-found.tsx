"use client";

import { Button } from "@/components/ds/core/Button.jsx";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

export default function NotFound() {
  const locale = useLocale();
  const t = getDict(locale).notfound;
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "var(--space-6)",
        padding: "var(--space-32) var(--page-pad)",
      }}
    >
      <span className="lum-eyebrow">{t.eyebrow}</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-hero)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-tight)" }}>
        {t.title}
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "44ch", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}>
        {t.body}
      </p>
      <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
        <Button href={localePath(locale, "/shop")} size="lg">{t.toShop}</Button>
        <Button href={localePath(locale, "/")} size="lg" variant="outline">{t.toHome}</Button>
      </div>
    </main>
  );
}
