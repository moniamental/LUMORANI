import type { Metadata } from "next";
import { RueckgabeView } from "@/components/views/RueckgabeView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Rückgaberichtlinien",
  description: "14 Tage Rückgaberecht. Unkompliziert und fair – damit dein Kauf sich rundum gut anfühlt.",
  alternates: altLanguages("/rueckgabe"),
};

export default function RueckgabePage() {
  return <RueckgabeView lang="de" />;
}
