"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

type Stone = { src: string; name: string; note: string };

const COPY: Record<Locale, { eyebrow: string; l1: string; l2: string; stones: Stone[] }> = {
  de: {
    eyebrow: "Ein Stein · ein Moment",
    l1: "Roh geboren.",
    l2: "Für dich geschliffen.",
    stones: [
      { src: "/assets/imagery/moment-ruby.jpg", name: "Rubin", note: "Feuer, das bleibt." },
      { src: "/assets/imagery/moment-emerald.jpg", name: "Smaragd", note: "Tiefe, die trägt." },
      { src: "/assets/imagery/moment-diamond.jpg", name: "Diamant", note: "Licht, das bleibt." },
      { src: "/assets/imagery/moment-aqua.jpg", name: "Aquamarin", note: "Klarheit, die berührt." },
    ],
  },
  en: {
    eyebrow: "One stone · one moment",
    l1: "Born raw.",
    l2: "Cut for you.",
    stones: [
      { src: "/assets/imagery/moment-ruby.jpg", name: "Ruby", note: "Fire that stays." },
      { src: "/assets/imagery/moment-emerald.jpg", name: "Emerald", note: "Depth that carries." },
      { src: "/assets/imagery/moment-diamond.jpg", name: "Diamond", note: "Light that remains." },
      { src: "/assets/imagery/moment-aqua.jpg", name: "Aquamarine", note: "Clarity that moves." },
    ],
  },
};

// Crossfade-Fenster je Stein (4 Steine über den Scroll-Verlauf 0→1)
const WINDOWS: [number[], number[]][] = [
  [[0.0, 0.2, 0.3], [1, 1, 0]],
  [[0.2, 0.32, 0.44, 0.54], [0, 1, 1, 0]],
  [[0.44, 0.56, 0.66, 0.76], [0, 1, 1, 0]],
  [[0.66, 0.78, 1], [0, 1, 1]],
];

/**
 * Signature-Scroll-Moment: gepinnte Bühne, in der ein geschliffener Edelstein beim
 * Scrollen in 3D dreht und über 4 Steine morpht (Rubin → Smaragd → Aquamarin → Diamant),
 * mit gegenläufiger 2D-Gold-Rahmen-Überlagerung, Glow-Puls und maskiert enthüllter Headline.
 * Respektiert prefers-reduced-motion (statische Bühne).
 */
export function GemstoneMoment({ lang }: { lang: Locale }) {
  const reduce = useReducedMotion();
  const t = COPY[lang];
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  // Cinematischer Kamera-Move statt „rotierende Platte": langsamer Push-in + sanfter
  // Pan, nur minimaler Tilt bei flacher Perspektive → wirkt räumlich, nicht wie ein 2D-Bild.
  const rotateY = useTransform(p, [0, 1], [-4.5, 4.5]);
  const rotateX = useTransform(p, [0, 0.5, 1], [1.6, -1.2, 1.6]);
  const scale = useTransform(p, [0, 1], [1.12, 1.22]);
  const panX = useTransform(p, [0, 1], ["-1.8%", "1.8%"]);
  const panY = useTransform(p, [0, 0.5, 1], ["1.4%", "-0.8%", "1.4%"]);

  // 4 Stein-Opazitäten (Hooks unrolled — Anzahl konstant)
  const op0 = useTransform(p, WINDOWS[0][0], WINDOWS[0][1]);
  const op1 = useTransform(p, WINDOWS[1][0], WINDOWS[1][1]);
  const op2 = useTransform(p, WINDOWS[2][0], WINDOWS[2][1]);
  const op3 = useTransform(p, WINDOWS[3][0], WINDOWS[3][1]);
  const stoneOps = [op0, op1, op2, op3];

  // 2D-Gold-Rahmen driftet gegenläufig + rotiert
  const frameY = useTransform(p, [0, 1], ["9%", "-9%"]);
  const frameRotate = useTransform(p, [0, 1], [-2.5, 2.5]);
  const frameScale = useTransform(p, [0, 0.5, 1], [1.04, 0.98, 1.04]);
  const glowOpacity = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [0.22, 0.55, 0.3, 0.55, 0.22]);
  const glowHue = useTransform(p, [0, 0.33, 0.66, 1], [
    "rgba(201,120,90,.20)",
    "rgba(90,201,140,.18)",
    "rgba(90,170,201,.18)",
    "rgba(210,210,220,.16)",
  ]);
  const glowBg = useTransform(glowHue, (c) => `radial-gradient(circle, ${c}, transparent 62%)`);

  // Headline maskiert enthüllen
  const lineY1 = useTransform(p, [0.02, 0.14], ["115%", "0%"]);
  const lineY2 = useTransform(p, [0.06, 0.18], ["115%", "0%"]);
  const captionOp = useTransform(p, [0.1, 0.2], [0, 1]);

  if (reduce) {
    return (
      <section style={{ position: "relative", height: "80vh", minHeight: 560, overflow: "hidden", background: "var(--ink-1000)", display: "grid", placeItems: "center" }}>
        <Image fill sizes="100vw" src={t.stones[0].src} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.9 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 var(--space-6)" }}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 style={headlineStyle}>{t.l1}<br />{t.l2}</h2>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={t.eyebrow} style={{ position: "relative", height: "360vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "var(--ink-1000)", display: "grid", placeItems: "center" }}>
        {/* 3D-Bühne mit den morphenden Steinen */}
        <div style={{ position: "absolute", inset: 0, perspective: 2600, overflow: "hidden" }}>
          <motion.div style={{ position: "absolute", inset: "-8%", rotateY, rotateX, scale, x: panX, y: panY, willChange: "transform" }}>
            {t.stones.map((s, i) => (
              <motion.img
                key={s.src}
                src={s.src}
                alt=""
                aria-hidden
                loading="lazy"
                style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: stoneOps[i], willChange: "opacity" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Ink-Vignette für Lesbarkeit */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 95% at 50% 44%, rgba(7,7,8,.28) 12%, rgba(7,7,8,.62) 72%, rgba(7,7,8,.93) 100%)" }} />

        {/* Gold-/Farb-Glow-Puls (wechselt mit dem Stein) */}
        <motion.div aria-hidden style={{ position: "absolute", width: "52vmax", height: "52vmax", borderRadius: "50%", background: glowBg, opacity: glowOpacity, filter: "blur(10px)", pointerEvents: "none" }} />

        {/* 2D-Gold-Rahmen-Überlagerung */}
        <motion.div aria-hidden style={{ position: "absolute", inset: "clamp(18px, 5.5vw, 72px)", border: "1px solid rgba(201,162,90,.36)", y: frameY, rotate: frameRotate, scale: frameScale, pointerEvents: "none" }} />

        {/* Textebene */}
        <div style={{ position: "relative", textAlign: "center", padding: "0 var(--space-6)", maxWidth: 920 }}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 style={{ ...headlineStyle, margin: "var(--space-5) 0 0" }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block", y: lineY1 }}>{t.l1}</motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block", y: lineY2 }}>{t.l2}</motion.span>
            </span>
          </h2>

          {/* wechselnder Steinname + Notiz */}
          <div style={{ position: "relative", height: 52, marginTop: "var(--space-8)" }}>
            {t.stones.map((s, i) => (
              <motion.div key={s.name} style={{ position: "absolute", inset: 0, opacity: stoneOps[i] }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)", color: "var(--gold-200)" }}>{s.name}</div>
                <div style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "rgba(255,255,255,.72)", marginTop: 2 }}>{s.note}</div>
              </motion.div>
            ))}
          </div>

          {/* Fortschritts-Ticks (4) */}
          <motion.div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: "var(--space-10)", opacity: captionOp }}>
            {t.stones.map((s, i) => (
              <motion.span key={s.name} style={{ width: 24, height: 2, background: "var(--gold-300)", opacity: stoneOps[i] }} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const headlineStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-light)",
  fontSize: "var(--text-display-2)",
  lineHeight: "var(--leading-display)",
  letterSpacing: "var(--tracking-hero)",
  color: "var(--text-primary)",
  textShadow: "0 2px 34px rgba(0,0,0,.7), 0 2px 6px rgba(0,0,0,.55)",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--gold-200)" }}>
      {children}
    </div>
  );
}
