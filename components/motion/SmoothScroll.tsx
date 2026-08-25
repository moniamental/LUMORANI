"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

/**
 * Globales, cinematisches Smooth-Scrolling (Lenis).
 * — Silk-Feeling: ease-out-expo, kein Bounce (Brand-Motion).
 * — Respektiert prefers-reduced-motion: dann natives Scrollen, kein Lenis.
 * — WICHTIG: Lenis wird über Framer-Motions eigenen Frame-Loop getickt
 *   (`frame.update`), damit `useScroll`/`useTransform` synchron mitlaufen.
 *   Ein separater requestAnimationFrame würde Framers Scroll-Tracking einfrieren.
 * Rendert nichts; läuft nur als Effekt.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // ease-out-expo — schnell anlaufen, seidig ausklingen
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const update = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
