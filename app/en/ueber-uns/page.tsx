import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: "About",
  description:
    "LUMORANI is a family manufactory. Samir chooses and works the stones together with his father — for jewellery that carries authenticity, depth and character.",
  alternates: altLanguages("/ueber-uns"),
};

export default function UeberUnsPageEN() {
  return <AboutView lang="en" />;
}
