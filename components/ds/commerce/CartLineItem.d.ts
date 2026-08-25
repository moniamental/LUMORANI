import * as React from "react";

/** One row in the cart drawer / checkout summary. */
export interface CartLineItemProps {
  image: string;
  name: string;
  stone?: string;
  price: number | string;
  /** @default 1 */
  qty?: number;
  onQtyChange?: (next: number) => void;
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export declare function CartLineItem(props: CartLineItemProps): JSX.Element;
