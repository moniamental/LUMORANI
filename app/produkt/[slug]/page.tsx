import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/ProductDetail";
import { getProductBySlug, getGemLore, relatedProducts, PRODUCTS, formatEUR } from "@/lib/catalog";
import { altLanguages } from "@/lib/meta";

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

  return <ProductDetail product={product} related={relatedProducts(product, 4)} />;
}
