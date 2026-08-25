import * as React from "react";

/** Generic surface: 2px radius, hairline border, deep soft shadow. */
export interface CardProps {
  children?: React.ReactNode;
  /** glass = translucent + blur (default), inverse = marble panel. @default "glass" */
  variant?: "glass" | "solid" | "hairline" | "gold" | "inverse";
  /** CSS padding value. @default "var(--space-8)" */
  padding?: string;
  /** Adds lift + gold border on hover. */
  interactive?: boolean;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
