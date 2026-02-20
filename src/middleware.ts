import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const PROTECTED_SEGMENTS = [
  "dashboard",
  "usage",
  "logs",
  "keys",
  "settings",
  "billing",
  "callback",
];

function detectLocale(request: NextRequest): Locale {
  // 1. Cookie preference
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2. Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const locale of SUPPORTED_LOCALES) {
    if (acceptLang.includes(locale)) return locale;
  }

  return DEFAULT_LOCALE;
}

export default auth((request) => {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Extract locale from URL
  const segments = pathname.split("/").filter(Boolean);
  const urlLocale = segments[0];

  // Root "/" → redirect to /[detectedLocale]
  if (pathname === "/") {
    const locale = detectLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // No locale prefix → add one
  if (!isLocale(urlLocale)) {
    const locale = detectLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // Check protected routes
  const pathAfterLocale = segments.slice(1);
  const isProtected = pathAfterLocale.length > 0 && PROTECTED_SEGMENTS.includes(pathAfterLocale[0]);

  if (isProtected && !request.auth) {
    return NextResponse.redirect(
      new URL(`/${urlLocale}/login`, request.url)
    );
  }

  // Already logged in trying to access login
  if (pathAfterLocale[0] === "login" && request.auth) {
    const redirect = request.nextUrl.searchParams.get("redirect");
    const target = redirect === "desktop"
      ? `/${urlLocale}/callback?source=desktop`
      : `/${urlLocale}/dashboard`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
