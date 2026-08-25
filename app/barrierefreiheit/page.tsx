import type { Metadata } from "next";
import { BarrierefreiheitView } from "@/components/views/BarrierefreiheitView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Barrierefreiheit",
  alternates: altLanguages("/barrierefreiheit"),
};

export default function BarrierefreiheitPage() {
  return <BarrierefreiheitView lang="de" />;
}
