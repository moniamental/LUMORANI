import { LegalShell } from "@/components/site/LegalShell";
import type { Locale } from "@/lib/i18n";

export function ImpressumView({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <LegalShell eyebrow="Legal" title="Imprint">
        <p>Information pursuant to § 5 DDG (German Digital Services Act).</p>

        <h2>Provider</h2>
        <p>
          Samir Sobhani
          <br />
          Bussardstraße 21
          <br />
          68307 Mannheim, Germany
        </p>

        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:info@lumorani.com">info@lumorani.com</a>
        </p>

        <h2>Responsible for content</h2>
        <p>Samir Sobhani, address as above.</p>

        <h2>Consumer dispute resolution</h2>
        <p>
          We are neither willing nor obliged to take part in dispute resolution proceedings before a
          consumer arbitration board.
        </p>
      </LegalShell>
    );
  }

  return (
    <LegalShell title="Impressum">
      <p>Angaben gemäß § 5 DDG</p>

      <h2>Anbieter</h2>
      <p>
        Samir Sobhani
        <br />
        Bussardstraße 21
        <br />
        68307 Mannheim
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:info@lumorani.com">info@lumorani.com</a>
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>Samir Sobhani, Anschrift wie oben.</p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalShell>
  );
}
