import {
  Hash,
  Binary,
  Lock,
  Key,
  Link2,
  Globe,
  Shield,
  Search,
  Bug,
  Fingerprint,
} from "lucide-react";
import type { Tool } from "@/components/tools/ToolCard";

export const ALL_TOOLS: Tool[] = [
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for text or files instantly in your browser.",
    href: "/tools/hash-generator",
    icon: Hash,
    category: "hashing",
    difficulty: "Beginner",
    popular: true,
  },
  {
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 strings with Unicode support. Detects encoded input automatically.",
    href: "/tools/base64",
    icon: Binary,
    category: "encoding",
    difficulty: "Beginner",
    popular: true,
  },
  {
    name: "Password Strength Meter",
    description: "Analyze password strength with time-to-crack estimates and improvement suggestions.",
    href: "/tools/password-strength",
    icon: Lock,
    category: "password",
    difficulty: "Beginner",
    popular: true,
  },
  {
    name: "JWT Decoder & Inspector",
    description: "Decode and inspect JSON Web Tokens. View header, payload, expiry, and validation status.",
    href: "/tools/jwt-decoder",
    icon: Key,
    category: "encoding",
    difficulty: "Intermediate",
    popular: true,
  },
  {
    name: "URL Encoder / Decoder",
    description: "Encode and decode URLs and URI components. See exactly which characters changed.",
    href: "/tools/url-encoder",
    icon: Link2,
    category: "encoding",
    difficulty: "Beginner",
  },
  {
    name: "IP Address Lookup",
    description: "Look up geolocation, ISP, ASN, and timezone for any IP address. Auto-detects your own IP.",
    href: "/tools/ip-lookup",
    icon: Globe,
    category: "network",
    difficulty: "Beginner",
    popular: true,
  },
  {
    name: "SSL Certificate Checker",
    description: "Verify SSL/TLS certificate validity, expiry dates, and chain for any domain.",
    href: "/tools/ssl-checker",
    icon: Shield,
    category: "network",
    difficulty: "Intermediate",
  },
  {
    name: "WHOIS Domain Lookup",
    description: "Query WHOIS data for any domain: registrar, creation date, expiry, and nameservers.",
    href: "/tools/whois",
    icon: Search,
    category: "network",
    difficulty: "Beginner",
  },
  {
    name: "CVE Vulnerability Search",
    description: "Search the NIST NVD database for CVEs by ID or keyword. View CVSS scores and affected products.",
    href: "/tools/cve-search",
    icon: Bug,
    category: "forensics",
    difficulty: "Intermediate",
  },
  {
    name: "UUID / GUID Generator",
    description: "Generate RFC 4122 UUID v4 identifiers. Bulk generation with multiple format options.",
    href: "/tools/uuid-generator",
    icon: Fingerprint,
    category: "web",
    difficulty: "Beginner",
  },
];

export const POPULAR_TOOLS = ALL_TOOLS.filter((t) => t.popular);

export const TOOLS_BY_CATEGORY = ALL_TOOLS.reduce(
  (acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  },
  {} as Record<string, Tool[]>
);
