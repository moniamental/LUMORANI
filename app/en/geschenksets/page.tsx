import type { Metadata } from "next";
import { GeschenksetsView } from "@/components/views/GeschenksetsView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Gift sets",
  description:
    "Hand-picked gemstone gifts, wrapped by hand in the emerald-green LUMORANI box. A gift that stays.",
  alternates: altLanguages("/geschenksets"),
};

export default function GeschenksetsPageEN() {
  return <GeschenksetsView lang="en" />;
}
