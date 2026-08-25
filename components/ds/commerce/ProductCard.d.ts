import * as React from "react";

/**
 * Product tile: full-bleed 3:4 photo, gold stone eyebrow, serif name, price.
 * @startingPoint section="Commerce" subtitle="3:4 photo tile with stone eyebrow and price" viewport="700x400"
 */
export interface ProductCardProps {
  /** Product photo URL. */
  image: string;
  name: string;
  /** Stone + cut eyebrow, e.g. "Rubin · geschliffen". */
  stone?: string;
  price: number | string;
  compareAt?: number | string;
  /** Overlay marker, e.g. "Unikat". */
  badge?: string;
  /** CSS aspect-ratio for the image. @default "3 / 4" */
  ratio?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
