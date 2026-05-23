import Link from "next/link";
import { Shield, Github, Twitter } from "lucide-react";

const toolLinks = [
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

const resourceLinks = [
  { name: "All Tools", href: "/tools" },
  { name: "Learn / Blog", href: "/blog" },
  { name: "Resources", href: "/tools/resources" },
  { name: "About & Privacy", href: "/about" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-[#0d2a1f]/80 bg-[#040c18]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-[#00ff88]/30 bg-[#00ff88]/10">
                <Shield className="h-4 w-4 text-[#00ff88]" />
              </div>
              <div className="font-display font-bold">
                <span className="text-white">Cyber</span>
                <span className="text-[#00ff88]">Toolkit</span>
              </div>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Free, private, browser-based security tools. Your data never
              leaves your device.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/cybertoolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded border border-[#0d2a1f] text-slate-500 transition-colors hover:border-[#00ff88]/30 hover:text-[#00ff88]"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/cybertoolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded border border-[#0d2a1f] text-slate-500 transition-colors hover:border-[#00ff88]/30 hover:text-[#00ff88]"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-[#00ff88]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              More Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-[#00ff88]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Navigate
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-[#00ff88]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Privacy badge */}
            <div className="mt-6 rounded border border-[#00ff88]/20 bg-[#00ff88]/5 p-3">
              <p className="text-xs text-[#00ff88]/80">
                🔒 All tools run 100% client-side. No data is ever sent to our
                servers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#0d2a1f] pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {year} CyberToolkit. Built for developers and security
            professionals.
          </p>
          <p className="text-xs text-slate-600">
            Disclaimer: These tools are for educational and legitimate
            professional use only. Always obtain proper authorization before
            testing systems you do not own.
          </p>
        </div>
      </div>
    </footer>
  );
}
