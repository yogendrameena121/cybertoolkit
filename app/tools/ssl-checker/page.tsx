import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { SSLCheckerClient } from "./SSLCheckerClient";

export const metadata: Metadata = {
  title: "SSL Certificate Checker — Verify TLS Certificate Online",
  description:
    "Check the SSL/TLS certificate validity, expiry date, issuer, and chain for any domain. Free and instant. No software required.",
  keywords: ["ssl checker", "ssl certificate checker", "tls checker", "check ssl online", "ssl expiry checker", "certificate validity"],
  alternates: { canonical: "https://cybertoolkit-nu.vercel.app/tools/ssl-checker" },
};

const faqs = [
  {
    question: "Why is SSL/TLS important?",
    answer: "SSL/TLS encrypts data in transit between the browser and server, preventing eavesdropping and man-in-the-middle attacks. It also authenticates the server identity, ensuring you're connecting to the real website. Modern browsers mark sites without HTTPS as 'Not Secure'.",
  },
  {
    question: "What does certificate expiry mean?",
    answer: "SSL certificates have a validity period (typically 90 days to 1 year). After expiry, browsers display a security warning and refuse to connect by default. Certificate expiry is a common cause of website outages and should be monitored proactively.",
  },
  {
    question: "What is a certificate chain?",
    answer: "TLS uses a chain of trust: your domain certificate is signed by an intermediate certificate authority (CA), which is signed by a root CA trusted by browsers. If any link in this chain is broken or untrusted, the connection will fail.",
  },
];

export default function SSLCheckerPage() {
  return (
    <>
      <ToolSchema name="SSL Certificate Checker" description="Check SSL/TLS certificate validity, expiry, and chain for any domain." url="https://cybertoolkit-nu.vercel.app/tools/ssl-checker" category="NetworkingApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="SSL Certificate Checker"
        toolDescription="Verify SSL/TLS certificate validity, expiry, and issuer for any domain"
        icon={Shield}
        category="Network"
        categoryHref="/tools?category=network"
        seoTitle="Free Online SSL Certificate Checker and Validator"
        seoIntro="SSL/TLS certificates authenticate websites and encrypt data in transit. This tool uses a public SSL metadata API to retrieve certificate details for any domain — validity period, issuer, certificate authority, and whether the certificate is currently valid."
        whatIsContent="SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are cryptographic protocols that secure communications over the internet. A digital certificate binds a domain name to a public key using a Certificate Authority's (CA) digital signature. When you connect to an HTTPS website, your browser verifies this certificate chain to confirm the server's identity and establish an encrypted connection."
        howToSteps={[
          "Enter a domain name (e.g., example.com or sub.example.com).",
          "Click 'Check SSL' to query certificate details.",
          "Review validity dates — check if the certificate is current and when it expires.",
          "Inspect the issuer and CA chain.",
          "Green indicates a valid certificate; red indicates expired or invalid.",
        ]}
        useCases={[
          "Monitoring SSL expiry before it causes a site outage.",
          "Verifying a newly installed certificate is working correctly.",
          "Security auditing — checking certificate authorities and configurations.",
          "Debugging mixed content or HTTPS issues.",
        ]}
        isSafeContent="SSL certificate metadata is public information — it is transmitted to every browser that connects to a site. This tool queries a public API to retrieve that same metadata. The domain name you enter is sent to the API, but no sensitive data is involved — certificate information is already publicly visible."
        relatedTools={[
          { name: "WHOIS Lookup", href: "/tools/whois", description: "Domain registration information" },
          { name: "IP Lookup", href: "/tools/ip-lookup", description: "Geolocate IP addresses" },
          { name: "CVE Search", href: "/tools/cve-search", description: "Search vulnerability database" },
        ]}
        faqs={faqs}
      >
        <SSLCheckerClient />
      </ToolLayout>
    </>
  );
}
