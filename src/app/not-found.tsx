import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--mk-ivory)] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <p
          className="text-[var(--mk-gold)] text-[12px] tracking-[0.28em] uppercase mb-4"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          Erreur 404
        </p>
        <h1
          className="text-[var(--mk-charcoal)] mb-6"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "48px", fontWeight: 300 }}
        >
          Page introuvable
        </h1>
        <p
          className="text-[var(--mk-gray)] mb-10 max-w-md"
          style={{ fontFamily: "var(--font-jost)", fontSize: "14px", fontWeight: 300 }}
        >
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="bg-[var(--mk-charcoal)] text-white px-8 py-3 text-[11px] tracking-[0.18em] uppercase hover:bg-[var(--mk-gold)] transition-colors"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          Retour à l'accueil
        </Link>
      </div>
      <Footer />
    </main>
  );
}
