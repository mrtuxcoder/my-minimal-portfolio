import type { MetadataRoute } from "next";

const baseUrl = "https://guganraj.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/case-study?title=End-to-End+Deployment+of+Guidra+Backend+on+Azure+VM`,
      lastModified: new Date("2026-08-21"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-study?title=From+Code+to+Containers%3A+Chronicle+Homelab+Deployment`,
      lastModified: new Date("2026-08-21"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}