"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1A18]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90"
          alt="Maison Kenmane — Collection"
          fill
          className="object-cover object-center opacity-50"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18]/80 via-[#1A1A18]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[92vh] pb-20 lg:pb-28">
        {/* Pre-title */}
        <p
          className="text-[#B8955A] text-[11px] tracking-[0.28em] uppercase mb-5 animate-fadeInUp"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          Nouvelle Collection 2025
        </p>

        {/* Main title */}
        <h1
          className="text-[#F7F4EF] font-[300] leading-[0.92] mb-8 animate-fadeInUp animate-fadeInUp-delay-1"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(52px, 8vw, 110px)",
          }}
        >
          L&apos;Élégance
          <br />
          <span className="italic font-[300]">Marocaine</span>
          <br />
          <span className="text-[#B8955A]">Réinventée</span>
        </h1>

        {/* Description */}
        <p
          className="text-[#D6D3CC] max-w-[480px] leading-relaxed mb-12 animate-fadeInUp animate-fadeInUp-delay-2"
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "clamp(13px, 1.2vw, 15px)",
            fontWeight: 300,
            letterSpacing: "0.04em",
          }}
        >
          Des pièces d&apos;exception façonnées à la main, où le savoir-faire
          ancestral marocain rencontre une esthétique contemporaine.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-5 animate-fadeInUp animate-fadeInUp-delay-3">
          <Link
            href="/#meilleures-ventes"
            className="bg-[#B8955A] text-[#F7F4EF] px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#D4AE72] transition-colors duration-300"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Découvrir la Collection
          </Link>
          <Link
            href="/#nouveautes"
            className="text-[#F7F4EF] text-[11px] tracking-[0.2em] uppercase border-b border-[#F7F4EF]/40 hover:border-[#B8955A] hover:text-[#B8955A] transition-all duration-300 pb-0.5"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Nouveautés
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-12 bg-[#F7F4EF]/40 animate-pulse" />
          <p
            className="text-[#F7F4EF] text-[9px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Défiler
          </p>
        </div>
      </div>

      {/* Side cards */}
      <div className="absolute right-0 top-0 h-full w-[35%] hidden xl:flex flex-col">
        <div className="flex-1 relative overflow-hidden img-hover-zoom">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4b4c6e?w=800&q=85"
            alt="Caftan"
            fill
            className="object-cover"
            sizes="35vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A18]/20 to-transparent" />
        </div>
        <div className="flex-1 relative overflow-hidden img-hover-zoom">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85"
            alt="Collection été"
            fill
            className="object-cover"
            sizes="35vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
