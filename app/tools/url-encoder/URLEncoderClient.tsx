"use client";

import { useState, useMemo } from "react";
import { ArrowLeftRight } from "lucide-react";
import { OutputBox } from "@/components/tools/OutputBox";
import { InputArea } from "@/components/tools/InputArea";

type Mode = "encode" | "decode";
type EncodeType = "component" | "full";

function encode(text: string, type: EncodeType): string {
  return type === "component" ? encodeURIComponent(text) : encodeURI(text);
}

function decode(text: string, type: EncodeType): string {
  return type === "component" ? decodeURIComponent(text) : decodeURI(text);
}

interface DiffToken {
  original: string;
  encoded: string;
  changed: boolean;
}

function buildDiff(original: string, encoded: string): DiffToken[] {
  const tokens: DiffToken[] = [];
  let ei = 0;
  for (let i = 0; i < original.length; i++) {
    const char = original[i];
    const encodedChar = encodeURIComponent(char);
    if (encodedChar !== char && encoded.slice(ei, ei + encodedChar.length) === encodedChar) {
      tokens.push({ original: char, encoded: encodedChar, changed: true });
      ei += encodedChar.length;
    } else {
      tokens.push({ original: char, encoded: char, changed: false });
      ei += char.length;
    }
  }
  return tokens;
}

export function URLEncoderClient() {
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeType, setEncodeType] = useState<EncodeType>("component");
  const [input, setInput] = useState("");
  const [showDiff, setShowDiff] = useState(true);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      const result = mode === "encode" ? encode(input, encodeType) : decode(input, encodeType);
      return { output: result, error: null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Failed to process URL" };
    }
  }, [input, mode, encodeType]);

  const diff = useMemo(() => {
    if (mode !== "encode" || !input || !output) return null;
    return buildDiff(input, output);
  }, [input, output, mode]);

  const changedCount = diff?.filter((t) => t.changed).length ?? 0;

  const swap = () => {
    if (output) {
      setInput(output);
      setMode(mode === "encode" ? "decode" : "encode");
    }
  };

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mode */}
        <div className="flex rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-1">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded px-4 py-1.5 text-sm font-medium capitalize transition-all ${
                mode === m ? "bg-[#00ff88]/10 text-[#00ff88]" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Swap */}
        <button
          onClick={swap}
          disabled={!output}
          className="flex items-center gap-1.5 rounded border border-[#0d2a1f] px-3 py-1.5 text-sm text-slate-500 transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Swap
        </button>
      </div>

      {/* Encode type selector */}
      {mode === "encode" && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-400">Encoding Type</label>
          <div className="flex gap-2">
            {([
              { value: "component", label: "encodeURIComponent", desc: "For query parameter values" },
              { value: "full", label: "encodeURI", desc: "For full URL strings" },
            ] as { value: EncodeType; label: string; desc: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEncodeType(opt.value)}
                className={`flex flex-1 flex-col rounded-lg border p-3 text-left transition-all ${
                  encodeType === opt.value
                    ? "border-[#00ff88]/30 bg-[#00ff88]/5"
                    : "border-[#0d2a1f] bg-[#050d1a] hover:border-[#00ff88]/15"
                }`}
              >
                <span className={`font-mono text-xs font-medium ${encodeType === opt.value ? "text-[#00ff88]" : "text-slate-300"}`}>
                  {opt.label}
                </span>
                <span className="mt-0.5 text-[10px] text-slate-600">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <InputArea
        value={input}
        onChange={setInput}
        label={mode === "encode" ? "Text / URL to Encode" : "Encoded URL to Decode"}
        placeholder={
          mode === "encode"
            ? "https://example.com/search?q=hello world&lang=en"
            : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
        }
        rows={4}
        mono
      />

      {/* Output */}
      <OutputBox
        value={output}
        label={mode === "encode" ? "Encoded URL" : "Decoded URL"}
        placeholder="Result will appear here..."
        status={error ? "error" : output ? "success" : "idle"}
        errorMessage={error ?? undefined}
        rows={4}
        onClear={() => setInput("")}
      />

      {/* Stats */}
      {output && (
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span>Input: <span className="font-mono text-slate-400">{input.length} chars</span></span>
          <span>Output: <span className="font-mono text-slate-400">{output.length} chars</span></span>
          {mode === "encode" && (
            <span>Characters encoded: <span className="font-mono text-yellow-400">{changedCount}</span></span>
          )}
        </div>
      )}

      {/* Diff view */}
      {diff && output && mode === "encode" && changedCount > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">Character Diff</p>
            <button
              onClick={() => setShowDiff(!showDiff)}
              className="text-xs text-slate-500 hover:text-[#00ff88] transition-colors"
            >
              {showDiff ? "Hide" : "Show"} diff
            </button>
          </div>
          {showDiff && (
            <div className="rounded-lg border border-[#0d2a1f] bg-[#020a14] p-4">
              <p className="font-mono text-sm leading-loose break-all">
                {diff.map((token, i) =>
                  token.changed ? (
                    <span key={i} className="rounded bg-yellow-500/15 px-0.5 text-yellow-400" title={`"${token.original}" → "${token.encoded}"`}>
                      {token.encoded}
                    </span>
                  ) : (
                    <span key={i} className="text-slate-400">{token.original}</span>
                  )
                )}
              </p>
              <p className="mt-2 text-[10px] text-slate-600">
                <span className="rounded bg-yellow-500/15 px-1 text-yellow-400">Highlighted</span>
                {" "}= encoded characters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
