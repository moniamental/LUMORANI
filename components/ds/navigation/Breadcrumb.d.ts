import * as React from "react";

/** Uppercase micro breadcrumb for shop and product pages. */
export interface BreadcrumbProps {
  /** Strings or { label } objects; the last item renders inert. */
  items?: Array<string | { label: string }>;
  onNavigate?: (label: string) => void;
  style?: React.CSSProperties;
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
