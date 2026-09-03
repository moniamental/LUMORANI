import type { Metadata } from "next";
import { DatenschutzView } from "@/components/views/DatenschutzView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von LUMORANI — welche Daten wir verarbeiten, wozu und auf welcher Rechtsgrundlage.",
  robots: { index: false },
  alternates: altLanguages("/datenschutz"),
};

export default function DatenschutzPage() {
  return <DatenschutzView lang="de" />;
}
