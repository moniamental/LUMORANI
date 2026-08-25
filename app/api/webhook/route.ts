import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
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
  } catch {
    return Response.json({ error: "Webhook-Verifikation fehlgeschlagen." }, { status: 400 });
  }

  // Verifizierte Ereignisse verarbeiten
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const resend = getResend();
      const customerEmail = session.customer_details?.email;
      const from = process.env.CONTACT_FROM || "LUMORANI <onboarding@resend.dev>";
      const shopEmail = process.env.CONTACT_TO || "info@lumorani.com";
      const lines = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      const summary = lines.data
        .map((line) => `${line.quantity ?? 1} × ${line.description} — ${((line.amount_total ?? 0) / 100).toFixed(2)} €`)
        .join("\n");
      const amount = `${((session.amount_total ?? 0) / 100).toFixed(2)} €`;

      if (resend && customerEmail) {
        const { error } = await resend.emails.send(
          {
            from,
            to: customerEmail,
            replyTo: shopEmail,
            subject: "Deine LUMORANI-Bestellung ist bestätigt",
            text: `Danke für deine Bestellung.\n\n${summary}\n\nGesamt: ${amount}\n\nWir melden uns, sobald dein Stück versendet wurde.`,
            html: `<div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6"><h1 style="font-size:24px">Danke für deine Bestellung.</h1><p>Deine Zahlung ist bestätigt. Wir bereiten dein LUMORANI-Stück sorgfältig für den Versand vor.</p><pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${summary}</pre><p><strong>Gesamt: ${amount}</strong></p><p>Wir melden uns, sobald dein Stück versendet wurde.</p></div>`,
          },
          { idempotencyKey: `order-customer/${session.id}` },
        );
        if (error) throw new Error("Customer confirmation failed");
      }

      if (resend) {
        const { error } = await resend.emails.send(
          {
            from,
            to: shopEmail,
            replyTo: customerEmail || undefined,
            subject: `Neue LUMORANI-Bestellung · ${amount}`,
            text: `Stripe-Session: ${session.id}\nKundin/Kunde: ${customerEmail || "keine E-Mail"}\nGeschenk: ${session.metadata?.gift || "false"}\n\n${summary}`,
          },
          { idempotencyKey: `order-shop/${session.id}` },
        );
        if (error) throw new Error("Shop notification failed");
      }

      console.log("[webhook] Order confirmation processed", session.id);
      break;
    }
    default:
      // andere Ereignisse ignorieren wir bewusst
      break;
  }

  return Response.json({ received: true });
}
