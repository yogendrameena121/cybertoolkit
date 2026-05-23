import type { Metadata } from "next";
import { Globe } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { IPLookupClient } from "./IPLookupClient";

export const metadata: Metadata = {
  title: "IP Address Lookup — Geolocation, ISP & ASN Tool",
  description:
    "Look up any IP address: country, city, ISP, ASN, timezone, and coordinates. Auto-detects your own IP. Free, fast, no API key needed.",
  keywords: ["ip lookup", "ip address lookup", "ip geolocation", "what is my ip", "ip to location", "ip asn lookup", "check my ip"],
  alternates: { canonical: "https://cybertoolkit-nu.vercel.app/tools/ip-lookup" },
};

const faqs = [
  {
    question: "How accurate is IP geolocation?",
    answer: "IP geolocation is accurate to the country level in over 95% of cases. City-level accuracy is typically 50-80%. It should never be used for precise physical location — it shows the location of the ISP's network infrastructure, not the end user's exact address.",
  },
  {
    question: "Can I look up private/internal IP addresses?",
    answer: "Private IP ranges (10.x.x.x, 192.168.x.x, 172.16-31.x.x) and localhost (127.0.0.1) are not routable on the public internet and cannot be geolocated. Only public IP addresses can be looked up.",
  },
  {
    question: "What is an ASN?",
    answer: "An Autonomous System Number (ASN) identifies a network or group of networks under a single administrative entity (like an ISP or large organization). It is used in Border Gateway Protocol (BGP) routing on the internet.",
  },
  {
    question: "How can I hide my IP address?",
    answer: "You can mask your real IP address using a VPN (Virtual Private Network). A VPN routes your traffic through a server in another location, making websites and services see the VPN server's IP instead of yours.",
  },
];

export default function IPLookupPage() {
  return (
    <>
      <ToolSchema name="IP Address Lookup" description="Look up geolocation, ISP, ASN, and timezone for any IP address." url="https://cybertoolkit-nu.vercel.app/tools/ip-lookup" category="NetworkingApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="IP Address Lookup"
        toolDescription="Geolocation, ISP, ASN, and timezone for any IP address"
        icon={Globe}
        category="Network"
        categoryHref="/tools?category=network"
        seoTitle="Free IP Address Lookup — Geolocation, ISP & ASN"
        seoIntro="This tool queries the ip-api.com free tier to return detailed information about any IPv4 or IPv6 address, including its approximate geographic location, ISP, Autonomous System Number (ASN), timezone, and coordinates. It auto-detects your own public IP on load."
        whatIsContent="Every device connected to the internet has a public IP address assigned by an Internet Service Provider (ISP). IP geolocation databases map these addresses to approximate physical locations based on registration data and network routing information. While not pinpoint accurate, IP lookups are used in cybersecurity for threat intelligence, fraud detection, network diagnostics, and content localization."
        howToSteps={[
          "Your own IP is auto-detected when the page loads — click 'Check My IP' to re-fetch it.",
          "To look up a different IP, clear the field and type any IPv4 or IPv6 address.",
          "Click 'Look Up' to query the geolocation database.",
          "Review the results: country, region, city, ISP, ASN, timezone, and coordinates.",
          "Use the map pin link to open the approximate location in Google Maps.",
        ]}
        useCases={[
          "Network diagnostics — identify which ISP or data center an IP belongs to.",
          "Security incident response — geolocate suspicious IPs from logs.",
          "Fraud detection — flag logins or transactions from unexpected countries.",
          "Content localization testing — verify CDN or VPN location targeting.",
          "CTF challenges involving IP attribution or OSINT.",
        ]}
        isSafeContent="This tool sends the IP address you enter to ip-api.com, a free public geolocation API. This is necessary because IP geolocation requires a server-side database lookup — it cannot be done client-side. The IP address being queried is the only data transmitted. No other information (your browser, device, or identity) is sent."
        relatedTools={[
          { name: "WHOIS Lookup", href: "/tools/whois", description: "Domain registration information" },
          { name: "SSL Checker", href: "/tools/ssl-checker", description: "Verify SSL certificates" },
          { name: "CVE Search", href: "/tools/cve-search", description: "Search vulnerability database" },
        ]}
        faqs={faqs}
        affiliateNote={
          <p>
            Concerned about your IP address being visible to websites and services?{" "}
            <strong className="text-slate-300">A VPN can mask your real IP.</strong>{" "}
            Check out{" "}
            <a href="https://nordvpn.com" target="_blank" rel="noopener noreferrer sponsored" className="text-[#00ff88] hover:underline">
              NordVPN
            </a>{" "}
            or{" "}
            <a href="https://protonvpn.com" target="_blank" rel="noopener noreferrer sponsored" className="text-[#00ff88] hover:underline">
              ProtonVPN
            </a>{" "}
            for reliable privacy protection.
          </p>
        }
      >
        <IPLookupClient />
      </ToolLayout>
    </>
  );
}
