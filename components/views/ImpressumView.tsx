import { LegalShell } from "@/components/site/LegalShell";
import type { Locale } from "@/lib/i18n";

export function ImpressumView({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <LegalShell eyebrow="Legal" title="Imprint">
        <p>Information pursuant to § 5 TMG (German Telemedia Act).</p>

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
          Phone: <strong>[phone number to follow]</strong>
          <br />
          Email: <a href="mailto:info@lumorani.com">info@lumorani.com</a>
        </p>

        <h2>Responsible for content</h2>
        <p>Samir Sobhani, address as above.</p>

        <h2>EU online dispute resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution (ODR):{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . You can find our email address above.
        </p>

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
      <p>Angaben gemäß § 5 TMG</p>

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
        Telefon: <strong>[Telefonnummer wird ergänzt]</strong>
        <br />
        E-Mail: <a href="mailto:info@lumorani.com">info@lumorani.com</a>
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>Samir Sobhani, Anschrift wie oben.</p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse findest du oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalShell>
  );
}
