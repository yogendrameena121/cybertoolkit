import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Learning Hub — CyberToolkit Blog",
  description: "Learn about cryptography, network security, web vulnerabilities, and developer tools. Beginner-friendly explanations with real-world context.",
};

const articles = [
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
    tags: ["Password Security", "Hashing", "Intermediate"],
    featured: false,
  },
  {
    slug: "base64-is-not-encryption",
    title: "Base64 is Not Encryption (And Why That Matters)",
    excerpt: "Base64-encoded strings look like gibberish — but they're trivially decodable. Understand the difference between encoding, encryption, and hashing.",
    readTime: "5 min",
    date: "2024-12-08",
    tags: ["Encoding", "Beginner", "Misconceptions"],
    featured: false,
  },
  {
    slug: "cve-cvss-guide",
    title: "CVE and CVSS Scoring: A Practical Guide",
    excerpt: "What makes a vulnerability Critical vs High vs Medium? Learn how the CVSS scoring system works and how to use it to prioritize your patch management.",
    readTime: "10 min",
    date: "2024-12-14",
    tags: ["CVE", "Vulnerability Management", "Intermediate"],
    featured: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  Hashing: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  Cryptography: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  JWT: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
  Authentication: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
  SSL: "text-green-400 border-green-500/20 bg-green-500/10",
  TLS: "text-green-400 border-green-500/20 bg-green-500/10",
  Encryption: "text-green-400 border-green-500/20 bg-green-500/10",
  Beginner: "text-slate-400 border-slate-500/20 bg-slate-500/10",
  Intermediate: "text-orange-400 border-orange-500/20 bg-orange-500/10",
  "Web Security": "text-orange-400 border-orange-500/20 bg-orange-500/10",
  CVE: "text-red-400 border-red-500/20 bg-red-500/10",
  default: "text-slate-400 border-slate-500/20 bg-slate-500/10",
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] ?? TAG_COLORS.default;
}

export default function BlogPage() {
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#00ff88]" />
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#00ff88]">
            Learn
          </p>
        </div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Security Learning Hub
        </h1>
        <p className="mt-2 max-w-xl text-slate-400">
          Plain-English explanations of security concepts, cryptography, and
          developer tools — from beginner to intermediate.
        </p>
      </div>

      {/* Featured articles */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-lg font-semibold text-slate-300">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-5 transition-all hover:border-[#00ff88]/25 hover:shadow-[0_0_20px_rgba(0,255,136,0.05)]"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display font-semibold text-slate-100 transition-colors group-hover:text-[#00ff88] leading-snug flex-1">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {article.readTime} read
                </div>
                <span className="flex items-center gap-1 text-[#00ff88]/60 transition-colors group-hover:text-[#00ff88]">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All articles */}
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-slate-300">
          All Articles
        </h2>
        <div className="space-y-2">
          {[...featured, ...rest].map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex items-start gap-4 rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-4 transition-all hover:border-[#00ff88]/20"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-200 transition-colors group-hover:text-[#00ff88]">
                    {article.title}
                  </h3>
                  {article.featured && (
                    <span className="rounded bg-[#00ff88]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00ff88]">Featured</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 line-clamp-1">{article.excerpt}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span key={tag} className={`rounded border px-1.5 py-0.5 text-[10px] ${getTagColor(tag)}`}>
                      <Tag className="inline h-2.5 w-2.5 mr-0.5" />{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </div>
                <p className="mt-1">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
