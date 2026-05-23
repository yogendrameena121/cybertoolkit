"use client";

import { useState, useCallback } from "react";
import { RefreshCw, Copy, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Format = "standard" | "nodash" | "upper" | "guid";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback using getRandomValues
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function formatUUID(uuid: string, format: Format): string {
  switch (format) {
    case "nodash": return uuid.replace(/-/g, "");
    case "upper": return uuid.toUpperCase();
    case "guid": return `{${uuid.toUpperCase()}}`;
    default: return uuid;
  }
}

const FORMAT_OPTIONS: { value: Format; label: string; example: string }[] = [
  { value: "standard", label: "Standard", example: "550e8400-e29b-41d4-a716-446655440000" },
  { value: "nodash", label: "No Dashes", example: "550e8400e29b41d4a716446655440000" },
  { value: "upper", label: "Uppercase", example: "550E8400-E29B-41D4-A716-446655440000" },
  { value: "guid", label: "GUID Braces", example: "{550E8400-E29B-41D4-A716-446655440000}" },
];

export function UUIDGeneratorClient() {
  const [uuids, setUuids] = useState<string[]>(() => [generateUUID()]);
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<Format>("standard");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, () => generateUUID()));
  }, [count]);

  const copyOne = async (uuid: string, idx: number) => {
    await navigator.clipboard.writeText(formatUUID(uuid, format));
    setCopiedIdx(idx);
    toast.success("Copied!", { duration: 1500 });
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const copyAll = async () => {
    const text = uuids.map((u) => formatUUID(u, format)).join("\n");
    await navigator.clipboard.writeText(text);
    toast.success(`Copied ${uuids.length} UUIDs`, { duration: 2000 });
  };

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Count */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-400">Count</label>
            <span className="font-mono text-xs text-[#00ff88]">{count}</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-[#00ff88]"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>1</span><span>25</span><span>50</span><span>75</span><span>100</span>
          </div>
        </div>

        {/* Format */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-400">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            className="w-full rounded-lg border border-[#0d2a1f] bg-[#050d1a] px-3 py-2 font-mono text-sm text-slate-200 focus:border-[#00ff88]/40 focus:outline-none"
          >
            {FORMAT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {opt.example.slice(0, 20)}…
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Format preview */}
      <div className="rounded-lg border border-[#0d2a1f] bg-[#050d1a] px-4 py-2.5">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-slate-600">Format Preview</p>
        <p className="font-mono text-sm text-[#00d4ff]">
          {formatUUID(uuids[0] ?? "550e8400-e29b-41d4-a716-446655440000", format)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={generate}
          className="btn-cyber flex items-center gap-2 px-5 py-2.5 font-medium"
        >
          <RefreshCw className="h-4 w-4" />
          {count === 1 ? "Generate" : `Generate ${count}`}
        </button>
        {uuids.length > 1 && (
          <button
            onClick={copyAll}
            className="btn-cyber-outline flex items-center gap-2 px-4 py-2.5"
          >
            <Copy className="h-4 w-4" />
            Copy All ({uuids.length})
          </button>
        )}
        {uuids.length > 0 && (
          <button
            onClick={() => setUuids([])}
            className="flex items-center gap-1.5 rounded border border-[#0d2a1f] px-3 py-2 text-sm text-slate-500 transition-colors hover:border-red-500/30 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* UUID list */}
      {uuids.length > 0 && (
        <div className="rounded-xl border border-[#0d2a1f] bg-[#020a14] divide-y divide-[#0d2a1f]">
          {uuids.map((uuid, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between px-4 py-3 hover:bg-[#00ff88]/3 transition-colors"
            >
              <span className="font-mono text-sm text-[#00ff88] break-all pr-2">
                {formatUUID(uuid, format)}
              </span>
              <button
                onClick={() => copyOne(uuid, idx)}
                className={`shrink-0 flex h-7 w-7 items-center justify-center rounded border transition-all ${
                  copiedIdx === idx
                    ? "border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]"
                    : "border-[#0d2a1f] text-slate-600 hover:border-[#00ff88]/30 hover:text-[#00ff88] opacity-0 group-hover:opacity-100"
                }`}
              >
                {copiedIdx === idx ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-600">
        Generated using <span className="font-mono text-slate-500">crypto.randomUUID()</span> — cryptographically secure
      </p>
    </div>
  );
}
