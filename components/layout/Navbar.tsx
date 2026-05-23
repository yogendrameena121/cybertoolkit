"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  Hash,
  Lock,
  Globe,
  Key,
  Code2,
  Search,
  Fingerprint,
  ChevronDown,
} from "lucide-react";

const categories = [
  { name: "Hashing", href: "/tools?category=hashing", icon: Hash },
  { name: "Encoding", href: "/tools?category=encoding", icon: Code2 },
  { name: "Password", href: "/tools?category=password", icon: Key },
  { name: "Network", href: "/tools?category=network", icon: Globe },
  { name: "Web", href: "/tools?category=web", icon: Search },
  { name: "Forensics", href: "/tools?category=forensics", icon: Fingerprint },
];

const tools = [
  { name: "Hash Generator", href: "/tools/hash-generator" },
  { name: "Base64 Encoder", href: "/tools/base64" },
  { name: "Password Strength", href: "/tools/password-strength" },
  { name: "JWT Decoder", href: "/tools/jwt-decoder" },
  { name: "URL Encoder", href: "/tools/url-encoder" },
  { name: "IP Lookup", href: "/tools/ip-lookup" },
  { name: "SSL Checker", href: "/tools/ssl-checker" },
  { name: "WHOIS Lookup", href: "/tools/whois" },
  { name: "CVE Search", href: "/tools/cve-search" },
  { name: "UUID Generator", href: "/tools/uuid-generator" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0d2a1f]/80 bg-[#050d1a]/95 backdrop-blur-md">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded border border-[#00ff88]/30 bg-[#00ff88]/10 transition-all group-hover:border-[#00ff88]/60 group-hover:shadow-[0_0_12px_rgba(0,255,136,0.3)]">
            <Shield className="h-4 w-4 text-[#00ff88]" />
          </div>
          <div className="font-display font-bold tracking-tight">
            <span className="text-white">Cyber</span>
            <span className="text-[#00ff88]">Toolkit</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Tools dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1 rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88]">
              Tools
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {toolsOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 rounded-lg border border-[#0d2a1f] bg-[#070f1e] shadow-2xl">
                <div className="p-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88]"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[#0d2a1f] p-2">
                  <Link
                    href="/tools"
                    className="block rounded px-3 py-2 text-center text-xs font-medium text-[#00ff88] transition-colors hover:bg-[#00ff88]/5"
                  >
                    View All Tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`rounded px-3 py-2 text-sm transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88] ${
              pathname.startsWith("/blog")
                ? "text-[#00ff88]"
                : "text-slate-300"
            }`}
          >
            Learn
          </Link>

          <Link
            href="/tools/resources"
            className="rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88]"
          >
            Resources
          </Link>

          <Link
            href="/about"
            className={`rounded px-3 py-2 text-sm transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88] ${
              pathname === "/about" ? "text-[#00ff88]" : "text-slate-300"
            }`}
          >
            About
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden items-center gap-2 rounded border border-[#00ff88]/40 px-4 py-1.5 text-sm font-medium text-[#00ff88] transition-all hover:border-[#00ff88]/70 hover:bg-[#00ff88]/10 hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] sm:flex"
          >
            <Lock className="h-3.5 w-3.5" />
            All Tools
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="rounded p-2 text-slate-400 transition-colors hover:text-[#00ff88] lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#0d2a1f] bg-[#070f1e] lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-slate-500">
              Tools
            </p>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88]"
              >
                {tool.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-[#0d2a1f] pt-2">
              {[
                { name: "All Tools", href: "/tools" },
                { name: "Learn", href: "/blog" },
                { name: "Resources", href: "/tools/resources" },
                { name: "About", href: "/about" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-[#00ff88]/5 hover:text-[#00ff88]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
