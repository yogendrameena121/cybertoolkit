import { MetadataRoute } from "next";

const BASE_URL = "https://cybertoolkit-nu.vercel.app";

const tools = [
  "/tools/hash-generator",
  "/tools/base64",
  "/tools/password-strength",
  "/tools/jwt-decoder",
  "/tools/url-encoder",
  "/tools/ip-lookup",
  "/tools/ssl-checker",
  "/tools/whois",
  "/tools/cve-search",
  "/tools/uuid-generator",
];

const blogPosts = [
  "/blog/what-is-md5",
  "/blog/how-to-read-jwt",
  "/blog/what-does-ssl-protect",
  "/blog/password-hashing-explained",
  "/blog/base64-is-not-encryption",
  "/blog/cve-cvss-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/tools`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/tools/resources`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const toolPages = tools.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
