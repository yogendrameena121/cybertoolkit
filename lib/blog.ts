export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-md5",
    title: "What is MD5 and Why Is It Broken?",
    excerpt: "MD5 was once the gold standard for cryptographic hashing. Today it's considered cryptographically broken for security use — but it's still everywhere. Here's why, and what to use instead.",
    readTime: "6 min",
    date: "2024-11-12",
    tags: ["Hashing", "Cryptography", "Beginner"],
    featured: true,
  },
  {
    slug: "how-to-read-jwt",
    title: "How to Read a JWT Token",
    excerpt: "JSON Web Tokens are everywhere in modern web authentication — but most developers use them without understanding what's inside. This guide decodes the mystery.",
    readTime: "8 min",
    date: "2024-11-18",
    tags: ["JWT", "Authentication", "Web Security"],
    featured: true,
  },
  {
    slug: "what-does-ssl-protect",
    title: "What Does SSL Actually Protect?",
    excerpt: "HTTPS and SSL/TLS are synonymous with web security — but most people don't know what they actually protect against, or more importantly, what they don't protect against.",
    readTime: "7 min",
    date: "2024-11-25",
    tags: ["SSL", "TLS", "Encryption"],
    featured: true,
  },
  {
    slug: "password-hashing-explained",
    title: "Password Hashing: bcrypt vs Argon2 vs SHA-256",
    excerpt: "Why can't you just SHA-256 a password? Understanding the difference between hashing for data integrity versus hashing for password storage is critical for any developer.",
    readTime: "9 min",
    date: "2024-12-02",
    tags: ["Hashing", "Cryptography", "Intermediate"],
    featured: false,
  },
  {
    slug: "base64-is-not-encryption",
    title: "Base64 is Not Encryption (And Why That Matters)",
    excerpt: "Base64-encoded strings look like gibberish — but they're trivially decodable. Understand the difference between encoding, encryption, and hashing.",
    readTime: "5 min",
    date: "2024-12-08",
    tags: ["Encoding", "Beginner", "Cryptography"],
    featured: false,
  },
  {
    slug: "cve-cvss-guide",
    title: "CVE and CVSS Scoring: A Practical Guide",
    excerpt: "What makes a vulnerability Critical vs High vs Medium? Learn how the CVSS scoring system works and how to use it to prioritize your patch management.",
    readTime: "10 min",
    date: "2024-12-14",
    tags: ["CVE", "Forensics", "Intermediate"],
    featured: false,
  },
];

export const FEATURED_POSTS = BLOG_POSTS.filter((p) => p.featured);

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
