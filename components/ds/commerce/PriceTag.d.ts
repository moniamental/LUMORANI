import * as React from "react";

/** Price display — Jost, never the display serif; German decimal comma. */
export interface PriceTagProps {
  /** Number (formatted to "1290,00 €") or a pre-formatted string. */
  value: number | string;
  /** Struck-through reference price. */
  compareAt?: number | string;
  /** @default "€" */
  currency?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default "dark" */
  tone?: "dark" | "light";
  /** @default "de" — EN switches to „€25.00", DE stays „25,00 €". */
  locale?: "de" | "en";
  style?: React.CSSProperties;
}
export declare function PriceTag(props: PriceTagProps): JSX.Element;
