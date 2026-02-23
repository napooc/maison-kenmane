import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

function normalizeShop(shop: string) {
  const s = shop.trim().toLowerCase();
  if (!s) return null;
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(s)) return null;
  return s;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const shopParam = url.searchParams.get("shop") || "";
  const shop = normalizeShop(shopParam);

  const clientId = process.env.SHOPIFY_APP_CLIENT_ID || "";
  const scopes =
    process.env.SHOPIFY_APP_SCOPES ||
    "read_products,unauthenticated_read_product_listings,write_draft_orders,write_customers";

  if (!shop) {
    return NextResponse.json(
      { ok: false, error: "Missing/invalid `shop` (expected: your-store.myshopify.com)" },
      { status: 400 }
    );
  }

  if (!clientId) {
    return NextResponse.json(
      { ok: false, error: "Missing SHOPIFY_APP_CLIENT_ID" },
      { status: 400 }
    );
  }

  const origin = url.origin;
  const redirectUri =
    process.env.SHOPIFY_APP_REDIRECT_URI || `${origin}/api/auth/shopify/callback`;

  const state = crypto.randomBytes(16).toString("hex");

  const jar = await cookies();
  jar.set("shopify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.startsWith("https://"),
    path: "/",
    maxAge: 60 * 10,
  });

  const authorizeUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("scope", scopes);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);

  return NextResponse.redirect(authorizeUrl.toString());
}
