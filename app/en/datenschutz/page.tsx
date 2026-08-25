import type { Metadata } from "next";
import { DatenschutzView } from "@/components/views/DatenschutzView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false },
  alternates: altLanguages("/datenschutz"),
};

export default function DatenschutzPageEN() {
  return <DatenschutzView lang="en" />;
}
