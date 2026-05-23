import Link from "next/link";
import {
  Shield,
  Search,
  Zap,
  Lock,
  Eye,
  Globe,
  Hash,
  Binary,
  Key,
  Fingerprint,
  ArrowRight,
  Code2,
  Bug,
} from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { POPULAR_TOOLS, ALL_TOOLS } from "@/lib/tools-registry";
import { AdSlot } from "@/components/layout/AdSlot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberToolkit — Free Online Security & Developer Tools",
  description:
    "10+ free browser-based security tools: hash generators, Base64 encoder, password strength meter, JWT decoder, IP lookup, and more. No data sent to servers.",
};

const categories = [
  {
    name: "Hashing",
    icon: Hash,
    href: "/tools?category=hashing",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    count: ALL_TOOLS.filter((t) => t.category === "hashing").length,
  },
  {
    name: "Encoding",
    icon: Binary,
    href: "/tools?category=encoding",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    count: ALL_TOOLS.filter((t) => t.category === "encoding").length,
  },
  {
    name: "Password",
    icon: Lock,
    href: "/tools?category=password",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    count: ALL_TOOLS.filter((t) => t.category === "password").length,
  },
  {
    name: "Network",
    icon: Globe,
    href: "/tools?category=network",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    count: ALL_TOOLS.filter((t) => t.category === "network").length,
  },
  {
    name: "Web",
    icon: Code2,
    href: "/tools?category=web",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    count: ALL_TOOLS.filter((t) => t.category === "web").length,
  },
  {
    name: "Forensics",
    icon: Bug,
    href: "/tools?category=forensics",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    count: ALL_TOOLS.filter((t) => t.category === "forensics").length,
  },
];

const valueProps = [
  {
    icon: Lock,
    title: "100% Private",
    description:
      "All tools run entirely in your browser. No input, data, or results are ever sent to our servers.",
    accent: "text-[#00ff88]",
    border: "border-[#00ff88]/20",
    bg: "bg-[#00ff88]/5",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant results powered by Web Crypto API and native browser capabilities. No waiting, no loading spinners.",
    accent: "text-[#ffd700]",
    border: "border-[#ffd700]/20",
    bg: "bg-[#ffd700]/5",
  },
  {
    icon: Eye,
    title: "No Account Needed",
    description:
      "Fully anonymous. No login, no email, no cookies. Just open a tool and get to work.",
    accent: "text-[#00d4ff]",
    border: "border-[#00d4ff]/20",
    bg: "bg-[#00d4ff]/5",
  },
  {
    icon: Shield,
    title: "Open & Auditable",
    description:
      "All processing is client-side and auditable. No hidden APIs. Use DevTools to verify everything runs locally.",
    accent: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#00ff88] opacity-[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00ff88]/25 bg-[#00ff88]/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff88]" />
            <span className="font-mono text-xs font-medium text-[#00ff88]">
              {ALL_TOOLS.length}+ Free Security Tools — No Login Required
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Security Tools
            <br />
            <span className="text-gradient-green">Built for Developers</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Hash generators, JWT decoders, IP lookups, password analyzers, and
            more — all free, all browser-based, all private.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="btn-cyber inline-flex items-center gap-2 px-6 py-3 text-base font-semibold"
            >
              <Shield className="h-4 w-4" />
              Browse All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/hash-generator"
              className="btn-cyber-outline inline-flex items-center gap-2 px-6 py-3 text-base"
            >
              <Hash className="h-4 w-4" />
              Try Hash Generator
            </Link>
          </div>

          {/* Quick search prompt */}
          <div className="mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-lg border border-[#0d2a1f] bg-[#070f1e] px-4 py-2.5 text-sm text-slate-500 transition-all hover:border-[#00ff88]/30 hover:text-slate-300"
            >
              <Search className="h-4 w-4 text-slate-600" />
              <span>Search tools... </span>
              <kbd className="ml-1 rounded border border-[#0d2a1f] bg-[#050d1a] px-1.5 py-0.5 font-mono text-xs">
                /
              </kbd>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="border-y border-[#0d2a1f] bg-[#040c18] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`group flex items-center gap-2 rounded-lg border px-4 py-2 transition-all hover:shadow-[0_0_12px_rgba(0,0,0,0.5)] ${cat.bg} ${cat.border}`}
                >
                  <CatIcon className={`h-4 w-4 ${cat.color}`} />
                  <span className={`text-sm font-medium ${cat.color}`}>
                    {cat.name}
                  </span>
                  <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                    {cat.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad slot */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdSlot slot="7370228280" />
      </div>

      {/* Featured Tools Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#00ff88]">
                Popular
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-white sm:text-3xl">
                Featured Tools
              </h2>
            </div>
            <Link
              href="/tools"
              className="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-[#00ff88]"
            >
              All {ALL_TOOLS.length} tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_TOOLS.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Why CyberToolkit */}
      <section className="border-t border-[#0d2a1f] bg-[#040c18] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#00ff88]">
              Why CyberToolkit?
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">
              Tools that respect your work
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Built for security professionals, developers, and CTF players who
              need reliable tools without the privacy trade-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => {
              const PropIcon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className={`rounded-xl border p-5 ${prop.bg} ${prop.border}`}
                >
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5`}
                  >
                    <PropIcon className={`h-5 w-5 ${prop.accent}`} />
                  </div>
                  <h3 className={`font-display font-semibold ${prop.accent}`}>
                    {prop.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Tools List */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#00ff88]">
              All Tools
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold text-white">
              Complete Toolkit
            </h2>
          </div>

          <div className="space-y-2">
            {ALL_TOOLS.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="list" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-4 mb-16 overflow-hidden rounded-2xl border border-[#00ff88]/20 bg-gradient-to-br from-[#070f1e] to-[#0a1628] sm:mx-6 lg:mx-8">
        <div className="relative px-8 py-12 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-[#00ff88] opacity-[0.06] blur-3xl" />
          </div>
          <div className="relative">
            <Key className="mx-auto mb-4 h-10 w-10 text-[#00ff88] opacity-60" />
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Start securing your workflow
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-400">
              All tools are free, browser-based, and require no sign-up. Jump
              in and start building.
            </p>
            <Link
              href="/tools"
              className="btn-cyber mt-6 inline-flex items-center gap-2 px-8 py-3"
            >
              Explore All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <AdSlot slot="5544332211" />
      </div>
    </>
  );
}
