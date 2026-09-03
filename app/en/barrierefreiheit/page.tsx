import type { Metadata } from "next";
import { BarrierefreiheitView } from "@/components/views/BarrierefreiheitView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility statement for LUMORANI — current status and how to give feedback.",
  alternates: altLanguages("/barrierefreiheit"),
};

export default function BarrierefreiheitPageEN() {
  return <BarrierefreiheitView lang="en" />;
}
