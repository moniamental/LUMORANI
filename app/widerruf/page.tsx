import type { Metadata } from "next";
import { WiderrufView } from "@/components/views/WiderrufView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description:
    "Widerrufsbelehrung und Muster-Widerrufsformular von LUMORANI — 14 Tage Widerrufsrecht, Fristen, Folgen und Rücksendung.",
  robots: { index: false },
  alternates: altLanguages("/widerruf"),
};

export default function WiderrufPage() {
  return <WiderrufView lang="de" />;
}
