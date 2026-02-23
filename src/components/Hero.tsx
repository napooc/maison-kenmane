import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--mk-charcoal)]">
      {/* Background (image-free for speed) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mk-hero-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--mk-charcoal)]/30 to-[var(--mk-charcoal)]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[86vh] pb-20 lg:pb-28">
        {/* Pre-title */}
        <p
          className="text-[var(--mk-gold)] text-[11px] tracking-[0.28em] uppercase mb-5 animate-fadeInUp"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          Maison Kenmane
        </p>

        {/* Main title */}
        <h1
          className="text-[var(--mk-ivory)] font-[300] leading-[0.92] mb-8 animate-fadeInUp animate-fadeInUp-delay-1"
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
          className="text-[var(--mk-gray-light)] max-w-[520px] leading-relaxed mb-12 animate-fadeInUp animate-fadeInUp-delay-2"
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
            href="/produits"
            className="bg-[var(--mk-gold)] text-[var(--mk-ivory)] px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--mk-gold-light)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Voir les Produits
          </Link>
          <Link
            href="/contact"
            className="text-[var(--mk-ivory)] text-[11px] tracking-[0.2em] uppercase border-b border-[var(--mk-ivory)]/40 hover:border-[var(--mk-gold)] hover:text-[var(--mk-gold)] transition-all duration-300 pb-0.5"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Contact
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-12 bg-[var(--mk-ivory)]/40 animate-pulse" />
          <p
            className="text-[var(--mk-ivory)] text-[9px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Défiler
          </p>
        </div>
      </div>
    </section>
  );
}
