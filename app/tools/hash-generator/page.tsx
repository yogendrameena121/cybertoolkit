import type { Metadata } from "next";
import { Hash } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { HashGeneratorClient } from "./HashGeneratorClient";

export const metadata: Metadata = {
  title: "Free Online Hash Generator — MD5, SHA-1, SHA-256, SHA-512",
  description:
    "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes instantly in your browser. Hash text strings or files. No data sent to servers. Free and private.",
  keywords: [
    "hash generator",
    "sha256 online",
    "md5 hash generator",
    "sha512 online",
    "sha1 hash",
    "file hash checker",
    "online hash tool",
    "cryptographic hash function",
  ],
  openGraph: {
    title: "Free Online Hash Generator — MD5, SHA-256, SHA-512 | CyberToolkit",
    description:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly in your browser. No data sent to servers.",
    url: "https://cybertoolkit.dev/tools/hash-generator",
  },
  alternates: {
    canonical: "https://cybertoolkit.dev/tools/hash-generator",
  },
};

const faqs = [
  {
    question: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
    answer:
      "These are all cryptographic hash functions, but they differ in output length and security strength. MD5 produces 128-bit (32 hex chars) hashes and is considered broken for security use. SHA-1 produces 160-bit hashes and is deprecated. SHA-256 and SHA-512 (SHA-2 family) produce 256-bit and 512-bit hashes respectively and are still considered secure for most uses.",
  },
  {
    question: "Can I hash a file with this tool?",
    answer:
      "Yes! Switch to the File tab, click to upload any file, and the tool will compute hashes for all four algorithms simultaneously. The file is read locally in your browser — it is never uploaded to any server.",
  },
  {
    question: "Are MD5 and SHA-1 still safe to use?",
    answer:
      "MD5 and SHA-1 are cryptographically broken for security-sensitive applications like digital signatures and certificate generation. However, they are still commonly used for non-security purposes like file integrity checks and checksums where collision resistance is less critical.",
  },
  {
    question: "Why do two identical strings produce the same hash?",
    answer:
      "Hash functions are deterministic — the same input always produces the same output. This property makes them useful for verification. Even a tiny change in input produces a completely different hash (the avalanche effect).",
  },
  {
    question: "Can I reverse a hash back to the original text?",
    answer:
      "No. Cryptographic hash functions are one-way — it is computationally infeasible to reverse them. This is by design. Attackers use precomputed rainbow tables to crack weak/common passwords, which is why salting passwords before hashing is critical.",
  },
];

export default function HashGeneratorPage() {
  return (
    <>
      <ToolSchema
        name="Hash Generator"
        description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for text or files in your browser."
        url="https://cybertoolkit.dev/tools/hash-generator"
        category="DeveloperApplication"
      />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="Hash Generator"
        toolDescription="Generate cryptographic hashes for text or files — MD5, SHA-1, SHA-256, SHA-512"
        icon={Hash}
        category="Hashing"
        categoryHref="/tools?category=hashing"
        seoTitle="Free Online SHA-256 Hash Generator (MD5, SHA-1, SHA-512)"
        seoIntro="A cryptographic hash generator computes a fixed-size fingerprint for any input — whether a string of text or an entire file. This tool supports four of the most widely-used hash algorithms: MD5, SHA-1, SHA-256, and SHA-512. All computation happens inside your browser using the Web Crypto API, so your data is never transmitted anywhere."
        whatIsContent="A hash function takes an arbitrary amount of data and produces a fixed-length output called a hash, digest, or checksum. The output is deterministic (same input always yields same output), fast to compute, and practically impossible to reverse. Cryptographic hash functions like SHA-256 also have the avalanche effect — changing even one character in the input produces a completely different hash, making them ideal for data integrity verification, digital signatures, and password storage."
        howToSteps={[
          "Select the 'Text' or 'File' tab depending on what you want to hash.",
          "For text: type or paste your content into the input box.",
          "For files: click the upload area or drag and drop any file.",
          "The four hash values (MD5, SHA-1, SHA-256, SHA-512) compute automatically as you type.",
          "Use the copy button next to each hash to copy it to your clipboard.",
        ]}
        useCases={[
          "Verifying file integrity — compare the hash of a downloaded file against the publisher's checksum to confirm it hasn't been tampered with.",
          "Password hashing — understanding how databases store passwords (though you should use bcrypt/Argon2 in production, not raw SHA-256).",
          "Digital forensics — generating hash evidence of files at a point in time to prove they haven't been modified.",
          "CTF (Capture The Flag) challenges — identifying hash types and cracking weak hashes.",
          "API authentication — computing HMAC-style request signatures (though this tool computes plain hashes, not HMACs).",
          "Deduplication — comparing file hashes to identify duplicate files.",
        ]}
        isSafeContent="Completely safe. This tool uses the Web Crypto API, a browser-native cryptography library built into every modern browser. Your input text or file data is processed entirely within your browser's JavaScript sandbox and never leaves your device. You can verify this by opening your browser's DevTools (F12), navigating to the Network tab, and confirming that no requests are made when you type or upload."
        relatedTools={[
          {
            name: "Base64 Encoder / Decoder",
            href: "/tools/base64",
            description: "Encode and decode Base64 strings",
          },
          {
            name: "Password Strength Meter",
            href: "/tools/password-strength",
            description: "Analyze password strength and crack time",
          },
          {
            name: "JWT Decoder",
            href: "/tools/jwt-decoder",
            description: "Decode and inspect JWT tokens",
          },
        ]}
        faqs={faqs}
      >
        <HashGeneratorClient />
      </ToolLayout>
    </>
  );
}
