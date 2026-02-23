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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnvLocal();

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!domain || !token) {
  console.error("Missing env vars: SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_ACCESS_TOKEN");
  process.exit(2);
}

const url = `https://${domain}/admin/oauth/access_scopes.json`;

const res = await fetch(url, {
  headers: {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json",
  },
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

const scopes = (json.access_scopes || []).map((s) => s.handle).filter(Boolean);
console.log("scopes", scopes);

const required = ["write_draft_orders"];
const missing = required.filter((r) => !scopes.includes(r));
console.log("missing", missing);
