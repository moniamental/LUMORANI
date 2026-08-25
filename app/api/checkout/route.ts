import { getStripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/catalog";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Der Bezahlvorgang ist noch nicht konfiguriert. Bitte STRIPE_SECRET_KEY in .env.local setzen." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const b = (body ?? {}) as {
    items?: unknown;
    gift?: unknown;
    giftMessage?: unknown;
    promoCode?: unknown;
  };
  const items = Array.isArray(b.items)
    ? (b.items as Array<{ id?: string; qty?: number }>).slice(0, 50)
    : [];
  const gift = b.gift === true;
  const giftMessage = typeof b.giftMessage === "string" ? b.giftMessage.slice(0, 300) : "";
  const promoCode = typeof b.promoCode === "string" ? b.promoCode.trim().slice(0, 40) : "";

  // Preise & Namen server-seitig aus dem Katalog (Client-Werten wird NICHT vertraut)
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const it of items) {
    const product = PRODUCTS.find((p) => p.id === it.id);
    if (!product) continue;
    const qty = Math.max(1, Math.min(10, Math.floor(Number(it.qty) || 1)));
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: product.gem,
        },
      },
    });
  }

  if (lineItems.length === 0) {
    return Response.json({ error: "Dein Warenkorb ist leer." }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Gutscheincode: als Stripe-Promotion-Code auflösen (falls gesetzt)
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  let allowPromotionCodes: boolean | undefined = true;
  if (promoCode) {
    try {
      const found = await stripe.promotionCodes.list({ code: promoCode, active: true, limit: 1 });
      if (found.data.length > 0) {
        discounts = [{ promotion_code: found.data[0].id }];
        allowPromotionCodes = undefined; // discounts und allow_promotion_codes schließen sich aus
      } else {
        return Response.json({ error: "Gutscheincode ungültig oder abgelaufen." }, { status: 400 });
      }
    } catch {
      return Response.json({ error: "Gutscheincode konnte nicht geprüft werden." }, { status: 400 });
    }
  }

  const metadata: Record<string, string> = { gift: gift ? "true" : "false" };
  if (gift && giftMessage) metadata.gift_message = giftMessage;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      locale: "de",
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["DE", "AT", "CH"] },
      ...(discounts ? { discounts } : { allow_promotion_codes: allowPromotionCodes }),
      metadata,
      payment_intent_data: { metadata },
      custom_text: gift
        ? { submit: { message: "Dein Geschenk wird von Hand verpackt und in der LUMORANI-Box versendet." } }
        : undefined,
      success_url: `${origin}/kasse/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });
    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler beim Checkout.";
    return Response.json({ error: message }, { status: 500 });
  }
}
