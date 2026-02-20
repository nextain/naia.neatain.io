import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import { MANUAL_SLUGS } from "@/lib/manual-docs";

const BASE_URL = "https://lab.cafelua.com";

const PUBLIC_PAGES = ["", "terms", "privacy", "refund", "contact", "manual"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    // Static public pages
    for (const page of PUBLIC_PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.7,
      });
    }

    // Manual pages
    for (const slug of MANUAL_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/manual/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
