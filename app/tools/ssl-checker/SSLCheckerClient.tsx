"use client";

import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, Clock, Search, RefreshCw, ExternalLink } from "lucide-react";

interface CertInfo {
  domain: string;
  valid: boolean;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  issuer: string;
  subject: string;
  sans: string[];
  protocol: string;
  error?: string;
}

async function checkSSL(domain: string): Promise<CertInfo> {
  const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0].trim();
  const res = await fetch("/api/ssl-check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain: cleanDomain }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || `API error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

export function SSLCheckerClient() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<CertInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await checkSSL(domain);
      setResult(data);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Failed to check SSL certificate. Verify the domain is correct and publicly accessible."
      );
    } finally {
      setLoading(false);
    }
  };

  const expiryColor =
    result?.daysRemaining == null ? "text-slate-400"
    : result.daysRemaining <= 0 ? "text-red-400"
    : result.daysRemaining <= 14 ? "text-red-400"
    : result.daysRemaining <= 30 ? "text-orange-400"
    : result.daysRemaining <= 60 ? "text-yellow-400"
    : "text-[#00ff88]";

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400">Domain</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="example.com or sub.example.com"
            className="flex-1 rounded-lg border border-[#0d2a1f] bg-[#050d1a] px-4 py-2.5 font-mono text-sm text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
          />
          <button
            onClick={check}
            disabled={loading || !domain.trim()}
            className="btn-cyber flex items-center gap-2 px-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Check SSL
          </button>
        </div>
        <p className="text-xs text-slate-600">Do not include https:// — just the domain name</p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-12 text-slate-500">
          <RefreshCw className="h-5 w-5 animate-spin text-[#00ff88]" />
          <span className="text-sm">Fetching SSL certificate details…</span>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="space-y-4">
          {/* Status header */}
          <div className={`rounded-xl border p-5 ${
            result.valid && result.daysRemaining > 0
              ? "border-[#00ff88]/30 bg-[#00ff88]/5"
              : "border-red-500/30 bg-red-500/5"
          }`}>
            <div className="flex items-center gap-3">
              {result.valid && result.daysRemaining > 0 ? (
                <CheckCircle2 className="h-8 w-8 text-[#00ff88]" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-400" />
              )}
              <div>
                <p className={`text-lg font-semibold ${result.valid && result.daysRemaining > 0 ? "text-[#00ff88]" : "text-red-400"}`}>
                  {result.valid && result.daysRemaining > 0 ? "Certificate Valid" : "Certificate Issue Detected"}
                </p>
                <p className="text-sm text-slate-400">{result.domain}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] divide-y divide-[#0d2a1f]">
            {[
              { label: "Subject", value: result.subject, mono: true },
              { label: "Issuer / CA", value: result.issuer },
              { label: "Valid From", value: result.validFrom },
              { label: "Valid Until", value: result.validTo },
              { label: "Protocol", value: result.protocol, mono: true },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex items-start justify-between gap-4 px-4 py-3">
                <span className="shrink-0 w-28 text-xs text-slate-500">{label}</span>
                <span className={`text-sm text-slate-200 text-right break-all ${mono ? "font-mono" : ""}`}>{value}</span>
              </div>
            ))}
            {/* Expiry countdown */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-slate-500">Days Remaining</span>
              <div className="flex items-center gap-1.5">
                <Clock className={`h-3.5 w-3.5 ${expiryColor}`} />
                <span className={`font-mono font-bold ${expiryColor}`}>
                  {result.daysRemaining <= 0 ? "EXPIRED" : `${result.daysRemaining} days`}
                </span>
              </div>
            </div>
          </div>

          {/* SANs */}
          {result.sans.length > 0 && (
            <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-[#00d4ff]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Subject Alternative Names ({result.sans.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.sans.slice(0, 20).map((san) => (
                  <span key={san} className="rounded border border-[#0d2a1f] bg-[#050d1a] px-2 py-0.5 font-mono text-xs text-slate-400">
                    {san}
                  </span>
                ))}
                {result.sans.length > 20 && (
                  <span className="text-xs text-slate-600">+{result.sans.length - 20} more</span>
                )}
              </div>
            </div>
          )}

          {/* Full check link */}
          <a
            href={`https://www.ssllabs.com/ssltest/analyze.html?d=${result.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#0d2a1f] p-3 text-sm text-slate-400 transition-all hover:border-[#00ff88]/25 hover:text-[#00ff88]"
          >
            <Shield className="h-4 w-4" />
            Run full SSL Labs deep analysis
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
