import type { Metadata } from "next";
import { Fingerprint } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { UUIDGeneratorClient } from "./UUIDGeneratorClient";

export const metadata: Metadata = {
  title: "UUID / GUID Generator — Generate RFC 4122 v4 UUIDs Online",
  description:
    "Generate RFC 4122 UUID v4 identifiers instantly. Bulk generation, multiple formats (standard, no dashes, uppercase, GUID). 100% browser-based.",
  keywords: ["uuid generator", "guid generator", "random uuid", "uuid v4", "generate uuid online", "unique id generator"],
  alternates: { canonical: "https://cybertoolkit.dev/tools/uuid-generator" },
};

const faqs = [
  {
    question: "What is a UUID?",
    answer: "A UUID (Universally Unique Identifier) is a 128-bit identifier standardized by RFC 4122. It is typically expressed as 32 hex digits separated by hyphens in the format 8-4-4-4-12. The chance of two randomly generated UUID v4s colliding is astronomically small.",
  },
  {
    question: "What is the difference between UUID and GUID?",
    answer: "A GUID (Globally Unique Identifier) is Microsoft's implementation of UUID. They are functionally identical — both are 128-bit identifiers following the same RFC 4122 standard. The term GUID is common in .NET and Windows environments.",
  },
  {
    question: "Is UUID v4 truly random?",
    answer: "UUID v4 uses random or pseudo-random numbers for all bits except the version (4) and variant bits. This tool uses crypto.randomUUID() or the Web Crypto API, which provides cryptographically secure random numbers.",
  },
  {
    question: "Can I use these UUIDs in a database?",
    answer: "Yes. UUID v4 is widely used as primary keys in databases (PostgreSQL, MySQL, MongoDB, etc.). Be aware that random UUIDs can cause index fragmentation in clustered indexes — some databases offer UUID v7 (time-ordered) for better performance.",
  },
];

export default function UUIDGeneratorPage() {
  return (
    <>
      <ToolSchema name="UUID / GUID Generator" description="Generate RFC 4122 UUID v4 identifiers in your browser." url="https://cybertoolkit.dev/tools/uuid-generator" category="DeveloperApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="UUID / GUID Generator"
        toolDescription="Generate RFC 4122 v4 UUIDs — bulk generation and multiple formats"
        icon={Fingerprint}
        category="Web"
        categoryHref="/tools?category=web"
        seoTitle="Free Online UUID / GUID Generator — RFC 4122 v4"
        seoIntro="UUID (Universally Unique Identifier) v4 generates random 128-bit identifiers with an astronomically low collision probability. This tool uses your browser's cryptographically secure random number generator to produce UUIDs in multiple formats: standard, no-dashes, uppercase, and GUID-style braces."
        whatIsContent="A UUID is a 128-bit label used for information in computer systems. Version 4 UUIDs are randomly generated, making them suitable as unique identifiers for database records, session tokens, file names, and API resources. The probability of generating a duplicate UUID v4 among 1 trillion UUIDs is approximately 1 in a billion — for practical purposes, collisions are impossible."
        howToSteps={[
          "Click 'Generate' to produce a single UUID.",
          "Adjust the count slider to generate up to 100 UUIDs at once.",
          "Select your preferred format: standard, no dashes, uppercase, or GUID braces.",
          "Click the copy icon next to any UUID, or 'Copy All' to copy the full list.",
          "Click 'Regenerate' to produce a fresh batch.",
        ]}
        useCases={[
          "Database primary keys — unique record identifiers in PostgreSQL, MySQL, MongoDB.",
          "Session tokens and request IDs for web applications.",
          "File naming — unique names for uploaded files to prevent collisions.",
          "Testing and development — generating test data with unique identifiers.",
          "Distributed systems — generating IDs without a central coordinator.",
        ]}
        isSafeContent="UUIDs are generated using crypto.randomUUID() where available, or the Web Crypto API (crypto.getRandomValues) as a fallback. Both are cryptographically secure random number generators built into every modern browser. No data is sent anywhere."
        relatedTools={[
          { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate cryptographic hashes" },
          { name: "Password Strength", href: "/tools/password-strength", description: "Analyze password strength" },
          { name: "Base64 Encoder", href: "/tools/base64", description: "Encode/decode Base64" },
        ]}
        faqs={faqs}
      >
        <UUIDGeneratorClient />
      </ToolLayout>
    </>
  );
}
