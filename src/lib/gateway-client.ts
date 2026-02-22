/**
 * Server-side client for the any-llm gateway API.
 * All calls use the master key — never expose this to the browser.
 */

const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:8000";
const MASTER_KEY = process.env.GATEWAY_MASTER_KEY ?? "";

// --- Types ---

export interface GatewayUser {
  user_id: string;
  alias: string | null;
  spend: number;
  budget_id: string | null;
  budget_started_at: string | null;
  next_budget_reset_at: string | null;
  blocked: boolean;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
}

export interface GatewayKey {
  id: string;
  key: string;
  key_name: string | null;
  user_id: string | null;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  metadata: Record<string, unknown>;
}

export interface GatewayPricing {
  id?: string;
  model?: string;
  provider?: string;
  input_price_per_million?: number;
  output_price_per_million?: number;
  cached_input_price_per_million?: number | null;
  [key: string]: unknown;
}

export interface UsageLog {
  id: string;
  user_id: string | null;
  api_key_id: string | null;
  timestamp: string;
  model: string;
  provider: string | null;
  endpoint: string;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  total_tokens: number | null;
  cost: number | null;
  status: string;
  error_message: string | null;
}

export interface GatewayBudget {
  budget_id: string;
  max_budget: number | null;
  budget_duration_sec: number | null;
  created_at: string;
  updated_at: string;
}

// --- Helpers ---

async function gw(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${GATEWAY_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-AnyLLM-Key": `Bearer ${MASTER_KEY}`,
      ...options.headers,
    },
  });
  return res;
}

async function gwJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await gw(path, options);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// --- Types (auth) ---

export interface SocialLoginResponse {
  tokens: {
    access_token: string;
    access_token_expires_at: string;
    refresh_token: string;
    refresh_token_expires_at: string;
  };
}

// --- Users ---

/**
 * Social login via gateway — creates user + FREE plan credits on first login.
 * Returns JWT tokens (access + refresh).
 */
export async function socialLogin(
  provider: string,
  email: string,
  name?: string,
  avatarUrl?: string,
  providerAccountId?: string,
): Promise<SocialLoginResponse> {
  return gwJson<SocialLoginResponse>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({
      provider,
      email,
      name,
      avatar_url: avatarUrl,
      provider_account_id: providerAccountId,
      device_type: "web",
    }),
  });
}

// --- Lookup ---

export interface LookupUserResponse {
  user_id: string;
  alias: string | null;
  provider: string;
  provider_account_id: string | null;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
}

/**
 * Lookup a user by provider + provider_account_id or email.
 * Used by Discord bot / Google Chat webhook to find the linked CaretUser.
 */
export async function lookupUser(
  provider: string,
  opts: { providerAccountId?: string; email?: string },
): Promise<LookupUserResponse | null> {
  const params = new URLSearchParams({ provider });
  if (opts.providerAccountId) params.set("provider_account_id", opts.providerAccountId);
  if (opts.email) params.set("email", opts.email);

  const res = await gw(`/v1/auth/lookup?${params.toString()}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
  return res.json() as Promise<LookupUserResponse>;
}

export async function getUser(userId: string): Promise<GatewayUser | null> {
  const res = await gw(`/v1/users/${encodeURIComponent(userId)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
  return res.json() as Promise<GatewayUser>;
}

export async function updateUser(
  userId: string,
  payload: Record<string, unknown>,
): Promise<GatewayUser> {
  return gwJson<GatewayUser>(`/v1/users/${encodeURIComponent(userId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// --- Keys ---

export async function createVirtualKey(
  userId: string,
  keyName?: string,
): Promise<GatewayKey> {
  return gwJson<GatewayKey>("/v1/keys", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      key_name: keyName ?? `lab-${userId}`,
    }),
  });
}

export async function listKeys(userId: string): Promise<GatewayKey[]> {
  const res = await gw(`/v1/keys?user_id=${encodeURIComponent(userId)}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }

  const payload = (await res.json()) as unknown;
  if (Array.isArray(payload)) return payload as GatewayKey[];

  if (payload && typeof payload === "object") {
    const obj = payload as { data?: unknown; items?: unknown };
    if (Array.isArray(obj.data)) return obj.data as GatewayKey[];
    if (Array.isArray(obj.items)) return obj.items as GatewayKey[];
  }

  return [];
}

export async function deleteKey(keyId: string): Promise<void> {
  const res = await gw(`/v1/keys/${encodeURIComponent(keyId)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
}

export async function isKeyOwnedByUser(userId: string, keyId: string): Promise<boolean> {
  const keys = await listKeys(userId);
  return keys.some((key) => key.id === keyId);
}

export async function revokeKey(keyId: string): Promise<void> {
  const res = await gw(`/v1/keys/${encodeURIComponent(keyId)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
}

export async function updateKey(
  keyId: string,
  payload: Record<string, unknown>,
): Promise<GatewayKey> {
  return gwJson<GatewayKey>(`/v1/keys/${encodeURIComponent(keyId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// --- Usage ---

export async function getUserUsage(
  userId: string,
  skip = 0,
  limit = 50,
): Promise<UsageLog[]> {
  return gwJson<UsageLog[]>(
    `/v1/users/${encodeURIComponent(userId)}/usage?skip=${skip}&limit=${limit}`,
  );
}

// --- Balance ---

export interface BalanceData {
  userId: string;
  balance: number; // micro-dollars (credits * 100 * 1000)
}

export interface BalanceResponse {
  success: boolean;
  data: BalanceData;
}

/**
 * Get user's remaining credit balance.
 * Returns balance in micro-dollars. To get credits: balance / 100_000
 */
export async function getBalance(userId: string): Promise<BalanceData> {
  const resp = await gwJson<BalanceResponse>(
    `/v1/profile/balance?user=${encodeURIComponent(userId)}`,
  );
  return resp.data;
}

// --- Budgets ---

export async function getBudget(budgetId: string): Promise<GatewayBudget> {
  return gwJson<GatewayBudget>(
    `/v1/budgets/${encodeURIComponent(budgetId)}`,
  );
}

// --- Billing (subscription management via gateway) ---

interface BillingResponse {
  success: boolean;
  detail: string | null;
}

export async function upgradeSubscription(
  userId: string,
  planName: string,
): Promise<BillingResponse> {
  return gwJson<BillingResponse>("/v1/billing/subscription", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, plan_name: planName }),
  });
}

export async function cancelSubscription(
  userId: string,
): Promise<BillingResponse> {
  return gwJson<BillingResponse>(
    `/v1/billing/subscription/${encodeURIComponent(userId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: "CANCELLED" }),
    },
  );
}

export async function topupCredits(
  userId: string,
  amount: number,
  source = "MANUAL",
): Promise<BillingResponse> {
  return gwJson<BillingResponse>("/v1/billing/topup", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, amount, source }),
  });
}

// --- Pricing ---

export async function getModelPricing(): Promise<GatewayPricing[]> {
  const res = await gw("/v1/pricing");
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }

  const payload = (await res.json()) as unknown;
  if (Array.isArray(payload)) return payload as GatewayPricing[];

  if (payload && typeof payload === "object") {
    const obj = payload as { data?: unknown; items?: unknown };
    if (Array.isArray(obj.data)) return obj.data as GatewayPricing[];
    if (Array.isArray(obj.items)) return obj.items as GatewayPricing[];
  }

  return [];
}
