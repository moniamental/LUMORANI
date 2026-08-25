import * as React from "react";

/** Small status marker overlaid on product imagery ("Neu", "Unikat", "Ausverkauft"). */
export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "gold" */
  tone?: "gold" | "ink" | "outline" | "ruby" | "emerald";
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
