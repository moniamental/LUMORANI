import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/ProductDetail";
import {
  getProductBySlug,
  relatedProducts,
  PRODUCTS,
  formatPrice,
  productName,
  gemName,
  gemLoreFor,
} from "@/lib/catalog";
import { altLanguages, SITE_URL } from "@/lib/meta";
import { JsonLd } from "@/components/site/JsonLd";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  const name = productName(product, "en");
  const gem = gemName(product.gem, "en");
  const lore = gemLoreFor(product.gem, "en");
  return {
    title: `${name} — ${gem}`,
    description: `${name}: ${lore?.bedeutung ?? gem}. ${formatPrice(product.price, "en")}. A handmade one-of-a-kind piece by LUMORANI.`,
    alternates: altLanguages(`/produkt/${slug}`),
  };
}

export default async function ProductPageEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const name = productName(product, "en");
  const gem = gemName(product.gem, "en");
  const lore = gemLoreFor(product.gem, "en");
  const url = `${SITE_URL}/en/produkt/${product.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      description: lore?.bedeutung ?? gem,
      image: `${SITE_URL}${product.image}`,
      url,
      sku: product.id,
      material: gem,
      brand: { "@type": "Brand", name: "LUMORANI" },
      // Ein Offer ohne Preis ist nach schema.org kein gültiges Angebot, und
      // "0.00" wäre schlicht falsch — Google zeigte dann einen Gratis-Stein in
      // den Suchergebnissen. Anfrage-Produkte bekommen deshalb gar kein Offer,
      // sondern nur die Produktbeschreibung.
      ...(product.onRequest
        ? {}
        : {
            offers: {
              "@type": "Offer",
              url,
              priceCurrency: "EUR",
              price: product.price.toFixed(2),
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
              seller: { "@type": "Organization", name: "LUMORANI" },
            },
          }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/en/shop` },
        { "@type": "ListItem", position: 3, name, item: url },
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
