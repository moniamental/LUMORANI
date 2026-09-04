import "server-only";
import Stripe from "stripe";

let cached: Stripe | null = null;
let modeChecked = false;

/**
 * Warnt, wenn Schlüsselmodus und Umgebung nicht zusammenpassen.
 *
 * Zwei Verwechslungen sind teuer und beide fallen ohne Hinweis erst dann auf,
 * wenn jemand zu bezahlen versucht:
 *
 *   Testschlüssel auf der Live-Domain → echte Karten werden abgelehnt.
 *     Der Shop wirkt kaputt, obwohl alles läuft.
 *   Live-Schlüssel auf einer Vorschau-URL → echte Abbuchungen auf einer Seite,
 *     die noch niemand sehen sollte.
 *
 * Beides ist eine reine Konfigurationsfrage, deshalb hier nur eine Warnung ins
 * Log — kein Abbruch. Ein harter Fehler würde einen laufenden Shop lahmlegen,
 * um ein Problem zu melden, das die Betreiberin ohnehin nur im Dashboard lösen
 * kann.
 */
function warnOnModeMismatch(key: string) {
  if (modeChecked) return;
  modeChecked = true;

  const isLiveKey = key.startsWith("sk_live_") || key.startsWith("rk_live_");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const isProdUrl = /^https:\/\/(www\.)?lumorani\.com/.test(siteUrl);

  if (!isLiveKey && isProdUrl) {
    console.warn(
      "[stripe] Testschlüssel auf der Live-Domain — echte Zahlungen werden abgelehnt. " +
        "In Vercel STRIPE_SECRET_KEY und NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY auf sk_live_/pk_live_ umstellen.",
    );
  }
  if (isLiveKey && !isProdUrl) {
    console.warn(
      `[stripe] Live-Schlüssel, aber NEXT_PUBLIC_SITE_URL ist "${siteUrl}" — ` +
        "hier entstehen echte Abbuchungen. Für Vorschau und lokale Arbeit Testschlüssel verwenden.",
    );
  }
}

/** Server-Stripe-Client. Gibt null zurück, wenn kein STRIPE_SECRET_KEY gesetzt ist. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  warnOnModeMismatch(key);
  if (!cached) cached = new Stripe(key);
  return cached;
}
