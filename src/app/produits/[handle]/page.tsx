import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle, { revalidateSeconds: 60 }).catch(() => null);
  if (!product) return notFound();
  return <ProductDetailClient product={product} />;
}
