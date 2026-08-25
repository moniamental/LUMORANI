import type { Metadata } from "next";
import { AgbView } from "@/components/views/AgbView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Terms",
  robots: { index: false },
  alternates: altLanguages("/agb"),
};

export default function AgbPageEN() {
  return <AgbView lang="en" />;
}
