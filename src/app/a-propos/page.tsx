import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFA]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EF] to-[#FDFCFA] -z-10" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span 
              className="text-[#B8955A] text-[10px] tracking-[0.3em] uppercase mb-8 block"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Notre Histoire
            </span>
            
            <h1 
              className="text-[#1A1A18] leading-[1.1] mb-12"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(48px, 8vw, 110px)",
                fontWeight: 300,
              }}
            >
              L'Élégance <br />
              <span className="italic text-[#8A8880]">Intemporelle</span>
            </h1>
            
            <div className="w-px h-24 bg-gradient-to-b from-[#B8955A] to-transparent mb-12" />
            
            <p 
              className="text-[#1A1A18] text-[16px] md:text-[20px] leading-[1.8] max-w-2xl font-light"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Maison Kenmane est née d'une vision singulière : redéfinir le luxe marocain en fusionnant l'héritage artisanal avec une esthétique résolument contemporaine.
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 lg:py-40 bg-[#1A1A18] text-[#F7F4EF]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 bg-[#2A2A28] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ideogram-v3.0_i_want..._imresizer-1771774770605.jpg?width=8000&height=8000&resize=contain"
                    alt="Maison Kenmane Logo"
                    width={400}
                    height={400}
                    className="object-contain opacity-20 invert"
                  />
                </div>
                <div className="absolute inset-0 border border-white/10 m-4" />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <span 
                className="text-[#B8955A] text-[10px] tracking-[0.3em] uppercase mb-6 block"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Le Manifeste
              </span>
              <h2 
                className="text-[#F7F4EF] leading-[1.2] mb-10"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 300,
                }}
              >
                L'Art de la <br />
                <span className="italic text-[#8A8880]">Subtilité</span>
              </h2>
              
              <div className="space-y-8 text-[#8A8880] text-[14px] leading-[2] font-light" style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.02em" }}>
                <p>
                  Chaque création Maison Kenmane est une ode à la féminité moderne. Nous croyons en une mode qui ne se contente pas d'habiller, mais qui révèle l'essence même de celle qui la porte.
                </p>
                <p>
                  Nos collections sont pensées comme des œuvres architecturales : des lignes pures, des coupes structurées et une attention obsessionnelle portée aux moindres détails. Le choix des matières n'est jamais laissé au hasard ; il est le point de départ de notre processus créatif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-40 bg-[#FDFCFA]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 lg:mb-32">
            <h2 
              className="text-[#1A1A18] leading-[1.2]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 300,
              }}
            >
              Nos Piliers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {[
              {
                number: "01",
                title: "Excellence",
                desc: "Une quête perpétuelle de la perfection, de la sélection des étoffes jusqu'à la dernière couture."
              },
              {
                number: "02",
                title: "Intemporalité",
                desc: "Des pièces conçues pour traverser les saisons, s'affranchissant des tendances éphémères."
              },
              {
                number: "03",
                title: "Savoir-Faire",
                desc: "La valorisation du geste artisanal, alliant techniques traditionnelles et innovations modernes."
              }
            ].map((val) => (
              <div key={val.number} className="relative group">
                <div className="absolute -inset-4 bg-[#F7F4EF] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span 
                  className="text-[#E4E0D8] text-[64px] leading-none block mb-6"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  {val.number}
                </span>
                <h3 
                  className="text-[#1A1A18] text-[24px] mb-4"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {val.title}
                </h3>
                <p 
                  className="text-[#8A8880] text-[13px] leading-[1.8] font-light"
                  style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.02em" }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
