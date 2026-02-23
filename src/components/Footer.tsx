import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A18] text-[#F7F4EF]">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3
              className="text-[#F7F4EF] mb-2"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 300 }}
            >
              Rejoignez la Maison
            </h3>
            <p
              className="text-[#8A8880] text-[13px]"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
            >
              Soyez les premiers informés de nos nouvelles collections.
            </p>
          </div>
          <form className="flex w-full lg:w-auto" action="#">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="bg-white/5 border border-white/10 text-[#F7F4EF] placeholder-[#8A8880] px-5 py-3.5 text-[12px] tracking-[0.06em] outline-none focus:border-[#B8955A] transition-colors w-full lg:w-[280px]"
              style={{ fontFamily: "var(--font-jost)" }}
            />
            <button
              type="submit"
              className="bg-[#B8955A] text-[#F7F4EF] px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase hover:bg-[#D4AE72] transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              S&apos;abonner
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ideogram-v3.0_i_want..._imresizer-1771774770605.jpg?width=8000&height=8000&resize=contain"
              alt="Maison Kenmane"
              width={100}
              height={50}
              className="object-contain h-[44px] w-auto invert mb-6"
            />
            <p
              className="text-[#8A8880] text-[12px] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
            >
              L&apos;élégance marocaine, réinventée pour la femme contemporaine.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8880] hover:text-[#B8955A] transition-colors"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8880] hover:text-[#B8955A] transition-colors"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-[#F7F4EF] text-[11px] tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "Produits", href: "/produits" },
                { label: "À propos", href: "/a-propos" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#8A8880] text-[12px] tracking-[0.04em] hover:text-[#B8955A] transition-colors"
                    style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4
              className="text-[#F7F4EF] text-[11px] tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
            >
              Service
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                "Paiement à la livraison",
                "Livraison & Retours",
                "Service client",
              ].map((item) => (
                <li key={item}>
                  <p
                    className="text-[#8A8880] text-[12px] tracking-[0.04em]"
                    style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
                  >
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[#F7F4EF] text-[11px] tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li
                className="text-[#8A8880] text-[12px] leading-relaxed"
                style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
              >
                Casablanca, Maroc
              </li>
              <li>
                <a
                  href="mailto:contact@maisonkenmane.ma"
                  className="text-[#8A8880] text-[12px] hover:text-[#B8955A] transition-colors"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
                >
                  contact@maisonkenmane.ma
                </a>
              </li>
              <li>
                <a
                  href="tel:+212600000000"
                  className="text-[#8A8880] text-[12px] hover:text-[#B8955A] transition-colors"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
                >
                  +212 6 00 00 00 00
                </a>
              </li>
              <li
                className="text-[#8A8880] text-[11px] mt-2 leading-relaxed"
                style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
              >
                Lun–Sam : 9h–19h
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[#8A8880] text-[11px] tracking-[0.06em]"
            style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
          >
            © {new Date().getFullYear()} Maison Kenmane. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {["Mentions légales", "Confidentialité", "CGV"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[#8A8880] text-[11px] tracking-[0.04em] hover:text-[#B8955A] transition-colors"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
