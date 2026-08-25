import "server-only";
import { getStripe } from "@/lib/stripe";

export async function isPaidCheckoutSession(sessionId: string | undefined) {
  if (!sessionId || !sessionId.startsWith("cs_") || sessionId.length > 200) return false;
  const stripe = getStripe();
  if (!stripe) return false;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.status === "complete" && session.payment_status === "paid";
  } catch {
    return false;
  }
}
