import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Naia OS",
    template: "%s | Naia OS",
  },
  description:
    "Naia OS — Your Personal AI Desktop OS. Chat with 3D avatar AI, voice conversations, and multi-LLM support.",
  keywords: [
    "naia",
    "AI Desktop",
    "AI Avatar",
    "3D Avatar",
    "Voice AI",
    "LLM",
    "Gemini",
    "personal AI",
    "desktop OS",
  ],
  metadataBase: new URL("https://naia.nextain.io"),
  openGraph: {
    title: "Naia OS",
    description: "Your Personal AI Desktop OS. Experience a complete AI ecosystem with a 3D avatar.",
    url: "https://naia.nextain.io",
    siteName: "Naia OS",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naia OS",
    description: "Your Personal AI Desktop OS. Experience a complete AI ecosystem with a 3D avatar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R3HHTFQNGS"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R3HHTFQNGS');
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID ? (
            <Script
              src="https://app.lemonsqueezy.com/js/lemon.js"
              strategy="afterInteractive"
            />
          ) : null}
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
