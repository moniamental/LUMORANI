import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "LUMORANI ist eine Familienmanufaktur. Samir wählt und bearbeitet die Steine gemeinsam mit seinem Vater — für Schmuck, der Echtheit, Tiefe und Persönlichkeit trägt.",
  alternates: altLanguages("/ueber-uns"),
};

export default function UeberUnsPage() {
  return <AboutView lang="de" />;
}
