"use client";

import { useReducedMotion } from "framer-motion";

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
  const fill: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", ...style };

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" style={fill} />;
  }
  return (
    <video autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden style={fill}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
