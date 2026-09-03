import type { Metadata } from "next";
import { WiderrufView } from "@/components/views/WiderrufView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Right of withdrawal",
  description:
    "Right of withdrawal and model withdrawal form for LUMORANI — 14-day withdrawal period, deadlines, effects and returns.",
  robots: { index: false },
  alternates: altLanguages("/widerruf"),
};

export default function WiderrufPageEN() {
  return <WiderrufView lang="en" />;
}
