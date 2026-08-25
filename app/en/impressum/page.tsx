import type { Metadata } from "next";
import { ImpressumView } from "@/components/views/ImpressumView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Imprint",
  robots: { index: false },
  alternates: altLanguages("/impressum"),
};

export default function ImpressumPageEN() {
  return <ImpressumView lang="en" />;
}
