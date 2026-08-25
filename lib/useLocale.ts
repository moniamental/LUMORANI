"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "@/lib/i18n";

/** Aktuelle Sprache für Client-Komponenten (aus dem Pfad abgeleitet). */
export function useLocale(): Locale {
  return localeFromPath(usePathname() || "/");
}
