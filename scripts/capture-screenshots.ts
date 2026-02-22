import { chromium } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const VIEWPORT = { width: 400, height: 768 };
const OUTPUT_DIR = path.resolve(__dirname, "../public/screenshots");

// All public pages for ko and en
const LOCALES = ["ko", "en"] as const;

const MANUAL_SLUGS = [
  "install",
  "getting-started",
  "main-screen",
  "chat",
  "history",
  "progress",
  "skills",
  "channels",
  "agents",
  "diagnostics",
  "settings",
  "tools",
  "naia-account",
  "troubleshooting",
];

const PUBLIC_PAGES = [
  { slug: "", name: "home" },
  { slug: "/download", name: "download" },
  { slug: "/login", name: "login" },
  { slug: "/terms", name: "terms" },
  { slug: "/privacy", name: "privacy" },
  { slug: "/refund", name: "refund" },
  { slug: "/contact", name: "contact" },
];

async function main() {
  const browser = await chromium.launch();

  for (const locale of LOCALES) {
    const outputDir = path.join(OUTPUT_DIR, locale);
    const { mkdirSync } = await import("fs");
    mkdirSync(outputDir, { recursive: true });

    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Public pages
    for (const { slug, name } of PUBLIC_PAGES) {
      const url = `${BASE_URL}/${locale}${slug}`;
      console.log(`[${locale}] Capturing ${name}: ${url}`);
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(500);
        await page.screenshot({
          path: path.join(outputDir, `${name}.png`),
          fullPage: true,
        });
      } catch (e) {
        console.error(`  ERROR: ${(e as Error).message}`);
      }
    }

    // Manual pages
    for (const slug of MANUAL_SLUGS) {
      const url = `${BASE_URL}/${locale}/manual/${slug}`;
      console.log(`[${locale}] Capturing manual/${slug}: ${url}`);
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(500);
        await page.screenshot({
          path: path.join(outputDir, `manual-${slug}.png`),
          fullPage: true,
        });
      } catch (e) {
        console.error(`  ERROR: ${(e as Error).message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log("\nDone! Screenshots saved to public/screenshots/");
}

main().catch(console.error);
