import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/*/dashboard",
          "/*/usage",
          "/*/logs",
          "/*/keys",
          "/*/settings",
          "/*/billing",
          "/*/callback",
          "/*/login",
        ],
      },
    ],
    sitemap: "https://lab.cafelua.com/sitemap.xml",
  };
}
