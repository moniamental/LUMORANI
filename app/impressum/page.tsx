import type { Metadata } from "next";
import { ImpressumView } from "@/components/views/ImpressumView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von LUMORANI nach § 5 DDG — Anbieter, Anschrift und Kontakt.",
  robots: { index: false },
  alternates: altLanguages("/impressum"),
};

export default function ImpressumPage() {
  return <ImpressumView lang="de" />;
}
