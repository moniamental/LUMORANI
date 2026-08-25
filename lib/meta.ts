import type { Metadata } from "next";
import { localePath } from "@/lib/i18n";

/**
 * hreflang-Alternates für eine sprachneutrale Route.
 * altLanguages("/shop") → { de: "/shop", en: "/en/shop", "x-default": "/shop" }
 */
export function altLanguages(path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    languages: {
      de: localePath("de", path),
      en: localePath("en", path),
      "x-default": localePath("de", path),
    },
  };
}
