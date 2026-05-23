"use client";

interface StrengthBarProps {
  score: number; // 0-100
  label?: string;
  showLabel?: boolean;
  className?: string;
}

const getStrengthConfig = (score: number) => {
  if (score < 20) return { label: "Very Weak", color: "#ff4444", glow: "rgba(255,68,68,0.4)", segments: 1 };
  if (score < 40) return { label: "Weak", color: "#ff8800", glow: "rgba(255,136,0,0.4)", segments: 2 };
  if (score < 60) return { label: "Fair", color: "#ffd700", glow: "rgba(255,215,0,0.4)", segments: 3 };
  if (score < 80) return { label: "Good", color: "#66ff88", glow: "rgba(102,255,136,0.4)", segments: 4 };
  return { label: "Strong", color: "#00ff88", glow: "rgba(0,255,136,0.4)", segments: 5 };
};

export function StrengthBar({
  score,
  label,
  showLabel = true,
  className = "",
}: StrengthBarProps) {
  const config = getStrengthConfig(score);
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label row */}
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{label || "Strength"}</span>
          <span
            className="text-xs font-medium font-mono"
            style={{ color: config.color }}
          >
            {config.label}
          </span>
        </div>
      )}

      {/* Segmented bar */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const active = i < config.segments && clampedScore > 0;
          return (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active ? config.color : "#0d2a1f",
                boxShadow: active ? `0 0 8px ${config.glow}` : "none",
              }}
            />
          );
        })}
      </div>

      {/* Continuous bar underneath */}
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-[#0d2a1f]">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedScore}%`,
            backgroundColor: config.color,
            boxShadow: `0 0 6px ${config.glow}`,
          }}
        />
      </div>
    </div>
  );
}
