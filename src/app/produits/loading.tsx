import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--mk-ivory)]">
      <Header />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="flex items-center justify-between mb-12">
          <div className="h-10 w-48 bg-[var(--mk-gold-pale)] animate-pulse" />
          <div className="h-6 w-24 bg-[var(--mk-gold-pale)] animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-[3/4] bg-[var(--mk-gold-pale)] animate-pulse" />
              <div className="h-4 w-2/3 bg-[var(--mk-gold-pale)] animate-pulse" />
              <div className="h-4 w-1/3 bg-[var(--mk-gold-pale)] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
