import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Stripe muss den ROH-Body sehen (für die Signaturprüfung) → node runtime, kein Body-Parsing.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return Response.json({ error: "Webhook nicht konfiguriert." }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return Response.json({ error: "Signatur fehlt." }, { status: 400 });

  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ungültige Signatur.";
    return Response.json({ error: `Webhook-Verifikation fehlgeschlagen: ${message}` }, { status: 400 });
  }

  // Verifizierte Ereignisse verarbeiten
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: Bestellung erfassen / Bestätigungsmail auslösen / Lagerbestand aktualisieren.
      // Der Zahlungseingang ist hier signaturgeprüft bestätigt.
      console.log("[webhook] Zahlung bestätigt für Session", session.id, "gift:", session.metadata?.gift);
      break;
    }
    default:
      // andere Ereignisse ignorieren wir bewusst
      break;
  }

  return Response.json({ received: true });
}
