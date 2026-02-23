import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EF]">
      <Header />

      <section className="py-20 lg:py-28">
        <div className="max-w-[960px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p
              className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-4"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Support
            </p>
            <h1
              className="text-[#1A1A18]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 300,
                letterSpacing: "0.03em",
              }}
            >
              Contact
            </h1>
            <p
              className="text-[#8A8880] mt-6 max-w-[520px] mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "13px",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              Une question ? Écrivez-nous et nous vous répondrons rapidement.
            </p>
          </div>

          <div className="bg-[#FDFCFA] border border-[#E4E0D8] p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2
                  className="text-[#1A1A18] mb-4"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: 300 }}
                >
                  Maison Kenmane
                </h2>
                <p
                  className="text-[#8A8880] text-[13px] leading-relaxed"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.05em" }}
                >
                  Casablanca, Maroc
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:contact@maisonkenmane.ma"
                    className="block text-[#1A1A18] text-[12px] tracking-[0.08em] uppercase hover:text-[#B8955A] transition-colors"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    contact@maisonkenmane.ma
                  </a>
                  <a
                    href="tel:+212600000000"
                    className="block text-[#1A1A18] text-[12px] tracking-[0.08em] uppercase hover:text-[#B8955A] transition-colors"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    +212 6 00 00 00 00
                  </a>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    className="block text-[10px] tracking-[0.22em] uppercase text-[#8A8880] mb-2"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Nom
                  </label>
                  <input className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[13px] outline-none focus:border-[#B8955A]" style={{ fontFamily: "var(--font-jost)" }} />
                </div>
                <div>
                  <label
                    className="block text-[10px] tracking-[0.22em] uppercase text-[#8A8880] mb-2"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Email
                  </label>
                  <input type="email" className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[13px] outline-none focus:border-[#B8955A]" style={{ fontFamily: "var(--font-jost)" }} />
                </div>
                <div>
                  <label
                    className="block text-[10px] tracking-[0.22em] uppercase text-[#8A8880] mb-2"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Message
                  </label>
                  <textarea rows={5} className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[13px] outline-none focus:border-[#B8955A]" style={{ fontFamily: "var(--font-jost)" }} />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A1A18] text-[#F7F4EF] text-[11px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#B8955A] transition-colors"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}