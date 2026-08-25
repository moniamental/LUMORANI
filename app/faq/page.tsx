import type { Metadata } from "next";
import { FaqView } from "@/components/views/FaqView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description: "Antworten rund um unsere Edelsteine, Fertigung, Versand, Rückgabe und Pflege.",
  alternates: altLanguages("/faq"),
};

export default function FaqPage() {
  return <FaqView lang="de" />;
}
