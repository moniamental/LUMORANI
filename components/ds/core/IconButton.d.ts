import * as React from "react";

/** Square-or-circle icon-only control for headers, galleries and wishlists. */
export interface IconButtonProps {
  /** The glyph — a Lucide `<i data-lucide>` element or inline SVG. */
  children?: React.ReactNode;
  /** Accessible name; required. */
  label: string;
  /** @default "ghost" */
  variant?: "ghost" | "hairline" | "gold" | "inverse";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default "circle" */
  shape?: "circle" | "square";
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
