import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { CartProvider } from "@/components/CartProvider";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Kenmane — Élégance Marocaine",
  description: "Découvrez la collection exclusive Maison Kenmane. Mode et accessoires d'exception.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${jost.variable} antialiased`}>
        <CartProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1A1A18",
                color: "#F7F4EF",
                border: "1px solid #B8955A",
                borderRadius: "0px",
                fontFamily: "var(--font-jost)",
                fontSize: "13px",
                letterSpacing: "0.04em",
              },
            }}
          />
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
