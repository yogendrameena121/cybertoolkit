"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Globe, Wifi, Clock, RefreshCw, ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/tools/CopyButton";

interface IPData {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  message?: string;
}

const FLAG_URL = (code: string) =>
  `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;

function ResultRow({ label, value, mono = false, copyable = false }: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#0d2a1f] last:border-0">
      <span className="shrink-0 text-xs text-slate-500 w-28">{label}</span>
      <div className="flex items-center gap-1.5 min-w-0">
        <span className={`text-sm text-slate-200 break-all ${mono ? "font-mono" : ""}`}>
          {value}
        </span>
        {copyable && <CopyButton text={value} size="sm" />}
      </div>
    </div>
  );
}

export function IPLookupClient() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myIP, setMyIP] = useState<string | null>(null);

  const lookup = async (target: string) => {
    const clean = target.trim() || "";
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const url = clean
        ? `https://ip-api.com/json/${clean}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`
        : `https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
      const res = await fetch(url);
      const json: IPData = await res.json();
      if (json.status === "fail") {
        setError(json.message ?? "Lookup failed — check the IP address.");
      } else {
        setData(json);
        if (!clean) setMyIP(json.query);
      }
    } catch {
      setError("Network error — could not reach ip-api.com. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect on mount
  useEffect(() => {
    lookup("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookup(ip);
  };

  return (
    <div className="space-y-5">
      {/* Input form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-400">IP Address</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder={myIP ? `Your IP: ${myIP}` : "Enter IPv4 or IPv6 address..."}
                className="w-full rounded-lg border border-[#0d2a1f] bg-[#050d1a] py-2.5 pl-9 pr-4 font-mono text-sm text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-cyber flex items-center gap-2 px-4 py-2.5 font-medium disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Look Up
            </button>
          </div>
        </div>

        {myIP && (
          <button
            type="button"
            onClick={() => { setIp(""); lookup(""); }}
            className="text-xs text-[#00ff88]/70 hover:text-[#00ff88] transition-colors"
          >
            ↺ Check my IP ({myIP})
          </button>
        )}
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 animate-pulse rounded bg-[#0d2a1f]" />
          ))}
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="space-y-4">
          {/* IP header card */}
          <div className="flex items-center justify-between rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-4">
            <div className="flex items-center gap-3">
              {data.countryCode && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={FLAG_URL(data.countryCode)}
                  alt={data.country}
                  className="h-5 w-7 rounded-sm object-cover"
                />
              )}
              <div>
                <p className="font-mono text-lg font-bold text-[#00ff88]">{data.query}</p>
                <p className="text-xs text-slate-400">
                  {data.city}, {data.regionName}, {data.country}
                </p>
              </div>
            </div>
            <CopyButton text={data.query} size="md" />
          </div>

          {/* Details grid */}
          <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4">
            {/* Location section */}
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#00ff88]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</span>
            </div>
            <ResultRow label="Country" value={`${data.country} (${data.countryCode})`} />
            <ResultRow label="Region" value={data.regionName} />
            <ResultRow label="City" value={data.city || "—"} />
            <ResultRow label="ZIP / Postal" value={data.zip || "—"} />
            <ResultRow label="Coordinates" value={`${data.lat}, ${data.lon}`} mono copyable />
          </div>

          <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Wifi className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Network</span>
            </div>
            <ResultRow label="ISP" value={data.isp} />
            <ResultRow label="Organization" value={data.org || "—"} />
            <ResultRow label="ASN" value={data.as || "—"} mono />
          </div>

          <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Timezone</span>
            </div>
            <ResultRow label="Timezone" value={data.timezone} mono />
            <ResultRow
              label="Local Time"
              value={new Intl.DateTimeFormat("en-US", {
                timeZone: data.timezone,
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date())}
            />
          </div>

          {/* Map link */}
          {data.lat && data.lon && (
            <a
              href={`https://www.google.com/maps?q=${data.lat},${data.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#0d2a1f] p-3 text-sm text-slate-400 transition-all hover:border-[#00ff88]/25 hover:text-[#00ff88]"
            >
              <MapPin className="h-4 w-4" />
              Open approximate location in Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          <p className="text-center text-[10px] text-slate-600">
            Data from ip-api.com · Geolocation is approximate and not precise to individual users
          </p>
        </div>
      )}
    </div>
  );
}
