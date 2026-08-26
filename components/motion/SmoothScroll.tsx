"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

/**
 * Globales, cinematisches Smooth-Scrolling (Lenis) + zuverlässiges Scroll-to-Top.
 * — Silk-Feeling: ease-out-expo, kein Bounce (Brand-Motion).
 * — Respektiert prefers-reduced-motion: dann natives Scrollen, kein Lenis.
 * — Lenis über Framer-Motions Frame-Loop getickt (sonst friert useScroll ein).
 * — Scroll-Restoration = manuell, und bei JEDEM Routenwechsel/Reload zurück nach oben
 *   (Lenis behält sonst die alte Position; der Browser stellt sie sonst wieder her).
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Browser soll die Scroll-Position NICHT wiederherstellen → Reload landet oben.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    const update = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Bei jedem Seitenwechsel zuverlässig an den Seitenanfang.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
