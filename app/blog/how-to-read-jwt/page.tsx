import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/layout/BlogLayout";

export const metadata: Metadata = {
  title: "How to Read a JWT Token | CyberToolkit Learn",
  description:
    "JSON Web Tokens are everywhere in modern authentication. Learn how to decode and understand the header, payload, signature, and claims inside any JWT.",
  keywords: ["how to read jwt", "jwt explained", "decode jwt", "jwt header payload signature", "json web token tutorial"],
  alternates: { canonical: "https://cybertoolkit-nu.vercel.app/blog/how-to-read-jwt" },
};

const toc = [
  { id: "what-is-jwt", label: "What is a JWT?", level: 2 as const },
  { id: "three-parts", label: "The three parts", level: 2 as const },
  { id: "header", label: "The header", level: 3 as const },
  { id: "payload", label: "The payload", level: 3 as const },
  { id: "signature", label: "The signature", level: 3 as const },
  { id: "standard-claims", label: "Standard claims", level: 2 as const },
  { id: "decoding-manually", label: "Decoding manually", level: 2 as const },
  { id: "security-gotchas", label: "Security gotchas", level: 2 as const },
  { id: "try-it", label: "Try decoding one", level: 2 as const },
];

export default function HowToReadJWTPage() {
  return (
    <BlogLayout
      title="How to Read a JWT Token"
      excerpt="JSON Web Tokens are everywhere in modern web authentication — but most developers use them without understanding what's inside. This guide decodes the mystery."
      date="2024-11-18"
      readTime="8 min"
      tags={["JWT", "Authentication", "Web Security"]}
      toc={toc}
    >
      <h2 id="what-is-jwt">What is a JWT?</h2>
      <p>
        A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe way to represent claims between two parties. In practice, you encounter them as opaque-looking strings in HTTP headers:
      </p>
      <pre>{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}</pre>
      <p>
        That jumble of characters is not random — it has a precise, documented structure. Once you know how to read it, JWTs become transparent.
      </p>

      <h2 id="three-parts">The three parts</h2>
      <p>
        Every JWT consists of exactly three sections, separated by dots (<code>.</code>):
      </p>
      <pre>{`HEADER.PAYLOAD.SIGNATURE`}</pre>
      <p>
        Each section is <strong>Base64URL-encoded</strong> — a URL-safe variant of Base64 that replaces <code>+</code> with <code>-</code> and <code>/</code> with <code>_</code>. This is not encryption. Anyone can decode these sections instantly.
      </p>

      <h3 id="header">The header</h3>
      <p>
        The first section is the <strong>header</strong>. It identifies the token type and the signing algorithm used:
      </p>
      <pre>{`// Base64URL: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// Decoded:
{
  "alg": "HS256",
  "typ": "JWT"
}`}</pre>
      <ul>
        <li><code>alg</code> — the signing algorithm. Common values: <code>HS256</code> (HMAC-SHA256), <code>RS256</code> (RSA-SHA256), <code>ES256</code> (ECDSA).</li>
        <li><code>typ</code> — always <code>"JWT"</code> for standard tokens.</li>
      </ul>
      <div className="callout-warning">
        <p className="font-medium text-yellow-300 mb-1">⚠ Security note</p>
        <p className="text-sm text-slate-400">Never set <code>alg</code> to <code>"none"</code> on the server side. This disables signature verification entirely and has been exploited in many real-world attacks.</p>
      </div>

      <h3 id="payload">The payload</h3>
      <p>
        The second section is the <strong>payload</strong>, containing the actual data (called <em>claims</em>). This is where user identity, roles, and expiry information live:
      </p>
      <pre>{`// Base64URL: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
// Decoded:
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`}</pre>
      <p>
        The payload can contain any JSON object. There are three categories of claims:
      </p>
      <ul>
        <li><strong>Registered claims</strong> — standardized claims with short names: <code>sub</code>, <code>iss</code>, <code>exp</code>, <code>iat</code>, <code>nbf</code>, <code>aud</code>, <code>jti</code>.</li>
        <li><strong>Public claims</strong> — custom claims registered with IANA, like <code>email</code> or <code>name</code>.</li>
        <li><strong>Private claims</strong> — application-specific claims agreed between parties, like <code>role</code> or <code>permissions</code>.</li>
      </ul>

      <h3 id="signature">The signature</h3>
      <p>
        The third section is the <strong>signature</strong>. It's computed by the server that issued the token:
      </p>
      <pre>{`HMACSHA256(
  base64url(header) + "." + base64url(payload),
  secret_key
)`}</pre>
      <p>
        The signature proves two things: (1) the token came from a trusted issuer who knows the secret key, and (2) the header and payload haven't been modified since issuance. If even one character changes, the signature becomes invalid.
      </p>
      <p>
        Crucially, the signature <em>only</em> verifies integrity and authenticity — it does not encrypt the payload. Anyone who intercepts a JWT can read the header and payload. Never put sensitive data (passwords, credit cards, SSNs) in a JWT payload.
      </p>

      <h2 id="standard-claims">Standard claims — what each field means</h2>
      <table>
        <thead>
          <tr><th>Claim</th><th>Name</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>sub</code></td><td>Subject</td><td>The user or entity the token refers to (usually a user ID)</td></tr>
          <tr><td><code>iss</code></td><td>Issuer</td><td>The server that created the token (e.g., <code>auth.myapp.com</code>)</td></tr>
          <tr><td><code>aud</code></td><td>Audience</td><td>The intended recipient of the token</td></tr>
          <tr><td><code>exp</code></td><td>Expiry</td><td>Unix timestamp after which the token must not be accepted</td></tr>
          <tr><td><code>iat</code></td><td>Issued At</td><td>Unix timestamp when the token was created</td></tr>
          <tr><td><code>nbf</code></td><td>Not Before</td><td>Unix timestamp before which the token must not be accepted</td></tr>
          <tr><td><code>jti</code></td><td>JWT ID</td><td>Unique identifier to prevent replay attacks</td></tr>
        </tbody>
      </table>

      <h2 id="decoding-manually">Decoding a JWT manually</h2>
      <p>
        You can decode any JWT yourself in seconds. Take the first section (before the first dot) and Base64URL-decode it. In JavaScript:
      </p>
      <pre>{`const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
const [headerB64, payloadB64] = token.split('.');

// Decode header
const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
console.log(header); // { alg: "HS256", typ: "JWT" }

// Decode payload
const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
console.log(payload); // { sub: "1234567890" }`}</pre>

      <h2 id="security-gotchas">Security gotchas every developer should know</h2>
      <ul>
        <li>
          <strong>JWTs are not sessions.</strong> A signed JWT is valid until it expires — you can't easily revoke one mid-lifetime. If a token is stolen, it remains valid. Design your expiry strategy carefully (short-lived access tokens + long-lived refresh tokens is the standard pattern).
        </li>
        <li>
          <strong>Always verify the signature server-side.</strong> Never trust a client-provided JWT without cryptographic verification. Use a well-maintained library (<code>jsonwebtoken</code> for Node, <code>PyJWT</code> for Python) — don't roll your own.
        </li>
        <li>
          <strong>Don't store sensitive data in the payload.</strong> The payload is Base64-encoded, not encrypted. It is readable by anyone. Use JWE (JSON Web Encryption) if you need confidential payload data.
        </li>
        <li>
          <strong>Check the <code>exp</code> claim.</strong> Libraries handle this automatically, but if you're parsing manually, always verify the token hasn't expired before trusting its claims.
        </li>
        <li>
          <strong>Avoid the <code>none</code> algorithm.</strong> Some libraries historically accepted <code>{`"alg": "none"`}</code> to bypass signature verification. Always explicitly specify allowed algorithms in your verification code.
        </li>
      </ul>

      <h2 id="try-it">Try decoding a JWT</h2>
      <p>
        The fastest way to internalize this is to decode a real token. Our{" "}
        <Link href="/tools/jwt-decoder" className="text-[#00ff88] hover:underline">
          JWT Decoder
        </Link>{" "}
        splits any token into its three parts, pretty-prints the JSON, decodes all timestamp claims to human-readable dates, and tells you if the token is expired — all in your browser, with no data sent to any server.
      </p>
    </BlogLayout>
  );
}
