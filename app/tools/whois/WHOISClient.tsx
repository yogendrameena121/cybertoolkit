"use client";

import { useState } from "react";
import { Search, RefreshCw, AlertTriangle, Calendar, Globe, Server, ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/tools/CopyButton";

interface RDAPEvent {
  eventAction: string;
  eventDate: string;
}

interface RDAPNameserver {
  ldhName: string;
}

interface RDAPEntity {
  roles: string[];
  vcardArray?: unknown[];
  publicIds?: { type: string; identifier: string }[];
}

interface RDAPResponse {
  ldhName?: string;
  handle?: string;
  status?: string[];
  events?: RDAPEvent[];
  nameservers?: RDAPNameserver[];
  entities?: RDAPEntity[];
  links?: { rel: string; href: string }[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { dateStyle: "long" });
}

function getRegistrar(entities?: RDAPEntity[]): string {
  if (!entities) return "—";
  const registrar = entities.find((e) => e.roles?.includes("registrar"));
  if (!registrar?.vcardArray) return "—";
  try {
    const vcard = registrar.vcardArray as [string, unknown[][]];
    const fn = vcard[1]?.find((f) => (f as unknown[])[0] === "fn");
    return fn ? String((fn as unknown[])[3]) : "—";
  } catch {
    return "—";
  }
}

function getEvent(events: RDAPEvent[], action: string): string | null {
  const e = events?.find((ev) => ev.eventAction === action);
  return e ? formatDate(e.eventDate) : null;
}

function getDaysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

const STATUS_DESCRIPTIONS: Record<string, string> = {
  "client delete prohibited": "Cannot be deleted by registrant",
  "client transfer prohibited": "Cannot be transferred to another registrar",
  "client update prohibited": "Cannot have its registration details updated",
  "active": "Domain is active",
  "ok": "Domain is active and in good standing",
};

export function WHOISClient() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<RDAPResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = async () => {
    const clean = domain.replace(/^https?:\/\//, "").split("/")[0].trim().toLowerCase();
    if (!clean) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Use IANA RDAP bootstrap or direct rdap.org
      const res = await fetch(`https://rdap.org/domain/${clean}`, {
        signal: AbortSignal.timeout(10000),
      });
      if (res.status === 404) throw new Error(`Domain "${clean}" was not found. It may not be registered or the TLD may not support RDAP.`);
      if (!res.ok) throw new Error(`RDAP lookup failed (${res.status}). Try again or check the domain.`);
      const json: RDAPResponse = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed. Check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const expiryDate = data?.events ? data.events.find((e) => e.eventAction === "expiration")?.eventDate : null;
  const daysUntilExpiry = expiryDate ? getDaysUntil(expiryDate) : null;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400">Domain Name</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
              placeholder="example.com"
              className="w-full rounded-lg border border-[#0d2a1f] bg-[#050d1a] py-2.5 pl-9 pr-4 font-mono text-sm text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
            />
          </div>
          <button
            onClick={lookup}
            disabled={loading || !domain.trim()}
            className="btn-cyber flex items-center gap-2 px-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Look Up
          </button>
        </div>
        <p className="text-xs text-slate-600">Uses RDAP (modern WHOIS standard). Supports .com, .net, .org, and most TLDs.</p>
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
          <span className="text-sm">Querying RDAP…</span>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="space-y-4">
          {/* Domain header */}
          <div className="flex items-center justify-between rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-4">
            <div>
              <p className="font-mono text-lg font-bold text-[#00ff88]">
                {data.ldhName ?? domain}
              </p>
              {data.handle && (
                <p className="mt-0.5 font-mono text-xs text-slate-500">{data.handle}</p>
              )}
            </div>
            <CopyButton text={data.ldhName ?? domain} size="md" />
          </div>

          {/* Registration details */}
          <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4 space-y-0">
            <div className="mb-3 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-[#00ff88]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Registration</span>
            </div>
            {[
              { label: "Registrar", value: getRegistrar(data.entities) },
              { label: "Created", value: getEvent(data.events ?? [], "registration") ?? "—" },
              { label: "Updated", value: getEvent(data.events ?? [], "last changed") ?? "—" },
              { label: "Expires", value: getEvent(data.events ?? [], "expiration") ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between border-b border-[#0d2a1f] py-2.5 last:border-0">
                <span className="text-xs text-slate-500 w-24 shrink-0">{label}</span>
                <span className="text-sm text-slate-200">{value}</span>
              </div>
            ))}
            {/* Expiry countdown */}
            {daysUntilExpiry !== null && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span
                  className={`rounded border px-2 py-0.5 font-mono font-bold ${
                    daysUntilExpiry < 0 ? "border-red-500/30 bg-red-500/10 text-red-400" :
                    daysUntilExpiry < 30 ? "border-orange-500/30 bg-orange-500/10 text-orange-400" :
                    daysUntilExpiry < 90 ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" :
                    "border-[#00ff88]/20 bg-[#00ff88]/5 text-[#00ff88]"
                  }`}
                >
                  {daysUntilExpiry < 0 ? "EXPIRED" : `${daysUntilExpiry} days until expiry`}
                </span>
              </div>
            )}
          </div>

          {/* Nameservers */}
          {data.nameservers && data.nameservers.length > 0 && (
            <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-[#00d4ff]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nameservers
                </span>
              </div>
              <div className="space-y-1.5">
                {data.nameservers.map((ns) => (
                  <div key={ns.ldhName} className="flex items-center justify-between">
                    <span className="font-mono text-sm text-slate-300">{ns.ldhName}</span>
                    <CopyButton text={ns.ldhName} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          {data.status && data.status.length > 0 && (
            <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Domain Status</p>
              <div className="space-y-1.5">
                {data.status.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#00ff88] text-xs">▸</span>
                    <div>
                      <span className="font-mono text-xs text-slate-300">{s}</span>
                      {STATUS_DESCRIPTIONS[s.toLowerCase()] && (
                        <p className="text-[10px] text-slate-600">{STATUS_DESCRIPTIONS[s.toLowerCase()]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RDAP link */}
          {data.links?.find((l) => l.rel === "self") && (
            <a
              href={data.links.find((l) => l.rel === "self")!.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#0d2a1f] p-3 text-sm text-slate-400 transition-all hover:border-[#00ff88]/25 hover:text-[#00ff88]"
            >
              View raw RDAP data
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
