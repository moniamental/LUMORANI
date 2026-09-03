import type { MetadataRoute } from "next";

// Web-App-Manifest — sorgt für ein sauberes Symbol und einen richtigen Namen,
// wenn die Seite auf dem Homescreen abgelegt wird.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LUMORANI — Echte Edelsteine. Zeitloses Design.",
    short_name: "LUMORANI",
    description:
      "Handverlesene Edelsteine als Schmuck und lose Steine. Handgefertigte Unikate aus einer Familienmanufaktur.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0C",
    theme_color: "#0B0B0C",
    lang: "de",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
