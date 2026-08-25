# LUMORANI Redesign — Handoff / Chat-Zusammenfassung

_Stand: 2026-08-25. Diese Datei ist als Kontext-Übergabe für einen neuen Chat gedacht._

## 1. Projekt in einem Satz
Ablösung der bestehenden **Wix**-Seite (lumorani.com) durch einen selbst programmierten, conversion- & sicherheitsorientierten **Schmuck-Onlineshop** — deutsch, „du", luxuriös, motion-lastig. Kunde: **Samir Sobhani** (Familienmanufaktur, Edelsteinschmuck).

## 2. Stack & wo alles liegt
- **Next.js 16 (App Router) + React 19 + TypeScript**, Framer Motion, Stripe, Resend, Ziel-Hosting **Vercel**.
- Code: `/Users/monia/Desktop/LUMORANI Redesign/lumorani-web/`
- Design-System-Export & Original-ZIP liegen daneben in `/Users/monia/Desktop/LUMORANI Redesign/`.
- **Dev starten:**
  ```bash
  export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use default
  cd "/Users/monia/Desktop/LUMORANI Redesign/lumorani-web" && npm run dev
  ```
  → http://localhost:3000 (Node ist via nvm installiert, v24.19.0)
- Detail-Doku: `PROGRESS.md` (Bau-Log) · Obsidian `05_Experience/Aufträge/LUMORANI-Redesign-Codebau-2026-08.md`.

## 3. Was fertig & verifiziert ist
- **Seiten:** Start (Video-Hero + Trust-Band + Anlass-Kollektionen + Neuheiten + Kundenstimmen + Newsletter), Shop (Filter Art/Stein/Preis/Sortierung), Produktseite (Galerie, Samir-Notiz, Edelstein-Wissen, Trust-Signale), Edelsteine-Hub, Über uns, Geschenksets, Kontakt (Formular), FAQ (Accordion), Versand, Rückgabe, Impressum, Datenschutz, AGB, Barrierefreiheit, 404.
- **Echtes Sortiment:** 16 reale Produkte von lumorani.com (Namen, Preise 10–180 €, Bilder, Beschreibungen).
- **Commerce:** Warenkorb (localStorage), **Stripe Checkout** (gehostet, Preise serverseitig validiert), **Gutscheincode** + **Geschenkoption/Grußbotschaft**, `/kasse/erfolg` leert den Warenkorb.
- **Kontakt:** echtes Formular via **Resend** → IONOS-Postfach, **Honeypot**-Spamschutz.
- **Sicherheit:** Security-Header (CSP, HSTS, X-Frame-Options DENY, nosniff, Permissions-Policy), **Stripe-Webhook** signaturgeprüft, Secrets nur serverseitig, npm audit 0.
- **SEO/Perf:** Meta pro Seite, OG-Bild + Twitter-Card, robots.txt, sitemap.xml, Alt-Texte, Bild-Pipeline (47 MB → 3,9 MB), Lazy-Loading, SSG.
- **Mobile:** Burger-Menü, responsive Grids.
- **Konfiguration:** `.env.local` mit **Stripe-Test-Keys** + **Resend-Key** ist gesetzt (Test-Checkout erzeugt echte `checkout.stripe.com`-Session ✓, Kontakt-API `ok` ✓). `.env*` ist gitignored.

## 4. Offene TODOs
### Braucht Aktion von Monia/Samir
- [ ] **Stripe-Zahlarten** im Dashboard aktivieren (Karte, Klarna, PayPal …) → Checkout übernimmt sie automatisch.
- [ ] **Stripe-Webhook** anlegen (nach Deploy): Endpoint `https://DEINE-DOMAIN/api/webhook` → `whsec_...` als `STRIPE_WEBHOOK_SECRET` setzen.
- [ ] **Resend-Domain** (lumorani.com) verifizieren → Absender `kontakt@lumorani.com`; prüfen, ob Test-Mail wirklich in `info@lumorani.com` ankommt.
- [ ] **Telefonnummer** fürs Impressum ergänzen (`app/impressum/page.tsx`, Platzhalter `[Telefonnummer wird ergänzt]`).
- [ ] **AGB & Datenschutz** juristisch prüfen lassen (Entwürfe stehen).
- [ ] **AV-Verträge** mit Vercel, Stripe, Resend, IONOS abschließen (DSGVO).
- [ ] Test-Keys nach Bedarf **rotieren** (wurden im Chat geteilt); für Live `sk_live_...`/`pk_live_...`.

### Nächste Bau-Blöcke (Entwickler)
- [ ] **EN-Übersetzung** (dezenter Sprachumschalter in der Nav) — eigener Schwerpunkt; echte EN-Copy empfohlen.
- [ ] **Deploy auf Vercel** + Domain (IONOS → Vercel).
- [ ] **Newsletter** an echten Dienst anbinden (z. B. Klaviyo/Mailchimp) — aktuell nur Erfolgs-State.
- [ ] **Hero-Video** (8,6 MB) komprimieren (braucht ffmpeg).
- [ ] Optional: echte Kundenkonten/Bestellhistorie → dann Supabase mit **RLS** (aktuell KEIN Supabase im Setup).

## 5. Fahrplan bis zum Hosting (Go-Live)
1. **Lokal testen (jetzt möglich):** Warenkorb → „Zur Kasse" → Stripe-Testbezahlung mit Testkarte **4242 4242 4242 4242**, beliebiges künftiges Datum, beliebiger CVC. Erfolg → landet auf `/kasse/erfolg`.
2. **Zahlarten** im Stripe-Dashboard aktivieren; Kontaktformular-Zustellung + Resend-Domain verifizieren.
3. **Inhalte finalisieren:** Telefonnummer, Preise/Namen final bestätigen, ggf. echte Produktfotos einheitlich (aktuell Mix aus realen Fotos + cinematischen Renders).
4. **Code auf GitHub** pushen (Repo anlegen; `.env.local` bleibt lokal, wird NICHT gepusht).
5. **Vercel verbinden:** Projekt importieren, **alle Env-Variablen in Vercel** eintragen (STRIPE_SECRET_KEY, RESEND_API_KEY, CONTACT_TO/FROM, NEXT_PUBLIC_SITE_URL=echte Domain; STRIPE_WEBHOOK_SECRET nach Schritt 7). Deploy.
6. **Domain (IONOS):** Domain auf Vercel zeigen (Vercel gibt die DNS-Records/Nameserver vor). `NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen. SSL macht Vercel automatisch.
7. **Stripe-Webhook** für die Live-URL anlegen → `whsec_...` in Vercel als `STRIPE_WEBHOOK_SECRET` setzen, neu deployen.
8. **Live schalten:** Stripe auf **Live-Keys** umstellen (`sk_live_/pk_live_`), finalen QA-Durchlauf (Kauf, Kontakt, Mobile, Rechtsseiten), dann bekanntgeben.

## 6. Wichtige Hinweise für den neuen Chat
- **Supabase wird NICHT genutzt** (Katalog liegt im Code).
- **Stripe-Plugin/MCP** lässt sich nur in einem interaktiven Terminal installieren; die Anbindung ist bereits gebaut (`app/api/checkout`, `app/api/webhook`, `lib/stripe.ts`).
- **Next 16** weicht teils von älteren Versionen ab (`lumorani-web/AGENTS.md`); Route Handler nutzen die stabile `Request`/`Response`-Signatur.
- **Geheime Keys nie in den Chat** — immer in `.env.local` bzw. Vercel-Env.
