import { SuccessView } from "@/components/views/SuccessView";
import { isPaidCheckoutSession } from "@/lib/checkout-session";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  return <SuccessView verified={await isPaidCheckoutSession(session_id)} />;
}
