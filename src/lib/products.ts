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
  variants: { id: string; title: string; available: boolean }[];
  badge?: string;
}

// High-quality Unsplash images — fashion / luxury lifestyle
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    handle: "caftan-royal-ivoire",
    title: "Caftan Royal Ivoire",
    subtitle: "Collection Signature",
    price: 2800,
    currency: "MAD",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4c6e?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4c6e?w=800&q=85",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    ],
    description:
      "Un caftan d'exception taillé dans une soie ivoire de premier choix, orné de broderies dorées réalisées à la main par nos artisanes. Une pièce intemporelle qui incarne l'élégance marocaine.",
    category: "bestseller",
    tags: ["caftan", "soie", "broderie"],
    variants: [
      { id: "v1a", title: "S", available: true },
      { id: "v1b", title: "M", available: true },
      { id: "v1c", title: "L", available: true },
      { id: "v1d", title: "XL", available: false },
    ],
    badge: "Best-Seller",
  },
  {
    id: "p2",
    handle: "takchita-nuit-noire",
    title: "Takchita Nuit Noire",
    subtitle: "Édition Limitée",
    price: 3400,
    currency: "MAD",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
    ],
    description:
      "Une takchita en velours nuit parsemée de cristaux cousus à la main, pour une présence somptueuse lors des grandes occasions.",
    category: "bestseller",
    tags: ["takchita", "velours", "cristaux"],
    variants: [
      { id: "v2a", title: "S", available: true },
      { id: "v2b", title: "M", available: true },
      { id: "v2c", title: "L", available: true },
    ],
    badge: "Édition Limitée",
  },
  {
    id: "p3",
    handle: "jellaba-zephyr-rose",
    title: "Jellaba Zéphyr Rosé",
    subtitle: "Prêt-à-Porter",
    price: 1650,
    originalPrice: 1950,
    currency: "MAD",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85",
    ],
    description:
      "Légèreté et féminité au cœur de cette jellaba rosée en mousseline fluide, idéale pour les soirées estivales.",
    category: "bestseller",
    tags: ["jellaba", "mousseline", "rosé"],
    variants: [
      { id: "v3a", title: "XS", available: true },
      { id: "v3b", title: "S", available: true },
      { id: "v3c", title: "M", available: false },
    ],
    badge: "-15%",
  },
  {
    id: "p4",
    handle: "ceinture-brodee-or",
    title: "Ceinture Brodée Or",
    subtitle: "Accessoires",
    price: 480,
    currency: "MAD",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85",
    ],
    description:
      "Ceinture en cuir naturel ornée de broderies fil d'or, pièce parfaite pour sublimer tous vos ensembles.",
    category: "nouveaute",
    tags: ["ceinture", "cuir", "broderie"],
    variants: [
      { id: "v4a", title: "Unique", available: true },
    ],
    badge: "Nouveau",
  },
  {
    id: "p5",
    handle: "caftan-aurora-emeraude",
    title: "Caftan Aurora Émeraude",
    subtitle: "Nouvelle Collection",
    price: 3100,
    currency: "MAD",
    image:
      "https://images.unsplash.com/photo-1614093302611-8efc4dd3f58b?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1614093302611-8efc4dd3f58b?w=800&q=85",
    ],
    description:
      "Un caftan émeraude d'une richesse éclatante, élaboré dans un brocart aux reflets changeants, orné d'une broderie sfifa traditionnelle.",
    category: "nouveaute",
    tags: ["caftan", "brocart", "emeraude"],
    variants: [
      { id: "v5a", title: "S", available: true },
      { id: "v5b", title: "M", available: true },
      { id: "v5c", title: "L", available: true },
    ],
    badge: "Nouveau",
  },
  {
    id: "p6",
    handle: "ensemble-beldi-sable",
    title: "Ensemble Beldi Sable",
    subtitle: "Collection Été",
    price: 2200,
    currency: "MAD",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85",
    ],
    description:
      "Un ensemble deux pièces en lin naturel couleur sable, conjuguant modernité et héritage marocain avec élégance.",
    category: "nouveaute",
    tags: ["ensemble", "lin", "beldi"],
    variants: [
      { id: "v6a", title: "S", available: true },
      { id: "v6b", title: "M", available: true },
      { id: "v6c", title: "L", available: true },
      { id: "v6d", title: "XL", available: true },
    ],
    badge: "Nouveau",
  },
];

export function formatPrice(price: number, currency = "MAD") {
  return `${price.toLocaleString("fr-MA")} ${currency}`;
}
