"use client";

import React from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ds/core/Button.jsx";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

export function SuccessView({ verified }: { verified: boolean }) {
  const cart = useCart();
  const locale = useLocale();
  const t = getDict(locale).success;

  // Warenkorb nach erfolgreichem Kauf leeren (einmalig)
  const cleared = React.useRef(false);
  React.useEffect(() => {
    if (verified && !cleared.current) {
      cart.clear();
      cleared.current = true;
    }
  }, [cart, verified]);

  const title = verified ? t.title : locale === "en" ? "We couldn’t verify this payment." : "Diese Zahlung konnte nicht bestätigt werden.";
  const body = verified
    ? t.body
    : locale === "en"
      ? "No order has been confirmed on this page. If you completed a payment, please contact us and include the email address used at checkout."
      : "Auf dieser Seite wurde keine Bestellung bestätigt. Falls du bezahlt hast, kontaktiere uns bitte mit der im Checkout verwendeten E-Mail-Adresse.";

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
        {title}
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "46ch", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}>
        {body}
      </p>
      <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
        <Button href={localePath(locale, "/shop")} size="lg">{t.keepBrowsing}</Button>
        <Button href={localePath(locale, "/")} size="lg" variant="outline">{t.toHome}</Button>
      </div>
    </main>
  );
}
