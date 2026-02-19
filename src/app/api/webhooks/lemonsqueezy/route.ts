import { NextResponse } from "next/server";
import { verifyLemonSignature } from "@/lib/lemonsqueezy";
import {
  upgradeSubscription,
  cancelSubscription,
} from "@/lib/gateway-client";

const HANDLED_EVENTS = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
]);

/** Map LemonSqueezy variant IDs to gateway plan names. */
function resolvePlanName(variantId: string | undefined): string {
  const mapping: Record<string, string> = {
    [process.env.LEMON_VARIANT_FREE ?? ""]: "FREE",
    [process.env.LEMON_VARIANT_BASIC ?? ""]: "BASIC",
  };
  return mapping[variantId ?? ""] ?? "FREE";
}

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  const signature = request.headers.get("x-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await request.text();
  const valid = verifyLemonSignature({ rawBody, signature, secret });
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    meta?: { event_name?: string; custom_data?: Record<string, string> };
    data?: { id?: string; attributes?: Record<string, unknown> };
  };

  const eventName = payload.meta?.event_name ?? "unknown";
  if (!HANDLED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: true, ignored: eventName });
  }

  const userId = payload.meta?.custom_data?.user_id;
  if (!userId) {
    return NextResponse.json({ error: "Missing user_id in custom_data" }, { status: 400 });
  }

  const variantId = payload.data?.attributes?.variant_id?.toString();

  try {
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated": {
        const planName = resolvePlanName(variantId);
        await upgradeSubscription(userId, planName);
        break;
      }
      case "subscription_cancelled": {
        await cancelSubscription(userId);
        break;
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[webhook] Failed to process ${eventName} for ${userId}: ${message}`);
    return NextResponse.json({ error: "Gateway sync failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, event: eventName });
}
