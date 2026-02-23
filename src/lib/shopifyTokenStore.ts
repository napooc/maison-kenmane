import { promises as fs } from "fs";
import path from "path";

export type ShopifySavedTokens = {
  shop: string;
  adminAccessToken?: string;
  storefrontAccessToken?: string;
  createdAt: string;
};

const TOKENS_FILE = ".shopify-tokens.json";

function getTokensPath() {
  return path.join(process.cwd(), TOKENS_FILE);
}

export async function readShopifyTokens(): Promise<ShopifySavedTokens | null> {
  try {
    const raw = await fs.readFile(getTokensPath(), "utf8");
    const parsed = JSON.parse(raw) as ShopifySavedTokens;
    if (!parsed?.shop || typeof parsed.shop !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeShopifyTokens(tokens: ShopifySavedTokens): Promise<void> {
  const safe: ShopifySavedTokens = {
    shop: tokens.shop,
    adminAccessToken: tokens.adminAccessToken,
    storefrontAccessToken: tokens.storefrontAccessToken,
    createdAt: tokens.createdAt || new Date().toISOString(),
  };

  await fs.writeFile(getTokensPath(), JSON.stringify(safe, null, 2), "utf8");
}
