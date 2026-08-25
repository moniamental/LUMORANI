import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/site/ShopClient";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Hand-picked gemstones as jewellery and loose stones — sorted by occasion. For every beginning, for every day, as a statement or to gift.",
  alternates: altLanguages("/shop"),
};

export default function ShopPageEN() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <ShopClient />
    </Suspense>
  );
}
