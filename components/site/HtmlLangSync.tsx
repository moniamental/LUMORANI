"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/useLocale";

/** Hält <html lang> mit der aktuellen Route in Sync (DE-Wurzel vs. /en-Zweig). */
export function HtmlLangSync() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
