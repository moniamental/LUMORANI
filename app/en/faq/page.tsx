import type { Metadata } from "next";
import { FaqView } from "@/components/views/FaqView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about our gemstones, craft, shipping, returns and care.",
  alternates: altLanguages("/faq"),
};

export default function FaqPageEN() {
  return <FaqView lang="en" />;
}
