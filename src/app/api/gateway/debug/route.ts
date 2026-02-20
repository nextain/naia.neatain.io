import { NextResponse } from "next/server";
import { socialLogin } from "@/lib/gateway-client";

/**
 * GET /api/gateway/debug — Test gateway connectivity from Vercel.
 * Temporary debug endpoint. Remove after fixing.
 */
export async function GET() {
  const gwUrl = process.env.GATEWAY_URL ?? "(not set)";
  const hasMasterKey = !!process.env.GATEWAY_MASTER_KEY;

  try {
    const response = await socialLogin(
      "debug",
      "debug-test@example.com",
      "Debug Test",
    );
    return NextResponse.json({
      status: "ok",
      gwUrl,
      hasMasterKey,
      tokens: !!response.tokens,
      sub: response.tokens?.access_token?.split(".")[1] ? "present" : "missing",
    });
  } catch (err) {
    return NextResponse.json({
      status: "error",
      gwUrl,
      hasMasterKey,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
