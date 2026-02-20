/**
 * Tests for LemonSqueezy webhook handler.
 *
 * Requires vitest setup. Run: npx vitest run src/__tests__/webhook-lemonsqueezy.test.ts
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock gateway-client before importing route
vi.mock("@/lib/gateway-client", () => ({
  upgradeSubscription: vi.fn().mockResolvedValue({ success: true }),
  cancelSubscription: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock lemonsqueezy signature verification
vi.mock("@/lib/lemonsqueezy", () => ({
  verifyLemonSignature: vi.fn().mockReturnValue(true),
}));

import { POST } from "@/app/api/webhooks/lemonsqueezy/route";
import { upgradeSubscription, cancelSubscription } from "@/lib/gateway-client";
import { verifyLemonSignature } from "@/lib/lemonsqueezy";

function makeRequest(body: object, signature = "valid-sig"): Request {
  return new Request("http://localhost/api/webhooks/lemonsqueezy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-signature": signature,
    },
    body: JSON.stringify(body),
  });
}

describe("LemonSqueezy webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.LEMONSQUEEZY_WEBHOOK_SECRET = "test-secret";
  });

  it("returns 401 when signature is invalid", async () => {
    vi.mocked(verifyLemonSignature).mockReturnValueOnce(false);

    const res = await POST(makeRequest({ meta: { event_name: "subscription_created" } }));
    expect(res.status).toBe(401);
  });

  it("calls upgradeSubscription on subscription_created", async () => {
    const body = {
      meta: {
        event_name: "subscription_created",
        custom_data: { user_id: "user-123" },
      },
      data: { id: "sub-1", attributes: { variant_id: "variant-1" } },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.event).toBe("subscription_created");
    expect(upgradeSubscription).toHaveBeenCalledWith("user-123", expect.any(String));
  });

  it("calls cancelSubscription on subscription_cancelled", async () => {
    const body = {
      meta: {
        event_name: "subscription_cancelled",
        custom_data: { user_id: "user-456" },
      },
      data: { id: "sub-2" },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.event).toBe("subscription_cancelled");
    expect(cancelSubscription).toHaveBeenCalledWith("user-456");
  });

  it("ignores unhandled events", async () => {
    const body = {
      meta: { event_name: "order_created" },
      data: { id: "order-1" },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ignored).toBe("order_created");
  });

  it("returns 400 when user_id is missing", async () => {
    const body = {
      meta: { event_name: "subscription_created", custom_data: {} },
      data: { id: "sub-3" },
    };

    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });
});
