import * as React from "react";

/**
 * Split header: three links left, centred wordmark, remaining links + utilities right.
 * @startingPoint section="Navigation" subtitle="Split nav with centred wordmark" viewport="1280x140"
 */
export interface NavBarProps {
  /** Path to assets/logo-lumorani.svg; falls back to the wordmark set in Cinzel. */
  logoSrc?: string;
  /** @default "LUMORANI" */
  brand?: string;
  /** @default ["Start","Shop","Edelsteine","Über Uns","Geschenksets","Kontakt"] */
  links?: string[];
  active?: string;
  onNavigate?: (label: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
  /** Glass over hero imagery vs. solid ink. @default true */
  transparent?: boolean;
  /** Optional caps strip above the bar, e.g. "Versandkostenfrei ab 150 €". */
  announcement?: string;
  style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
