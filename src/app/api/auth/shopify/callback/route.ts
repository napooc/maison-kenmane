import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { writeShopifyTokens } from "@/lib/shopifyTokenStore";

export const runtime = "nodejs";

function normalizeShop(shop: string) {
  const s = shop.trim().toLowerCase();
  if (!s) return null;
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(s)) return null;
  return s;
}

function verifyHmac(url: URL, clientSecret: string) {
  const hmac = url.searchParams.get("hmac") || "";
  if (!hmac) return false;

  const entries = Array.from(url.searchParams.entries())
    .filter(([k]) => k !== "hmac" && k !== "signature")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const digest = crypto
    .createHmac("sha256", clientSecret)
    .update(entries)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(hmac, "hex"));
  } catch {
    return false;
  }
}

async function exchangeCodeForToken(shop: string, clientId: string, clientSecret: string, code: string) {
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const json = (await res.json().catch(() => null)) as { access_token?: string } | null;
  if (!res.ok || !json?.access_token) {
    throw new Error(`OAuth token exchange failed (${res.status})`);
  }
  return json.access_token;
}

async function createStorefrontToken(shop: string, adminToken: string, apiVersion: string) {
  const query = `
    mutation StorefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
      storefrontAccessTokenCreate(input: $input) {
        storefrontAccessToken { accessToken }
        userErrors { field message }
      }
    }
  `;

  const res = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({
      query,
      variables: { input: { title: `Maison Kenmane Local Dev ${new Date().toISOString()}` } },
    }),
  });

  const json = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    throw new Error(`Admin GraphQL error (${res.status})`);
  }

  const token = json?.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken as
    | string
    | undefined;

  const errors = json?.data?.storefrontAccessTokenCreate?.userErrors as
    | Array<{ message: string }>
    | undefined;

  if (!token) {
    const message = errors?.length ? errors.map((e) => e.message).join("; ") : "Unknown error";
    throw new Error(`Storefront token creation failed: ${message}`);
  }

  return token;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const clientId = process.env.SHOPIFY_APP_CLIENT_ID || "";
  const clientSecret = process.env.SHOPIFY_APP_CLIENT_SECRET || "";

  const shopParam = url.searchParams.get("shop") || "";
  const shop = normalizeShop(shopParam);
  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";

  if (!shop || !code || !state) {
    return NextResponse.json({ ok: false, error: "Missing shop/code/state" }, { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { ok: false, error: "Missing SHOPIFY_APP_CLIENT_ID or SHOPIFY_APP_CLIENT_SECRET" },
      { status: 400 }
    );
  }

  const jar = await cookies();
  const expectedState = jar.get("shopify_oauth_state")?.value || "";
  if (!expectedState || expectedState !== state) {
    return NextResponse.json({ ok: false, error: "Invalid OAuth state" }, { status: 400 });
  }

  if (!verifyHmac(url, clientSecret)) {
    return NextResponse.json({ ok: false, error: "Invalid HMAC" }, { status: 400 });
  }

  jar.delete("shopify_oauth_state");

  const adminApiVersion = process.env.SHOPIFY_ADMIN_API_VERSION || "2024-01";

  const adminAccessToken = await exchangeCodeForToken(shop, clientId, clientSecret, code);

  let storefrontAccessToken: string | undefined;
  try {
    storefrontAccessToken = await createStorefrontToken(shop, adminAccessToken, adminApiVersion);
  } catch {
    // Storefront token creation can fail if scopes/config aren't enabled.
    // We still persist the admin token; the user can paste a Storefront token via .env.local.
  }

  await writeShopifyTokens({
    shop,
    adminAccessToken,
    storefrontAccessToken,
    createdAt: new Date().toISOString(),
  });

  const redirectTo = new URL("/", url.origin);
  redirectTo.searchParams.set("shopify", "connected");
  return NextResponse.redirect(redirectTo.toString());
}
