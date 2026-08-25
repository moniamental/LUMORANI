"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Seiten-Übergang: template.tsx wird bei jeder Navigation neu gemountet →
 * sanftes cinematisches Cross-Fade zwischen Routen. Nur Opazität (kein Transform),
 * damit sticky/fixed-Elemente in den Seiten unberührt bleiben. Reduced-motion: no-op.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
