import { getProducts } from "@/lib/shopify";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default async function Nouveautes() {
  const tagged = await getProducts({
    first: 6,
    query: "tag:nouveaute OR tag:nouveau",
    revalidateSeconds: 60,
  }).catch((err) => {
    console.error("[Shopify] Nouveautes getProducts(tagged) failed", err);
    return [];
  });

  const products = tagged.length
    ? tagged
    : await getProducts({ first: 6, revalidateSeconds: 60 }).catch((err) => {
        console.error("[Shopify] Nouveautes getProducts(fallback) failed", err);
        return [];
      });

  return (
    <section id="nouveautes" className="bg-[var(--mk-ivory-light)]">
      {/* Feature banner (image-free for speed) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 mk-section-bg" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-[720px]">
            <p
              className="text-[var(--mk-gold)] text-[10px] tracking-[0.28em] uppercase mb-5"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Vient d&apos;arriver
            </p>
            <h2
              className="text-[var(--mk-charcoal)] font-[300] leading-[1.02] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(44px, 7vw, 82px)",
              }}
            >
              Nouveautés
              <br />
              <span className="italic">de Saison</span>
            </h2>
            <p
              className="text-[var(--mk-gray)] max-w-[520px] leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Les dernières créations, sélectionnées et synchronisées depuis Shopify.
            </p>
            <Link
              href="#nouveautes-grid"
              className="inline-block text-[var(--mk-charcoal)] text-[11px] tracking-[0.2em] uppercase border-b border-[var(--mk-gold)] pb-0.5 hover:text-[var(--mk-gold)] transition-colors duration-300"
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
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="max-w-[720px] mx-auto">
              <Empty className="border-[#E4E0D8]">
                <EmptyHeader>
                  <EmptyTitle>Aucun produit</EmptyTitle>
                  <EmptyDescription>Nous n'avons aucun produit à afficher pour le moment.</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <p
                    className="text-[11px] tracking-[0.14em] uppercase text-[#8A8880]"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Aucune donnée produit disponible
                  </p>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
