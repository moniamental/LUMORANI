"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export type CollectionTile = { label: string; sub: string; image: string; href: string };

export function CategoryTile({ data }: { data: CollectionTile }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      href={data.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div className="lum-cat-tile" style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden" }}>
        <Image fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
          src={data.image}
          alt={data.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hover ? "var(--image-zoom)" : "none",
            transition: "transform var(--duration-slow) var(--ease-out-silk)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--gradient-ink-veil)",
            opacity: hover ? 0.85 : 0.6,
            transition: "var(--transition-hover)",
          }}
        />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "var(--space-6)", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-title)",
              fontWeight: "var(--weight-light)",
              color: hover ? "var(--gold-100)" : "var(--marble-050)",
              transition: "var(--transition-hover)",
            }}
          >
            {data.label}
          </div>
          <div
            style={{
              marginTop: "var(--space-2)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--weight-light)",
              color: "var(--text-secondary)",
              maxHeight: hover ? 60 : 0,
              overflow: "hidden",
              transition: "max-height var(--duration-base) var(--ease-out-silk)",
            }}
          >
            {data.sub}
          </div>
        </div>
      </div>
    </Link>
  );
}
