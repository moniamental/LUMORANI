import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { localePath } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://lumorani.com";

/** Sprachneutrale Pfade (ohne /en-Präfix). */
const PATHS = [
  "/",
  "/shop",
  "/edelsteine",
  "/geschenksets",
  "/ueber-uns",
  "/kontakt",
  "/faq",
  "/versand",
  "/rueckgabe",
  ...PRODUCTS.map((p) => `/produkt/${p.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const languages = {
      de: `${BASE}${localePath("de", path)}`,
      en: `${BASE}${localePath("en", path)}`,
    };
    const priority = path === "/" ? 1 : path.startsWith("/produkt/") ? 0.8 : 0.7;

    // je eine Zeile pro Sprache, beide mit hreflang-Alternates
    for (const loc of ["de", "en"] as const) {
      entries.push({
        url: `${BASE}${localePath(loc, path)}`,
        changeFrequency: "weekly",
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
