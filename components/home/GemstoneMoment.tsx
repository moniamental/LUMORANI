"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import type { Locale } from "@/lib/i18n";

const SILK = [0.16, 1, 0.3, 1] as const;

type Stone = { src: string; name: string; note: string };

const COPY: Record<Locale, { eyebrow: string; l1: string; l2: string; stones: Stone[] }> = {
  de: {
    eyebrow: "Ein Stein · ein Moment",
    l1: "Roh geboren.",
    l2: "Für dich gemacht.",
    stones: [
      { src: "/assets/imagery/gem-rubin-moment.jpg", name: "Rubin", note: "Feuer, das bleibt." },
      { src: "/assets/imagery/gem-smaragd-moment.jpg", name: "Smaragd", note: "Tiefe, die trägt." },
      { src: "/assets/imagery/gem-aquamarin-moment.jpg", name: "Aquamarin", note: "Klarheit, die berührt." },
    ],
  },
  en: {
    eyebrow: "One stone · one moment",
    l1: "Born raw.",
    l2: "Made for you.",
    stones: [
      { src: "/assets/imagery/gem-rubin-moment.jpg", name: "Ruby", note: "Fire that stays." },
      { src: "/assets/imagery/gem-smaragd-moment.jpg", name: "Emerald", note: "Depth that carries." },
      { src: "/assets/imagery/gem-aquamarin-moment.jpg", name: "Aquamarine", note: "Clarity that moves." },
    ],
  },
};

/**
 * Signature-Scroll-Moment: gepinnte Bühne, in der ein Edelstein beim Scrollen
 * sanft in 3D dreht und von Rubin → Smaragd → Aquamarin morpht (Crossfade + Skalierung),
 * mit einer 2D-Gold-Rahmen-Überlagerung und maskiert enthüllter Headline.
 * Respektiert prefers-reduced-motion (statische Bühne).
 */
export function GemstoneMoment({ lang }: { lang: Locale }) {
  const reduce = useReducedMotion();
  const t = COPY[lang];
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // weiches Federn für seidiges 3D-Verhalten
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // 3D-Drehung + Atmen der Bühne
  const rotateY = useTransform(p, [0, 1], [-9, 9]);
  const rotateX = useTransform(p, [0, 0.5, 1], [3.5, -2, 3.5]);
  const scale = useTransform(p, [0, 0.5, 1], [1.06, 1.14, 1.06]);

  // Crossfade-Fenster je Stein
  const op0 = useTransform(p, [0.0, 0.3, 0.4], [1, 1, 0]);
  const op1 = useTransform(p, [0.3, 0.42, 0.6, 0.72], [0, 1, 1, 0]);
  const op2 = useTransform(p, [0.62, 0.74, 1], [0, 1, 1]);
  const stoneOps = [op0, op1, op2];

  // Gold-Rahmen-Überlagerung driftet gegenläufig (2D-Layer)
  const frameY = useTransform(p, [0, 1], ["6%", "-6%"]);
  const frameRotate = useTransform(p, [0, 1], [-1.5, 1.5]);
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.25, 0.5, 0.25]);

  // Headline maskiert enthüllen
  const lineY1 = useTransform(p, [0.02, 0.14], ["115%", "0%"]);
  const lineY2 = useTransform(p, [0.06, 0.18], ["115%", "0%"]);
  const captionOp = useTransform(p, [0.1, 0.2], [0, 1]);

  if (reduce) {
    // Statische, respektvolle Variante ohne Bewegung
    return (
      <section style={{ position: "relative", height: "80vh", minHeight: 560, overflow: "hidden", background: "var(--ink-1000)", display: "grid", placeItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.stones[0].src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-scrim)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 var(--space-6)" }}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 style={headlineStyle}>{t.l1}<br />{t.l2}</h2>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={t.eyebrow} style={{ position: "relative", height: "300vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "var(--ink-1000)", display: "grid", placeItems: "center" }}>
        {/* 3D-Bühne mit den morphenden Steinen */}
        <div style={{ position: "absolute", inset: 0, perspective: 1600, transformStyle: "preserve-3d" }}>
          <motion.div style={{ position: "absolute", inset: "-4%", rotateY, rotateX, scale, transformStyle: "preserve-3d", willChange: "transform" }}>
            {t.stones.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <motion.img
                key={s.src}
                src={s.src}
                alt=""
                aria-hidden
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: stoneOps[i], willChange: "opacity" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Ink-Vignette für Lesbarkeit */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%, transparent 30%, rgba(7,7,8,.55) 78%, rgba(7,7,8,.9) 100%)" }} />

        {/* Gold-Glow-Puls (Marken-Elevation = Glow, kein Schatten) */}
        <motion.div aria-hidden style={{ position: "absolute", width: "48vmax", height: "48vmax", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,90,.16), transparent 62%)", opacity: glowOpacity, filter: "blur(8px)", pointerEvents: "none" }} />

        {/* 2D-Gold-Rahmen-Überlagerung (driftet gegenläufig) */}
        <motion.div aria-hidden style={{ position: "absolute", inset: "clamp(20px, 6vw, 76px)", border: "1px solid rgba(201,162,90,.34)", y: frameY, rotate: frameRotate, pointerEvents: "none" }} />

        {/* Textebene */}
        <div style={{ position: "relative", textAlign: "center", padding: "0 var(--space-6)", maxWidth: 900 }}>
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
          <div style={{ position: "relative", height: 48, marginTop: "var(--space-8)" }}>
            {t.stones.map((s, i) => (
              <motion.div key={s.name} style={{ position: "absolute", inset: 0, opacity: stoneOps[i] }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)", color: "var(--gold-200)" }}>{s.name}</div>
                <div style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "rgba(255,255,255,.7)", marginTop: 2 }}>{s.note}</div>
              </motion.div>
            ))}
          </div>

          {/* Fortschritts-Ticks */}
          <motion.div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: "var(--space-10)", opacity: captionOp }}>
            {t.stones.map((s, i) => (
              <motion.span key={s.name} style={{ width: 26, height: 2, background: "var(--gold-300)", opacity: stoneOps[i], transformOrigin: "left" }} />
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
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--gold-200)" }}>
      {children}
    </div>
  );
}
