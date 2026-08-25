import * as React from "react";

/**
 * Primary call-to-action. Gold-gradient fill for the one hero action per view;
 * hairline `secondary` / `outline` for everything else.
 * @startingPoint section="Core" subtitle="Gold gradient CTA with hairline variants" viewport="700x150"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = gold gradient (max one per view). @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverse";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  /** Weitere native Attribute (type, name, aria-*, …) werden durchgereicht. */
  [key: string]: unknown;
}
export declare function Button(props: ButtonProps): JSX.Element;
