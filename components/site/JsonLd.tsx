// Strukturierte Daten (schema.org). Ohne sie zeigt Google keine Rich Results
// mit Preis und Verfügbarkeit — bei einem Shop der größte SEO-Hebel.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Inhalt stammt ausschließlich aus dem eigenen Katalog, nicht aus Nutzereingaben.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
