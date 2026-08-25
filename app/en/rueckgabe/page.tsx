import type { Metadata } from "next";
import { RueckgabeView } from "@/components/views/RueckgabeView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Returns policy",
  description: "A 14-day right of return. Simple and fair — so your purchase feels good all round.",
  alternates: altLanguages("/rueckgabe"),
};

export default function RueckgabePageEN() {
  return <RueckgabeView lang="en" />;
}
