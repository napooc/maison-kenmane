import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--mk-ivory)]">
      <Header />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="aspect-[3/4] bg-[var(--mk-gold-pale)] animate-pulse" />
          <div className="flex flex-col gap-6 pt-10">
            <div className="h-12 w-3/4 bg-[var(--mk-gold-pale)] animate-pulse" />
            <div className="h-6 w-1/4 bg-[var(--mk-gold-pale)] animate-pulse" />
            <div className="h-px w-full bg-[var(--mk-gold-pale)] my-4" />
            <div className="h-4 w-full bg-[var(--mk-gold-pale)] animate-pulse" />
            <div className="h-4 w-full bg-[var(--mk-gold-pale)] animate-pulse" />
            <div className="h-4 w-2/3 bg-[var(--mk-gold-pale)] animate-pulse" />
            <div className="h-12 w-full bg-[var(--mk-gold-pale)] animate-pulse mt-8" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
