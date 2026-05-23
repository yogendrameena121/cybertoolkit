import type { Metadata } from "next";
import { Search } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { WHOISClient } from "./WHOISClient";

export const metadata: Metadata = {
  title: "WHOIS Domain Lookup — Free Domain Registration Info",
  description:
    "Look up WHOIS registration data for any domain: registrar, creation date, expiry, nameservers, and registrant info. Free and instant.",
  keywords: ["whois lookup", "whois domain", "domain lookup", "domain registration info", "who owns domain", "domain expiry checker"],
  alternates: { canonical: "https://cybertoolkit.dev/tools/whois" },
};

const faqs = [
  {
    question: "What is WHOIS?",
    answer: "WHOIS is a query and response protocol for querying databases that store registration information for domain names and IP addresses. It returns details like the registrar, registration/expiry dates, nameservers, and sometimes registrant contact information.",
  },
  {
    question: "Why is registrant information hidden?",
    answer: "Domain privacy (or WHOIS privacy) services replace personal registrant contact details with the registrar's generic contact information. This is now common due to GDPR and privacy regulations, as well as spam prevention.",
  },
  {
    question: "Can I use WHOIS for cybersecurity investigations?",
    answer: "Yes. WHOIS data is used in threat intelligence to investigate suspicious domains, track domain infrastructure, identify phishing domains by registrar patterns, and pivot across related domains using shared nameservers or registrant emails.",
  },
];

export default function WHOISPage() {
  return (
    <>
      <ToolSchema name="WHOIS Domain Lookup" description="Query WHOIS registration data for any domain." url="https://cybertoolkit.dev/tools/whois" category="NetworkingApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="WHOIS Domain Lookup"
        toolDescription="Query domain registration data: registrar, dates, and nameservers"
        icon={Search}
        category="Network"
        categoryHref="/tools?category=network"
        seoTitle="Free WHOIS Domain Lookup Tool"
        seoIntro="WHOIS lookup retrieves registration records for any domain name, including the registrar, registration and expiry dates, name servers, and sometimes registrant contact information. This tool queries a public WHOIS API to return formatted results for any domain."
        whatIsContent="WHOIS is an internet protocol for querying domain registration databases maintained by registrars and registries. When you register a domain, your registrar submits registration data to the central registry (like Verisign for .com). This data includes technical details (nameservers, status) and, unless privacy protection is enabled, registrant contact information. WHOIS data is widely used for abuse reporting, domain investigations, and network administration."
        howToSteps={[
          "Enter a domain name (e.g., example.com) — no http:// needed.",
          "Click 'Look Up' to query the WHOIS database.",
          "Review the registration details: registrar, creation date, expiry, and nameservers.",
          "Check the domain status codes (clientTransferProhibited, etc.).",
        ]}
        useCases={[
          "Checking when a domain expires — useful before purchasing an expiring domain.",
          "Identifying who registered a suspicious domain for abuse reporting.",
          "Verifying domain ownership during due diligence for acquisitions.",
          "Threat intelligence — investigating phishing or malware domains.",
          "CTF challenges involving domain OSINT.",
        ]}
        isSafeContent="Your domain query is sent to a public WHOIS API. WHOIS data is publicly available by design — it is the mechanism by which internet registration information is disclosed. Domain names are not sensitive information."
        relatedTools={[
          { name: "SSL Checker", href: "/tools/ssl-checker", description: "Check SSL certificate validity" },
          { name: "IP Lookup", href: "/tools/ip-lookup", description: "Geolocate IP addresses" },
          { name: "CVE Search", href: "/tools/cve-search", description: "Search vulnerability database" },
        ]}
        faqs={faqs}
      >
        <WHOISClient />
      </ToolLayout>
    </>
  );
}
