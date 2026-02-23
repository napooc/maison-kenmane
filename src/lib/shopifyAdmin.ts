import { readShopifyTokens } from "@/lib/shopifyTokenStore";

function normalizeShopifyDomain(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      return new URL(s).hostname;
    } catch {
      return "";
    }
  }
  return s.split("/")[0] || "";
}

type ShopifyAdminError = { message: string; extensions?: unknown };

type ShopifyAdminResponse<T> = {
  data?: T;
  errors?: ShopifyAdminError[];
};

async function getAdminConfig() {
  const saved = await readShopifyTokens();

  const rawDomain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ||
    saved?.shop ||
    "";

  const domain = normalizeShopifyDomain(rawDomain);

  const token = (process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || saved?.adminAccessToken || "").trim();
  const version = process.env.SHOPIFY_ADMIN_API_VERSION || "2024-01";

  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  if (!token) throw new Error("Missing SHOPIFY_ADMIN_ACCESS_TOKEN");

  return { domain, token, version };
}

export async function shopifyAdminFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { domain, token, version } = await getAdminConfig();

  const res = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json().catch(() => null)) as ShopifyAdminResponse<T> | null;

  if (!res.ok) {
    const extra = json?.errors?.length ? ` — ${JSON.stringify(json.errors)}` : "";
    throw new Error(`Shopify Admin API error: ${res.status}${extra}`);
  }

  if (json?.errors?.length) {
    const requiredAccess = json.errors
      .map((e) => (e.extensions as any)?.requiredAccess as string | undefined)
      .filter(Boolean);

    if (requiredAccess.length) {
      throw new Error(
        `Shopify permission error. Required access: ${requiredAccess.join(", ")}. ` +
          `Update your Admin API access scopes and regenerate the Admin access token.`
      );
    }

    throw new Error(`Shopify Admin GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  if (!json?.data) throw new Error("Shopify Admin API: Missing data");
  return json.data;
}

const CUSTOMER_CREATE = `
  mutation CustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }
`;

const DRAFT_ORDER_CREATE = `
  mutation DraftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        name
        status
        invoiceUrl
      }
      userErrors { field message }
    }
  }
`;

const DRAFT_ORDER_COMPLETE = `
  mutation DraftOrderComplete($id: ID!, $paymentPending: Boolean) {
    draftOrderComplete(id: $id, paymentPending: $paymentPending) {
      draftOrder {
        id
        name
        status
        invoiceUrl
      }
      userErrors { field message }
    }
  }
`;

export type CodOrderInput = {
  fullName: string;
  phone: string;
  city: string;
  address1: string;
  address2?: string;
  note?: string;
  items: Array<{
    merchandiseId: string; // ProductVariant GID
    quantity: number;
    title: string;
    variantTitle?: string;
  }>;
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: fullName.trim(), lastName: "" };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}

export async function createCodDraftOrder(input: CodOrderInput): Promise<{
  id: string;
  name: string;
  invoiceUrl: string | null;
  orderId?: string;
}> {
  const { firstName, lastName } = splitName(input.fullName);

  let customerId: string | null = null;
  try {
    const customerResult = await shopifyAdminFetch<{
      customerCreate: {
        customer: { id: string } | null;
        userErrors: { field: string[] | null; message: string }[];
      };
    }>(CUSTOMER_CREATE, {
      input: {
        firstName,
        lastName,
        phone: input.phone,
        addresses: [
          {
            address1: input.address1,
            address2: input.address2 || undefined,
            city: input.city,
            country: "Morocco",
          },
        ],
      },
    });

    customerId = customerResult.customerCreate.customer?.id || null;
  } catch {
    // Best-effort: customer creation can fail if the token lacks `write_customers`.
    // We still proceed with draft order creation.
  }

  const lineItems = input.items.map((i) => ({
    variantId: i.merchandiseId,
    quantity: i.quantity,
  }));

  const draftOrderResult = await shopifyAdminFetch<{
    draftOrderCreate: {
      draftOrder: { id: string; name: string; invoiceUrl: string | null } | null;
      userErrors: { field: string[] | null; message: string }[];
    };
  }>(DRAFT_ORDER_CREATE, {
    input: {
      customerId: customerId || undefined,
      tags: ["COD"],
      note: [
        "Paiement: Cash on Delivery (COD)",
        input.note ? `Note client: ${input.note}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      shippingAddress: {
        firstName,
        lastName,
        phone: input.phone,
        address1: input.address1,
        address2: input.address2 || undefined,
        city: input.city,
        country: "Morocco",
      },
      lineItems,
    },
  });

  const orderErrors = draftOrderResult.draftOrderCreate.userErrors;
  if (orderErrors?.length) {
    throw new Error(`Draft order creation failed: ${JSON.stringify(orderErrors)}`);
  }

  const draft = draftOrderResult.draftOrderCreate.draftOrder;
  if (!draft) throw new Error("Draft order creation failed: no draftOrder returned");

  // Convert draft order into a real order so it appears under Orders in Shopify.
  const completed = await shopifyAdminFetch<{
    draftOrderComplete: {
      draftOrder: { id: string; name: string; invoiceUrl: string | null } | null;
      userErrors: { field: string[] | null; message: string }[];
    };
  }>(DRAFT_ORDER_COMPLETE, { id: draft.id, paymentPending: true });

  const completeErrors = completed.draftOrderComplete.userErrors;
  if (completeErrors?.length) {
    throw new Error(`Draft order completion failed: ${JSON.stringify(completeErrors)}`);
  }

  const completedDraft = completed.draftOrderComplete.draftOrder;
  if (completedDraft) {
    return {
      id: completedDraft.id,
      name: completedDraft.name,
      invoiceUrl: completedDraft.invoiceUrl ?? draft.invoiceUrl,
    };
  }

  // Fall back to the original draft details.
  return { id: draft.id, name: draft.name, invoiceUrl: draft.invoiceUrl };
}
