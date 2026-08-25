import type { Metadata } from "next";
import { EdelsteineView } from "@/components/views/EdelsteineView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Edelsteine",
  description:
    "Die Vielfalt unserer Edelsteine — von naturbelassenen Rohsteinen über geschliffene Kristalle bis Half & Half. Bedeutung, Herkunft und Charakter jedes Steins.",
  alternates: altLanguages("/edelsteine"),
};

export default function EdelsteinePage() {
  return <EdelsteineView lang="de" />;
}
