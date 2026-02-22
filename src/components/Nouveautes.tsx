"use client";

import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Nouveautes() {
  const products = PRODUCTS.filter(
    (p) => p.category === "nouveaute" || p.category === "both"
  );

  return (
    <section id="nouveautes" className="bg-[#FDFCFA]">
      {/* Feature banner */}
      <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=90"
          alt="Nouveautés Maison Kenmane"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18]/70 via-[#1A1A18]/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <p
              className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-5"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Vient d&apos;arriver
            </p>
            <h2
              className="text-[#F7F4EF] font-[300] leading-[1] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(44px, 7vw, 90px)",
              }}
            >
              Nouveautés
              <br />
              <span className="italic">de Saison</span>
            </h2>
            <p
              className="text-[#D6D3CC] max-w-[400px] leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.04em" }}
            >
              Les dernières créations de nos ateliers, inspirées des tendances contemporaines et du patrimoine marocain.
            </p>
            <Link
              href="#nouveautes-grid"
              className="inline-block text-[#F7F4EF] text-[11px] tracking-[0.2em] uppercase border-b border-[#B8955A] pb-0.5 hover:text-[#B8955A] transition-colors duration-300"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Découvrir
            </Link>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div id="nouveautes-grid" className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
