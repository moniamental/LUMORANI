import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/site/ShopClient";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Handverlesene Edelsteine als Schmuck und lose Steine — nach Anlass sortiert. Für jeden Anfang, für jeden Tag, als Statement oder zum Verschenken.",
  alternates: altLanguages("/shop"),
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <ShopClient />
    </Suspense>
  );
}
