export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  description: string;
  category: "bestseller" | "nouveaute" | "both";
  tags: string[];
  variants: {
    id: string;
    title: string;
    available: boolean;
    price?: number;
    compareAtPrice?: number;
  }[];
  badge?: string;
}

export function formatPrice(price: number, currency = "MAD") {
  return `${price.toLocaleString("fr-MA")} ${currency}`;
}
