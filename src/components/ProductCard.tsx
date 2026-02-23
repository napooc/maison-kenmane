"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "./CartProvider";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const shouldAnimateIn = index < 12;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const firstAvailable = product.variants.find((v) => v.available);
    const price = firstAvailable?.price ?? product.price;
    addItem({
      id: `${product.id}-${firstAvailable?.id ?? "default"}`,
      merchandiseId: firstAvailable?.id ?? "",
      productId: product.id,
      handle: product.handle,
      title: product.title,
      price,
      currency: product.currency,
      image: product.image,
      variant: firstAvailable?.title,
    });
  };

  return (
    <div
      className={`group flex flex-col mk-cv-auto ${shouldAnimateIn ? "animate-fadeInUp" : ""}`}
      style={shouldAnimateIn ? { animationDelay: `${index * 0.06}s` } : undefined}
    >
      {/* Image container */}
      <Link href={`/produits/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] bg-[var(--mk-gold-pale)] overflow-hidden img-hover-zoom">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span
                className="bg-[#1A1A18] text-[#F7F4EF] text-[9px] tracking-[0.18em] uppercase px-3 py-1.5"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#1A1A18]/0 group-hover:bg-[#1A1A18]/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="bg-[#F7F4EF] text-[#1A1A18] text-[10px] tracking-[0.18em] uppercase px-6 py-3 hover:bg-[#B8955A] hover:text-white transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                <ShoppingBag size={13} strokeWidth={1.5} />
                Ajouter
              </button>
              <Link
                href={`/produits/${product.handle}`}
                className="bg-[#1A1A18] text-[#F7F4EF] p-3 hover:bg-[#B8955A] transition-colors duration-300"
                aria-label={`Voir ${product.title}`}
              >
                <Eye size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-2">
        <p
          className="text-[10px] tracking-[0.18em] uppercase text-[#B8955A] mb-1"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          {product.subtitle}
        </p>
        <Link href={`/produits/${product.handle}`}>
          <h3
            className="text-[#1A1A18] leading-tight hover:text-[#B8955A] transition-colors duration-300 mb-2"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(18px, 1.5vw, 21px)",
              fontWeight: 300,
            }}
          >
            {product.title}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2.5">
          <span
            className="text-[#1A1A18]"
            style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 400 }}
          >
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && (
            <span
              className="text-[#8A8880] line-through"
              style={{ fontFamily: "var(--font-jost)", fontSize: "12px" }}
            >
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
