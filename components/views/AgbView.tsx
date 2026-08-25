import { LegalShell } from "@/components/site/LegalShell";
import { type Locale, localePath } from "@/lib/i18n";

export function AgbView({ lang }: { lang: Locale }) {
  const returnsHref = localePath(lang, "/rueckgabe");

  if (lang === "en") {
    return (
      <LegalShell eyebrow="Legal" title="Terms and conditions">
        <p>
          <em>This is a courtesy translation. The German version is legally binding.</em>
        </p>

        <h2>§ 1 Scope and provider</h2>
        <p>
          These terms and conditions apply to all orders placed through this online shop. The provider
          and contracting party is Samir Sobhani, Bussardstraße 21, 68307 Mannheim, Germany (hereinafter
          “LUMORANI”), email: <a href="mailto:info@lumorani.com">info@lumorani.com</a>.
        </p>

        <h2>§ 2 Conclusion of contract</h2>
        <p>
          The presentation of products in the shop does not constitute a legally binding offer, but an
          invitation to order. By submitting your order you make a binding offer. The purchase contract
          is concluded when we accept your order through a confirmation or by delivery.
        </p>

        <h2>§ 3 Prices and shipping costs</h2>
        <p>
          All prices are in euros and include statutory VAT. Within Germany we deliver free of shipping
          costs. Separate conditions, communicated in advance, apply to international deliveries.
        </p>

        <h2>§ 4 Payment</h2>
        <p>
          Payment is made via the payment service provider offered during the order process. The data
          required for payment is processed there securely and encrypted.
        </p>

        <h2>§ 5 Delivery</h2>
        <p>
          Within Germany, delivery is usually made within 3–5 business days of the conclusion of the
          contract. Every piece is a handmade, one-of-a-kind natural stone; slight variations in colour
          and banding are natural and do not constitute a defect.
        </p>

        <h2>§ 6 Right of withdrawal for consumers</h2>
        <p>
          Consumers have a statutory right of withdrawal of 14 days from receipt of the goods. To
          exercise your right of withdrawal, a clear statement to{" "}
          <a href="mailto:info@lumorani.com">info@lumorani.com</a> is sufficient. You can find further
          information in our <a href={returnsHref}>returns policy</a>.
        </p>

        <h2>§ 7 Warranty</h2>
        <p>
          Statutory warranty rights apply. In the case of justified defects, we strive for a swift and
          fair solution.
        </p>

        <h2>§ 8 Dispute resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
          We are neither obliged nor willing to take part in dispute resolution proceedings before a
          consumer arbitration board.
        </p>
      </LegalShell>
    );
  }

  return (
    <LegalShell title="Allgemeine Geschäftsbedingungen">
      <h2>§ 1 Geltungsbereich und Anbieter</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen über diesen Online-Shop.
        Anbieter und Vertragspartner ist Samir Sobhani, Bussardstraße 21, 68307 Mannheim (nachfolgend
        „LUMORANI“), E-Mail: <a href="mailto:info@lumorani.com">info@lumorani.com</a>.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte im Shop stellt kein rechtlich bindendes Angebot dar, sondern eine
        Aufforderung zur Bestellung. Mit dem Absenden der Bestellung gibst du ein verbindliches Angebot
        ab. Der Kaufvertrag kommt zustande, wenn wir deine Bestellung durch eine Bestätigung oder die
        Auslieferung annehmen.
      </p>

      <h2>§ 3 Preise und Versandkosten</h2>
      <p>
        Alle Preise verstehen sich in Euro und enthalten die gesetzliche Umsatzsteuer. Innerhalb
        Deutschlands liefern wir versandkostenfrei. Für Lieferungen ins Ausland gelten gesonderte, vorab
        mitgeteilte Konditionen.
      </p>

      <h2>§ 4 Zahlung</h2>
      <p>
        Die Zahlung erfolgt über den im Bestellprozess angebotenen Zahlungsdienstleister. Die für die
        Zahlung erforderlichen Daten werden dort sicher und verschlüsselt verarbeitet.
      </p>

      <h2>§ 5 Lieferung</h2>
      <p>
        Die Lieferung erfolgt innerhalb Deutschlands in der Regel innerhalb von 3–5 Werktagen nach
        Vertragsschluss. Jedes Stück ist ein handgefertigtes Naturstein-Unikat; geringfügige
        Abweichungen in Farbe und Maserung sind natürlich und stellen keinen Mangel dar.
      </p>

      <h2>§ 6 Widerrufsrecht für Verbraucher</h2>
      <p>
        Verbraucher haben ein gesetzliches Widerrufsrecht von 14 Tagen ab Erhalt der Ware. Um dein
        Widerrufsrecht auszuüben, genügt eine eindeutige Erklärung an{" "}
        <a href="mailto:info@lumorani.com">info@lumorani.com</a>. Weitere Informationen findest du in
        unseren <a href={returnsHref}>Rückgaberichtlinien</a>.
      </p>

      <h2>§ 7 Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Gewährleistungsrechte. Bei berechtigten Mängeln bemühen wir uns um
        eine zügige und faire Lösung.
      </p>

      <h2>§ 8 Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
        Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalShell>
  );
}
