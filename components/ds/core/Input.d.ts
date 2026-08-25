import * as React from "react";

/** Underline text field — the brand uses hairline underlines, never boxed inputs. */
export interface InputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** @default "text" */
  type?: "text" | "email" | "password" | "tel" | "search" | "number";
  hint?: string;
  /** Error message; replaces hint and turns the underline ruby. */
  error?: string;
  disabled?: boolean;
  /** "light" for marble sections. @default "dark" */
  tone?: "dark" | "light";
  /** @default true */
  fullWidth?: boolean;
  style?: React.CSSProperties;
  /** Weitere native Input-Attribute (required, name, autoComplete, …) werden durchgereicht. */
  [key: string]: unknown;
}
export declare function Input(props: InputProps): JSX.Element;
