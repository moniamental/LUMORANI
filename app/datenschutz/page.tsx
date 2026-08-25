import type { Metadata } from "next";
import { DatenschutzView } from "@/components/views/DatenschutzView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
  alternates: altLanguages("/datenschutz"),
};

export default function DatenschutzPage() {
  return <DatenschutzView lang="de" />;
}
