"use client";

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
  mono?: boolean;
  hint?: string;
}

export function InputArea({
  value,
  onChange,
  placeholder = "Enter input...",
  label,
  rows = 4,
  maxLength,
  className = "",
  mono = false,
  hint,
}: InputAreaProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label row */}
      {(label || maxLength) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-xs font-medium text-slate-400">{label}</label>
          )}
          {value.length > 0 && (
            <span className="ml-auto text-xs text-slate-600">
              {value.length.toLocaleString()}
              {maxLength && ` / ${maxLength.toLocaleString()}`} chars
            </span>
          )}
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full resize-y rounded border border-[#0d2a1f] bg-[#070f1e] px-4 py-3 text-sm text-slate-200 placeholder-slate-600 transition-colors focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20 ${
          mono ? "font-mono" : ""
        }`}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      {/* Hint */}
      {hint && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  );
}
