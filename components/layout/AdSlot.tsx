"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical";
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({
  slot,
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silently fail in development
    }
  }, [slot]);

  // In development, render a placeholder
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`flex items-center justify-center rounded border border-dashed border-[#0d2a1f] bg-[#070f1e]/50 text-xs text-slate-600 ${className}`}
        style={{ minHeight: "90px" }}
      >
        Ad slot: {slot} ({format})
      </div>
    );
  }

  return (
    <div className={`ad-slot-wrapper ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-slate-600">
        {label}
      </p>
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-6535660175745534" // Replace with your AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
