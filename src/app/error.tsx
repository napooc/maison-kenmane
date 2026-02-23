"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--mk-ivory)] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1
          className="text-[var(--mk-charcoal)] mb-6"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "48px", fontWeight: 300 }}
        >
          Une erreur est survenue
        </h1>
        <p
          className="text-[var(--mk-gray)] mb-10 max-w-md"
          style={{ fontFamily: "var(--font-jost)", fontSize: "14px", fontWeight: 300 }}
        >
          Nous sommes désolés, une erreur inattendue s'est produite.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[var(--mk-gold)] text-white px-8 py-3 text-[11px] tracking-[0.18em] uppercase hover:bg-[#D4AE72] transition-colors"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          Réessayer
        </button>
      </div>
      <Footer />
    </main>
  );
}
