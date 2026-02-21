import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { socialLogin, createVirtualKey, listKeys, deleteKey } from "./gateway-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account }) {
      return !!account;
    },
    async jwt({ token, account, user }) {
      if (account && user?.email) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;

        try {
          // Gateway social login — creates user + FREE plan credits on first login
          const response = await socialLogin(
            account.provider,
            user.email,
            user.name ?? undefined,
            user.image ?? undefined,
            account.providerAccountId,
          );
          // Extract gateway UUID from JWT access_token
          const payload = JSON.parse(
            Buffer.from(response.tokens.access_token.split(".")[1], "base64url").toString(),
          );
          token.gwUserId = payload.sub;
        } catch (err) {
          // Gateway might be down — fallback to provider:accountId
          console.error("[auth] socialLogin failed:", err instanceof Error ? err.message : String(err));
          token.gwUserId = `${account.provider}:${account.providerAccountId}`;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.gwUserId = token.gwUserId as string;
      session.provider = token.provider as string;
      session.providerAccountId = token.providerAccountId as string | undefined;
      return session;
    },
  },
});

/**
 * Issue a gateway virtual key for the desktop app.
 * Called from the /callback flow.
 */
export async function issueDesktopKey(gwUserId: string): Promise<string> {
  const keyName = `desktop-${gwUserId}`;
  try {
    const existingKeys = await listKeys(gwUserId);
    const existingDesktopKey = existingKeys.find(k => k.key_name === keyName);
    if (existingDesktopKey) {
      // The gateway list API only returns hashes, not the plaintext key.
      // So if it exists, we must delete it and recreate it to get the plaintext key again.
      await deleteKey(existingDesktopKey.id);
    }
  } catch (err) {
    console.error("[auth] Failed to check/delete existing keys:", err);
  }

  const keyResponse = await createVirtualKey(gwUserId, keyName);
  return keyResponse.key;
}
