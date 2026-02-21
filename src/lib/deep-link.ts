type BuildNaiaAuthDeepLinkInput = {
  key: string;
  state?: string | null;
  channel?: string | null;
  discordUserId?: string | null;
  discordTarget?: string | null;
};

function normalizeDiscordSnowflake(value?: string | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!/^[0-9]{6,32}$/.test(trimmed)) return undefined;
  return trimmed;
}

function normalizeDiscordTarget(value?: string | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^(user|channel):[0-9]{6,32}$/.test(trimmed)) return trimmed;
  return undefined;
}

export function buildNaiaAuthDeepLink(input: BuildNaiaAuthDeepLinkInput): string {
  const params = new URLSearchParams();
  params.set("key", input.key);

  if (input.state?.trim()) {
    params.set("state", input.state.trim());
  }

  const isDiscordChannel = input.channel?.trim() === "discord";
  const discordUserId = normalizeDiscordSnowflake(input.discordUserId);
  const explicitTarget = normalizeDiscordTarget(input.discordTarget);
  const discordTarget = explicitTarget ?? (discordUserId ? `user:${discordUserId}` : undefined);

  if (isDiscordChannel || discordUserId || discordTarget) {
    params.set("channel", "discord");
    if (discordUserId) {
      params.set("discord_user_id", discordUserId);
      // Backward compatibility with current shell deep-link parser fallback.
      params.set("user_id", discordUserId);
    }
    if (discordTarget) {
      params.set("discord_target", discordTarget);
    }
  }

  return `naia://auth?${params.toString()}`;
}

