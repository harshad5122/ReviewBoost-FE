import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    {
      url: `${SITE_URL}/best/restaurant/new-york`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
