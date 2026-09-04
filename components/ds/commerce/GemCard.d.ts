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
  /** Beschreibt, was auf dem Bild tatsächlich zu sehen ist. Fällt auf `name` zurück. */
  imageAlt?: string;
  /** Available cuts, e.g. ["Ungeschliffen", "Geschliffen", "Half & Half"]. */
  cuts?: string[];
  /**
   * Hinweis unter den Schliff-Chips, z. B. „Auf Anfrage".
   * Bewusst getrennt von `cuts`: die Chips beschreiben eine Eigenschaft des
   * Steins, der Hinweis den Weg zum Kauf. In derselben Reihe gelesen wirkt
   * „Auf Anfrage" wie ein vierter Schliff.
   */
  note?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function GemCard(props: GemCardProps): JSX.Element;
