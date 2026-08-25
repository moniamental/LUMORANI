import type { Metadata } from "next";
import { VersandView } from "@/components/views/VersandView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Lieferung und Versand",
  description: "Versichert, sorgfältig verpackt und innerhalb Deutschlands kostenfrei. So kommt dein Schmuck sicher zu dir.",
  alternates: altLanguages("/versand"),
};

export default function VersandPage() {
  return <VersandView lang="de" />;
}
