"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "@/components/ds/core/Button.jsx";
import { IMG } from "@/lib/catalog";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

const SILK = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const locale = useLocale();
  const t = getDict(locale).hero;
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // sanfter Parallax: Bild driftet nach unten, Text leicht mit
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "26%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // Scroll-Hinweis blendet beim Scrollen aus, bevor die Buttons ihn erreichen
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: SILK } },
  };

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: "92vh", minHeight: 640, display: "grid", placeItems: "center", overflow: "hidden" }}
    >
      <motion.div
        style={{ position: "absolute", inset: "-8% 0", y: bgY, willChange: "transform" }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: SILK }}
      >
        {reduce ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={IMG.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={IMG.hero}
            aria-hidden
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/assets/video/hero-craft.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: "relative", textAlign: "center", padding: "0 var(--space-6)", maxWidth: 900, y: textY, opacity: textOpacity }}
      >
        <motion.div
          variants={item}
          style={{
            fontSize: "var(--text-micro)",
            fontWeight: "var(--weight-medium)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-caps-wide)",
            color: "var(--gold-200)",
          }}
        >
          {t.eyebrow}
        </motion.div>
        <motion.h1
          variants={item}
          style={{
            margin: "var(--space-6) 0 0",
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--text-hero)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-hero)",
          }}
        >
          {t.titleTop}
          <br />
          {t.titleBottom}
        </motion.h1>
        <motion.p
          variants={item}
          style={{
            margin: "var(--space-6) auto 0",
            maxWidth: 520,
            fontSize: "var(--text-body)",
            fontWeight: "var(--weight-light)",
            color: "rgba(255,255,255,.88)",
          }}
        >
          {t.sub}
        </motion.p>
        <motion.div
          variants={item}
          style={{ marginTop: "var(--space-10)", display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Button href={localePath(locale, "/shop")} size="lg">{t.ctaPrimary}</Button>
          <Button href={localePath(locale, "/edelsteine")} size="lg" variant="outline">
            {t.ctaSecondary}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll-Hinweis — zentriert, mit Weißraum, blendet beim Scrollen aus */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", bottom: "var(--space-10)", left: "50%", x: "-50%", opacity: reduce ? 0 : hintOpacity, display: "grid", placeItems: "center", gap: "var(--space-3)" }}
      >
        <motion.div
          animate={reduce ? {} : { opacity: [0.2, 0.85, 0.2] }}
          transition={{ delay: 1.2, duration: 3.2, ease: "easeInOut", repeat: Infinity }}
          style={{ width: 1, height: 56, background: "linear-gradient(var(--gold-300), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
