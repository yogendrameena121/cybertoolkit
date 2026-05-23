"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({ text, className = "", size = "sm" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard", { duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const sizeClasses = {
    sm: "h-6 w-6 p-1",
    md: "h-8 w-8 p-1.5",
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`inline-flex items-center justify-center rounded transition-all ${sizeClasses[size]} ${
        copied
          ? "border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]"
          : "border border-[#0d2a1f] text-slate-500 hover:border-[#00ff88]/30 hover:text-[#00ff88] disabled:cursor-not-allowed disabled:opacity-30"
      } ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
