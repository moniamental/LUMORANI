import type { Metadata } from "next";
import { AgbView } from "@/components/views/AgbView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen von LUMORANI — Vertragsschluss, Zahlung, Lieferung, Gewährleistung und Widerruf.",
  robots: { index: false },
  alternates: altLanguages("/agb"),
};

export default function AgbPage() {
  return <AgbView lang="de" />;
}
