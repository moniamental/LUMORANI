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
import { altLanguages } from "@/lib/meta";

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

  return <ProductDetail product={product} related={relatedProducts(product, 4)} />;
}
