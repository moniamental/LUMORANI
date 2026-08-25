// LUMORANI — i18n-Kern.
// Deutsch ist die Standardsprache und lebt an der Wurzel (/shop, /produkt/...).
// Englisch bekommt einen eigenen /en-Zweig (/en/shop, /en/produkt/...).
// Diese Datei ist bewusst rein (keine "use client"), damit Server- und
// Client-Komponenten sie gleichermaßen importieren können.

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

/** Locale aus einem Pfad ableiten. „/en" oder „/en/..." → „en", sonst „de". */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

/**
 * Einen (deutschen, wurzel-relativen) Pfad in die Zielsprache übersetzen.
 * localePath("en", "/shop")  → "/en/shop"
 * localePath("en", "/")      → "/en"
 * localePath("de", "/shop")  → "/shop"
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "de") return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

/** Das sprachneutrale „Innere" eines Pfades (ohne /en-Präfix). */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname;
}

/** Denselben Inhalt in der anderen Sprache. Für den Sprach-Umschalter. */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}

/** Menschliche Sprachnamen (für den Umschalter). */
export const LOCALE_LABEL: Record<Locale, string> = { de: "Deutsch", en: "English" };
