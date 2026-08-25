import type { Metadata } from "next";
import { KontaktView } from "@/components/views/KontaktView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schreib uns – ob Frage, Wunsch oder individuelle Anfrage. Wir sind für dich da.",
  alternates: altLanguages("/kontakt"),
};

export default function KontaktPage() {
  return <KontaktView lang="de" />;
}
