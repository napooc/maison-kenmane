import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default async function CollectionsPage() {
  const products = await getProducts({ first: 250, revalidateSeconds: 60 }).catch((err) => {
    console.error("[Shopify] /collections getProducts failed", err);
    return [];
  });

  return (
    <main className="min-h-screen bg-[#F7F4EF]">
      <Header />

      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p
              className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-4"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Explorer
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
              Collections
            </h1>
            <p
              className="text-[#8A8880] mt-6 max-w-[520px] mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Toutes nos pièces, synchronisées depuis Shopify.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center text-[#8A8880]"
              style={{ fontFamily: "var(--font-jost)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Aucun produit à afficher.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
