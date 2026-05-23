import type { Metadata } from "next";
import { Binary } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Base64Client } from "./Base64Client";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — Online Tool with Unicode Support",
  description:
    "Encode and decode Base64 strings online. Handles Unicode, UTF-8, and auto-detects Base64 input. 100% browser-based. Free and private.",
  keywords: ["base64 encoder", "base64 decoder", "base64 online", "encode base64", "decode base64", "base64 to text"],
  alternates: { canonical: "https://cybertoolkit-nu.vercel.app/tools/base64" },
};

const faqs = [
  {
    question: "What is Base64 encoding?",
    answer: "Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It is used to safely transmit binary data over systems that only support text, such as email (MIME) and JSON APIs.",
  },
  {
    question: "Does Base64 compress data?",
    answer: "No — Base64 encoding actually increases data size by approximately 33%. It is not a compression algorithm; it is an encoding scheme for safe text transport.",
  },
  {
    question: "What is the difference between Base64 and Base64URL?",
    answer: "Base64URL replaces + with - and / with _ to make the output URL-safe (no characters that need percent-encoding). It is used in JWTs and other URL contexts.",
  },
  {
    question: "Is Base64 encryption?",
    answer: "No. Base64 is encoding, not encryption. Anyone who sees a Base64 string can instantly decode it — there is no key or secret involved. Never use Base64 to 'hide' sensitive data.",
  },
];

export default function Base64Page() {
  return (
    <>
      <ToolSchema name="Base64 Encoder / Decoder" description="Encode and decode Base64 strings with Unicode support." url="https://cybertoolkit-nu.vercel.app/tools/base64" category="DeveloperApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="Base64 Encoder / Decoder"
        toolDescription="Encode and decode Base64 with full Unicode/UTF-8 support"
        icon={Binary}
        category="Encoding"
        categoryHref="/tools?category=encoding"
        seoTitle="Free Online Base64 Encoder and Decoder"
        seoIntro="Base64 encoding converts binary data into a text-safe format using 64 printable ASCII characters. This tool lets you encode any text (including Unicode/emoji) to Base64, or decode any Base64 string back to its original content. All processing happens in your browser — nothing is sent to a server."
        whatIsContent="Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. Each Base64 digit represents exactly 6 bits of data, and three bytes of input produce four Base64 characters. It is commonly used in email attachments (MIME), embedding images in HTML/CSS as data URIs, and encoding binary data in JSON or XML. The URL-safe variant (Base64URL) replaces + and / with - and _ for use in URLs and JWTs."
        howToSteps={[
          "Select 'Encode' or 'Decode' mode using the toggle buttons.",
          "Type or paste your text into the input area.",
          "The output is computed instantly.",
          "Use the copy button to copy the result to your clipboard.",
          "Toggle 'URL-safe' to use Base64URL encoding (replaces + with - and / with _).",
        ]}
        useCases={[
          "Encoding binary file data for inclusion in JSON API responses.",
          "Creating data URIs for inline images in HTML or CSS.",
          "Encoding credentials for HTTP Basic Authentication headers.",
          "Decoding Base64-encoded data from APIs or JWT payloads.",
          "CTF challenges involving Base64-encoded secrets or flags.",
        ]}
        isSafeContent="All encoding and decoding is done in your browser using native JavaScript (btoa/atob with TextEncoder for Unicode support). No data is sent to any server. You can confirm this by watching the Network tab in your browser DevTools."
        relatedTools={[
          { name: "JWT Decoder", href: "/tools/jwt-decoder", description: "Decode Base64URL-encoded JWTs" },
          { name: "URL Encoder", href: "/tools/url-encoder", description: "Encode/decode URLs" },
          { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate cryptographic hashes" },
        ]}
        faqs={faqs}
      >
        <Base64Client />
      </ToolLayout>
    </>
  );
}
