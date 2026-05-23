import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/layout/BlogLayout";

export const metadata: Metadata = {
  title: "What Does SSL Actually Protect? | CyberToolkit Learn",
  description:
    "HTTPS and SSL/TLS are synonymous with web security — but most people don't know what they actually protect against, or more importantly, what they don't protect.",
  keywords: ["what does ssl protect", "https security", "ssl tls explained", "is https safe", "ssl certificate explained"],
  alternates: { canonical: "https://cybertoolkit-nu.vercel.app/blog/what-does-ssl-protect" },
};

const toc = [
  { id: "the-padlock-myth", label: "The padlock myth", level: 2 as const },
  { id: "what-ssl-does", label: "What SSL/TLS does", level: 2 as const },
  { id: "encryption", label: "Encryption in transit", level: 3 as const },
  { id: "authentication", label: "Server authentication", level: 3 as const },
  { id: "integrity", label: "Data integrity", level: 3 as const },
  { id: "what-ssl-does-not-protect", label: "What SSL doesn't protect", level: 2 as const },
  { id: "certificate-types", label: "Certificate types", level: 2 as const },
  { id: "how-to-check", label: "How to check a certificate", level: 2 as const },
];

export default function WhatDoesSslProtectPage() {
  return (
    <BlogLayout
      title="What Does SSL Actually Protect?"
      excerpt="HTTPS and SSL/TLS are synonymous with web security — but most people don't know what they actually protect against, or more importantly, what they don't protect against."
      date="2024-11-25"
      readTime="7 min"
      tags={["SSL", "TLS", "Encryption"]}
      toc={toc}
    >
      <h2 id="the-padlock-myth">The padlock myth</h2>
      <p>
        The padlock icon in your browser's address bar has become synonymous with "this website is safe." This is a dangerous oversimplification. The padlock means exactly one thing: your connection to this server is encrypted. It says nothing about whether the server itself is trustworthy, whether the website is legitimate, or whether your data is secure once it arrives at the server.
      </p>
      <p>
        Phishing sites — fake login pages designed to steal your credentials — routinely have valid SSL certificates and display the padlock. In 2019, the Anti-Phishing Working Group found that more than 50% of phishing sites used HTTPS. The padlock tells you the connection is private, not that the destination is honest.
      </p>

      <h2 id="what-ssl-does">What SSL/TLS actually does</h2>
      <p>
        SSL (Secure Sockets Layer) has been superseded by TLS (Transport Layer Security), though the terms are often used interchangeably. When you connect to an HTTPS website, TLS provides three security guarantees:
      </p>

      <h3 id="encryption">1. Encryption in transit</h3>
      <p>
        TLS encrypts all data transmitted between your browser and the server. Anyone intercepting the traffic — a coffee shop Wi-Fi operator, an ISP, a government network tap — sees only encrypted ciphertext, not the content of your communications.
      </p>
      <p>
        This is what protects your passwords, credit card numbers, and messages when you submit a form on an HTTPS site. Without TLS, this data would travel as plaintext, readable by any intermediary.
      </p>
      <p>
        Modern TLS (1.3, released 2018) uses ephemeral key exchange, meaning even if a server's long-term private key is later compromised, past sessions cannot be decrypted. This property is called <strong>forward secrecy</strong>.
      </p>

      <h3 id="authentication">2. Server authentication</h3>
      <p>
        Before encrypting anything, TLS verifies that you're actually connecting to the server you think you are — not an impersonator. It does this through the certificate chain:
      </p>
      <ul>
        <li>The server presents a digital certificate issued by a trusted <strong>Certificate Authority (CA)</strong>.</li>
        <li>Your browser maintains a list of trusted root CAs (built into the OS and browser).</li>
        <li>The browser verifies the server's certificate is signed by a trusted CA and matches the domain you're connecting to.</li>
      </ul>
      <p>
        This prevents <strong>man-in-the-middle attacks</strong> where an attacker intercepts your connection and impersonates the server. Without certificate verification, encryption alone would be useless — you'd be encrypting data straight to the attacker.
      </p>

      <h3 id="integrity">3. Data integrity</h3>
      <p>
        TLS uses message authentication codes (MACs) to ensure data hasn't been modified in transit. Any tampering — even a single bit flip — is detected and the connection is terminated. This protects against <strong>injection attacks</strong> where an intermediary tries to insert malicious content into a legitimate HTTP response.
      </p>
      <p>
        Before HTTPS was ubiquitous, some ISPs injected ads into HTTP responses. TLS's integrity protection makes this impossible over HTTPS — the browser would detect and reject any modification.
      </p>

      <h2 id="what-ssl-does-not-protect">What SSL/TLS does not protect</h2>
      <p>
        Understanding TLS's limitations is just as important as understanding what it does:
      </p>
      <ul>
        <li>
          <strong>It doesn't verify the website is legitimate.</strong> A phishing site can have a valid certificate. TLS authenticates the server's identity (the domain), not the organization's trustworthiness.
        </li>
        <li>
          <strong>It doesn't protect data at rest.</strong> Once your data reaches the server, TLS is done. How the server stores, processes, and protects your data is entirely outside TLS's scope. Data breaches happen on servers — not in transit.
        </li>
        <li>
          <strong>It doesn't protect against malware on your device.</strong> If your computer or browser is compromised, an attacker can read data before it's encrypted or after it's decrypted — regardless of TLS.
        </li>
        <li>
          <strong>It doesn't hide which sites you visit.</strong> Your DNS queries (domain lookups) and the SNI (Server Name Indication) handshake reveal which domains you're connecting to, even over HTTPS. Your ISP can see you're visiting <code>example.com</code>, just not what specific pages you view.
        </li>
        <li>
          <strong>It doesn't prevent the server from being hacked.</strong> TLS protects the connection, not the destination. A server can be breached regardless of having valid SSL.
        </li>
      </ul>
      <div className="callout">
        <p className="font-medium text-[#00d4ff] mb-1">ℹ Quick rule of thumb</p>
        <p className="text-sm text-slate-400">HTTPS protects your data <em>on the wire</em>. Once it leaves the wire, it's the server's responsibility — not TLS's.</p>
      </div>

      <h2 id="certificate-types">Types of SSL certificates</h2>
      <p>
        There are three levels of validation for TLS certificates, ranging from instant automated issuance to weeks of manual verification:
      </p>
      <table>
        <thead>
          <tr><th>Type</th><th>Validation</th><th>Padlock displays</th><th>Use case</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>DV</strong> (Domain Validation)</td>
            <td>Automated domain ownership only</td>
            <td>Standard padlock</td>
            <td>Blogs, personal sites, APIs</td>
          </tr>
          <tr>
            <td><strong>OV</strong> (Organization Validation)</td>
            <td>Manual company identity verification</td>
            <td>Standard padlock</td>
            <td>Business websites</td>
          </tr>
          <tr>
            <td><strong>EV</strong> (Extended Validation)</td>
            <td>Rigorous legal entity verification</td>
            <td>Padlock (historically showed company name)</td>
            <td>Banks, governments, e-commerce</td>
          </tr>
        </tbody>
      </table>
      <p>
        Let's Encrypt issues free DV certificates via an automated process, which is why virtually every website now has HTTPS. This democratized encryption — but it also means certificate presence alone is no longer a meaningful trust signal.
      </p>

      <h2 id="how-to-check">How to check a certificate</h2>
      <p>
        You can inspect any site's certificate directly in your browser by clicking the padlock icon and viewing certificate details. Look for:
      </p>
      <ul>
        <li><strong>Validity dates</strong> — is the certificate currently valid and not expiring soon?</li>
        <li><strong>Issued to</strong> — does the domain match what you're visiting?</li>
        <li><strong>Issued by</strong> — is it a recognized CA like Let's Encrypt, DigiCert, or Sectigo?</li>
        <li><strong>TLS version</strong> — modern sites should use TLS 1.2 or 1.3. TLS 1.0 and 1.1 are deprecated.</li>
      </ul>
      <p>
        For a quick automated check, try our{" "}
        <Link href="/tools/ssl-checker" className="text-[#00ff88] hover:underline">
          SSL Certificate Checker
        </Link>{" "}
        — it shows validity dates, issuer, expiry countdown, and all Subject Alternative Names (SANs) for any domain.
      </p>
    </BlogLayout>
  );
}
