import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/layout/BlogLayout";

export const metadata: Metadata = {
  title: "Password Hashing: bcrypt vs Argon2 vs SHA-256 | CyberToolkit Learn",
  description:
    "Why can't you just SHA-256 a password? Learn the difference between hashing for data integrity versus hashing for password storage — and which algorithm to use.",
  keywords: ["bcrypt vs argon2", "password hashing", "sha256 password", "how to hash passwords", "argon2 bcrypt comparison"],
  alternates: { canonical: "https://cybertoolkit.dev/blog/password-hashing-explained" },
};

const toc = [
  { id: "the-core-problem", label: "The core problem", level: 2 as const },
  { id: "why-not-sha256", label: "Why not SHA-256?", level: 2 as const },
  { id: "bcrypt", label: "bcrypt", level: 2 as const },
  { id: "argon2", label: "Argon2", level: 2 as const },
  { id: "comparison", label: "Side-by-side comparison", level: 2 as const },
  { id: "salting", label: "Salting explained", level: 2 as const },
  { id: "recommendations", label: "Practical recommendations", level: 2 as const },
];

export default function PasswordHashingPage() {
  return (
    <BlogLayout
      title="Password Hashing: bcrypt vs Argon2 vs SHA-256"
      excerpt="Why can't you just SHA-256 a password? Understanding the difference between hashing for data integrity versus hashing for password storage is critical for any developer."
      date="2024-12-02"
      readTime="9 min"
      tags={["Hashing", "Cryptography", "Intermediate"]}
      toc={toc}
    >
      <h2 id="the-core-problem">The core problem with password storage</h2>
      <p>
        Passwords should never be stored in plaintext — if your database is breached, every user's password is immediately exposed. Instead, you store a <strong>hash</strong> of the password and verify logins by hashing the entered password and comparing.
      </p>
      <p>
        But not all hash functions are equal for this purpose. The key insight is that password hashing has fundamentally different requirements than general-purpose hashing:
      </p>
      <ul>
        <li><strong>General hashing</strong> (SHA-256, SHA-512): should be <em>fast</em> — used for file integrity, digital signatures, checksums.</li>
        <li><strong>Password hashing</strong> (bcrypt, Argon2): should be <em>slow</em> — deliberately difficult to compute to resist brute-force attacks.</li>
      </ul>

      <h2 id="why-not-sha256">Why you can't just SHA-256 a password</h2>
      <p>
        SHA-256 can compute about 10 <em>billion</em> hashes per second on a modern GPU. An attacker with a breached database of SHA-256-hashed passwords can attempt the entire <code>rockyou.txt</code> wordlist (14 million common passwords) in under 2 milliseconds.
      </p>
      <p>
        Worse, <strong>rainbow tables</strong> — precomputed hash lookup tables — mean attackers don't even need to compute hashes in real time. They can look up a SHA-256 hash and retrieve the original password in microseconds if it's a common word or phrase.
      </p>
      <div className="callout-danger">
        <p className="font-medium text-red-300 mb-1">✗ Never do this</p>
        <p className="text-sm text-slate-400"><code>const hash = sha256(password)</code> — this is not password hashing. It's a catastrophic security mistake.</p>
      </div>

      <h2 id="bcrypt">bcrypt — the battle-tested standard</h2>
      <p>
        bcrypt was designed specifically for password hashing in 1999 by Niels Provos and David Mazières. Its key innovation is a <strong>cost factor</strong> (also called work factor) — a configurable parameter that determines how much computation is required.
      </p>
      <pre>{`// Node.js example
const bcrypt = require('bcrypt');
const saltRounds = 12; // cost factor

const hash = await bcrypt.hash('mypassword', saltRounds);
// $2b$12$eW6tR.../  (60-char string including salt)

const valid = await bcrypt.compare('mypassword', hash); // true`}</pre>
      <p>
        With cost factor 12, bcrypt takes roughly 250ms to hash a single password on modern hardware. That's imperceptibly slow for a user logging in once, but devastating for an attacker trying billions of guesses — at 4 hashes/second instead of 10 billion.
      </p>
      <p>
        bcrypt also automatically handles salting (more on that below) and encodes the salt, cost factor, and hash in a single output string — making it simple and hard to misuse.
      </p>

      <h2 id="argon2">Argon2 — the modern winner</h2>
      <p>
        Argon2 won the Password Hashing Competition (PHC) in 2015 and is now the recommended algorithm for new projects. It improves on bcrypt in one crucial dimension: <strong>memory hardness</strong>.
      </p>
      <p>
        bcrypt is CPU-bound — attackers can parallelize it cheaply using GPUs and ASICs. Argon2 requires a configurable amount of memory per computation. Since GPU memory is expensive and limited, this makes parallel attacks dramatically more costly.
      </p>
      <pre>{`// Node.js with argon2 package
const argon2 = require('argon2');

const hash = await argon2.hash('mypassword', {
  type: argon2.argon2id,  // recommended variant
  memoryCost: 65536,      // 64 MB
  timeCost: 3,            // 3 iterations
  parallelism: 4          // 4 threads
});

const valid = await argon2.verify(hash, 'mypassword'); // true`}</pre>
      <p>
        Argon2 has three variants: <code>argon2d</code> (GPU-resistant), <code>argon2i</code> (side-channel resistant), and <code>argon2id</code> (hybrid — recommended for passwords).
      </p>

      <h2 id="comparison">Side-by-side comparison</h2>
      <table>
        <thead>
          <tr><th>Algorithm</th><th>Speed</th><th>Memory-hard</th><th>Salt built-in</th><th>Recommended?</th></tr>
        </thead>
        <tbody>
          <tr><td><code>Argon2id</code></td><td>Slow (tunable)</td><td>✓ Yes</td><td>✓ Yes</td><td>✓ Best choice</td></tr>
          <tr><td><code>bcrypt</code></td><td>Slow (tunable)</td><td>✗ No</td><td>✓ Yes</td><td>✓ Good (widely supported)</td></tr>
          <tr><td><code>scrypt</code></td><td>Slow (tunable)</td><td>✓ Yes</td><td>Manual</td><td>✓ Acceptable</td></tr>
          <tr><td><code>PBKDF2</code></td><td>Slow (tunable)</td><td>✗ No</td><td>Manual</td><td>⚠ Last resort</td></tr>
          <tr><td><code>SHA-256</code></td><td>Fast (10B/s)</td><td>✗ No</td><td>✗ No</td><td>✗ Never</td></tr>
          <tr><td><code>MD5</code></td><td>Fastest</td><td>✗ No</td><td>✗ No</td><td>✗ Never</td></tr>
        </tbody>
      </table>

      <h2 id="salting">What is salting and why does it matter?</h2>
      <p>
        A <strong>salt</strong> is a random value added to a password before hashing. Both bcrypt and Argon2 generate this automatically. Without salting, two users with the same password would have the same hash — making a rainbow table attack viable.
      </p>
      <p>
        With salting, even if two users have the password <code>"password123"</code>, their hashes are completely different because each has a unique salt. Rainbow tables become useless, and attackers must brute-force each hash individually.
      </p>

      <h2 id="recommendations">Practical recommendations</h2>
      <ul>
        <li><strong>New projects:</strong> Use <strong>Argon2id</strong> with at minimum 64MB memory cost, 3 iterations, and 1 parallelism.</li>
        <li><strong>Existing projects:</strong> If you're already on bcrypt with cost 10+, you're fine. Consider upgrading to Argon2 on next login (re-hash after successful bcrypt verification).</li>
        <li><strong>Absolute minimum:</strong> If your platform only supports PBKDF2 (common on some cloud services), use at least 600,000 iterations with SHA-256.</li>
        <li><strong>Upgrading:</strong> Never rehash all passwords at once — users can't log in if you corrupt their hashes. Migrate progressively: hash with Argon2 after each successful login, removing old bcrypt hashes.</li>
      </ul>
      <p>
        Want to see how hash functions compare in practice?{" "}
        <Link href="/tools/hash-generator" className="text-[#00ff88] hover:underline">
          Try our Hash Generator
        </Link>{" "}
        to compute SHA-256 and SHA-512 hashes, and{" "}
        <Link href="/tools/password-strength" className="text-[#00ff88] hover:underline">
          check password strength
        </Link>{" "}
        to understand how entropy affects crack resistance.
      </p>
    </BlogLayout>
  );
}
