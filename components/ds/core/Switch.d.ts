import * as React from "react";

/** Pill toggle for binary shop preferences (e.g. gift wrapping, engraving). */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  /** Receives the next value. */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
