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
      // Die Nachbereitung darf die Quittung an Stripe NIE verhindern — siehe unten.
      try {
        await handleCheckoutCompleted(stripe, session);
      } catch (err) {
        console.error("[webhook] Nachbereitung fehlgeschlagen", {
          sessionId: session.id,
          amount: session.amount_total,
          email: session.customer_details?.email,
          err,
        });
      }
      break;
    }
    default:
      // andere Ereignisse ignorieren wir bewusst
      break;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // IMMER 200, sobald die Signatur stimmt.
  //
  // Die Antwort quittiert den EMPFANG des Ereignisses, nicht den Erfolg der
  // Folgeaktionen. Ein 500 lässt Stripe bis zu drei Tage lang erneut zustellen —
  // und weil eine kaputte Mailkonfiguration bei jedem Versuch gleich kaputt ist,
  // wäre das kein Selbstheilen, sondern eine Wiederholungsschleife über jede
  // Bestellung. Die Zahlung ist zu diesem Zeitpunkt längst durch; der Kunde
  // merkt vom Mailfehler nichts, der Shop aber bekäme drei Tage Alarm.
  //
  // Fehler gehören deshalb ins Log, nicht in den Statuscode. Jede Bestellung
  // bleibt im Stripe-Dashboard vollständig nachvollziehbar und lässt sich von
  // Hand nachfassen.
  // ───────────────────────────────────────────────────────────────────────────
  return Response.json({ received: true });
}

/**
 * Bestätigungsmails nach erfolgreicher Zahlung.
 *
 * Die beiden Mails sind bewusst voneinander unabhängig: Schlägt die Mail an die
 * Kundschaft fehl, muss die Benachrichtigung an den Shop trotzdem rausgehen —
 * sie ist die wichtigere von beiden, denn ohne sie weiß Samir nicht, dass eine
 * Bestellung da ist.
 */
async function handleCheckoutCompleted(stripe: Stripe, session: Stripe.Checkout.Session) {
  const resend = getResend();
  if (!resend) {
    console.warn("[webhook] Kein Resend konfiguriert — keine Bestellmails", session.id);
    return;
  }

  const customerEmail = session.customer_details?.email;
  const from = process.env.CONTACT_FROM || "LUMORANI <onboarding@resend.dev>";
  const shopEmail = process.env.CONTACT_TO || "info@lumorani.com";
  const amount = `${((session.amount_total ?? 0) / 100).toFixed(2)} €`;

  // Positionsliste ist ein Nice-to-have — fällt sie aus, geht die Mail trotzdem raus.
  let summary = "";
  try {
    const lines = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    summary = lines.data
      .map((line) => `${line.quantity ?? 1} × ${line.description} — ${((line.amount_total ?? 0) / 100).toFixed(2)} €`)
      .join("\n");
  } catch (err) {
    console.error("[webhook] Positionen nicht abrufbar", session.id, err);
    summary = "(Positionen konnten nicht geladen werden — bitte im Stripe-Dashboard nachsehen.)";
  }

  if (customerEmail) {
    try {
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
      if (error) console.error("[webhook] Kundenmail abgelehnt", session.id, error);
    } catch (err) {
      console.error("[webhook] Kundenmail fehlgeschlagen", session.id, err);
    }
  }

  try {
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
    if (error) console.error("[webhook] Shopmail abgelehnt", session.id, error);
  } catch (err) {
    console.error("[webhook] Shopmail fehlgeschlagen", session.id, err);
  }

  console.log("[webhook] Bestellung verarbeitet", session.id);
}
