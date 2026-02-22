"use client";

import { Truck, Shield, RefreshCw, Star } from "lucide-react";

const FEATURES = [
  { icon: Truck, label: "Livraison à Domicile", detail: "Partout au Maroc" },
  { icon: Shield, label: "Paiement à la Livraison", detail: "100% sécurisé" },
  { icon: RefreshCw, label: "Retours Gratuits", detail: "Sous 14 jours" },
  { icon: Star, label: "Fait Main", detail: "Artisanat authentique" },
];

export default function FeaturesBar() {
  return (
    <section className="bg-[#1A1A18] py-14 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {FEATURES.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <Icon size={24} strokeWidth={1} className="text-[#B8955A]" />
              <div>
                <p
                  className="text-[#F7F4EF] text-[12px] tracking-[0.14em] uppercase"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 400 }}
                >
                  {label}
                </p>
                <p
                  className="text-[#8A8880] text-[11px] tracking-[0.08em] mt-1"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
                >
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
