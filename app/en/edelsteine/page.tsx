import type { Metadata } from "next";
import { EdelsteineView } from "@/components/views/EdelsteineView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Gemstones",
  description:
    "The variety of our gemstones — from natural raw stones and faceted crystals to Half & Half. The meaning, origin and character of every stone.",
  alternates: altLanguages("/edelsteine"),
};

export default function EdelsteinePageEN() {
  return <EdelsteineView lang="en" />;
}
