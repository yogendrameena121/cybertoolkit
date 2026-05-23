import type { Metadata } from "next";
import { ExternalLink, Shield, Lock, Globe, Eye, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Recommended Security Resources & Tools",
  description: "Curated list of trusted cybersecurity tools, VPNs, password managers, and learning resources. Affiliate links support CyberToolkit.",
};

const sections = [
  {
    title: "Password Managers",
    icon: Lock,
    color: "text-[#00ff88]",
    border: "border-[#00ff88]/20",
    bg: "bg-[#00ff88]/5",
    items: [
      {
        name: "1Password",
        desc: "Industry-leading password manager with Travel Mode and business features. Excellent UX.",
        href: "https://1password.com",
        badge: "Recommended",
        badgeColor: "text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20",
        note: "From $2.99/mo",
      },
      {
        name: "Bitwarden",
        desc: "Open-source password manager. Free tier is fully featured. Self-hosting available.",
        href: "https://bitwarden.com",
        badge: "Open Source",
        badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        note: "Free / $3/mo premium",
      },
    ],
  },
  {
    title: "VPN Services",
    icon: Globe,
    color: "text-[#00d4ff]",
    border: "border-[#00d4ff]/20",
    bg: "bg-[#00d4ff]/5",
    items: [
      {
        name: "NordVPN",
        desc: "Fast, no-logs VPN with 6000+ servers in 60 countries. Strong privacy track record.",
        href: "https://nordvpn.com",
        badge: "Popular",
        badgeColor: "text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20",
        note: "From $3.99/mo",
      },
      {
        name: "ProtonVPN",
        desc: "Swiss-based VPN from the makers of ProtonMail. Free tier available, strong privacy.",
        href: "https://protonvpn.com",
        badge: "Privacy-focused",
        badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        note: "Free / $4.99/mo",
      },
    ],
  },
  {
    title: "Security Learning",
    icon: Terminal,
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    items: [
      {
        name: "TryHackMe",
        desc: "Beginner-friendly cybersecurity learning platform with hands-on labs and CTF-style rooms.",
        href: "https://tryhackme.com",
        badge: "Beginner-friendly",
        badgeColor: "text-green-400 bg-green-500/10 border-green-500/20",
        note: "Free / $14/mo",
      },
      {
        name: "HackTheBox",
        desc: "Intermediate to advanced penetration testing labs and CTF challenges. Industry-recognized.",
        href: "https://hackthebox.com",
        badge: "Intermediate+",
        badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        note: "Free / $14/mo",
      },
    ],
  },
  {
    title: "Monitoring & SSL",
    icon: Eye,
    color: "text-yellow-400",
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/5",
    items: [
      {
        name: "SSL For Free / ZeroSSL",
        desc: "Free SSL certificates via Let's Encrypt. Essential for any website that doesn't already have SSL.",
        href: "https://zerossl.com",
        badge: "Free",
        badgeColor: "text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20",
        note: "Free cert generation",
      },
      {
        name: "Shodan",
        desc: "Search engine for internet-connected devices. Invaluable for attack surface monitoring and security research.",
        href: "https://shodan.io",
        badge: "Research",
        badgeColor: "text-red-400 bg-red-500/10 border-red-500/20",
        note: "Free / $49/mo",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#00ff88]" />
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#00ff88]">
            Curated Resources
          </p>
        </div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Recommended Security Tools
        </h1>
        <p className="mt-2 text-slate-400">
          Tools and services we trust. Some links are affiliate links — they support CyberToolkit at no extra cost to you.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded border border-yellow-500/20 bg-yellow-500/5 px-3 py-1.5 text-xs text-yellow-400">
          Disclosure: This page contains affiliate links marked where applicable.
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => {
          const SIcon = section.icon;
          return (
            <div key={section.title} className={`rounded-xl border p-6 ${section.bg} ${section.border}`}>
              <div className="mb-5 flex items-center gap-2">
                <SIcon className={`h-5 w-5 ${section.color}`} />
                <h2 className={`font-display text-lg font-semibold ${section.color}`}>
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex flex-col rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-4 transition-all hover:border-[#00ff88]/20"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-display font-semibold text-slate-200 transition-colors group-hover:text-[#00ff88]">
                        {item.name}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-600 transition-colors group-hover:text-[#00ff88]" />
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs text-slate-600">{item.note}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-slate-600">
        Affiliate disclosure: CyberToolkit may earn a commission from purchases made through links on this page. This does not affect our recommendations — we only list tools we genuinely recommend.
      </p>
    </div>
  );
}
