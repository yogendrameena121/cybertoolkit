"use client";

import { CopyButton } from "./CopyButton";
import { Eraser, AlertCircle, CheckCircle2 } from "lucide-react";

interface OutputBoxProps {
  value: string;
  label?: string;
  placeholder?: string;
  onClear?: () => void;
  rows?: number;
  status?: "idle" | "success" | "error";
  errorMessage?: string;
  className?: string;
  noWrap?: boolean;
}

export function OutputBox({
  value,
  label,
  placeholder = "Output will appear here...",
  onClear,
  rows = 4,
  status = "idle",
  errorMessage,
  className = "",
  noWrap = false,
}: OutputBoxProps) {
  const borderColor =
    status === "success"
      ? "border-[#00ff88]/30"
      : status === "error"
        ? "border-red-500/30"
        : "border-[#0d2a1f]";

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Header */}
      {(label || value) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              {status === "success" && (
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00ff88]" />
              )}
              {status === "error" && (
                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
              )}
              {label}
            </label>
          )}
          <div className="ml-auto flex items-center gap-1">
            {value && <CopyButton text={value} />}
            {onClear && value && (
              <button
                onClick={onClear}
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-[#0d2a1f] p-1 text-slate-500 transition-colors hover:border-red-500/30 hover:text-red-400"
                title="Clear output"
              >
                <Eraser className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Output area */}
      <div
        className={`relative rounded border ${borderColor} bg-[#020a14] transition-colors`}
      >
        {status === "success" && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />
        )}

        {value ? (
          <pre
            className={`font-mono overflow-auto p-4 text-sm text-[#00ff88] ${noWrap ? "whitespace-pre" : "whitespace-pre-wrap break-all"}`}
            style={{ minHeight: `${rows * 1.75}rem` }}
          >
            {value}
          </pre>
        ) : (
          <div
            className="flex items-center p-4"
            style={{ minHeight: `${rows * 1.75}rem` }}
          >
            <p className="font-mono text-sm text-slate-600">{placeholder}</p>
          </div>
        )}
      </div>

      {/* Error message */}
      {status === "error" && errorMessage && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}
