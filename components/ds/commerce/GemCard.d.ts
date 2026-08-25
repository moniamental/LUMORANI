import * as React from "react";

/**
 * Stone encyclopaedia card for the Edelsteine page — photo, hue dot, description, cut chips.
 * @startingPoint section="Commerce" subtitle="Gemstone card with hue dot and cut chips" viewport="700x400"
 */
export interface GemCardProps {
  /** Stone name in German — "Rubin", "Smaragd", "Aquamarin", … drives the hue dot. */
  name: string;
  description?: string;
  image?: string;
  /** Available cuts, e.g. ["Ungeschliffen", "Geschliffen", "Half & Half"]. */
  cuts?: string[];
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function GemCard(props: GemCardProps): JSX.Element;
