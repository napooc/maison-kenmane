import { NextResponse } from "next/server";
import { z } from "zod";
import { createCodDraftOrder } from "@/lib/shopifyAdmin";

const payloadSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(6),
  city: z.string().min(1),
  address1: z.string().min(3),
  address2: z.string().optional(),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        merchandiseId: z.string().min(1),
        quantity: z.number().int().min(1),
        title: z.string().min(1),
        variantTitle: z.string().optional(),
      })
    )
    .min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = payloadSchema.parse(body);

    const order = await createCodDraftOrder(payload);

    return NextResponse.json({ ok: true, order });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const isPermission =
      typeof message === "string" &&
      (message.includes("Required access") || message.includes("permission error"));

    return NextResponse.json(
      {
        ok: false,
        error: isPermission
          ? `${message} (In Shopify Admin: Apps → Develop apps → your app → Configuration → Admin API integration → enable \"write_draft_orders\" and reinstall/regenerate token.)`
          : message,
      },
      { status: isPermission ? 403 : 500 }
    );
  }
}
