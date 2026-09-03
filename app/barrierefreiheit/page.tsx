import type { Metadata } from "next";
import { BarrierefreiheitView } from "@/components/views/BarrierefreiheitView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Barrierefreiheit",
  description:
    "Erklärung zur Barrierefreiheit von LUMORANI — Stand der Umsetzung und Rückmeldemöglichkeit.",
  alternates: altLanguages("/barrierefreiheit"),
};

export default function BarrierefreiheitPage() {
  return <BarrierefreiheitView lang="de" />;
}
