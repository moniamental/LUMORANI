"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";

/** Atmosphärisches Loop-Video; bei prefers-reduced-motion nur das Poster. */
export function LoopVideo({
  src,
  poster,
  style,
}: {
  src: string;
  poster: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const fill: React.CSSProperties = { objectFit: "cover", ...style };

  if (reduce) {
    return <Image fill sizes="(max-width: 900px) 100vw, 50vw" src={poster} alt="" style={fill} />;
  }
  return (
    <video autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden style={fill}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
