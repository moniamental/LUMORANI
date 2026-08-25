import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { NavBar } from "@/components/site/NavBar";
import { CartDrawer } from "@/components/site/CartDrawer";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HtmlLangSync } from "@/components/site/HtmlLangSync";

// Wortmarke / Lockups
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Editorial-Display-Serif (alle Headlines)
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// UI / Body / Preise
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumorani.com"),
  title: {
    default: "LUMORANI — Echte Edelsteine. Zeitloses Design.",
    template: "%s — LUMORANI",
  },
  description:
    "Echte Edelsteine, zeitloses Design. Für Menschen, die sich mit Stil ausdrücken wollen. Handverlesene Steine als Schmuck und lose Edelsteine — ungeschliffen, geschliffen oder Half & Half.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "LUMORANI",
    title: "LUMORANI — Echte Edelsteine. Zeitloses Design.",
    description:
      "Handverlesene Edelsteine als Schmuck und lose Steine. Handgefertigte Unikate für Menschen, die sich mit Stil ausdrücken wollen.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LUMORANI Edelsteinschmuck" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMORANI — Echte Edelsteine. Zeitloses Design.",
    description: "Handverlesene Edelsteine als Schmuck und lose Steine. Handgefertigte Unikate.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body>
        <CartProvider>
          <HtmlLangSync />
          <NavBar />
          {children}
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
