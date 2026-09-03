import type { Metadata } from "next";
import { DatenschutzView } from "@/components/views/DatenschutzView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy of LUMORANI — which data we process, for what purpose and on what legal basis.",
  robots: { index: false },
  alternates: altLanguages("/datenschutz"),
};

export default function DatenschutzPageEN() {
  return <DatenschutzView lang="en" />;
}
