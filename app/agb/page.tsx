import type { Metadata } from "next";
import { AgbView } from "@/components/views/AgbView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false },
  alternates: altLanguages("/agb"),
};

export default function AgbPage() {
  return <AgbView lang="de" />;
}
