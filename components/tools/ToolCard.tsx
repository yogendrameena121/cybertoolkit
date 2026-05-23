import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type ToolCategory =
  | "hashing"
  | "encoding"
  | "password"
  | "network"
  | "web"
  | "forensics";

export type ToolDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Tool {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: ToolCategory;
  difficulty: ToolDifficulty;
  popular?: boolean;
}

const categoryConfig: Record<
  ToolCategory,
  { label: string; color: string; bg: string; border: string }
> = {
  hashing: {
    label: "Hashing",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  encoding: {
    label: "Encoding",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  password: {
    label: "Password",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  network: {
    label: "Network",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  web: {
    label: "Web",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  forensics: {
    label: "Forensics",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
};

const difficultyConfig: Record<
  ToolDifficulty,
  { color: string; bg: string; border: string }
> = {
  Beginner: {
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  Intermediate: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  Advanced: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
};

interface ToolCardProps {
  tool: Tool;
  variant?: "grid" | "list";
}

export function ToolCard({ tool, variant = "grid" }: ToolCardProps) {
  const cat = categoryConfig[tool.category];
  const diff = difficultyConfig[tool.difficulty];
  const Icon = tool.icon;

  if (variant === "list") {
    return (
      <Link href={tool.href} className="group block">
        <div className="flex items-center gap-4 rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-4 transition-all hover:border-[#00ff88]/20 hover:shadow-[0_0_15px_rgba(0,255,136,0.05)]">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded border ${cat.border} ${cat.bg}`}
          >
            <Icon className={`h-4 w-4 ${cat.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-200 transition-colors group-hover:text-[#00ff88]">
                {tool.name}
              </span>
              {tool.popular && (
                <span className="rounded bg-[#00ff88]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00ff88]">
                  Popular
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {tool.description}
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <span
              className={`rounded border px-2 py-0.5 text-[10px] font-medium ${cat.bg} ${cat.border} ${cat.color}`}
            >
              {cat.label}
            </span>
            <span
              className={`rounded border px-2 py-0.5 text-[10px] ${diff.bg} ${diff.border} ${diff.color}`}
            >
              {tool.difficulty}
            </span>
            <ArrowRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-[#00ff88]" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={tool.href} className="group block">
      <div className="relative flex h-full flex-col rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-5 transition-all hover:border-[#00ff88]/25 hover:shadow-[0_0_20px_rgba(0,255,136,0.07)]">
        {/* Popular badge */}
        {tool.popular && (
          <div className="absolute right-3 top-3 rounded bg-[#00ff88]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00ff88]">
            Popular
          </div>
        )}

        {/* Icon */}
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg border ${cat.border} ${cat.bg} transition-all group-hover:shadow-[0_0_12px_rgba(0,255,136,0.15)]`}
        >
          <Icon className={`h-5 w-5 ${cat.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display font-semibold text-slate-100 transition-colors group-hover:text-[#00ff88]">
            {tool.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {tool.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${cat.bg} ${cat.border} ${cat.color}`}
            >
              {cat.label}
            </span>
            <span
              className={`rounded border px-1.5 py-0.5 text-[10px] ${diff.bg} ${diff.border} ${diff.color}`}
            >
              {tool.difficulty}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-slate-600 transition-colors group-hover:text-[#00ff88]">
            Try it
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
