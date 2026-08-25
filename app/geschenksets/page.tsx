import type { Metadata } from "next";
import { GeschenksetsView } from "@/components/views/GeschenksetsView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Geschenksets",
  description:
    "Handverlesene Edelstein-Geschenke, von Hand in der emeraldgrünen LUMORANI-Box verpackt. Ein Geschenk, das bleibt.",
  alternates: altLanguages("/geschenksets"),
};

export default function GeschenksetsPage() {
  return <GeschenksetsView lang="de" />;
}
