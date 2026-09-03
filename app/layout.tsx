import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { NavBar } from "@/components/site/NavBar";
import { CartDrawer } from "@/components/site/CartDrawer";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HtmlLangSync } from "@/components/site/HtmlLangSync";
import { JsonLd } from "@/components/site/JsonLd";
// Cookieloses Reichweitenmessen. Setzt keine Cookies und speichert keine
// personenbezogenen Daten — deshalb ist dafür kein Einwilligungsbanner nötig.
import { Analytics } from "@vercel/analytics/next";

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

// Eine Quelle der Wahrheit für Canonicals/OG/Sitemap/Robots.
// Default = aktuelle öffentliche Adresse (vercel.app), NICHT lumorani.com — so ist ein
// unkonfigurierter/temporärer Deploy „sicher" (siehe Indexierung unten).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lumorani.vercel.app";
// Nur die echte Produktionsdomain darf indexiert werden. Alles andere (vercel.app,
// unkonfiguriert) → noindex, damit kein Duplicate Content entsteht. Aktiviert sich für
// die Suche automatisch, sobald NEXT_PUBLIC_SITE_URL = https://lumorani.com gesetzt ist.
const isProdDomain = SITE_URL.includes("lumorani.com");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(isProdDomain ? {} : { robots: { index: false, follow: true } }),
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

// Strukturierte Daten für die ganze Seite. Erlaubt Google, LUMORANI als
// Unternehmen zu verstehen (Wissenspanel, Sitelinks) statt nur als Textseite.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LUMORANI",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/og.jpg`,
      email: "info@lumorani.com",
      description:
        "Familienmanufaktur für handverlesene Edelsteine — Schmuck und lose Steine, handgefertigte Unikate.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bussardstraße 21",
        postalCode: "68307",
        addressLocality: "Mannheim",
        addressCountry: "DE",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "LUMORANI",
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body>
        <JsonLd data={orgJsonLd} />
        <a className="lum-skip-link" href="#main-content">Zum Hauptinhalt springen</a>
        <CartProvider>
          <SmoothScroll />
          <HtmlLangSync />
          <NavBar />
          <div id="main-content" tabIndex={-1}>{children}</div>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
