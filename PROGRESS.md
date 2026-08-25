# LUMORANI Redesign — Fortschritt & Bauplan

Neubau des LUMORANI-Schmuckshops (bisher Wix) als echter Code, auf Basis des
Claude-Design-Design-System-Exports. Deutsch, „du". Conversion-orientiert,
modern, motion-lastig, junge Zielgruppe.

## Stack
- **Next.js 16 (App Router) + React 19 + TypeScript**
- **Framer Motion** (+ Lenis) für Motion
- **Design-System-Tokens** als CSS (unverändert aus dem Export)
- **Fonts** via `next/font/google` (Cinzel, Cormorant Garamond, Jost) — self-hosted
- **Commerce:** Stripe Checkout + eigener, typisierter Katalog im Code
- **Hosting:** Vercel (geplant)

## Projektstruktur
```
lumorani-web/
  app/
    layout.tsx        Fonts + Metadata + <html lang="de">
    globals.css       importiert app/ds/styles.css
    page.tsx          (aktuell: Platzhalter-Landing zum Pipeline-Test)
    ds/
      styles.css      DS-Einstiegspunkt (@import Tokens)
      tokens/         colors, typography, spacing, radius, elevation, motion, base
  components/ds/      DS-Komponenten (core / commerce / navigation) — alle "use client"
  public/assets/      Logo + imagery (12 Steinfotos)
```

## Status

### ✅ Stufe 1a — Fundament (fertig)
- [x] Node via nvm installiert (v24.19.0)
- [x] Next.js 16 App gescaffoldet, Zusatzpakete installiert
- [x] Design-System verdrahtet: Tokens, Fonts, Assets, Komponenten
- [x] Dev-Server läuft (`.claude/launch.json` → preview "lumorani-dev", Port 3000)
- [x] Rendering verifiziert: Near-Black-Canvas, Gold-Eyebrow, Cormorant-Serif, Button

### 🟡 Stufe 1b — Echte Screens & Routing (Startseite fertig)
- [x] Katalog-Datenmodell `lib/catalog.ts` (Steine × Schliffe, Preise, Slugs) — Seed aus Data.jsx
- [x] Warenkorb: React-Context + localStorage (`lib/cart.tsx`) — Add/Qty/Remove, count/subtotal
- [x] NavBar (`components/site/NavBar.tsx`) — sticky, Glas über Hero → solid beim Scrollen, echtes Next-Routing, Cart-Count
- [x] Footer (`components/site/SiteFooter.tsx`) — echtes Link-Inventar inkl. Rechtliches
- [x] Cart-Drawer (`components/site/CartDrawer.tsx`) — Framer-Motion-Slide, an Cart-Context gebunden
- [x] **Startseite** (`app/page.tsx`) — Hero (Parallax + gestaffelte Einblendung), Kollektionen, Geschichte, Neuheiten, Zitat-Band, Kundenstimmen, Newsletter
- [x] Motion-Layer: `components/motion/Reveal.tsx` (Scroll-Reveals, Silk-Easing), Hero-Parallax, Bild-Zoom, Cart-Slide
- [x] Platzhalter-Routen für Nav/Footer/Produkt (ComingSoon) → kein 404 beim Durchklicken
- [x] Production-Build läuft sauber (25 Routen, Produktseiten als SSG)
- [x] **Echte Assets:** Hero-**Video** (Craft-Clip „Hand mit Pinzette", 1920×1080) statt statischem Bild; Lifestyle-Clip für Über-uns abgelegt; Scroll-Cue verfeinert (Blenden statt Hüpfen)
- [x] **Anlass-Kollektionen (deutsch):** Für jeden Anfang / Für jeden Tag / Statement / Zum Verschenken — Home-Kacheln + Shop-Filter (`?anlass=`) + Footer
- [x] **Shop-Seite** (`/shop`) voll: anlass-bewusster Header, Anlass-Chips, Stein- & Sortier-Filter, Grid
- [x] **Produktseite** (`/produkt/[slug]`) voll: Galerie+Thumbs, Schliff-Auswahl, Menge, Warenkorb, Vertrauens-Signale (Zertifikat/versichert/Rückgabe), **Samirs Notiz** (je Stein), Edelstein-Wissen (Bedeutung/Herkunft/Pflege), „Passt dazu"
- [x] **Samir-Storytelling:** 8 authentische Samir-Notizen + Lore je Stein (`GEM_LORE` in catalog.ts)
- [x] **Echte Rechtsseiten:** Impressum (voll inline, §5 TMG) + Datenschutz (echte PDF eingebettet)

- [x] **Edelsteine-Seite** (`/edelsteine`) — Wissens-Hub: 3 Schliffe + 9 echte Steine mit Bedeutung, verlinkt in den Shop
- [x] **Über uns** (`/ueber-uns`) — Samir-Präsenz, Lifestyle-Video, Werte, Zitat
- [x] **Datenschutz** jetzt echter Fließtext (PDF + Quellcode raus; mit Hinweis: beschreibt noch alten Wix-Stack)
- [x] **ECHTER Katalog importiert** von lumorani.com: 16 Produkte (Namen, Preise 10–180 €, Bilder heruntergeladen → `public/assets/products/`, Beschreibungen). Ersetzt die erfundenen Platzhalter.
- [x] **Shop = Hybrid:** Startseite behält Anlass-Kacheln; Shop filtert wie Original nach **Art** (Armbänder/Halsketten/Ringe/Edelsteine) + **Stein** + **Preis** + **Sortierung**
- [x] **Produktseite an echtes Sortiment angepasst:** Schliff-Selektor raus, echte Beschreibung, Samir-Notiz je Stein (echte Steine), Fakten/Trust-Signale realistisch
- [x] Build sauber: 33 Seiten, 16 echte Produktseiten als SSG

- [x] **NavBar überarbeitet:** Logo nach links, Links mittig (Shop/Edelsteine/Geschenksets/Über uns), Start & Kontakt aus der Hauptnav entfernt (Kontakt → Footer/Mobile-Menü)
- [x] **Mobile-Menü (Burger)** mit Vollbild-Overlay + gestaffelten Serif-Links (Stacking-Fix: Nav-Zeile z41 über Overlay z39)
- [x] **Shop luftiger:** 3-spaltiges Grid (`.lum-shop-grid`, 2-up Tablet, 1-up Mobile), größere Abstände, mehr vertikale Ruhe
- [x] **Über uns emotionaler:** reichere Copy, neuer Abschnitt „Vom Rohstein zum Lieblingsstück", erweitertes Samir-Zitat
- [x] **Datenschutz an neuen Stack angepasst:** Vercel-Hosting, Stripe-Zahlung, lokale Fonts; Wix/MyFonts/Social/YouTube/reCAPTCHA entfernt
- [x] **Geschenksets-Seite:** Box-Hero, Geschenk-Versprechen, kuratierte Geschenke, „Finde das passende Geschenk"

- [x] **Filter-Bug behoben:** Produkte blieben beim Filtern unsichtbar (Scroll-Reveal-Opacity) → Shop-Grid rendert Produkte jetzt immer sichtbar
- [x] **Logo-Beschnitt gefixt:** exakt auf Inhalts-Bbox (x49/y101, 283×145) beschnitten — Diamant vollständig (Nav + Footer)
- [x] **Newsletter/Positionierung:** kein „Shop öffnet in Kürze" mehr → echter Newsletter („Neue Unikate zuerst")
- [x] **Leerer Filter:** emotionaler Zustand + „Individuelle Anfrage senden" (Kontakt)
- [x] **Anlass-Vielfalt:** „Für jeden Anfang" jetzt 4 verschiedene Steine (Lapis-Ring, Hämatit, Rosenquarz, Amethyst)
- [x] **Footer-Seiten gebaut (echt, emotional, mit Bildern):** FAQ (Accordion), Versand, Rückgabe, Kontakt (mit Formular), AGB (Entwurf + Prüfhinweis), Barrierefreiheit
- [x] **Bild-Optimierung:** Produktbilder 47 MB → **3,9 MB** (Resample 1400px + JPEG q82; Pfade auf `.jpg`); Lazy-Loading in ProductTile
- [x] **Stripe-Checkout gebaut:** `lib/stripe.ts`, `app/api/checkout/route.ts` (Preise server-seitig aus Katalog validiert), Cart-Drawer → Stripe Checkout, `/kasse/erfolg` (leert Warenkorb), `.env.local.example`. Ohne Key → saubere 503-Meldung.

### ⏭️ Als Nächstes / Offen
- [ ] **Stripe-Keys** (`STRIPE_SECRET_KEY`) von Samir → Checkout live schalten
- [ ] **Kontaktformular** an echten Dienst anbinden (aktuell nur Erfolgs-State)
- [ ] **Hero-Video** (8,6 MB) komprimieren — braucht ffmpeg (nicht installiert)
- [ ] **AGB/Datenschutz** final juristisch prüfen; Telefonnummer im Impressum
- [ ] Deploy auf Vercel
- [ ] **Stufe 2:** Stripe-Checkout (Lieferung / Schutz & Zertifikat / Bestätigen; Trust-Signale)
- [ ] **Datenschutz** für neuen Stack (Vercel/Stripe, keine Wix/MyFonts/Social) final aktualisieren
- [ ] Kleinigkeiten: „Malachit – Geschliffener Edelstein" hatte im Original eine Ring-Beschreibung (bereinigt); Telefonnummer im Impressum fehlt noch
- [ ] Restliche Stub-Seiten (FAQ, Versand, Rückgabe, AGB, Barrierefreiheit, Kontakt, Geschenksets) mit echtem Inhalt füllen

### ⏭️ Stufe 2 — Commerce
- [ ] Stripe: `/api/checkout` (Checkout Session aus Warenkorb), Erfolg/Abbruch-Seiten
- [ ] `.env.local` mit Stripe-Keys (vom Kunden)

### ⏭️ Stufe 3 — Launch
- [ ] Echte Produktdaten/Preise/Fotos (aktuell Platzhalter!), SEO, Analytics, Deploy Vercel

## Dev starten
```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use default
cd "lumorani-web" && npm run dev
```
(oder Preview „lumorani-dev" über die Launch-Config)

## Offene Punkte für Monia/Samir
- Produktnamen & **Preise sind erfunden** (alter Wix-Shop hatte keinen publizierten Katalog) → echte Daten nötig
- Hero-Video fehlt (Umlaut-Dateinamen im Export) → ASCII-benannten Clip liefern
- Stripe-Account/Keys für Checkout

## Update 2026-08-25 (Nachmittag) — Commerce-Backend, Sicherheit, SEO, Kontakt
- [x] **Kontaktformular echt** via Resend (`/api/contact`) + **Honeypot**-Spamschutz (echter Versand statt Fake-State)
- [x] **Security-Header** (`next.config.ts`): CSP, HSTS, X-Frame-Options DENY, nosniff, Permissions-Policy, X-Powered-By entfernt
- [x] **Stripe-Webhook** (`/api/webhook`) signaturgeprüft; Checkout: Gutscheincode (Promotion Codes), Geschenk-Flag + Grußbotschaft in Metadata
- [x] **404-Seite**, **robots.txt**, **sitemap.xml** (inkl. Produkte), **OG-Bild** (1200×630) + OpenGraph/Twitter-Metadaten
- [x] **Trust-Band** (Moodboard): Echte Natursteine · Sichere Zahlung · Versichert & kostenfrei · 14 Tage Rückgabe
- [x] Datenschutz/AGB-Notizen entfernt (Live-tauglich); Datenschutz um Resend/IONOS/Kontaktformular ergänzt
- [x] LUMORANI-Box: „Verpackung kann abweichen"; Versand: DHL + Hermes
- [x] Obsidian 2nd Brain erweitert: `05_Experience/Aufträge/LUMORANI-Redesign-Codebau-2026-08.md` + Workflow-Schritte (Moodboard→DS)

### Braucht Keys/Aktion (Env-Variablen in `.env.local`, siehe `.env.local.example`)
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET · RESEND_API_KEY (+ verifizierte Absender-Domain), CONTACT_TO/FROM · NEXT_PUBLIC_SITE_URL
- Zahlarten im Stripe-Dashboard aktivieren (Klarna/PayPal/Cards → automatisch übernommen)

### Nächste große Blöcke
- [ ] **EN-Übersetzung** (dezenter Sprachumschalter) — eigener Block
- [ ] Deploy auf Vercel + Domain (IONOS → Vercel DNS)
- [ ] Newsletter an echten Dienst; Hero-Video komprimieren (ffmpeg)
