"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle2, Clock, Info } from "lucide-react";
import { CopyButton } from "@/components/tools/CopyButton";

function base64urlDecode(str: string): string {
  // Pad base64url to standard base64
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const b64 = pad ? padded + "=".repeat(4 - pad) : padded;
  try {
    return decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return atob(b64);
  }
}

function parseJWT(token: string): {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  error?: string;
} {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Invalid JWT format — expected 3 parts separated by dots.",
    };
  }
  try {
    const header = JSON.parse(base64urlDecode(parts[0]));
    const payload = JSON.parse(base64urlDecode(parts[1]));
    return { header, payload, signature: parts[2] };
  } catch {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Failed to decode JWT — make sure the token is valid.",
    };
  }
}

function formatTimestamp(ts: unknown): string | null {
  if (typeof ts !== "number") return null;
  return new Date(ts * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "long",
  });
}

function isExpired(payload: Record<string, unknown>): boolean | null {
  if (typeof payload.exp !== "number") return null;
  return Date.now() > payload.exp * 1000;
}

// Simple JSON syntax highlighting
function SyntaxHighlight({ json }: { json: unknown }) {
  const str = JSON.stringify(json, null, 2);

  const highlighted = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-[#00d4ff]"; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-[#00ff88]"; // key
          } else {
            cls = "text-[#ffd700]"; // string value
          }
        } else if (/true|false/.test(match)) {
          cls = "text-purple-400";
        } else if (/null/.test(match)) {
          cls = "text-red-400";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );

  return (
    <pre
      className="overflow-auto font-mono text-xs leading-relaxed text-slate-300"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export function JWTDecoderClient() {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    if (!token.trim()) return null;
    return parseJWT(token.trim());
  }, [token]);

  const expired = result?.payload ? isExpired(result.payload) : null;
  const isValid = result && !result.error;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-400">JWT Token</label>
          <button
            onClick={() => setToken(SAMPLE_JWT)}
            className="text-xs text-[#00ff88]/70 hover:text-[#00ff88] transition-colors"
          >
            Load example →
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0..."
          rows={4}
          className="w-full resize-none rounded-lg border border-[#0d2a1f] bg-[#050d1a] px-4 py-3 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
          spellCheck={false}
        />
      </div>

      {/* Error */}
      {result?.error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {result.error}
        </div>
      )}

      {/* Status bar */}
      {isValid && result.payload && (
        <div
          className={`flex items-center justify-between rounded-lg border p-3 ${
            expired === true
              ? "border-red-500/30 bg-red-500/10"
              : expired === false
                ? "border-[#00ff88]/30 bg-[#00ff88]/10"
                : "border-[#0d2a1f] bg-[#050d1a]"
          }`}
        >
          <div className="flex items-center gap-2">
            {expired === true ? (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            ) : expired === false ? (
              <CheckCircle2 className="h-4 w-4 text-[#00ff88]" />
            ) : (
              <Info className="h-4 w-4 text-slate-400" />
            )}
            <span
              className={`text-sm font-medium ${
                expired === true
                  ? "text-red-400"
                  : expired === false
                    ? "text-[#00ff88]"
                    : "text-slate-300"
              }`}
            >
              {expired === true
                ? "Token is EXPIRED"
                : expired === false
                  ? "Token is valid (not expired)"
                  : "No expiry claim found"}
            </span>
          </div>
          {typeof result.payload.exp === "number" && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              {formatTimestamp(result.payload.exp)}
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      {isValid && (
        <div className="flex items-start gap-2 rounded border border-[#00d4ff]/15 bg-[#00d4ff]/5 p-3 text-xs text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00d4ff]" />
          Signature is not validated — this tool cannot verify the token without
          your secret/public key. Only your backend should perform signature
          validation.
        </div>
      )}

      {/* Three sections */}
      {isValid && (
        <div className="space-y-3">
          {/* Header */}
          <Section
            label="Header"
            color="text-[#00d4ff]"
            borderColor="border-[#00d4ff]/20"
            bgColor="bg-[#00d4ff]/5"
            data={result.header!}
          />

          {/* Payload */}
          <Section
            label="Payload"
            color="text-[#ffd700]"
            borderColor="border-[#ffd700]/20"
            bgColor="bg-[#ffd700]/5"
            data={result.payload!}
            extraInfo={
              result.payload && (
                <ClaimsInfo payload={result.payload} />
              )
            }
          />

          {/* Signature */}
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Signature
              </span>
              <CopyButton text={result.signature} />
            </div>
            <p className="break-all font-mono text-xs text-purple-300">
              {result.signature}
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Algorithm:{" "}
              <span className="text-slate-400">
                {(result.header as { alg?: string })?.alg ?? "unknown"}
              </span>
              {" · "}Cannot be verified without the secret/public key.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  label,
  color,
  borderColor,
  bgColor,
  data,
  extraInfo,
}: {
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  data: Record<string, unknown>;
  extraInfo?: React.ReactNode;
}) {
  const jsonStr = JSON.stringify(data, null, 2);
  return (
    <div className={`rounded-lg border ${borderColor} ${bgColor} p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${color}`}
        >
          {label}
        </span>
        <CopyButton text={jsonStr} />
      </div>
      <SyntaxHighlight json={data} />
      {extraInfo}
    </div>
  );
}

function ClaimsInfo({ payload }: { payload: Record<string, unknown> }) {
  const claims: { key: string; label: string; value: unknown }[] = [];
  if (payload.sub) claims.push({ key: "sub", label: "Subject", value: payload.sub });
  if (payload.iss) claims.push({ key: "iss", label: "Issuer", value: payload.iss });
  if (payload.aud) claims.push({ key: "aud", label: "Audience", value: payload.aud });
  if (payload.iat) claims.push({ key: "iat", label: "Issued At", value: formatTimestamp(payload.iat) });
  if (payload.exp) claims.push({ key: "exp", label: "Expires At", value: formatTimestamp(payload.exp) });
  if (payload.nbf) claims.push({ key: "nbf", label: "Not Before", value: formatTimestamp(payload.nbf) });

  if (claims.length === 0) return null;

  return (
    <div className="mt-3 border-t border-[#ffd700]/10 pt-3">
      <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-600">
        Registered Claims
      </p>
      <div className="space-y-1">
        {claims.map((c) => (
          <div key={c.key} className="flex items-center gap-2 text-xs">
            <span className="w-20 shrink-0 font-mono text-[#ffd700]/70">
              {c.key}
            </span>
            <span className="text-slate-400">{String(c.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
