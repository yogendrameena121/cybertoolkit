import type { Metadata } from "next";
import { Key } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { JWTDecoderClient } from "./JWTDecoderClient";

export const metadata: Metadata = {
  title: "JWT Decoder & Inspector — Decode JSON Web Tokens Online",
  description:
    "Decode and inspect JWT tokens in your browser. View header, payload, expiry time, and validation status. No server calls — fully client-side.",
  keywords: ["jwt decoder", "json web token decoder", "jwt inspector", "decode jwt online", "jwt header payload"],
  alternates: { canonical: "https://cybertoolkit.dev/tools/jwt-decoder" },
};

const faqs = [
  {
    question: "Can this tool validate JWT signatures?",
    answer: "No. Signature validation requires the secret key or public key used to sign the token. This tool only decodes the base64url-encoded header and payload — it cannot verify the signature without the key. Only your server should perform signature validation.",
  },
  {
    question: "Is it safe to paste a real JWT here?",
    answer: "Since this tool is fully client-side, your JWT is processed only in your browser. However, as a best practice, avoid pasting production JWTs — especially bearer tokens — into any third-party tool. Use test or expired tokens for inspection.",
  },
  {
    question: "What are the three parts of a JWT?",
    answer: "A JWT consists of three Base64URL-encoded parts separated by dots: (1) Header — the algorithm and token type, (2) Payload — the claims (data), and (3) Signature — a cryptographic signature to verify the token wasn't tampered with.",
  },
  {
    question: "What does 'exp' mean in the payload?",
    answer: "The 'exp' (expiration time) claim is a Unix timestamp after which the token should no longer be accepted. This tool automatically decodes it to a human-readable date and highlights whether the token is expired.",
  },
];

export default function JWTDecoderPage() {
  return (
    <>
      <ToolSchema name="JWT Decoder" description="Decode and inspect JSON Web Tokens in your browser." url="https://cybertoolkit.dev/tools/jwt-decoder" category="DeveloperApplication" />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="JWT Decoder & Inspector"
        toolDescription="Decode JWT header, payload, and inspect expiry — all in your browser"
        icon={Key}
        category="Encoding"
        categoryHref="/tools?category=encoding"
        seoTitle="Free Online JWT Decoder & Inspector"
        seoIntro="JSON Web Tokens (JWTs) are widely used for authentication and authorization in modern web applications. This tool decodes the Base64URL-encoded header and payload of any JWT, shows you the claims in formatted JSON, and tells you whether the token is expired — all without sending your token to any server."
        whatIsContent="A JSON Web Token (JWT) is a compact, URL-safe way to represent claims between two parties. It consists of three Base64URL-encoded sections: the Header (algorithm and type), the Payload (claims like user ID, roles, expiry), and the Signature (cryptographic proof of integrity). The token is typically passed in HTTP Authorization headers as 'Bearer <token>' and is decoded and verified by the receiving server."
        howToSteps={[
          "Paste your JWT token into the input field.",
          "The tool automatically splits it at the dots and decodes each section.",
          "Review the Header for the signing algorithm (e.g., HS256, RS256).",
          "Review the Payload for claims like sub (subject), exp (expiry), iat (issued at).",
          "Check the expiry status — the tool highlights if the token is expired.",
        ]}
        useCases={[
          "Debugging authentication issues — inspect the claims your server is receiving.",
          "Verifying token expiry without implementing a full decode in code.",
          "Security auditing — check what data is encoded in tokens (remember: JWTs are encoded, not encrypted by default).",
          "Learning and education — understand the structure of JWTs.",
          "CTF challenges involving JWT manipulation or analysis.",
        ]}
        isSafeContent="This tool runs entirely client-side. Your JWT is never sent to any server. The decoding uses standard Base64URL decoding which is built into every browser. That said, avoid pasting real production tokens as a general security hygiene practice — use test tokens or expired ones for inspection."
        relatedTools={[
          { name: "Base64 Encoder", href: "/tools/base64", description: "Encode/decode Base64 strings" },
          { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate cryptographic hashes" },
          { name: "URL Encoder", href: "/tools/url-encoder", description: "Encode/decode URLs" },
        ]}
        faqs={faqs}
      >
        <JWTDecoderClient />
      </ToolLayout>
    </>
  );
}
