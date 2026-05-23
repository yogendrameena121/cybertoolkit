"use client";

import { useState, useMemo } from "react";
import { ArrowLeftRight, AlertCircle } from "lucide-react";
import { OutputBox } from "@/components/tools/OutputBox";
import { InputArea } from "@/components/tools/InputArea";

function encodeBase64(text: string, urlSafe: boolean): string {
  try {
    const bytes = new TextEncoder().encode(text);
    const binary = Array.from(bytes)
      .map((b) => String.fromCharCode(b))
      .join("");
    let b64 = btoa(binary);
    if (urlSafe) {
      b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    return b64;
  } catch {
    throw new Error("Failed to encode — input contains invalid characters.");
  }
}

function decodeBase64(b64: string, urlSafe: boolean): string {
  try {
    let normalized = b64.trim();
    if (urlSafe || /[-_]/.test(normalized)) {
      normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
    }
    // Re-pad
    const pad = normalized.length % 4;
    if (pad) normalized += "=".repeat(4 - pad);
    const binary = atob(normalized);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error(
      "Failed to decode — input does not appear to be valid Base64."
    );
  }
}

function isLikelyBase64(str: string): boolean {
  // Remove whitespace and check if it matches Base64 pattern
  const clean = str.replace(/\s/g, "");
  return /^[A-Za-z0-9+/\-_]+=*$/.test(clean) && clean.length % 4 === 0;
}

export function Base64Client() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);

  const { output, error, suggestion } = useMemo(() => {
    if (!input.trim())
      return { output: "", error: null, suggestion: null };

    try {
      if (mode === "encode") {
        const result = encodeBase64(input, urlSafe);
        return { output: result, error: null, suggestion: null };
      } else {
        const result = decodeBase64(input, urlSafe);
        return { output: result, error: null, suggestion: null };
      }
    } catch (e) {
      // If decode fails, suggest encoding might be needed
      const suggestion =
        mode === "decode" && !isLikelyBase64(input)
          ? "This input doesn't look like Base64. Did you mean to encode it instead?"
          : null;
      return {
        output: "",
        error: e instanceof Error ? e.message : "Unknown error",
        suggestion,
      };
    }
  }, [input, mode, urlSafe]);

  // Auto-suggest mode switch
  const autoSuggestDecode =
    mode === "encode" && input.length > 8 && isLikelyBase64(input);

  const swap = () => {
    if (output) {
      setInput(output);
      setMode(mode === "encode" ? "decode" : "encode");
    } else {
      setMode(mode === "encode" ? "decode" : "encode");
    }
  };

  const inputCharCount = input.length;
  const outputCharCount = output.length;
  const ratio = inputCharCount
    ? ((outputCharCount / inputCharCount) * 100 - 100).toFixed(1)
    : null;

  return (
    <div className="space-y-5">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mode toggle */}
        <div className="flex rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-1">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded px-4 py-1.5 text-sm font-medium capitalize transition-all ${
                mode === m
                  ? "bg-[#00ff88]/10 text-[#00ff88]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Swap button */}
        <button
          onClick={swap}
          disabled={!output}
          className="flex items-center gap-1.5 rounded border border-[#0d2a1f] px-3 py-1.5 text-sm text-slate-500 transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] disabled:cursor-not-allowed disabled:opacity-30"
          title="Swap input/output"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Swap
        </button>

        {/* URL-safe toggle */}
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <div
            onClick={() => setUrlSafe(!urlSafe)}
            className={`relative h-5 w-9 rounded-full transition-all ${
              urlSafe ? "bg-[#00ff88]/30" : "bg-[#0d2a1f]"
            }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                urlSafe
                  ? "left-4 bg-[#00ff88]"
                  : "left-0.5 bg-slate-600"
              }`}
            />
          </div>
          <span className="text-slate-400">URL-safe (Base64URL)</span>
        </label>
      </div>

      {/* Auto-suggest */}
      {autoSuggestDecode && (
        <div className="flex items-center gap-2 rounded border border-[#00d4ff]/20 bg-[#00d4ff]/5 p-3 text-xs text-[#00d4ff]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          This looks like it might already be Base64.{" "}
          <button
            onClick={() => setMode("decode")}
            className="underline hover:no-underline"
          >
            Switch to Decode mode?
          </button>
        </div>
      )}

      {/* Input */}
      <InputArea
        value={input}
        onChange={setInput}
        label={mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
        placeholder={
          mode === "encode"
            ? "Enter text to encode to Base64..."
            : "Paste Base64 string to decode..."
        }
        rows={5}
        mono={mode === "decode"}
        hint={mode === "decode" ? "Standard and URL-safe (Base64URL) formats are both supported." : undefined}
      />

      {/* Output */}
      <OutputBox
        value={output}
        label={mode === "encode" ? "Base64 Output" : "Decoded Text"}
        placeholder={
          mode === "encode"
            ? "Base64 encoded output will appear here..."
            : "Decoded text will appear here..."
        }
        status={error ? "error" : output ? "success" : "idle"}
        errorMessage={error ?? undefined}
        rows={5}
        onClear={() => setInput("")}
      />

      {/* Stats */}
      {output && inputCharCount > 0 && (
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span>
            Input:{" "}
            <span className="font-mono text-slate-400">
              {inputCharCount.toLocaleString()} chars
            </span>
          </span>
          <span>
            Output:{" "}
            <span className="font-mono text-slate-400">
              {outputCharCount.toLocaleString()} chars
            </span>
          </span>
          {ratio !== null && (
            <span>
              Size change:{" "}
              <span
                className={`font-mono ${
                  Number(ratio) > 0 ? "text-yellow-400" : "text-[#00ff88]"
                }`}
              >
                {Number(ratio) > 0 ? "+" : ""}
                {ratio}%
              </span>
            </span>
          )}
          {urlSafe && (
            <span className="rounded border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-1.5 py-0.5 text-[#00d4ff]">
              Base64URL mode
            </span>
          )}
        </div>
      )}
    </div>
  );
}
