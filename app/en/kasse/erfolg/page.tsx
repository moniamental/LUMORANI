import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you for your order",
  description: "Your LUMORANI order has been received. A confirmation is on its way by email.",
  robots: { index: false },
};

import { SuccessView } from "@/components/views/SuccessView";
import { isPaidCheckoutSession } from "@/lib/checkout-session";

export default async function CheckoutSuccessPageEN({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  return <SuccessView verified={await isPaidCheckoutSession(session_id)} />;
}
