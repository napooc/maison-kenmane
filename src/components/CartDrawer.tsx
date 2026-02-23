"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 cart-overlay"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative z-10 bg-[#FDFCFA] w-full max-w-[420px] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#E4E0D8]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-[#B8955A]" />
            <h2
              className="text-[13px] tracking-[0.18em] uppercase"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Votre Panier
              {count > 0 && (
                <span className="ml-2 text-[#8A8880]">({count})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="text-[#1A1A18] hover:text-[#B8955A] transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={40} strokeWidth={1} className="text-[#D6D3CC]" />
              <p
                className="text-[13px] tracking-[0.1em] text-[#8A8880] uppercase"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Votre panier est vide
              </p>
              <button
                onClick={closeCart}
                className="text-[11px] tracking-[0.16em] uppercase text-[#B8955A] hover:text-[#1A1A18] transition-colors border-b border-[#B8955A]"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative w-[80px] h-[100px] bg-[#F0EDE8] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className="text-[13px] leading-snug text-[#1A1A18]"
                          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "15px" }}
                        >
                          {item.title}
                        </p>
                        {item.variant && (
                          <p
                            className="text-[11px] text-[#8A8880] mt-0.5 tracking-[0.08em]"
                            style={{ fontFamily: "var(--font-jost)" }}
                          >
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#D6D3CC] hover:text-[#1A1A18] transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E4E0D8]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#1A1A18] hover:bg-[#F0EDE8] transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span
                          className="w-8 text-center text-[12px] text-[#1A1A18]"
                          style={{ fontFamily: "var(--font-jost)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#1A1A18] hover:bg-[#F0EDE8] transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p
                        className="text-[13px] text-[#1A1A18] font-[500]"
                        style={{ fontFamily: "var(--font-jost)" }}
                      >
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E4E0D8] px-7 py-6">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[11px] tracking-[0.14em] uppercase text-[#8A8880]"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Sous-total
              </span>
              <span
                className="text-[15px] text-[#1A1A18]"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {formatPrice(total, items[0]?.currency || "MAD")}
              </span>
            </div>
            <p
              className="text-[10px] tracking-[0.1em] text-[#B8955A] mb-5 uppercase"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Livraison calculée à la commande
            </p>
            <button className="w-full bg-[#1A1A18] text-[#F7F4EF] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8955A] transition-colors duration-300 font-[500]"
              style={{ fontFamily: "var(--font-jost)" }}
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
            >
              Commander — Paiement à la livraison
            </button>
            <button
              onClick={closeCart}
              className="w-full mt-3 text-center text-[10px] tracking-[0.16em] uppercase text-[#8A8880] hover:text-[#1A1A18] transition-colors"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
