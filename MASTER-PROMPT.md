# LUMORANI — Master-Prompt

> Ein vollständiger Bau-Prompt, mit dem sich die LUMORANI-Website von Grund auf
> rekonstruieren lässt. Beschreibt Marke, Design-System, Motion, Seiten, Commerce,
> Tech-Stack und Voice. Sprache der Website: **Deutsch, informelles „du"** (mit
> vollständiger englischer Übersetzung unter `/en/*`).

---

## Rolle & Ziel

Du bist **Senior Communication-, Web- & Motion-Designer und Full-Stack-Vibe-Coder**.
Baue den Online-Shop einer kleinen **Edelstein-Schmuck-Manufaktur** (LUMORANI,
gegründet von Samir und seinem Vater). Ziel: **hochwertig, cinematic, modern,
conversion- und sicherheitsorientiert** — für eine junge, stilbewusste Zielgruppe.
Nicht laut, nicht verkäuferisch: emotional, ruhig, selbstbewusst.

## Marke & Voice

- **Positionierung:** Echte Natursteine, handverlesen von Samir. „Schmuck, der mehr
  ist als ein Accessoire — er trägt eine Geschichte." Mutige Edelsteinfarben
  (Rubin, Smaragd) trifft minimalistisches Design. Klar, intensiv, ausdrucksstark.
- **Voice (deutsch, „du"):** kurze, deklarative Fragmente, gestapelt („Ein Geschenk,
  ein Anfang, ein Gefühl."). Dreier-Rhythmen. Emotion vor Material. Headlines in
  Serifen-Kleinschreibung, **nie** Versalien. Versalien nur für Micro-UI (Eyebrows,
  Nav, Buttons, Badges) mit weiter Laufweite. Kein Emoji, keine Rabatt-/
  Ausrufezeichen-Marketing. Preise mit deutschem Komma (`80,00 €`).

## Design-System (nicht neu erfinden — konsequent anwenden)

- **Farben:** Nahezu-Schwarz ist die Identität, **kein Dark-Mode** (`--ink-900`
  Seiten, `--ink-800` Wechselbänder, `--ink-1000` Footer/Overlays). Max. 2
  Hintergrundfarben pro Seite + eine marmor-inverse Sektion (Newsletter). **Gold**
  (`--gradient-gold`, `--gold-300`) ist die **einzige** interaktive Farbe.
  Edelstein-Farbtöne (`--gem-*`) sind reine Content-Farben, nie Chrome.
- **Typografie:** *Cinzel* = nur Wortmarke. *Cormorant Garamond 300* = alle
  Headlines (nie < 24px, nie Versal, nie fett). *Jost 300/500* = UI/Body/Preise.
  Display-Größen **responsiv** via `clamp()`.
- **Layout:** 1440px max, Seitenrand `clamp(20px,5vw,56px)`, 12 Spalten, 24px
  Gutter, Sektionen 96–128px (mobil enger). Bilder full-bleed, eckig
  (`--radius-image:0`), Ink-Veil-Gradienten für Lesbarkeit. Karten fast quadratisch
  (`--radius-card:2px`).
- **Motion (Silk):** Easing `cubic-bezier(.16,1,.3,1)`. 180ms Hover, 280ms State,
  520ms Bild-Zoom (4,5 %), 900ms Reveals. **Nie** Bounce/Spring/Pop. Elevation auf
  Schwarz = Gold-Glow, kein Schatten.

## Motion-Design (das Herz der Seite)

- **Globales Smooth-Scroll** (Lenis), über den Frame-Loop von Framer Motion
  getickt, damit `useScroll` synchron bleibt; respektiert `prefers-reduced-motion`.
- **Hero:** Video (Handwerk-Clip, Hände + Pinzette), sanfter Parallax, gestaffeltes
  Reveal, kein Vorschau-Bild vor dem Video. Scroll-Hinweislinie, die beim Scrollen
  ausblendet.
- **Signature „Edelstein-Moment":** gepinnte Scroll-Bühne (300–360vh), in der ein
  **geschliffener Edelstein in 3D dreht** (dezent, cinematic Kamera-Move statt
  kippender Fläche) und über 4 Steine **morpht** — Rubin → Smaragd → Diamant →
  Aquamarin (Farben so ordnen, dass nie zwei Grün-/Türkistöne nebeneinander liegen;
  ähnliche Perspektive/Distanz). Gold-Rahmen-Überlagerung, mitwandernder Farb-Glow,
  maskiert enthüllte Headline mit Text-Shadow für Lesbarkeit.
- **Weiteres:** Scroll-Parallax auf Bildern, Zeilen-Masken für Headlines,
  vertikale Gold-Linien als Abschnitts-Akzent, Nav blendet beim Runterscrollen aus,
  sanfte Seiten-Übergänge (Opazität), Touch: Tap-Feedback statt Hover.

## Seiten & Sektionen

- **Home:** Video-Hero → Trust-Band → Anlass-Kollektionen (Kacheln: Für jeden
  Anfang / Für jeden Tag / Statement / Zum Verschenken, mit dunklen, harmonischen
  Bildern) → Divider → Unsere Geschichte (Split mit Parallax-Bild) → **Edelstein-
  Moment** → **Stein-Finder** (3-Fragen-Quiz → empfiehlt ein echtes Produkt) →
  Neuheiten → Divider → **Sets & Geschenke** (individuelle Sets anfragen) →
  Zitat-Band → Kundenstimmen → Newsletter (marmor-invers). *Kristall-„Sammlungen"
  max. 1–2× pro Seite — geschliffene Steine & Schmuck sind relevanter.*
- **Shop:** eine aufgeräumte Filter-Toolbar (Suche wächst mit + Stein/Preis/
  Sortierung), Kategorie-Chips als eigene Reihe, Produkt-Grid.
- **Produktseite:** großes, **korrektes** Produktbild (keine generischen
  Fremdbilder), Kaufbox, Facts (Material/Charakter/Fertigung/Pflege/Lieferzeit aus
  Samirs Stein-Wissen), verwandte Produkte.
- **Edelsteine-Hub:** Schliff-Arten + Stein-Karten (**gleiche Kartenhöhe**).
- **Weiteres:** Geschenksets (mit „Individuelles Set anfragen"-CTA), Über uns
  (Samir · Gründer; Zitat passend, ohne „ich trage den Schmuck"), Kontakt (Resend),
  FAQ, Versand, Rückgabe, Impressum, Datenschutz, AGB, Barrierefreiheit,
  Kasse/Erfolg, Newsletter-Status.

## Commerce & Backend

- **Stripe Checkout (gehostet)** + eigener typisierter Katalog im Code (kein
  Shopify, keine Kartendaten-Berührung). **Preise server-seitig validiert.**
  Webhook signaturgeprüft + Idempotency. Gutscheincodes, Geschenk-Flag +
  Grußbotschaft.
- **Resend** für Kontakt + **Newsletter Double-Opt-in** (HMAC-signierter
  Bestätigungslink, `NEWSLETTER_SIGNING_SECRET`).
- **Security:** CSP, HSTS, X-Frame DENY, nosniff, Permissions-Policy,
  `poweredByHeader:false`, Rate-Limits, Honeypots, Secrets nur server-seitig.

## Tech-Stack

Next.js 16 (App Router) + React 19 + TypeScript · Framer Motion + Lenis ·
Design-System-Tokens als CSS · Fonts via `next/font` (self-hosted) · Stripe ·
Resend · Hosting Vercel (GitHub-Autodeploy). Zweisprachig: **Deutsch an der
Wurzel**, **Englisch unter `/en/*`** (eigener Routenbaum, hreflang, Sprachumschalter
in der Nav — nur einmal, nicht doppeln).

## Responsive & Qualität

**Mobile-first sauber:** responsiver Seitenrand & Display-Typo (clamp), Grids mit
`minmax(0,1fr)` (kein horizontaler Überlauf/Wackeln), gleiche Kartenhöhen via
`grid-auto-rows:1fr`. **Kein `transform` an Vorfahren von `position:fixed`-Overlays**
(bricht sonst das Mobile-Menü — Menü außerhalb des Headers rendern, sofort deckend).
Keine gefakte Status-Bar/Tastatur in Mockups. Hit-Targets ≥ 44px, Body ≥ 12pt.

## SEO

Pro Seite `metadata` (Title/Description), OpenGraph + Twitter-Card, OG-Bild
(1200×630). `metadataBase`, `sitemap`, `robots` aus **einer** Quelle
(`NEXT_PUBLIC_SITE_URL`); temporäre/vercel.app-Domains `noindex`, echte
`lumorani.com` indexierbar.

## Bild-Regeln

Cinematische Steine auf Nahezu-Schwarz, gold, Marmor, Samt — **nie Menschen** im
Produktkontext (Lifestyle nur auf „Über uns"). Bilder korrekt der Sorte zuordnen
(KI-Renders prüfen — Farbe/Sorte stimmt nicht immer mit dem Prompt überein).
Ähnliche Perspektive/Distanz in Sequenzen. Alles inline optimiert (JPEG q82–85,
≤ ~1600px).
