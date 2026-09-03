// ─────────────────────────────────────────────────────────────────────────────
// Umsatzsteuer-Angabe am Preis — § 6 Preisangabenverordnung
//
// ⚠️ EINE Stelle für den ganzen Shop. Sobald Samirs Steuerstatus feststeht,
//    hier umschalten. Sonst ist nirgends etwas zu ändern.
//
//    "kleinunternehmer" → Umsatzsteuer darf NICHT ausgewiesen werden (§ 19 UStG)
//    "regelbesteuert"   → „inkl. MwSt." muss am Preis stehen
//
// Stand 03.09.2026: von Monia bestätigt — Samir ist Kleinunternehmer nach § 19
// UStG. Es darf deshalb KEINE Umsatzsteuer ausgewiesen werden. Ändert sich das
// (Überschreiten der Umsatzgrenze, freiwilliger Verzicht), nur diesen Wert
// umstellen — der Text passt sich überall an.
// ─────────────────────────────────────────────────────────────────────────────

import type { Locale } from "@/lib/i18n";

export const TAX_MODE: "kleinunternehmer" | "regelbesteuert" = "kleinunternehmer";

/** Pflichtangabe direkt am Preis. Der Versandhinweis verlinkt auf /versand. */
export function priceNote(locale: Locale): { text: string; linkLabel: string; href: string } {
  const de = {
    kleinunternehmer: "Kein Ausweis von Umsatzsteuer gemäß § 19 UStG.",
    regelbesteuert: "Inkl. MwSt.",
  };
  const en = {
    kleinunternehmer: "VAT not shown (small business scheme, § 19 German VAT Act).",
    regelbesteuert: "Incl. VAT.",
  };
  return locale === "en"
    ? { text: en[TAX_MODE], linkLabel: "Free shipping within Germany — shipping details", href: "/en/versand" }
    : { text: de[TAX_MODE], linkLabel: "Versandkostenfrei innerhalb Deutschlands — Versandinfos", href: "/versand" };
}
