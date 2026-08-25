"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const SILK = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  /** Verzögerung in Sekunden (für gestaffelte Reveals) */
  delay?: number;
  /** Startversatz nach unten in px */
  y?: number;
  once?: boolean;
  style?: React.CSSProperties;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/** Sanftes Reveal beim Scrollen — Silk-Easing, 900ms, kein Bounce (Brand-Motion). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  style,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: SILK, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/** Container, der Kinder gestaffelt einblendet. Kinder mit <RevealItem>. */
export function RevealGroup({
  children,
  stagger = 0.08,
  style,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  y = 24,
  style,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: SILK } },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
