import { Suspense } from "react";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { IMG } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

const CONTENT: Record<Locale, {
  eyebrow: string;
  title: string;
  lead: string;
  emailLabel: string;
  manufactureLabel: string;
}> = {
  de: {
    eyebrow: "Kontakt",
    title: "Erzähl uns, wonach du suchst.",
    lead:
      "Ob du eine Frage zu einem Stück hast, dir ein individuelles Schmuckstück wünschst oder einfach den passenden Stein für einen besonderen Moment suchst – schreib uns. Hinter jeder Antwort steht ein Mensch, kein Formular.",
    emailLabel: "E-Mail",
    manufactureLabel: "Manufaktur",
  },
  en: {
    eyebrow: "Contact",
    title: "Tell us what you’re looking for.",
    lead:
      "Whether you have a question about a piece, would like a custom design, or are simply looking for the right stone for a special moment — write to us. Behind every reply is a person, not a form.",
    emailLabel: "Email",
    manufactureLabel: "Manufactory",
  },
};

export function KontaktView({ lang }: { lang: Locale }) {
  const t = CONTENT[lang];
  return (
    <main className="lum-page" style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--section-y)" }}>
      <div className="lum-split" style={{ alignItems: "start" }}>
        <Reveal>
          <span className="lum-eyebrow">{t.eyebrow}</span>
          <h1 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontWeight: "var(--weight-light)", fontSize: "var(--text-display-2)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }}>
            {t.title}
          </h1>
          <p style={{ marginTop: "var(--space-8)", fontSize: "var(--text-body-lg)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)", maxWidth: 460 }}>
            {t.lead}
          </p>

          <div style={{ marginTop: "var(--space-12)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <div>
              <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-gold)" }}>{t.emailLabel}</div>
              <a href="mailto:info@lumorani.com" style={{ display: "inline-block", marginTop: "var(--space-2)", fontSize: "var(--text-body)" }}>info@lumorani.com</a>
            </div>
            <div>
              <div style={{ fontSize: "var(--text-micro)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-gold)" }}>{t.manufactureLabel}</div>
              <p style={{ marginTop: "var(--space-2)", fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>
                LUMORANI · Samir Sobhani
                <br />
                Bussardstraße 21, 68307 Mannheim
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", marginBottom: "var(--space-10)" }}>
              <Image fill sizes="(max-width: 900px) 100vw, 50vw" src={IMG.tray} alt="" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "var(--gradient-ink-veil)", opacity: 0.5 }} />
            </div>
            {/* Das Formular liest ?stein= aus der URL. useSearchParams braucht
                dafür eine Suspense-Grenze, sonst bricht der statische Build. */}
            <Suspense fallback={<div style={{ minHeight: 420 }} />}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
