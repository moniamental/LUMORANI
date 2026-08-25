import type { Metadata } from "next";
import { KontaktView } from "@/components/views/KontaktView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to us — a question, a wish or a custom request. We’re here for you.",
  alternates: altLanguages("/kontakt"),
};

export default function KontaktPageEN() {
  return <KontaktView lang="en" />;
}
