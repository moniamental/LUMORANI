import * as React from "react";

/**
 * Eyebrow + serif headline + gold rule. The standard opener for every page section.
 * @startingPoint section="Core" subtitle="Eyebrow, serif headline, gold hairline rule" viewport="700x260"
 */
export interface SectionHeadingProps {
  /** Small gold caps line above the title. */
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** @default "center" */
  align?: "left" | "center";
  /** @default "dark" */
  tone?: "dark" | "light";
  /** @default "lg" */
  size?: "sm" | "md" | "lg";
  /** Gold 64px hairline under the title. @default true */
  rule?: boolean;
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
