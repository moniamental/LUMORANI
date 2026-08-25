import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";
import { altLanguages } from "@/lib/meta";

export const metadata: Metadata = {
  title: { absolute: "LUMORANI — Real gemstones. Timeless design." },
  description:
    "Real gemstones, timeless design. For people who like to express themselves with style. Hand-picked stones as jewellery and loose gemstones.",
  alternates: altLanguages("/"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "LUMORANI",
    title: "LUMORANI — Real gemstones. Timeless design.",
    description:
      "Hand-picked gemstones as jewellery and loose stones. Handcrafted one-of-a-kind pieces for people who like to express themselves with style.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LUMORANI gemstone jewellery" }],
  },
};

export default function HomePageEN() {
  return <HomeView lang="en" />;
}
