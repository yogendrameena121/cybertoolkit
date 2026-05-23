import type { Metadata } from "next";
import { Shield, Lock, Zap, Eye, Code2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About CyberToolkit — Mission, Privacy & Tech Stack",
  description: "CyberToolkit is a free, browser-based security tools hub. No login, no data storage, no ads tracking. Built for developers and security professionals.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10">
          <Shield className="h-7 w-7 text-[#00ff88]" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-white">About CyberToolkit</h1>
          <p className="mt-1 text-slate-400">Free security tools for developers and professionals</p>
        </div>
      </div>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="font-display mb-4 text-xl font-semibold text-white">Our Mission</h2>
        <div className="space-y-3 text-slate-400 leading-relaxed">
          <p>
            CyberToolkit exists to provide fast, private, browser-based security utilities to developers, security researchers, and anyone who needs reliable tools without the friction of accounts, rate limits, or privacy trade-offs.
          </p>
          <p>
            Every tool on this site runs entirely in your browser. Your input is never transmitted to our servers. We built it this way not just for privacy — it is also faster, more reliable, and works offline once loaded.
          </p>
          <p>
            The web is full of tools that require a login to hash a string. We think that is wrong. Security tools should be frictionless.
          </p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="mb-10 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#00ff88]" />
          <h2 className="font-display text-xl font-semibold text-white">Privacy Policy</h2>
        </div>
        <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-200">Data we collect:</strong> None from tool usage. All tool processing (hashing, encoding, password analysis, UUID generation) runs client-side in your browser. No input data is ever sent to CyberToolkit servers.
          </p>
          <p>
            <strong className="text-slate-200">API calls:</strong> Some tools make API calls to third-party services because those operations require server-side databases:
          </p>
          <ul className="ml-4 space-y-1">
            <li>• IP Lookup → ip-api.com (sends the IP address being queried)</li>
            <li>• SSL Checker → public certificate API (sends the domain name)</li>
            <li>• WHOIS Lookup → rdap.org (sends the domain name)</li>
            <li>• CVE Search → nvd.nist.gov (sends your search term)</li>
          </ul>
          <p>
            <strong className="text-slate-200">Cookies:</strong> We may use minimal analytics cookies (such as Google Analytics) to understand aggregate page traffic. No personally identifiable information is collected.
          </p>
          <p>
            <strong className="text-slate-200">Advertising:</strong> We use Google AdSense for non-tracking-based ads where possible. Affiliate links are clearly disclosed.
          </p>
          <p>
            <strong className="text-slate-200">Contact:</strong> For privacy concerns, email privacy@cybertoolkit.dev
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-10">
        <h2 className="font-display mb-4 text-xl font-semibold text-white">Principles</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { icon: Lock, title: "Privacy First", desc: "Tool inputs stay in your browser. Period.", color: "text-[#00ff88]", border: "border-[#00ff88]/20", bg: "bg-[#00ff88]/5" },
            { icon: Zap, title: "Performance", desc: "Client-side tools are instant. No round-trips.", color: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5" },
            { icon: Eye, title: "Transparency", desc: "Open about what data leaves your browser.", color: "text-[#00d4ff]", border: "border-[#00d4ff]/20", bg: "bg-[#00d4ff]/5" },
            { icon: Code2, title: "Developer-Focused", desc: "Tools built by developers, for developers.", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5" },
          ].map(({ icon: Icon, title, desc, color, border, bg }) => (
            <div key={title} className={`rounded-lg border p-4 ${bg} ${border}`}>
              <Icon className={`mb-2 h-5 w-5 ${color}`} />
              <p className={`font-medium ${color}`}>{title}</p>
              <p className="mt-1 text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-10">
        <h2 className="font-display mb-4 text-xl font-semibold text-white">Tech Stack</h2>
        <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] divide-y divide-[#0d2a1f]">
          {[
            { name: "Next.js 14", role: "React framework with App Router", href: "https://nextjs.org" },
            { name: "Tailwind CSS", role: "Utility-first CSS framework", href: "https://tailwindcss.com" },
            { name: "Web Crypto API", role: "Browser-native cryptography (no library)", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" },
            { name: "ip-api.com", role: "Free IP geolocation API", href: "https://ip-api.com" },
            { name: "NIST NVD API", role: "CVE vulnerability database", href: "https://nvd.nist.gov" },
            { name: "RDAP / rdap.org", role: "Modern WHOIS protocol", href: "https://rdap.org" },
            { name: "Vercel", role: "Deployment and hosting", href: "https://vercel.com" },
          ].map(({ name, role, href }) => (
            <div key={name} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-mono text-sm font-medium text-slate-200">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-600 transition-colors hover:text-[#00ff88]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <h2 className="font-display mb-4 text-xl font-semibold text-white">Legal Disclaimer</h2>
        <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-5 text-sm text-slate-500 leading-relaxed">
          <p>
            CyberToolkit is provided for educational and legitimate professional use only. All tools are intended for use on systems and data that you own or have explicit authorization to test and analyze.
          </p>
          <p className="mt-3">
            Do not use any tools on this site to access, test, or analyze systems, networks, or data without proper authorization. Unauthorized access to computer systems is illegal in most jurisdictions.
          </p>
          <p className="mt-3">
            CyberToolkit makes no warranties about the accuracy of tool outputs and accepts no liability for their use or misuse.
          </p>
        </div>
      </section>
    </div>
  );
}
