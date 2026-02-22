"use client";

import Image from "next/image";

export default function Editorial() {
  return (
    <section className="bg-[#EDE0CC] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[620px]">
            <div className="relative col-span-1 row-span-2 img-hover-zoom">
              <Image
                src="https://images.unsplash.com/photo-1614093302611-8efc4dd3f58b?w=800&q=85"
                alt="Artisanat Maison Kenmane"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative img-hover-zoom">
              <Image
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85"
                alt="Détail broderie"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative img-hover-zoom">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85"
                alt="Collection Maison Kenmane"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p
              className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-5"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Notre Histoire
            </p>
            <h2
              className="text-[#1A1A18] leading-[1.1] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
              }}
            >
              L&apos;Art du
              <br />
              <span className="italic">Savoir-Faire</span>
              <br />
              Marocain
            </h2>
            <div className="w-12 h-px bg-[#B8955A] mb-8" />
            <p
              className="text-[#2C2C2A] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.04em", lineHeight: "2" }}
            >
              Maison Kenmane est née de la passion pour l&apos;artisanat marocain
              d&apos;exception. Chaque pièce est le fruit d&apos;une collaboration étroite
              entre nos designers et les meilleures artisanes du pays.
            </p>
            <p
              className="text-[#2C2C2A] leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.04em", lineHeight: "2" }}
            >
              Broderies traditionnelles, soies précieuses, velours fastueux —
              chaque matière est sélectionnée avec une rigueur absolue pour
              garantir une qualité incomparable.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-8 border-t border-[#D4AE72]/40">
              {[
                { num: "500+", label: "Pièces créées" },
                { num: "12", label: "Artisanes" },
                { num: "3", label: "Ans d'expertise" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-[#1A1A18] mb-1"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 300 }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-[#8A8880] text-[10px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
