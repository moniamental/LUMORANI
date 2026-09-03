import { LegalShell } from "@/components/site/LegalShell";
import { type Locale, localePath } from "@/lib/i18n";
import { TAX_MODE } from "@/lib/tax";

export function AgbView({ lang }: { lang: Locale }) {
  const returnsHref = localePath(lang, "/rueckgabe");
  const withdrawalHref = localePath(lang, "/widerruf");
  const kleinunternehmer = TAX_MODE === "kleinunternehmer";

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
          All prices are in euros and are total prices.{" "}
          {kleinunternehmer
            ? "As a small business within the meaning of § 19 of the German VAT Act, we do not show VAT separately."
            : "They include statutory VAT."}{" "}
          Within Germany we deliver free of shipping costs. Separate conditions, communicated in advance,
          apply to international deliveries.
        </p>

        <h2>§ 4 Payment</h2>
        <p>
          Payment is processed by our payment service provider Stripe. Depending on availability you can
          pay by credit or debit card, Klarna, Apple Pay or Amazon Pay. Which methods are available is
          shown to you before you complete the order. The data required for payment is transmitted
          directly to Stripe and processed there in encrypted form; we never see your full card details.
          Payment is due immediately upon conclusion of the contract.
        </p>

        <h2>§ 5 Delivery</h2>
        <p>
          Within Germany, delivery is usually made within 3–5 business days of the conclusion of the
          contract. Every piece is a handmade, one-of-a-kind natural stone; slight variations in colour
          and banding are natural and do not constitute a defect.
        </p>

        <h2>§ 6 Retention of title</h2>
        <p>The goods remain our property until payment has been received in full.</p>

        <h2>§ 7 Right of withdrawal for consumers</h2>
        <p>
          Consumers have a statutory right of withdrawal of 14 days from receipt of the goods. The full
          statutory wording, the effects of withdrawal and the model withdrawal form can be found in our{" "}
          <a href={withdrawalHref}>right of withdrawal notice</a>. Our practical returns process is
          described in the <a href={returnsHref}>returns policy</a>.
        </p>

        <h2>§ 8 Warranty</h2>
        <p>
          Statutory warranty rights apply. In the case of justified defects, we strive for a swift and
          fair solution.
        </p>

        <h2>§ 9 Contract language and storage of the contract text</h2>
        <p>
          The contract can be concluded in German or English. We store the contract text and send you the
          order details by email. You can view your order data at any time by writing to{" "}
          <a href="mailto:info@lumorani.com">info@lumorani.com</a>.
        </p>

        <h2>§ 10 Dispute resolution</h2>
        <p>
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
        Alle Preise verstehen sich in Euro und sind Gesamtpreise.{" "}
        {kleinunternehmer
          ? "Als Kleinunternehmer im Sinne des § 19 UStG weisen wir keine Umsatzsteuer gesondert aus."
          : "Sie enthalten die gesetzliche Umsatzsteuer."}{" "}
        Innerhalb Deutschlands liefern wir versandkostenfrei. Für Lieferungen ins Ausland gelten
        gesonderte, vorab mitgeteilte Konditionen.
      </p>

      <h2>§ 4 Zahlung</h2>
      <p>
        Die Zahlung wird über unseren Zahlungsdienstleister Stripe abgewickelt. Je nach Verfügbarkeit
        kannst du per Kredit- oder Debitkarte, Klarna, Apple Pay oder Amazon Pay bezahlen. Welche
        Zahlungsarten zur Verfügung stehen, siehst du vor Abschluss der Bestellung. Die für die Zahlung
        erforderlichen Daten werden direkt an Stripe übermittelt und dort verschlüsselt verarbeitet —
        deine vollständigen Kartendaten sehen wir zu keinem Zeitpunkt. Die Zahlung ist mit
        Vertragsschluss sofort fällig.
      </p>

      <h2>§ 5 Lieferung</h2>
      <p>
        Die Lieferung erfolgt innerhalb Deutschlands in der Regel innerhalb von 3–5 Werktagen nach
        Vertragsschluss. Jedes Stück ist ein handgefertigtes Naturstein-Unikat; geringfügige
        Abweichungen in Farbe und Maserung sind natürlich und stellen keinen Mangel dar.
      </p>

      <h2>§ 6 Eigentumsvorbehalt</h2>
      <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>

      <h2>§ 7 Widerrufsrecht für Verbraucher</h2>
      <p>
        Verbraucher haben ein gesetzliches Widerrufsrecht von 14 Tagen ab Erhalt der Ware. Den
        vollständigen gesetzlichen Wortlaut, die Folgen des Widerrufs und das Muster-Widerrufsformular
        findest du in unserer <a href={withdrawalHref}>Widerrufsbelehrung</a>. Wie die Rückgabe bei uns
        praktisch abläuft, steht in den <a href={returnsHref}>Rückgaberichtlinien</a>.
      </p>

      <h2>§ 8 Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Gewährleistungsrechte. Bei berechtigten Mängeln bemühen wir uns um
        eine zügige und faire Lösung.
      </p>

      <h2>§ 9 Vertragssprache und Speicherung des Vertragstextes</h2>
      <p>
        Der Vertrag kann auf Deutsch oder Englisch geschlossen werden. Wir speichern den Vertragstext und
        senden dir die Bestelldaten per E-Mail zu. Deine Bestelldaten kannst du jederzeit unter{" "}
        <a href="mailto:info@lumorani.com">info@lumorani.com</a> anfordern.
      </p>

      <h2>§ 10 Streitbeilegung</h2>
      <p>
        Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalShell>
  );
}
