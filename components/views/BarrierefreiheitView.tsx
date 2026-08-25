import { LegalShell } from "@/components/site/LegalShell";
import type { Locale } from "@/lib/i18n";

const ulStyle: React.CSSProperties = {
  paddingLeft: "1.2em",
  margin: "0 0 var(--space-4)",
  color: "var(--text-secondary)",
  lineHeight: "var(--leading-body)",
  fontWeight: "var(--weight-light)",
};

export function BarrierefreiheitView({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <LegalShell eyebrow="For everyone" title="Accessibility">
        <p>
          Beautiful jewellery should be accessible to everyone — and that goes for our website, too. We
          work continuously to make LUMORANI as accessible as possible, so you can browse and shop with
          us regardless of ability or technology.
        </p>

        <h2>What we implement</h2>
        <p>Our website is built to meet common accessibility standards. This includes, among other things:</p>
        <ul style={ulStyle}>
          <li>clear, high-contrast typography and a calm, readable design,</li>
          <li>navigation that works throughout by keyboard, with a visible focus,</li>
          <li>alternative text and labelled controls for screen readers,</li>
          <li>respect for the “reduce motion” system setting — animations then become subtler or are hidden,</li>
          <li>a responsive layout from large screens down to the smartphone.</li>
        </ul>

        <h2>Not yet perfect</h2>
        <p>
          Accessibility is an ongoing path for us, not a one-time checkbox. If you notice something that
          doesn’t work well — an element that’s hard to use, a contrast that’s too weak, or content that
          doesn’t come across — please let us know.
        </p>

        <h2>Feedback</h2>
        <p>
          Your feedback helps us improve. Write to us any time at{" "}
          <a href="mailto:info@lumorani.com">info@lumorani.com</a>. We take every note seriously.
        </p>
      </LegalShell>
    );
  }

  return (
    <LegalShell eyebrow="Für alle da" title="Barrierefreiheit">
      <p>
        Schöner Schmuck soll für alle zugänglich sein – und das gilt auch für unsere Website. Wir
        arbeiten kontinuierlich daran, LUMORANI so barrierefrei wie möglich zu gestalten, damit du
        unabhängig von Fähigkeiten oder Technik bei uns stöbern und einkaufen kannst.
      </p>

      <h2>Was wir umsetzen</h2>
      <p>
        Unsere Website ist mit dem Ziel gebaut, gängige Standards der Barrierefreiheit zu erfüllen.
        Dazu gehören unter anderem:
      </p>
      <ul style={ulStyle}>
        <li>klare, kontrastreiche Typografie und eine ruhige, gut lesbare Gestaltung,</li>
        <li>eine durchgängig per Tastatur bedienbare Navigation mit sichtbarem Fokus,</li>
        <li>Alternativtexte und beschriftete Bedienelemente für Screenreader,</li>
        <li>Respekt vor der Systemeinstellung „Bewegung reduzieren“ – Animationen werden dann dezenter oder ausgeblendet,</li>
        <li>eine responsive Darstellung von großen Bildschirmen bis zum Smartphone.</li>
      </ul>

      <h2>Noch nicht perfekt</h2>
      <p>
        Barrierefreiheit ist für uns ein fortlaufender Weg, kein einmaliges Häkchen. Sollte dir etwas
        auffallen, das nicht gut funktioniert – ein Element, das sich schlecht bedienen lässt, ein
        Kontrast, der zu schwach ist, oder ein Inhalt, der nicht ankommt – sag uns bitte Bescheid.
      </p>

      <h2>Feedback</h2>
      <p>
        Deine Rückmeldung hilft uns, besser zu werden. Schreib uns jederzeit an{" "}
        <a href="mailto:info@lumorani.com">info@lumorani.com</a>. Wir nehmen jeden Hinweis ernst.
      </p>
    </LegalShell>
  );
}
