import { LegalShell } from "@/components/site/LegalShell";
import type { Locale } from "@/lib/i18n";

export function DatenschutzView({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <LegalShell eyebrow="Legal" title="Privacy policy">
        <p>
          <em>This is a courtesy translation. The German version is legally binding.</em>
        </p>

        <h2>1. Data protection at a glance</h2>
        <h3>General information</h3>
        <p>
          The following notes provide a simple overview of what happens to your personal data when you
          visit this website. Personal data is any data that can be used to identify you personally.
        </p>
        <h3>Data collection on this website</h3>
        <p>
          <strong>Who is responsible for data collection?</strong>
          <br />
          Data processing on this website is carried out by the website operator (see “Notice on the
          responsible party”).
        </p>
        <p>
          <strong>How do we collect your data?</strong>
          <br />
          Your data is collected on the one hand when you provide it to us — for example when placing an
          order, signing up for the newsletter, or getting in touch. Other data is collected
          automatically by our IT systems when you visit the website (e.g. browser, operating system,
          time of the page request).
        </p>
        <p>
          <strong>What do we use your data for?</strong>
          <br />
          Part of the data is collected to ensure the website is provided without errors. Order and
          payment data is processed to handle your purchase.
        </p>
        <p>
          <strong>What rights do you have?</strong>
          <br />
          You have the right at any time to obtain free information about your stored data as well as to
          have it corrected or deleted. You can withdraw a given consent at any time. You also have a
          right to lodge a complaint with the competent supervisory authority.
        </p>

        <h2>2. Hosting</h2>
        <p>We host the content of our website with the following provider:</p>
        <h3>Vercel</h3>
        <p>
          The provider is Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. When you visit our
          website, Vercel, as our hosting and content-delivery provider, processes technical access data
          (e.g. IP address, browser type, time of access) required for the secure and performant
          delivery of the page.
        </p>
        <p>
          This is based on Art. 6(1)(f) GDPR. We have a legitimate interest in a reliable and secure
          presentation of our website. A data processing agreement (DPA) is in place with the provider.
          The transfer of data to the USA is based on the European Commission’s standard contractual
          clauses.
        </p>

        <h2>3. General notes and mandatory information</h2>
        <h3>Notice on the responsible party</h3>
        <p>
          The party responsible for data processing on this website is:
          <br />
          Samir Sobhani, Bussardstraße 21, 68307 Mannheim, Germany
          <br />
          Phone: [phone number to follow]
          <br />
          Email: <a href="mailto:info@lumorani.com">info@lumorani.com</a>
        </p>
        <h3>Storage period</h3>
        <p>
          Unless a more specific storage period is stated, your personal data remains with us until the
          purpose for processing no longer applies. Statutory retention periods (e.g. under tax or
          commercial law) remain unaffected.
        </p>
        <h3>Your rights at a glance</h3>
        <p>
          At any time you have: the right to information, correction and deletion, the right to
          restriction of processing, the right to data portability, the right to withdraw a given
          consent, the right to object under Art. 21 GDPR, and the right to lodge a complaint with the
          competent supervisory authority. For all matters you can reach us at{" "}
          <a href="mailto:info@lumorani.com">info@lumorani.com</a>.
        </p>
        <h3>SSL / TLS encryption</h3>
        <p>
          For security reasons this site uses SSL/TLS encryption. You can recognise an encrypted
          connection by the “https://” in the address bar and the lock symbol.
        </p>

        <h2>4. Data collection on this website</h2>
        <h3>Cookies and local storage</h3>
        <p>
          This website only uses technically necessary storage mechanisms. In particular, we store your
          cart locally in your browser (local storage) so your selection is preserved. This data does
          not leave your device and serves solely the cart function (Art. 6(1)(f) GDPR, § 25(2) TDDDG).
          No analytics or marketing cookies are set without your consent.
        </p>
        <h3>Contact form and enquiry by email</h3>
        <p>
          When you contact us via the contact form or by email, the data you provide (name, email
          address, message) is processed for the purpose of handling your enquiry. Processing is based on
          Art. 6(1)(b) GDPR (contract / pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate
          interest in responding).
        </p>
        <p>
          For the technical delivery of messages sent via the contact form we use the service{" "}
          <strong>Resend</strong> (Resend, Inc., USA). Resend processes the data provided in the form
          solely to deliver the email to our inbox. Our email inbox is hosted with{" "}
          <strong>IONOS SE</strong>, Elgendorfer Straße 57, 56410 Montabaur, Germany. The necessary data
          processing agreements are in place or will be concluded with both providers; the transfer to
          the USA is based on appropriate safeguards (standard contractual clauses).
        </p>
        <p>
          To protect against automated spam, our contact form uses a technical, invisible check field
          (honeypot). No additional personal data is collected in the process.
        </p>

        <h2>5. Order and payment</h2>
        <h3>Stripe</h3>
        <p>
          For payment processing we use the payment service provider Stripe. For customers in the EEA,
          the provider is Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock,
          Dublin, Ireland. When you place an order, the data required for payment (e.g. name, billing and
          payment details) is transmitted directly to Stripe and processed there. We ourselves do not
          receive or store full payment data (e.g. card numbers).
        </p>
        <p>
          Processing is based on Art. 6(1)(b) GDPR (performance of a contract). You can find more
          information in Stripe’s privacy policy:{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">stripe.com/privacy</a>.
        </p>

        <h2>6. Newsletter</h2>
        <p>
          If you subscribe to our newsletter, we need your email address as well as your consent to
          receive it. Processing is based solely on your consent (Art. 6(1)(a) GDPR). You can withdraw
          this at any time, for example via the unsubscribe link in every newsletter.
        </p>

        <h2>7. Fonts (Google Fonts, self-hosted)</h2>
        <p>
          For a consistent display of fonts we use Google Fonts, installed locally on our server or with
          our hosting provider and not loaded from Google servers when the page is requested. No
          connection to Google takes place and no data is transferred to Google.
        </p>
      </LegalShell>
    );
  }

  return (
    <LegalShell title="Datenschutzerklärung">
      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen
        personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind
        alle Daten, mit denen du persönlich identifiziert werden kannst.
      </p>
      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung?</strong>
        <br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber (siehe „Hinweis zur
        verantwortlichen Stelle“).
      </p>
      <p>
        <strong>Wie erfassen wir deine Daten?</strong>
        <br />
        Deine Daten werden zum einen dadurch erhoben, dass du uns diese mitteilst – etwa bei einer
        Bestellung, einer Newsletter-Anmeldung oder einer Kontaktaufnahme. Andere Daten werden beim
        Besuch der Website automatisch durch unsere IT-Systeme erfasst (z. B. Browser, Betriebssystem,
        Uhrzeit des Seitenaufrufs).
      </p>
      <p>
        <strong>Wofür nutzen wir deine Daten?</strong>
        <br />
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
        gewährleisten. Bestell- und Zahlungsdaten werden zur Abwicklung deines Kaufs verarbeitet.
      </p>
      <p>
        <strong>Welche Rechte hast du?</strong>
        <br />
        Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten Daten sowie
        auf Berichtigung oder Löschung. Eine erteilte Einwilligung kannst du jederzeit widerrufen.
        Außerdem steht dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
      </p>

      <h2>2. Hosting</h2>
      <p>Wir hosten die Inhalte unserer Website beim folgenden Anbieter:</p>
      <h3>Vercel</h3>
      <p>
        Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn du unsere
        Website besuchst, verarbeitet Vercel als Hosting- und Content-Delivery-Anbieter technische
        Zugriffsdaten (z. B. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs), die für die sichere und
        performante Auslieferung der Seite erforderlich sind.
      </p>
      <p>
        Die Verwendung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes
        Interesse an einer zuverlässigen und sicheren Darstellung unserer Website. Mit dem Anbieter
        besteht ein Vertrag über Auftragsverarbeitung (AVV). Die Datenübertragung in die USA wird auf
        die Standardvertragsklauseln der EU-Kommission gestützt.
      </p>

      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Hinweis zur verantwortlichen Stelle</h3>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        Samir Sobhani, Bussardstraße 21, 68307 Mannheim
        <br />
        Telefon: [Telefonnummer wird ergänzt]
        <br />
        E-Mail: <a href="mailto:info@lumorani.com">info@lumorani.com</a>
      </p>
      <h3>Speicherdauer</h3>
      <p>
        Soweit keine speziellere Speicherdauer genannt wird, verbleiben deine personenbezogenen Daten
        bei uns, bis der Zweck für die Verarbeitung entfällt. Gesetzliche Aufbewahrungsfristen (z. B.
        steuer- oder handelsrechtliche) bleiben unberührt.
      </p>
      <h3>Deine Rechte im Überblick</h3>
      <p>
        Dir stehen jederzeit zu: das Recht auf Auskunft, Berichtigung und Löschung, das Recht auf
        Einschränkung der Verarbeitung, das Recht auf Datenübertragbarkeit, das Widerrufsrecht bei
        erteilter Einwilligung, das Widerspruchsrecht nach Art. 21 DSGVO sowie ein Beschwerderecht bei
        der zuständigen Aufsichtsbehörde. Für alle Anliegen erreichst du uns unter{" "}
        <a href="mailto:info@lumorani.com">info@lumorani.com</a>.
      </p>
      <h3>SSL- bzw. TLS-Verschlüsselung</h3>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
        verschlüsselte Verbindung erkennst du am „https://“ in der Adresszeile und am Schloss-Symbol.
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>
      <h3>Cookies und lokaler Speicher</h3>
      <p>
        Diese Website verwendet nur technisch notwendige Speichermechanismen. Insbesondere speichern
        wir deinen Warenkorb lokal in deinem Browser (Local Storage), damit deine Auswahl erhalten
        bleibt. Diese Daten verlassen dein Gerät nicht und dienen ausschließlich der Warenkorbfunktion
        (Art. 6 Abs. 1 lit. f DSGVO, § 25 Abs. 2 TDDDG). Es werden keine Analyse- oder Marketing-Cookies
        ohne deine Einwilligung gesetzt.
      </p>
      <h3>Kontaktformular und Anfrage per E-Mail</h3>
      <p>
        Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst, werden die von dir
        angegebenen Daten (Name, E-Mail-Adresse, Nachricht) zum Zwecke der Bearbeitung deiner Anfrage
        verarbeitet. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
        (Vertrag/vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
        der Beantwortung).
      </p>
      <p>
        Für den technischen Versand der über das Kontaktformular abgeschickten Nachrichten nutzen wir
        den Dienst <strong>Resend</strong> (Resend, Inc., USA). Resend verarbeitet die im Formular
        angegebenen Daten ausschließlich zur Zustellung der E-Mail an unser Postfach. Unser
        E-Mail-Postfach wird bei der <strong>IONOS SE</strong>, Elgendorfer Straße 57, 56410
        Montabaur, Deutschland gehostet. Mit beiden Anbietern bestehen bzw. werden die erforderlichen
        Verträge zur Auftragsverarbeitung geschlossen; die Übermittlung in die USA wird auf geeignete
        Garantien (Standardvertragsklauseln) gestützt.
      </p>
      <p>
        Zum Schutz vor automatisiertem Spam nutzt unser Kontaktformular ein technisches, für dich
        unsichtbares Prüffeld (Honeypot). Dabei werden keine zusätzlichen personenbezogenen Daten
        erhoben.
      </p>

      <h2>5. Bestellung und Zahlung</h2>
      <h3>Stripe</h3>
      <p>
        Für die Zahlungsabwicklung nutzen wir den Zahlungsdienstleister Stripe. Anbieter für Kunden im
        EWR ist die Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin,
        Irland. Bei einer Bestellung werden die für die Zahlung erforderlichen Daten (z. B. Name,
        Rechnungs- und Zahlungsdaten) direkt an Stripe übermittelt und dort verarbeitet. Wir selbst
        erhalten und speichern keine vollständigen Zahlungsdaten (z. B. Kartennummern).
      </p>
      <p>
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
        Weitere Informationen findest du in der Datenschutzerklärung von Stripe:{" "}
        <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer">stripe.com/de/privacy</a>.
      </p>

      <h2>6. Newsletter</h2>
      <p>
        Wenn du unseren Newsletter abonnierst, benötigen wir deine E-Mail-Adresse sowie deine
        Einwilligung zum Empfang. Die Verarbeitung erfolgt ausschließlich auf Grundlage deiner
        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst diese jederzeit widerrufen, etwa über den
        Abmeldelink in jedem Newsletter.
      </p>

      <h2>7. Schriftarten (Google Fonts, lokal gehostet)</h2>
      <p>
        Zur einheitlichen Darstellung von Schriftarten nutzen wir Google Fonts, die lokal auf unserem
        Server bzw. beim Hosting-Anbieter installiert sind und beim Seitenaufruf nicht von Google-Servern
        geladen werden. Eine Verbindung zu Google findet dabei nicht statt und es werden keine Daten an
        Google übertragen.
      </p>
    </LegalShell>
  );
}
