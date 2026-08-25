import * as React from "react";

/** Three-way cut picker — Ungeschliffen / Geschliffen / Half & Half. Brand-specific to Lumorani's stone range. */
export interface CutSelectorProps {
  /** @default "geschliffen" */
  value?: string;
  onChange?: (next: string) => void;
  /** Override the default three cuts. */
  options?: Array<{ value: string; label: string; hint?: string }>;
  /** @default "Schliff" */
  label?: string;
  style?: React.CSSProperties;
}
export declare function CutSelector(props: CutSelectorProps): JSX.Element;
