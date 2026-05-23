import type { Metadata } from "next";
import { ToolsIndexClient } from "./ToolsIndexClient";

export const metadata: Metadata = {
  title: "All Security Tools — Free Online Cybersecurity Utilities",
  description:
    "Browse all free browser-based security tools: hash generators, encoders, password analyzers, network tools, and more. Filter by category.",
  keywords: [
    "cybersecurity tools",
    "online security tools",
    "free hacking tools",
    "developer security utilities",
  ],
};

export default function ToolsPage() {
  return <ToolsIndexClient />;
}
