"use client";

import { useState, useMemo } from "react";
import { Search, LayoutGrid, List, Filter } from "lucide-react";
import { ToolCard, type ToolCategory } from "@/components/tools/ToolCard";
import { ALL_TOOLS } from "@/lib/tools-registry";

const CATEGORIES: { value: ToolCategory | "all"; label: string }[] = [
  { value: "all", label: "All Tools" },
  { value: "hashing", label: "Hashing" },
  { value: "encoding", label: "Encoding" },
  { value: "password", label: "Password" },
  { value: "network", label: "Network" },
  { value: "web", label: "Web" },
  { value: "forensics", label: "Forensics" },
];

export function ToolsIndexClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch =
        !search ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#00ff88]">
          {ALL_TOOLS.length} Tools Available
        </p>
        <h1 className="font-display mt-1 text-3xl font-bold text-white sm:text-4xl">
          Security & Developer Tools
        </h1>
        <p className="mt-2 text-slate-400">
          All tools run in your browser. No data sent to servers.
        </p>
      </div>

      {/* Filters bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#0d2a1f] bg-[#070f1e] py-2.5 pl-9 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
          />
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-1">
          <button
            onClick={() => setView("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded transition-all ${
              view === "grid"
                ? "bg-[#00ff88]/15 text-[#00ff88]"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex h-8 w-8 items-center justify-center rounded transition-all ${
              view === "list"
                ? "bg-[#00ff88]/15 text-[#00ff88]"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-all ${
              category === cat.value
                ? "border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]"
                : "border-[#0d2a1f] text-slate-500 hover:border-[#00ff88]/25 hover:text-slate-300"
            }`}
          >
            {cat.label}
            {cat.value !== "all" && (
              <span className="ml-1.5 font-mono text-[10px] opacity-60">
                {ALL_TOOLS.filter((t) => t.category === cat.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <Filter className="h-3.5 w-3.5" />
        <span>
          Showing {filtered.length} of {ALL_TOOLS.length} tools
          {search && ` matching "${search}"`}
          {category !== "all" && ` in ${category}`}
        </span>
      </div>

      {/* Tools grid/list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#0d2a1f] py-20 text-center">
          <Search className="mb-3 h-10 w-10 text-slate-600" />
          <p className="font-medium text-slate-400">No tools found</p>
          <p className="mt-1 text-sm text-slate-600">
            Try a different search term or category
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
            className="mt-4 rounded border border-[#0d2a1f] px-4 py-2 text-sm text-slate-400 transition-colors hover:text-[#00ff88]"
          >
            Clear filters
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.href} tool={tool} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tool) => (
            <ToolCard key={tool.href} tool={tool} variant="list" />
          ))}
        </div>
      )}
    </div>
  );
}
