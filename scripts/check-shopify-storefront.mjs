import fs from "node:fs";
import path from "node:path";

function loadDotEnvLocal() {
  const filePath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(filePath)) return;

  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnvLocal();

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-01";

if (!domain || !token) {
  console.error("Missing env vars: SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  process.exit(2);
}

const query = `query ($first: Int!) {
  products(first: $first) {
    edges {
      node { handle title }
    }
  }
}`;

const url = `https://${domain}/api/${version}/graphql.json`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  },
  body: JSON.stringify({ query, variables: { first: 5 } }),
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = null;
}

console.log("status", res.status);
if (!json) {
  console.log(text.slice(0, 500));
  process.exit(0);
}

console.log("errors", json.errors ?? null);
const edges = json?.data?.products?.edges ?? [];
console.log("count", edges.length);
console.log(
  "handles",
  edges.map((e) => e.node.handle)
);
