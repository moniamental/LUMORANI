import * as React from "react";

/** Underline dropdown for sort, size, cut and country pickers. */
export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Strings, or { value, label } pairs. */
  options?: Array<string | { value: string; label: string }>;
  /** @default "dark" */
  tone?: "dark" | "light";
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
