import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import { MANUAL_SLUGS } from "@/lib/manual-docs";

const BASE_URL = "https://naia.nextain.io";

const PUBLIC_PAGES = ["", "terms", "privacy", "refund", "contact", "manual"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const languages: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach((l) => {
    languages[l] = `${BASE_URL}/${l}`;
  });

  for (const locale of SUPPORTED_LOCALES) {
    // Static public pages
    for (const page of PUBLIC_PAGES) {
      const pageLanguages: Record<string, string> = {};
      SUPPORTED_LOCALES.forEach((l) => {
        pageLanguages[l] = `${BASE_URL}/${l}${page ? `/${page}` : ""}`;
      });
      pageLanguages["x-default"] = `${BASE_URL}/en${page ? `/${page}` : ""}`;

      entries.push({
        url: `${BASE_URL}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.7,
        alternates: {
          languages: pageLanguages,
        },
      });
    }

    // Manual pages
    for (const slug of MANUAL_SLUGS) {
      const manualLanguages: Record<string, string> = {};
      SUPPORTED_LOCALES.forEach((l) => {
        manualLanguages[l] = `${BASE_URL}/${l}/manual/${slug}`;
      });
      manualLanguages["x-default"] = `${BASE_URL}/en/manual/${slug}`;

      entries.push({
        url: `${BASE_URL}/${locale}/manual/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: manualLanguages,
        },
      });
    }
  }

  return entries;
}
