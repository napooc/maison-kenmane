"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";
import { z } from "zod";
import { toast } from "sonner";

const phoneSchema = z
  .string()
  .trim()
  .min(6)
  .refine(
    (val) => {
      const normalized = val.replace(/[\s-]/g, "");
      return /^(\+212|0)[5-7]\d{8}$/.test(normalized);
    },
    "Numéro marocain invalide (ex: 06XXXXXXXX ou +2126XXXXXXXX)"
  );

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Nom requis"),
  phone: phoneSchema,
  city: z.string().trim().min(1, "Ville requise"),
  address1: z.string().trim().min(3, "Adresse requise"),
  address2: z.string().trim().optional(),
  note: z.string().trim().optional(),
});

function getCities(): string[] {
  const env = process.env.NEXT_PUBLIC_COD_CITIES;
  const list = env
    ? env
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        "Casablanca",
        "Rabat",
        "Marrakech",
        "Tanger",
        "Fès",
        "Agadir",
        "Meknès",
        "Oujda",
      ];
  return list.length ? list : ["Casablanca"];
}

function getWhatsappNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000").replace(/\D/g, "");
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ name: string } | null>(null);

  const cities = useMemo(() => getCities(), []);

  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    city: cities[0] || "",
    address1: "",
    address2: "",
    note: "",
  });

  const cartLines = useMemo(
    () =>
      items.map((i) => ({
        merchandiseId: i.merchandiseId,
        quantity: i.quantity,
        title: i.title,
        variantTitle: i.variant,
      })),
    [items]
  );

  const whatsappText = useMemo(() => {
    const lines = items.map(
      (i) => `- ${i.title}${i.variant ? ` (${i.variant})` : ""} x${i.quantity} = ${formatPrice(i.price * i.quantity, i.currency)}`
    );
    return [
      "Bonjour, je souhaite commander (paiement à la livraison) :",
      ...lines,
      "",
      `Total: ${formatPrice(total, items[0]?.currency || "MAD")}`,
      "",
      `Nom: ${values.fullName}`,
      `Téléphone: ${values.phone}`,
      `Ville: ${values.city}`,
      `Adresse: ${values.address1}${values.address2 ? `, ${values.address2}` : ""}`,
      values.note ? `Note: ${values.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [items, total, values]);

  const submit = async () => {
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Formulaire invalide");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, items: cartLines }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Impossible de créer la commande");
      }

      setSuccess({ name: json.order?.name || "" });
      clearCart();
      toast.success("Commande envoyée à Shopify");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur inconnue";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F4EF]">
      <Header />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        <div className="mb-10">
          <p
            className="text-[#B8955A] text-[10px] tracking-[0.28em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Paiement à la livraison
          </p>
          <h1
            className="text-[#1A1A18] leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(34px, 4vw, 54px)",
              fontWeight: 300,
            }}
          >
            Finaliser la commande
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 bg-[#FDFCFA] border border-[#E4E0D8] p-7">
            {success ? (
              <div>
                <p
                  className="text-[11px] tracking-[0.16em] uppercase text-[#B8955A] mb-4"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  Confirmation
                </p>
                <h2
                  className="text-[#1A1A18] mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "28px",
                    fontWeight: 300,
                  }}
                >
                  Merci — votre commande est enregistrée
                </h2>
                {success.name ? (
                  <p
                    className="text-[#8A8880] text-[13px] leading-relaxed"
                    style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
                  >
                    Référence Shopify : {success.name}
                  </p>
                ) : null}
                <p
                  className="text-[#8A8880] text-[13px] leading-relaxed mt-4"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  Nous vous contacterons pour confirmer la livraison.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Nom complet">
                    <input
                      value={values.fullName}
                      onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                      className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[12px] outline-none focus:border-[#B8955A]"
                      style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.04em" }}
                      placeholder="Ex: Sara El Amrani"
                    />
                  </Field>
                  <Field label="Téléphone">
                    <input
                      value={values.phone}
                      onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                      className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[12px] outline-none focus:border-[#B8955A]"
                      style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.04em" }}
                      placeholder="06XXXXXXXX"
                      inputMode="tel"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Ville">
                    <select
                      value={values.city}
                      onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))}
                      className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[12px] outline-none focus:border-[#B8955A]"
                      style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.04em" }}
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Adresse (ligne 2) — optionnel">
                    <input
                      value={values.address2}
                      onChange={(e) => setValues((v) => ({ ...v, address2: e.target.value }))}
                      className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[12px] outline-none focus:border-[#B8955A]"
                      style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.04em" }}
                      placeholder="Appartement, étage..."
                    />
                  </Field>
                </div>

                <Field label="Adresse complète">
                  <input
                    value={values.address1}
                    onChange={(e) => setValues((v) => ({ ...v, address1: e.target.value }))}
                    className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[12px] outline-none focus:border-[#B8955A]"
                    style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.04em" }}
                    placeholder="Quartier, rue, numéro..."
                  />
                </Field>

                <Field label="Note de commande — optionnel">
                  <textarea
                    value={values.note}
                    onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
                    className="w-full bg-transparent border border-[#E4E0D8] px-4 py-3 text-[12px] outline-none focus:border-[#B8955A] min-h-[110px]"
                    style={{ fontFamily: "var(--font-jost)", letterSpacing: "0.04em" }}
                    placeholder="Couleur souhaitée, heure de livraison..."
                  />
                </Field>

                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full bg-[#1A1A18] text-[#F7F4EF] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8955A] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
                >
                  {loading ? "Envoi..." : "Confirmer ma commande"}
                </button>

                <a
                  href={`https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center border border-[#1A1A18] text-[#1A1A18] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1A1A18] hover:text-[#F7F4EF] transition-all duration-300"
                  style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
                >
                  Commander via WhatsApp
                </a>

                <p
                  className="text-[10px] tracking-[0.1em] text-[#8A8880] uppercase"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  En confirmant, vous choisissez le paiement à la livraison.
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2 bg-[#FDFCFA] border border-[#E4E0D8] p-7 h-fit">
            <p
              className="text-[11px] tracking-[0.16em] uppercase text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 500 }}
            >
              Récapitulatif
            </p>

            {items.length === 0 ? (
              <p
                className="text-[#8A8880] text-[13px]"
                style={{ fontFamily: "var(--font-jost)", fontWeight: 300, letterSpacing: "0.04em" }}
              >
                Votre panier est vide.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                <ul className="flex flex-col gap-4">
                  {items.map((i) => (
                    <li key={i.id} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p
                          className="text-[#1A1A18] text-[13px]"
                          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "15px" }}
                        >
                          {i.title}
                        </p>
                        <p
                          className="text-[#8A8880] text-[11px] mt-0.5 tracking-[0.06em]"
                          style={{ fontFamily: "var(--font-jost)" }}
                        >
                          {i.variant ? `${i.variant} • ` : ""}Qté: {i.quantity}
                        </p>
                      </div>
                      <p
                        className="text-[#1A1A18] text-[13px] whitespace-nowrap"
                        style={{ fontFamily: "var(--font-jost)", fontWeight: 400 }}
                      >
                        {formatPrice(i.price * i.quantity, i.currency)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="h-px bg-[#E4E0D8]" />

                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase text-[#8A8880]"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-[18px] text-[#1A1A18]"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                  >
                    {formatPrice(total, items[0]?.currency || "MAD")}
                  </span>
                </div>

                <p
                  className="text-[10px] tracking-[0.1em] text-[#B8955A] uppercase"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  Livraison calculée à la confirmation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[11px] tracking-[0.16em] uppercase text-[#1A1A18]"
        style={{ fontFamily: "var(--font-jost)", fontWeight: 400 }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
