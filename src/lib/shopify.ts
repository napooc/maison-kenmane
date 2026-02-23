import { Product } from "@/lib/products";
import { readShopifyTokens } from "@/lib/shopifyTokenStore";

type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyImage = { url: string; altText: string | null };
type ShopifyCollection = { title: string; handle: string };
type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
};
type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  productType: string;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  collections: { edges: { node: ShopifyCollection }[] };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
};

function normalizeShopifyDomain(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";

  // Allow values like "https://your-store.myshopify.com" or "your-store.myshopify.com/admin".
  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      return new URL(s).hostname;
    } catch {
      return "";
    }
  }

  return s.split("/")[0] || "";
}

async function getStorefrontConfig() {
  const saved = await readShopifyTokens();

  const rawDomain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ||
    saved?.shop ||
    "";

  const domain = normalizeShopifyDomain(rawDomain);

  const token =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ||
    saved?.storefrontAccessToken ||
    "";

  const trimmedToken = token.trim();

  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-01";

  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN (e.g. your-store.myshopify.com)");
  if (!trimmedToken) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");

  return { domain, token: trimmedToken, version };
}

export async function shopifyStorefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidateSeconds?: number }
): Promise<T> {
  const { domain, token, version } = await getStorefrontConfig();

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next:
      typeof options?.revalidateSeconds === "number"
        ? { revalidate: options.revalidateSeconds }
        : undefined,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const extra = json?.errors ? ` — ${JSON.stringify(json.errors)}` : "";
    throw new Error(`Shopify Storefront API error: ${res.status}${extra}`);
  }

  if (json?.errors?.length) {
    throw new Error(`Shopify Storefront GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          images(first: 6) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
              }
            }
          }
          collections(first: 3) {
            edges {
              node { title handle }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      tags
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 12) {
        edges {
          node { url altText }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
          }
        }
      }
      collections(first: 5) {
        edges { node { title handle } }
      }
    }
  }
`;

function parseAmount(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalizeToken(s: string) {
  return s.trim().toLowerCase();
}

function inferCategory(tags: string[], collections: ShopifyCollection[]): Product["category"] {
  const tagSet = new Set(tags.map(normalizeToken));
  const collSet = new Set(collections.map((c) => normalizeToken(c.handle)));

  const isBest = tagSet.has("bestseller") || tagSet.has("best-seller") || collSet.has("best-sellers");
  const isNew = tagSet.has("nouveaute") || tagSet.has("nouveautés") || tagSet.has("nouveau") || collSet.has("nouveautes") || collSet.has("nouveautés");

  if (isBest && isNew) return "both";
  if (isBest) return "bestseller";
  if (isNew) return "nouveaute";
  return "nouveaute";
}

function inferSubtitle(productType: string, collections: ShopifyCollection[]) {
  if (productType?.trim()) return productType;
  if (collections[0]?.title) return collections[0].title;
  return "Collection";
}

function inferBadge(variants: ShopifyVariant[], tags: string[]) {
  const tagSet = new Set(tags.map(normalizeToken));
  if (tagSet.has("badge:nouveau") || tagSet.has("nouveau") || tagSet.has("new")) return "Nouveau";
  if (tagSet.has("badge:best-seller") || tagSet.has("bestseller") || tagSet.has("best-seller")) return "Best-Seller";

  const anySale = variants.some((v) => {
    const price = parseAmount(v.price.amount);
    const compareAt = v.compareAtPrice ? parseAmount(v.compareAtPrice.amount) : 0;
    return compareAt > price;
  });
  if (anySale) return "Promo";
  return undefined;
}

export function mapShopifyProductToProduct(node: ShopifyProductNode): Product {
  const images = node.images.edges.map((e) => e.node.url).filter(Boolean);
  const variants = node.variants.edges.map((e) => e.node);
  const collections = node.collections.edges.map((e) => e.node);

  const minPrice = parseAmount(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode || "MAD";

  const mappedVariants: Product["variants"] = variants.map((v) => ({
    id: v.id,
    title: v.title,
    available: v.availableForSale,
    price: parseAmount(v.price.amount),
    compareAtPrice: v.compareAtPrice ? parseAmount(v.compareAtPrice.amount) : undefined,
  }));

  const originalPrice = (() => {
    const compareAt = variants
      .map((v) => (v.compareAtPrice ? parseAmount(v.compareAtPrice.amount) : 0))
      .filter((n) => n > 0);
    const maxCompareAt = compareAt.length ? Math.max(...compareAt) : 0;
    return maxCompareAt > minPrice ? maxCompareAt : undefined;
  })();

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    subtitle: inferSubtitle(node.productType, collections),
    price: minPrice,
    originalPrice,
    currency,
    image: images[0] || "",
    images: images.length ? images : images[0] ? [images[0]] : [],
    description: node.description,
    category: inferCategory(node.tags, collections),
    tags: node.tags,
    variants: mappedVariants,
    badge: inferBadge(variants, node.tags),
  };
}

export async function getProducts(params?: {
  first?: number;
  query?: string;
  revalidateSeconds?: number;
}): Promise<Product[]> {
  const first = params?.first ?? 12;
  const query = params?.query;

  const data = await shopifyStorefrontFetch<{
    products: { edges: { node: ShopifyProductNode }[] };
  }>(GET_PRODUCTS_QUERY, { first, query }, { revalidateSeconds: params?.revalidateSeconds ?? 60 });

  return data.products.edges.map((e) => mapShopifyProductToProduct(e.node));
}

export async function getProductByHandle(handle: string, params?: { revalidateSeconds?: number }): Promise<Product | null> {
  const data = await shopifyStorefrontFetch<{ product: ShopifyProductNode | null }>(
    GET_PRODUCT_QUERY,
    { handle },
    { revalidateSeconds: params?.revalidateSeconds ?? 60 }
  );

  if (!data.product) return null;
  return mapShopifyProductToProduct(data.product);
}
