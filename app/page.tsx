import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  alternates: altLanguages("/"),
};

export default function HomePage() {
  return <HomeView lang="de" />;
}
