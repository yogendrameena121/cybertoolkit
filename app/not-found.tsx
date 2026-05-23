import Link from "next/link";
import { Shield, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Glitch number */}
      <div className="mb-6 font-display text-8xl font-extrabold text-[#00ff88] opacity-20 select-none sm:text-9xl">
        404
      </div>

      <div className="-mt-8 mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/8">
        <Shield className="h-8 w-8 text-[#00ff88]" />
      </div>

      <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-slate-400">
        The page you're looking for doesn't exist or has been moved. Try
        searching for a tool, or head back to the homepage.
      </p>

      {/* Quick links */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/8 px-5 py-2.5 text-sm font-medium text-[#00ff88] transition-all hover:border-[#00ff88]/60 hover:bg-[#00ff88]/12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/tools"
          className="flex items-center gap-2 rounded-lg border border-[#0d2a1f] px-5 py-2.5 text-sm text-slate-400 transition-all hover:border-[#00ff88]/25 hover:text-slate-200"
        >
          <Search className="h-4 w-4" />
          Browse All Tools
        </Link>
      </div>

      {/* Quick tool links */}
      <div className="mt-10 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        {[
          { name: "Hash Generator", href: "/tools/hash-generator" },
          { name: "Base64 Encoder", href: "/tools/base64" },
          { name: "JWT Decoder", href: "/tools/jwt-decoder" },
          { name: "Password Strength", href: "/tools/password-strength" },
          { name: "IP Lookup", href: "/tools/ip-lookup" },
          { name: "UUID Generator", href: "/tools/uuid-generator" },
        ].map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded border border-[#0d2a1f] bg-[#070f1e] px-3 py-2 text-center text-slate-500 transition-colors hover:text-[#00ff88]"
          >
            {t.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
