export default function Editorial() {
  return (
    <section className="bg-[var(--mk-gold-pale)] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Editorial blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`border border-[var(--mk-border)] bg-[var(--mk-ivory-light)] p-8 lg:p-10 ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <p
                  className="text-[10px] tracking-[0.22em] uppercase text-[var(--mk-gold)] mb-3"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {i === 0 ? "Atelier" : i === 1 ? "Matières" : i === 2 ? "Détails" : "Finitions"}
                </p>
                <p
                  className="text-[var(--mk-charcoal)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(20px, 2.2vw, 30px)",
                    fontWeight: 300,
                    lineHeight: 1.15,
                  }}
                >
                  {i === 0
                    ? "Un luxe discret, façonné à la main."
                    : i === 1
                      ? "Soies, velours, broderies."
                      : i === 2
                        ? "Un sens du détail absolu."
                        : "Des finitions pensées pour durer."}
                </p>
                <div className="mt-6 h-px w-12 bg-[var(--mk-gold)]" />
                <p
                  className="mt-6 text-[var(--mk-charcoal-soft)] text-[13px] leading-[2]"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  {i === 0
                    ? "Chaque pièce Maison Kenmane naît d'un dialogue entre design contemporain et héritage marocain."
                    : i === 1
                      ? "Nous sélectionnons des matières nobles pour un tombé impeccable et un confort naturel."
                      : i === 2
                        ? "Broderies, finitions, coupes — tout est pensé pour sublimer le geste et la silhouette."
                        : "Une couture nette, une tenue parfaite, une élégance qui traverse le temps."}
                </p>
              </div>
            ))}
          </div>

          {/* Text */}
          <div>
            <p
              className="text-[var(--mk-gold)] text-[10px] tracking-[0.28em] uppercase mb-5"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Notre Histoire
            </p>
            <h2
              className="text-[var(--mk-charcoal)] leading-[1.06] mb-8"
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
            <div className="w-12 h-px bg-[var(--mk-gold)] mb-8" />
            <p
              className="text-[var(--mk-charcoal-soft)] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.04em", lineHeight: "2" }}
            >
              Maison Kenmane est née de la passion pour l&apos;artisanat marocain
              d&apos;exception. Chaque pièce est le fruit d&apos;une collaboration étroite
              entre nos designers et les meilleures artisanes du pays.
            </p>
            <p
              className="text-[var(--mk-charcoal-soft)] leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.04em", lineHeight: "2" }}
            >
              Broderies traditionnelles, soies précieuses, velours fastueux —
              chaque matière est sélectionnée avec une rigueur absolue pour
              garantir une qualité incomparable.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-8 border-t border-[var(--mk-gold-light)]/40">
              {[
                { num: "500+", label: "Pièces créées" },
                { num: "12", label: "Artisanes" },
                { num: "3", label: "Ans d'expertise" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-[var(--mk-charcoal)] mb-1"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 300 }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-[var(--mk-gray)] text-[10px] tracking-[0.12em] uppercase"
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
