import "next-auth";

declare module "next-auth" {
  interface Session {
    gwUserId: string;
    provider: string;
    providerAccountId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    gwUserId?: string;
    provider?: string;
    providerAccountId?: string;
  }
}
