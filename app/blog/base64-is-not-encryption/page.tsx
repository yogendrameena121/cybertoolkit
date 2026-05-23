import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/layout/BlogLayout";

export const metadata: Metadata = {
  title: "Base64 is Not Encryption | CyberToolkit Learn",
  description:
    "Base64-encoded strings look like gibberish — but they're trivially decodable. Understand the critical difference between encoding, encryption, and hashing.",
  keywords: ["base64 encryption myth", "base64 vs encryption", "is base64 secure", "base64 not safe", "encoding vs encryption"],
  alternates: { canonical: "https://cybertoolkit.dev/blog/base64-is-not-encryption" },
};

const toc = [
  { id: "the-myth", label: "The myth", level: 2 as const },
  { id: "encoding-vs-encryption", label: "Encoding vs encryption vs hashing", level: 2 as const },
  { id: "what-base64-does", label: "What Base64 actually does", level: 2 as const },
  { id: "where-it-matters", label: "Why this matters in practice", level: 2 as const },
  { id: "real-uses", label: "Legitimate uses of Base64", level: 2 as const },
  { id: "what-to-use-instead", label: "What to use for security", level: 2 as const },
];

export default function Base64NotEncryptionPage() {
  return (
    <BlogLayout
      title="Base64 is Not Encryption (And Why That Matters)"
      excerpt="Base64-encoded strings look like gibberish — but they're trivially decodable by anyone. Understand the difference between encoding, encryption, and hashing."
      date="2024-12-08"
      readTime="5 min"
      tags={["Encoding", "Beginner", "Cryptography"]}
      toc={toc}
    >
      <h2 id="the-myth">The myth</h2>
      <p>
        Base64 produces strings like <code>SGVsbG8gV29ybGQ=</code> that look cryptic and unreadable to most people. This has led to a common and dangerous misconception: that Base64 encoding provides some form of security or obscurity.
      </p>
      <p>
        It does not. Base64 is trivially reversible by anyone in under a second, using tools built into every browser, programming language, and operating system.
      </p>
      <pre>{`// Decode it instantly in any browser console
atob("SGVsbG8gV29ybGQ=")
// → "Hello World"`}</pre>

      <h2 id="encoding-vs-encryption">Encoding vs encryption vs hashing</h2>
      <p>
        These three terms describe fundamentally different operations, often confused with each other:
      </p>
      <ul>
        <li>
          <strong>Encoding</strong> — transforms data into a different representation for compatibility. Reversible by anyone. No secret key. Examples: Base64, URL encoding, UTF-8, HTML entities.
        </li>
        <li>
          <strong>Encryption</strong> — transforms data into ciphertext using a secret key. Only reversible with the correct key. Provides confidentiality. Examples: AES, RSA, ChaCha20.
        </li>
        <li>
          <strong>Hashing</strong> — transforms data into a fixed-size digest. One-way (not reversible). No key. Provides integrity and fingerprinting. Examples: SHA-256, bcrypt, MD5.
        </li>
      </ul>
      <div className="callout">
        <p className="font-medium text-[#00d4ff] mb-1">ℹ Quick test</p>
        <p className="text-sm text-slate-400">If you can reverse it without a key → it's <strong>encoding</strong>. If you need a key to reverse it → it's <strong>encryption</strong>. If you can't reverse it at all → it's a <strong>hash</strong>.</p>
      </div>

      <h2 id="what-base64-does">What Base64 actually does</h2>
      <p>
        Base64 encodes binary data using only 64 printable ASCII characters (A–Z, a–z, 0–9, +, /). Every 3 bytes of input become 4 Base64 characters. The result is approximately 33% larger than the original.
      </p>
      <p>
        Its purpose is purely to make binary data safe for transmission over systems that only support text — such as email (MIME), JSON, XML, or HTTP headers. It was never designed to provide security.
      </p>

      <h2 id="where-it-matters">Why this matters in practice</h2>
      <p>
        Misunderstanding Base64 as a security mechanism leads to real vulnerabilities:
      </p>
      <ul>
        <li>
          <strong>Credentials in environment variables or config files:</strong> Storing passwords or API keys as Base64 in a config file provides zero protection — anyone with file access can decode them instantly.
        </li>
        <li>
          <strong>JWT payloads:</strong> JWT tokens use Base64URL encoding for their header and payload. This means all claims in the payload (user ID, roles, email) are readable by anyone who intercepts or possesses the token — they're not encrypted unless JWE is used.
        </li>
        <li>
          <strong>HTTP Basic Authentication:</strong> The <code>Authorization: Basic</code> header Base64-encodes <code>username:password</code>. This is why Basic Auth must only ever be used over HTTPS — the credentials are trivially decoded otherwise.
        </li>
      </ul>
      <div className="callout-danger">
        <p className="font-medium text-red-300 mb-1">✗ This is not secure</p>
        <p className="text-sm text-slate-400"><code>const "secret" = btoa("mySecretPassword")</code> — you've hidden nothing. Any attacker who sees this can decode it in under a second.</p>
      </div>

      <h2 id="real-uses">Legitimate uses of Base64</h2>
      <p>
        Base64 is a useful and widely-used tool — just not for security:
      </p>
      <ul>
        <li>Embedding images in HTML/CSS as data URIs: <code>data:image/png;base64,iVBOR...</code></li>
        <li>Encoding binary attachments in email (MIME)</li>
        <li>Representing binary data in JSON APIs</li>
        <li>HTTP Basic Auth credentials (over HTTPS only)</li>
        <li>Encoding the payload sections of JWT tokens</li>
        <li>Encoding binary data for storage in text fields</li>
      </ul>

      <h2 id="what-to-use-instead">What to use for actual security</h2>
      <table>
        <thead>
          <tr><th>Goal</th><th>Use</th></tr>
        </thead>
        <tbody>
          <tr><td>Hide data from observers in transit</td><td>TLS (HTTPS)</td></tr>
          <tr><td>Encrypt data at rest</td><td>AES-256-GCM</td></tr>
          <tr><td>Store passwords securely</td><td>bcrypt or Argon2id</td></tr>
          <tr><td>Verify data integrity</td><td>SHA-256 or SHA-512</td></tr>
          <tr><td>Authenticate messages (HMAC)</td><td>HMAC-SHA256</td></tr>
          <tr><td>Encode binary data as text</td><td>Base64 ✓ (for this purpose only)</td></tr>
        </tbody>
      </table>
      <p>
        Experiment with encoding using our{" "}
        <Link href="/tools/base64" className="text-[#00ff88] hover:underline">
          Base64 Encoder/Decoder
        </Link>{" "}
        — decode any Base64 string instantly to see exactly how non-secret it is. For JWT payload exploration, try our{" "}
        <Link href="/tools/jwt-decoder" className="text-[#00ff88] hover:underline">
          JWT Decoder
        </Link>
        .
      </p>
    </BlogLayout>
  );
}
