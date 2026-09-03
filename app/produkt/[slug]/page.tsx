import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/ProductDetail";
import { getProductBySlug, getGemLore, relatedProducts, PRODUCTS, formatEUR } from "@/lib/catalog";
import { altLanguages, SITE_URL } from "@/lib/meta";
import { JsonLd } from "@/components/site/JsonLd";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt nicht gefunden" };
  const lore = getGemLore(product.gem);
  return {
    title: `${product.name} — ${product.gem}`,
    description: `${product.name}: ${lore?.bedeutung ?? product.gem}. ${formatEUR(product.price)}. Handgefertigtes Unikat von LUMORANI.`,
    alternates: altLanguages(`/produkt/${slug}`),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const lore = getGemLore(product.gem);
  const url = `${SITE_URL}/produkt/${product.slug}`;

  // Strukturierte Daten — ohne sie zeigt Google weder Preis noch Verfügbarkeit
  // im Suchergebnis. Alle Werte stammen aus dem Katalog, nichts ist erfunden.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `${SITE_URL}${product.image}`,
      url,
      sku: product.id,
      material: product.gem,
      brand: { "@type": "Brand", name: "LUMORANI" },
      ...(lore?.bedeutung ? { additionalProperty: [{ "@type": "PropertyValue", name: "Bedeutung", value: lore.bedeutung }] } : {}),
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "EUR",
        price: product.price.toFixed(2),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "LUMORANI" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
        { "@type": "ListItem", position: 3, name: product.name, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProductDetail product={product} related={relatedProducts(product, 4)} />
    </>
  );
}
