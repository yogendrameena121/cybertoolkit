import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  toc: { id: string; label: string; level: 2 | 3 }[];
}

const TAG_COLORS: Record<string, string> = {
  Hashing: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  Cryptography: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  JWT: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
  SSL: "text-green-400 border-green-500/20 bg-green-500/10",
  TLS: "text-green-400 border-green-500/20 bg-green-500/10",
  Encryption: "text-green-400 border-green-500/20 bg-green-500/10",
  Beginner: "text-slate-400 border-slate-500/20 bg-slate-500/10",
  Intermediate: "text-orange-400 border-orange-500/20 bg-orange-500/10",
  Authentication: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
  default: "text-slate-400 border-slate-500/20 bg-slate-500/10",
};

export function BlogLayout({
  children,
  title,
  excerpt,
  date,
  readTime,
  tags,
  toc,
}: BlogLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* Main content */}
        <article className="min-w-0">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-[#00ff88]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learn
          </Link>

          {/* Header */}
          <div className="mb-8">
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium ${
                    TAG_COLORS[tag] ?? TAG_COLORS.default
                  }`}
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-400">
              {excerpt}
            </p>

            {/* Meta */}
            <div className="mt-5 flex items-center gap-4 border-t border-[#0d2a1f] pt-5 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(date).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime} read
              </span>
            </div>
          </div>

          {/* Article body */}
          <div className="prose-cyber">{children}</div>
        </article>

        {/* Sidebar TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                On this page
              </p>
              <nav>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block rounded py-1 text-sm transition-colors hover:text-[#00ff88] ${
                          item.level === 3 ? "pl-4 text-slate-600" : "text-slate-400"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Back to tools CTA */}
            <div className="rounded-xl border border-[#00ff88]/15 bg-[#00ff88]/5 p-4">
              <p className="text-xs font-medium text-[#00ff88]">
                Try the tool
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Put this knowledge to use with our free browser-based tools.
              </p>
              <Link
                href="/tools"
                className="mt-3 block rounded border border-[#00ff88]/30 px-3 py-1.5 text-center text-xs font-medium text-[#00ff88] transition-all hover:border-[#00ff88]/60 hover:bg-[#00ff88]/8"
              >
                Browse tools →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
