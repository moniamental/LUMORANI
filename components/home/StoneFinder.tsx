"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ds/core/Button.jsx";
import { PriceTag } from "@/components/ds/commerce/PriceTag.jsx";
import { PRODUCTS, productName, gemName } from "@/lib/catalog";
import { type Locale, localePath } from "@/lib/i18n";

const SILK = [0.16, 1, 0.3, 1] as const;

type Opt = { label: string; gem: string };
type Step = { q: string; opts: Opt[] };

const CONTENT: Record<Locale, { eyebrow: string; title: string; sub: string; steps: Step[]; resultEyebrow: string; resultLead: string; cta: string; restart: string; back: string }> = {
  de: {
    eyebrow: "Stein-Finder",
    title: "Welcher Stein passt zu dir?",
    sub: "Drei Fragen. Ein Stein, der zu deinem Moment gehört.",
    steps: [
      { q: "Wonach ist dir gerade?", opts: [
        { label: "Ruhe & Klarheit", gem: "Aquamarin" },
        { label: "Kraft & Erdung", gem: "Tigerauge" },
        { label: "Wärme & Liebe", gem: "Rosenquarz" },
        { label: "Tiefe & Weisheit", gem: "Lapislazuli" },
      ] },
      { q: "Welche Farbe zieht dich an?", opts: [
        { label: "Klares Blau", gem: "Lapislazuli" },
        { label: "Sattes Grün", gem: "Jade" },
        { label: "Zartes Rosa", gem: "Rosenquarz" },
        { label: "Warmes Gold", gem: "Tigerauge" },
      ] },
      { q: "Für welchen Moment?", opts: [
        { label: "Jeden Tag", gem: "Amethyst" },
        { label: "Den großen Auftritt", gem: "Lapislazuli" },
        { label: "Ein Geschenk", gem: "Aquamarin" },
        { label: "Einen Neuanfang", gem: "Rosenquarz" },
      ] },
    ],
    resultEyebrow: "Dein Stein",
    resultLead: "Sieht aus, als wäre das dein Stück:",
    cta: "Ansehen",
    restart: "Nochmal",
    back: "Zurück",
  },
  en: {
    eyebrow: "Stone finder",
    title: "Which stone is yours?",
    sub: "Three questions. One stone for your moment.",
    steps: [
      { q: "What are you drawn to?", opts: [
        { label: "Calm & clarity", gem: "Aquamarin" },
        { label: "Strength & grounding", gem: "Tigerauge" },
        { label: "Warmth & love", gem: "Rosenquarz" },
        { label: "Depth & wisdom", gem: "Lapislazuli" },
      ] },
      { q: "Which colour pulls you in?", opts: [
        { label: "Clear blue", gem: "Lapislazuli" },
        { label: "Rich green", gem: "Jade" },
        { label: "Soft rose", gem: "Rosenquarz" },
        { label: "Warm gold", gem: "Tigerauge" },
      ] },
      { q: "For which moment?", opts: [
        { label: "Every day", gem: "Amethyst" },
        { label: "A grand entrance", gem: "Lapislazuli" },
        { label: "A gift", gem: "Aquamarin" },
        { label: "A fresh start", gem: "Rosenquarz" },
      ] },
    ],
    resultEyebrow: "Your stone",
    resultLead: "Looks like this one is yours:",
    cta: "View",
    restart: "Again",
    back: "Back",
  },
};

export function StoneFinder({ lang }: { lang: Locale }) {
  const reduce = useReducedMotion();
  const t = CONTENT[lang];
  const [step, setStep] = React.useState(0);
  const [picks, setPicks] = React.useState<string[]>([]);

  const choose = (gem: string) => {
    const next = [...picks.slice(0, step), gem];
    setPicks(next);
    setStep(step + 1);
  };
  const restart = () => { setPicks([]); setStep(0); };

  // Empfehlung: häufigster Stein; Zweitfrage (Farbe) zählt doppelt.
  const recommendedGem = React.useMemo(() => {
    if (picks.length < t.steps.length) return null;
    const score: Record<string, number> = {};
    picks.forEach((g, i) => { score[g] = (score[g] ?? 0) + (i === 1 ? 2 : 1); });
    return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  }, [picks, t.steps.length]);

  const product = React.useMemo(() => {
    if (!recommendedGem) return null;
    return PRODUCTS.find((p) => p.gem === recommendedGem) ?? PRODUCTS.find((p) => p.gem === "Lapislazuli") ?? PRODUCTS[0];
  }, [recommendedGem]);

  const done = step >= t.steps.length && product;

  return (
    <section className="lum-section" style={{ background: "var(--surface-page-alt)", borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--gold-200)" }}>{t.eyebrow}</div>
        <h2 style={{ margin: "var(--space-5) 0 0", fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-3)", lineHeight: "var(--leading-display)" }}>{t.title}</h2>
        <p style={{ margin: "var(--space-5) auto 0", maxWidth: 460, fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "var(--text-secondary)" }}>{t.sub}</p>

        {/* Fortschritt */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: "var(--space-8)" }}>
          {t.steps.map((_, i) => (
            <span key={i} style={{ width: 28, height: 2, background: i <= (done ? t.steps.length : step) ? "var(--gold-300)" : "var(--border-hairline-strong)", transition: "background var(--duration-base) var(--ease-out-silk)" }} />
          ))}
        </div>

        <div style={{ marginTop: "var(--space-10)", minHeight: 220, display: "grid", placeItems: "center" }}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q${step}`}
                initial={reduce ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: SILK }}
                style={{ width: "100%" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-title)", fontWeight: "var(--weight-light)" }}>{t.steps[step].q}</div>
                <div style={{ marginTop: "var(--space-8)", display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "var(--space-4)" }}>
                  {t.steps[step].opts.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => choose(o.gem)}
                      className="lum-finder-opt"
                      style={{ minHeight: 56, padding: "14px 18px", background: "transparent", border: "1px solid var(--border-hairline-strong)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", letterSpacing: "0.02em", cursor: "pointer", transition: "var(--transition-hover)" }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)} style={{ marginTop: "var(--space-6)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}>{t.back}</button>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={reduce ? {} : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: SILK }}
                style={{ width: "100%", display: "grid", gridTemplateColumns: "minmax(0,160px) 1fr", gap: "var(--space-8)", alignItems: "center", textAlign: "left", maxWidth: 520, margin: "0 auto" }}
              >
                <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product!.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--gold-200)" }}>{t.resultEyebrow} · {gemName(product!.gem, lang)}</div>
                  <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{t.resultLead}</p>
                  <div style={{ marginTop: "var(--space-3)", fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>{productName(product!, lang)}</div>
                  <div style={{ marginTop: "var(--space-3)" }}><PriceTag value={product!.price} size="sm" locale={lang} /></div>
                  <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
                    <Button href={localePath(lang, `/produkt/${product!.slug}`)} size="sm">{t.cta}</Button>
                    <button type="button" onClick={restart} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}>{t.restart}</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
