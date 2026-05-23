import type { Metadata } from "next";
import { Link2 } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { URLEncoderClient } from "./URLEncoderClient";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder — Online URI Component Tool",
  description:
    "Encode and decode URL strings and URI components online. Supports encodeURIComponent, encodeURI, and full URL encoding. Shows character-by-character diff. Free and browser-based.",
  keywords: ["url encoder", "url decoder", "urlencode online", "percent encoding", "uri encoder", "encode url", "decode url"],
  alternates: { canonical: "https://cybertoolkit-nu.vercel.app/tools/url-encoder" },
};

const faqs = [
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer: "encodeURI encodes a full URL but preserves characters that have special meaning in URLs (like :, /, ?, #). encodeURIComponent encodes a single URL component (like a query parameter value) and also encodes those special characters. Use encodeURIComponent for query string values.",
  },
  {
    question: "What is percent encoding?",
    answer: "Percent encoding (URL encoding) replaces unsafe ASCII characters and non-ASCII characters with a % sign followed by two hexadecimal digits representing the byte value. For example, a space becomes %20.",
  },
  {
    question: "Why does + sometimes mean a space in URLs?",
    answer: "In the query string portion of a URL (application/x-www-form-urlencoded format), + is treated as a space. This is a legacy convention from HTML forms. encodeURIComponent uses %20 for spaces, not +.",
  },
];

export default function URLEncoderPage() {
  return (
    <>
      <ToolSchema name="URL Encoder / Decoder" description="Encode and decode URL strings and URI components online." url="https://cybertoolkit-nu.vercel.app/tools/url-encoder" category="DeveloperApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="URL Encoder / Decoder"
        toolDescription="Encode and decode URLs and URI components with character diff view"
        icon={Link2}
        category="Encoding"
        categoryHref="/tools?category=encoding"
        seoTitle="Free Online URL Encoder and Decoder"
        seoIntro="URL encoding (percent encoding) converts characters that are not safe in URLs into a %-prefixed hexadecimal representation. This tool supports three encoding modes: encodeURIComponent (for query values), encodeURI (for full URLs), and decoding back to plain text."
        whatIsContent="URLs can only contain a safe subset of ASCII characters. Characters outside this set — like spaces, Unicode characters, and reserved symbols — must be percent-encoded before being used in a URL. Percent encoding replaces each unsafe byte with % followed by two hex digits. For example, a space becomes %20 and an at-sign becomes %40."
        howToSteps={[
          "Choose Encode or Decode mode.",
          "Select the encoding type: encodeURIComponent (for query params) or encodeURI (for full URLs).",
          "Paste your text or URL into the input box.",
          "The encoded or decoded result appears instantly.",
          "The diff view shows exactly which characters were changed.",
        ]}
        useCases={[
          "Encoding query string parameters before appending them to URLs.",
          "Decoding URL-encoded strings from server logs or API responses.",
          "Debugging malformed URLs with unexpected percent-encoded characters.",
          "CTF challenges with URL-encoded payloads.",
        ]}
        isSafeContent="All encoding and decoding uses native browser JavaScript functions (encodeURIComponent, decodeURIComponent, encodeURI, decodeURI). No data is transmitted. The tool works entirely offline once loaded."
        relatedTools={[
          { name: "Base64 Encoder", href: "/tools/base64", description: "Encode/decode Base64 strings" },
          { name: "JWT Decoder", href: "/tools/jwt-decoder", description: "Decode JSON Web Tokens" },
          { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate cryptographic hashes" },
        ]}
        faqs={faqs}
      >
        <URLEncoderClient />
      </ToolLayout>
    </>
  );
}
