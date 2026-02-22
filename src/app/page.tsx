import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesBar from "@/components/FeaturesBar";
import BestSellers from "@/components/BestSellers";
import Editorial from "@/components/Editorial";
import Nouveautes from "@/components/Nouveautes";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturesBar />
      <BestSellers />
      <Editorial />
      <Nouveautes />
      <Footer />
    </main>
  );
}
