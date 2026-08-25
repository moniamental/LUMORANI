"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ds/core/Button.jsx";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

export function SuccessView() {
  const cart = useCart();
  const locale = useLocale();
  const t = getDict(locale).success;

  // Warenkorb nach erfolgreichem Kauf leeren (einmalig)
  const cleared = React.useRef(false);
  React.useEffect(() => {
    if (!cleared.current) {
      cart.clear();
      cleared.current = true;
    }
  }, [cart]);

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
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-2)", fontWeight: "var(--weight-light)", maxWidth: "16ch" }}>
        {t.title}
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "46ch", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}>
        {t.body}
      </p>
      <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href={localePath(locale, "/shop")} style={{ textDecoration: "none" }}>
          <Button size="lg">{t.keepBrowsing}</Button>
        </Link>
        <Link href={localePath(locale, "/")} style={{ textDecoration: "none" }}>
          <Button size="lg" variant="outline">{t.toHome}</Button>
        </Link>
      </div>
    </main>
  );
}
