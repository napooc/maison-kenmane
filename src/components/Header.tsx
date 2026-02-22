"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Meilleures Ventes", href: "/#meilleures-ventes" },
  { label: "Nouveautés", href: "/#nouveautes" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#1A1A18] text-[#F7F4EF] text-center py-2.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 mx-8 text-[11px] tracking-[0.18em] uppercase font-[var(--font-jost)]">
              <span>Livraison offerte dès 1 500 MAD</span>
              <span className="text-[#B8955A]">✦</span>
              <span>Paiement à la livraison disponible</span>
              <span className="text-[#B8955A]">✦</span>
              <span>Retours gratuits sous 14 jours</span>
              <span className="text-[#B8955A]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FDFCFA]/95 backdrop-blur-md shadow-[0_1px_0_#E4E0D8]"
            : "bg-[#F7F4EF]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#1A1A18] p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ideogram-v3.0_i_want..._imresizer-1771774770605.jpg?width=8000&height=8000&resize=contain"
              alt="Maison Kenmane"
              width={120}
              height={60}
              className="object-contain h-[52px] w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.16em] uppercase text-[#1A1A18] hover:text-[#B8955A] transition-colors duration-300 font-[var(--font-jost)] font-[400]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              className="text-[#1A1A18] hover:text-[#B8955A] transition-colors hidden md:block"
              aria-label="Rechercher"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className="relative text-[#1A1A18] hover:text-[#B8955A] transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag size={21} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B8955A] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom border */}
        <div className="h-px bg-[#E4E0D8]" />
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="absolute inset-0 bg-black/40 cart-overlay"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative z-10 bg-[#F7F4EF] w-[280px] h-full flex flex-col p-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end mb-8 text-[#1A1A18]"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ideogram-v3.0_i_want..._imresizer-1771774770605.jpg?width=8000&height=8000&resize=contain"
              alt="Maison Kenmane"
              width={100}
              height={50}
              className="object-contain mb-10 h-[44px] w-auto"
            />
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[12px] tracking-[0.18em] uppercase text-[#1A1A18] hover:text-[#B8955A] transition-colors font-[var(--font-jost)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-[#E4E0D8]">
              <p className="text-[11px] tracking-[0.12em] text-[#8A8880] uppercase">
                Paiement à la livraison
              </p>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
