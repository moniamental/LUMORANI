import "server-only";
import Stripe from "stripe";

let cached: Stripe | null = null;

/** Server-Stripe-Client. Gibt null zurück, wenn kein STRIPE_SECRET_KEY gesetzt ist. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}
