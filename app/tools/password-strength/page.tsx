import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { PasswordStrengthClient } from "./PasswordStrengthClient";

export const metadata: Metadata = {
  title: "Password Strength Checker — Time to Crack Estimator",
  description:
    "Check your password strength with a time-to-crack estimate. Get specific suggestions to improve your password. 100% client-side — your password never leaves your browser.",
  keywords: [
    "password strength checker",
    "password strength meter",
    "how strong is my password",
    "time to crack password",
    "password security checker",
    "strong password test",
  ],
  alternates: { canonical: "https://cybertoolkit.dev/tools/password-strength" },
};

const faqs = [
  {
    question: "Is my password safe to enter here?",
    answer:
      "Yes. This tool runs entirely in your browser — your password never leaves your device. No JavaScript network requests are made when you type. You can verify this in your browser DevTools Network tab.",
  },
  {
    question: "How is the time-to-crack estimate calculated?",
    answer:
      "The estimate is based on the password's entropy (bits of randomness) and an assumed attack rate of 10 billion guesses per second — the speed of a modern GPU-based cracking rig. It is a rough estimate intended to illustrate the importance of length and complexity.",
  },
  {
    question: "What makes a password truly strong?",
    answer:
      "Length is the most important factor. A 20-character passphrase of random words is stronger than an 8-character mix of symbols. Use at least 16 characters, mix character types, and avoid dictionary words or personal information.",
  },
  {
    question: "Should I use a password manager?",
    answer:
      "Absolutely. Password managers like 1Password or Bitwarden can generate and store unique, high-entropy passwords for every site. You only need to remember one strong master password.",
  },
];

export default function PasswordStrengthPage() {
  return (
    <>
      <ToolSchema
        name="Password Strength Meter"
        description="Check password strength with time-to-crack estimates and improvement suggestions."
        url="https://cybertoolkit.dev/tools/password-strength"
        category="SecurityApplication"
      />
      <FAQSchema faqs={faqs} />
      <ToolLayout
        toolName="Password Strength Meter"
        toolDescription="Analyze password strength with time-to-crack estimates — 100% client-side"
        icon={Lock}
        category="Password"
        categoryHref="/tools?category=password"
        seoTitle="Password Strength Checker — Time-to-Crack Estimator"
        seoIntro="A strong password is your first line of defense against account compromise. This tool analyzes your password's complexity, entropy, and patterns to give you a realistic strength score and time-to-crack estimate. Everything runs in your browser — your password is never transmitted anywhere."
        whatIsContent="Password strength is a measure of how long it would take an attacker using automated tools to guess your password. Strength depends on length, character set diversity (lowercase, uppercase, numbers, symbols), and absence of predictable patterns. Entropy — measured in bits — is the mathematical measure of randomness. Each bit doubles the number of possible values, so a 60-bit password requires roughly a trillion times more guesses than a 20-bit password."
        howToSteps={[
          "Type your password into the input field. The strength analysis updates in real time.",
          "Use the eye icon to toggle visibility if you need to see what you're typing.",
          "Review the strength bar and time-to-crack estimate.",
          "Read the specific suggestions below to understand how to improve your password.",
          "Try variations until you reach 'Strong' (green) status.",
        ]}
        useCases={[
          "Evaluating new passwords before using them for important accounts.",
          "Understanding why short or simple passwords are easily cracked.",
          "Teaching users about password security in security awareness training.",
          "CTF challenges involving password policy analysis.",
        ]}
        isSafeContent="This tool is designed from the ground up for privacy. Your password is processed entirely within the browser's JavaScript engine. No network requests are made. The tool uses pure JavaScript math — no external APIs, no telemetry, no logging. You can verify this by opening DevTools and watching the Network tab as you type."
        relatedTools={[
          { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate cryptographic hashes" },
          { name: "UUID Generator", href: "/tools/uuid-generator", description: "Generate random UUIDs" },
          { name: "Base64 Encoder", href: "/tools/base64", description: "Encode/decode Base64" },
        ]}
        faqs={faqs}
        affiliateNote={
          <p>
            <strong className="text-slate-300">Tip:</strong> For securely storing and generating strong passwords, consider a dedicated password manager like{" "}
            <a href="https://1password.com" target="_blank" rel="noopener noreferrer sponsored" className="text-[#00ff88] hover:underline">
              1Password
            </a>{" "}
            or the free and open-source{" "}
            <a href="https://bitwarden.com" target="_blank" rel="noopener noreferrer sponsored" className="text-[#00ff88] hover:underline">
              Bitwarden
            </a>
            .
          </p>
        }
      >
        <PasswordStrengthClient />
      </ToolLayout>
    </>
  );
}
