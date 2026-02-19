import { NextResponse } from "next/server";
import { auth, issueDesktopKey } from "@/lib/auth";

/**
 * In-memory rate limiter: userId → { count, resetAt }.
 * Limits desktop key issuance to 5 per hour per user.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * POST /api/gateway/desktop-key — Issue a virtual key for the desktop app.
 * Protected by session auth + rate limiting.
 */
export async function POST() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limiting
  if (!checkRateLimit(session.gwUserId)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 },
    );
  }

  const key = await issueDesktopKey(session.gwUserId);

  return NextResponse.json({ key });
}
