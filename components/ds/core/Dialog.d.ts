import * as React from "react";

/** Centered modal on a blurred ink veil, with a gold hairline at the top edge. */
export interface DialogProps {
  /** @default true */
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Action row, typically Buttons. */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** Max width in px. @default 520 */
  width?: number;
}
export declare function Dialog(props: DialogProps): JSX.Element;
