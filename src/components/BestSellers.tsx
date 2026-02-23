import { getProducts } from "@/lib/shopify";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default async function BestSellers() {
  const tagged = await getProducts({
    first: 6,
    query: "tag:bestseller OR tag:best-seller",
    revalidateSeconds: 60,
  }).catch((err) => {
    console.error("[Shopify] BestSellers getProducts(tagged) failed", err);
    return [];
  });

  const products = tagged.length
    ? tagged
    : await getProducts({ first: 6, revalidateSeconds: 60 }).catch((err) => {
        console.error("[Shopify] BestSellers getProducts(fallback) failed", err);
        return [];
      });

  return (
    <section id="meilleures-ventes" className="py-24 lg:py-32 bg-[#F7F4EF]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <p
            className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-4"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Notre Sélection
          </p>
          <h2
            className="text-[#1A1A18] gold-line"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            Meilleures Ventes
          </h2>
          <p
            className="text-[#8A8880] mt-8 max-w-[480px] mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Nos pièces les plus appréciées, choisies par nos clientes du monde entier.
          </p>
        </div>

        {/* Product grid */}
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

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/produits"
            className="inline-block border border-[#1A1A18] text-[#1A1A18] text-[11px] tracking-[0.2em] uppercase px-12 py-4 hover:bg-[#1A1A18] hover:text-[#F7F4EF] transition-all duration-300"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Voir tous les Produits
          </Link>
        </div>
      </div>
    </section>
  );
}
