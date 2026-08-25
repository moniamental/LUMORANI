import type { Metadata } from "next";
import { BarrierefreiheitView } from "@/components/views/BarrierefreiheitView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Accessibility",
  alternates: altLanguages("/barrierefreiheit"),
};

export default function BarrierefreiheitPageEN() {
  return <BarrierefreiheitView lang="en" />;
}
