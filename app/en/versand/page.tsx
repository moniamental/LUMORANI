import type { Metadata } from "next";
import { VersandView } from "@/components/views/VersandView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Delivery and shipping",
  description: "Insured, carefully packed and free within Germany. This is how your jewellery reaches you safely.",
  alternates: altLanguages("/versand"),
};

export default function VersandPageEN() {
  return <VersandView lang="en" />;
}
