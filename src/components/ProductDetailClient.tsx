"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, ShoppingBag, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice, Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  const firstAvailable = useMemo(
    () => product.variants.find((v) => v.available) || product.variants[0],
    [product.variants]
  );

  const [selectedVariantId, setSelectedVariantId] = useState(firstAvailable?.id);
  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === selectedVariantId) || firstAvailable,
    [product.variants, selectedVariantId, firstAvailable]
  );

  const [quantity, setQuantity] = useState(1);

  const unitPrice = selectedVariant?.price ?? product.price;

  const handleAdd = () => {
    if (!selectedVariant) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedVariant.id}`,
        merchandiseId: selectedVariant.id,
        productId: product.id,
        handle: product.handle,
        title: product.title,
        price: unitPrice,
        currency: product.currency,
        image: product.image,
        variant: selectedVariant.title,
      });
    }
    openCart();
  };

  const mainImage = product.images[activeImage] || product.image;

  return (
    <main className="min-h-screen bg-[#F7F4EF]">
      <Header />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10">
          <Link
            href="/"
            className="text-[#8A8880] text-[11px] tracking-[0.12em] hover:text-[#B8955A] transition-colors flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            <ChevronLeft size={13} strokeWidth={1.5} />
            Accueil
          </Link>
          <span className="text-[#D6D3CC]">/</span>
          <span
            className="text-[11px] tracking-[0.12em] text-[#1A1A18]"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-16">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i ? "border-[#B8955A]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative aspect-[3/4] img-hover-zoom">
              {mainImage && (
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span
                    className="bg-[#1A1A18] text-[#F7F4EF] text-[9px] tracking-[0.18em] uppercase px-3 py-1.5"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p
              className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-3"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              {product.subtitle}
            </p>
            <h1
              className="text-[#1A1A18] leading-tight mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 300,
              }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span
                className="text-[#1A1A18]"
                style={{ fontFamily: "var(--font-jost)", fontSize: "18px", fontWeight: 400 }}
              >
                {formatPrice(unitPrice, product.currency)}
              </span>
              {selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > unitPrice ? (
                <span
                  className="text-[#8A8880] line-through"
                  style={{ fontFamily: "var(--font-jost)", fontSize: "14px" }}
                >
                  {formatPrice(selectedVariant.compareAtPrice, product.currency)}
                </span>
              ) : product.originalPrice ? (
                <span
                  className="text-[#8A8880] line-through"
                  style={{ fontFamily: "var(--font-jost)", fontSize: "14px" }}
                >
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              ) : null}
            </div>

            <div className="w-full h-px bg-[#E4E0D8] mb-8" />

            {/* Variants */}
            {product.variants.length > 0 && selectedVariant && (
              <div className="mb-8">
                <p
                  className="text-[11px] tracking-[0.16em] uppercase text-[#1A1A18] mb-4"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 400 }}
                >
                  Variante : <span className="text-[#B8955A] font-normal">{selectedVariant.title}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => v.available && setSelectedVariantId(v.id)}
                      disabled={!v.available}
                      className={`h-12 px-4 border text-[12px] transition-all duration-200 ${
                        selectedVariantId === v.id
                          ? "border-[#1A1A18] bg-[#1A1A18] text-[#F7F4EF]"
                          : v.available
                          ? "border-[#E4E0D8] text-[#1A1A18] hover:border-[#B8955A]"
                          : "border-[#E4E0D8] text-[#D6D3CC] cursor-not-allowed line-through"
                      }`}
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p
                className="text-[11px] tracking-[0.16em] uppercase text-[#1A1A18] mb-4"
                style={{ fontFamily: "var(--font-jost)", fontWeight: 400 }}
              >
                Quantité
              </p>
              <div className="flex items-center border border-[#E4E0D8] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#1A1A18] hover:bg-[#F0EDE8] transition-colors"
                >
                  <Minus size={13} strokeWidth={1.5} />
                </button>
                <span
                  className="w-12 text-center text-[14px] text-[#1A1A18]"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#1A1A18] hover:bg-[#F0EDE8] transition-colors"
                >
                  <Plus size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedVariant?.available}
              className="flex items-center justify-center gap-3 bg-[#1A1A18] text-[#F7F4EF] py-4.5 px-10 text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8955A] transition-colors duration-300 mb-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-jost)", padding: "18px 40px" }}
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              Ajouter au Panier
            </button>

            {/* COD note */}
            <div className="flex items-center justify-center gap-2 py-3 bg-[#EDE0CC] mb-8">
              <Truck size={14} strokeWidth={1.5} className="text-[#B8955A]" />
              <p
                className="text-[11px] tracking-[0.14em] uppercase text-[#1A1A18]"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Paiement à la livraison disponible
              </p>
            </div>

            {/* Description */}
            <div className="border-t border-[#E4E0D8] pt-8">
              <h3
                className="text-[11px] tracking-[0.18em] uppercase text-[#1A1A18] mb-4"
                style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
              >
                Description
              </h3>
              <p
                className="text-[#2C2C2A] leading-relaxed"
                style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.04em", lineHeight: "2" }}
              >
                {product.description}
              </p>
            </div>

            {/* Delivery info */}
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Truck size={15} strokeWidth={1.5} className="text-[#8A8880]" />
                <p
                  className="text-[12px] text-[#8A8880]"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  Livraison 2–4 jours ouvrables
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={15} strokeWidth={1.5} className="text-[#8A8880]" />
                <p
                  className="text-[12px] text-[#8A8880]"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  Retours gratuits sous 14 jours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
