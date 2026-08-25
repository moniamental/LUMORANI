import * as React from "react";

/** Hairline quantity control for cart lines and product pages. */
export interface QuantityStepperProps {
  /** @default 1 */
  value?: number;
  /** @default 1 */
  min?: number;
  /** @default 99 */
  max?: number;
  onChange?: (next: number) => void;
  style?: React.CSSProperties;
}
export declare function QuantityStepper(props: QuantityStepperProps): JSX.Element;
