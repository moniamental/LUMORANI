"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ds/core/Button.jsx";
import { Switch } from "@/components/ds/core/Switch.jsx";
import { CartLineItem } from "@/components/ds/commerce/CartLineItem.jsx";
import { PriceTag } from "@/components/ds/commerce/PriceTag.jsx";
import { getProductBySlug, productName, gemName } from "@/lib/catalog";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

const SILK = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const cart = useCart();
  const locale = useLocale();
  const t = getDict(locale).cart;
  const [gift, setGift] = React.useState(false);
  const [giftMessage, setGiftMessage] = React.useState("");
  const [promo, setPromo] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function checkout() {
    if (!cart.items.length) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items.map((i) => ({ id: i.id, qty: i.qty })),
          gift,
          giftMessage: gift ? giftMessage.slice(0, 300) : "",
          promoCode: promo.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || t.errUnavailable);
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(t.errNetwork);
      setLoading(false);
    }
  }

  // Body-Scroll sperren, wenn offen
  React.useEffect(() => {
    if (cart.open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [cart.open]);

  // ESC schließt
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cart]);

  return (
    <AnimatePresence>
      {cart.open ? (
        <React.Fragment key="cart">
          <motion.div
            onClick={cart.closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: SILK }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(7,7,8,.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: SILK }}
            role="dialog"
            aria-label={t.title}
            aria-modal="true"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 60,
              width: 460,
              maxWidth: "92vw",
              background: "var(--ink-800)",
              borderLeft: "1px solid var(--border-hairline)",
              boxShadow: "var(--shadow-lg)",
              padding: "var(--space-10)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--text-gold)" }}>
                {t.title} ({cart.count})
              </div>
              <button
                aria-label={t.close}
                onClick={cart.closeCart}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            <div style={{ marginTop: "var(--space-8)", flex: 1, overflowY: "auto", marginInline: "calc(-1 * var(--space-2))", paddingInline: "var(--space-2)" }}>
              {cart.items.length === 0 ? (
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}>
                  {t.empty}
                </p>
              ) : (
                cart.items.map((i) => {
                  const p = getProductBySlug(i.slug);
                  return (
                    <CartLineItem
                      key={i.id}
                      image={i.image}
                      name={p ? productName(p, locale) : i.name}
                      stone={p ? gemName(p.gem, locale) : i.stone}
                      price={i.price}
                      qty={i.qty}
                      onQtyChange={(q: number) => cart.setQty(i.id, q)}
                      onRemove={() => cart.remove(i.id)}
                    />
                  );
                })
              )}
            </div>

            <div style={{ paddingTop: "var(--space-6)" }}>
              <Switch label={t.giftWrap} checked={gift} onChange={setGift} />

              {gift ? (
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder={t.giftPlaceholder}
                  style={{
                    width: "100%",
                    marginTop: "var(--space-4)",
                    background: "transparent",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-body-sm)",
                    fontWeight: "var(--weight-light)",
                    lineHeight: "var(--leading-body)",
                    padding: "10px 0",
                    border: "none",
                    borderBottom: "1px solid var(--border-hairline)",
                    outline: "none",
                    resize: "none",
                  }}
                />
              ) : null}

              {/* Gutscheincode */}
              <div style={{ marginTop: "var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder={t.promoPlaceholder}
                  aria-label={t.promoPlaceholder}
                  style={{
                    flex: 1,
                    background: "transparent",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-body-sm)",
                    fontWeight: "var(--weight-light)",
                    letterSpacing: "var(--tracking-body)",
                    textTransform: "uppercase",
                    padding: "10px 0",
                    border: "none",
                    borderBottom: "1px solid var(--border-hairline)",
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: "var(--text-micro)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {t.promoHint}
                </span>
              </div>

              <div
                style={{
                  marginTop: "var(--space-6)",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  paddingTop: "var(--space-5)",
                  borderTop: "1px solid var(--border-hairline)",
                }}
              >
                <span style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
                  {t.sum}
                </span>
                <PriceTag value={cart.subtotal} size="md" locale={locale} />
              </div>
              <Button
                size="lg"
                fullWidth
                onClick={checkout}
                disabled={cart.items.length === 0 || loading}
                style={{ marginTop: "var(--space-6)" }}
              >
                {loading ? t.checkoutLoading : t.checkout}
              </Button>
              {error ? (
                <div style={{ marginTop: "var(--space-4)", textAlign: "center", fontSize: "var(--text-micro)", color: "var(--status-error)" }}>
                  {error}
                </div>
              ) : null}
              <div style={{ marginTop: "var(--space-4)", textAlign: "center", fontSize: "var(--text-micro)", color: "var(--text-muted)" }}>
                {t.reassurance}
              </div>
            </div>
          </motion.aside>
        </React.Fragment>
      ) : null}
    </AnimatePresence>
  );
}
