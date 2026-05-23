"use client";

import { useState, useMemo } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { StrengthBar } from "@/components/tools/StrengthBar";

const COMMON_PATTERNS = [
  /^(password|passw0rd|p@ssword|p@ss)/i,
  /^(123456|1234567|12345678|123456789)/,
  /^(qwerty|asdf|zxcv)/i,
  /^(abc123|letmein|welcome|admin|login)/i,
  /(.)\1{3,}/, // 4+ repeated chars
  /^(test|demo|user|guest)/i,
];

function calcEntropy(password: string): number {
  let charset = 0;
  if (/[a-z]/.test(password)) charset += 26;
  if (/[A-Z]/.test(password)) charset += 26;
  if (/[0-9]/.test(password)) charset += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charset += 32;
  return Math.log2(charset) * password.length;
}

function timeToCrack(entropy: number): string {
  // 10 billion guesses per second (modern GPU cluster)
  const guessesPerSecond = 1e10;
  const possibleCombinations = Math.pow(2, entropy);
  const averageGuesses = possibleCombinations / 2;
  const seconds = averageGuesses / guessesPerSecond;

  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 3.156e13) return `${Math.round(seconds / 3153600000).toLocaleString()} centuries`;
  return "Practically forever";
}

interface PasswordAnalysis {
  score: number; // 0-100
  entropy: number;
  crackTime: string;
  checks: { label: string; passed: boolean }[];
  suggestions: string[];
}

function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return { score: 0, entropy: 0, crackTime: "N/A", checks: [], suggestions: [] };
  }

  const checks = [
    { label: "At least 12 characters", passed: password.length >= 12 },
    { label: "At least 16 characters", passed: password.length >= 16 },
    { label: "Uppercase letters (A-Z)", passed: /[A-Z]/.test(password) },
    { label: "Lowercase letters (a-z)", passed: /[a-z]/.test(password) },
    { label: "Numbers (0-9)", passed: /[0-9]/.test(password) },
    { label: "Special characters (!@#$...)", passed: /[^a-zA-Z0-9]/.test(password) },
    { label: "No common patterns", passed: !COMMON_PATTERNS.some((p) => p.test(password)) },
    { label: "No sequential characters", passed: !/(?:abc|bcd|cde|123|234|345|qwe|wer)/i.test(password) },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const entropy = calcEntropy(password);

  // Score: blend of entropy and check count
  let score = Math.min(100, (entropy / 80) * 60 + (passedCount / checks.length) * 40);

  // Penalize common patterns heavily
  if (COMMON_PATTERNS.some((p) => p.test(password))) score = Math.min(score, 20);
  if (password.length < 8) score = Math.min(score, 15);

  const suggestions: string[] = [];
  if (password.length < 12) suggestions.push("Increase length to at least 12 characters (longer = much stronger).");
  if (!/[A-Z]/.test(password)) suggestions.push("Add uppercase letters.");
  if (!/[a-z]/.test(password)) suggestions.push("Add lowercase letters.");
  if (!/[0-9]/.test(password)) suggestions.push("Include numbers.");
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push("Add special characters like !, @, #, $.");
  if (COMMON_PATTERNS.some((p) => p.test(password))) suggestions.push("Avoid common patterns and dictionary words.");
  if (suggestions.length === 0 && score < 80) suggestions.push("Consider using a passphrase of 4+ random words for memorability with high security.");

  return {
    score: Math.round(score),
    entropy: Math.round(entropy),
    crackTime: timeToCrack(entropy),
    checks,
    suggestions,
  };
}

export function PasswordStrengthClient() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  const crackTimeColor =
    analysis.score >= 80 ? "text-[#00ff88]" :
    analysis.score >= 60 ? "text-yellow-400" :
    analysis.score >= 40 ? "text-orange-400" :
    "text-red-400";

  return (
    <div className="space-y-5">
      {/* Password input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400">Password</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password to analyze..."
            className="w-full rounded-lg border border-[#0d2a1f] bg-[#050d1a] py-3 pl-4 pr-10 font-mono text-sm text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
            autoComplete="new-password"
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            type="button"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {password && (
          <p className="font-mono text-xs text-slate-600">{password.length} characters</p>
        )}
      </div>

      {password && (
        <>
          {/* Strength bar */}
          <StrengthBar score={analysis.score} label="Password Strength" />

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-3">
              <p className="text-xs text-slate-500">Entropy</p>
              <p className="mt-1 font-mono text-lg font-bold text-slate-200">
                {analysis.entropy}
                <span className="ml-1 text-xs text-slate-500">bits</span>
              </p>
            </div>
            <div className="rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-3">
              <p className="text-xs text-slate-500">Score</p>
              <p className={`mt-1 font-mono text-lg font-bold ${crackTimeColor}`}>
                {analysis.score}
                <span className="ml-1 text-xs text-slate-500">/ 100</span>
              </p>
            </div>
            <div className="col-span-2 rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-3 sm:col-span-1">
              <p className="text-xs text-slate-500">Time to crack</p>
              <p className={`mt-1 font-mono text-sm font-bold ${crackTimeColor}`}>
                {analysis.crackTime}
              </p>
            </div>
          </div>

          {/* Criteria checklist */}
          <div className="rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-4">
            <p className="mb-3 text-xs font-medium text-slate-400">Security Criteria</p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {analysis.checks.map((check) => (
                <div key={check.label} className="flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      check.passed
                        ? "bg-[#00ff88]/15 text-[#00ff88]"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {check.passed ? (
                      <Check className="h-2.5 w-2.5" />
                    ) : (
                      <X className="h-2.5 w-2.5" />
                    )}
                  </div>
                  <span
                    className={`text-xs ${check.passed ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="mb-2 text-xs font-medium text-yellow-400">Suggestions to improve</p>
              <ul className="space-y-1">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-400">
                    <span className="mt-0.5 text-yellow-400">›</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.suggestions.length === 0 && analysis.score >= 80 && (
            <div className="rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5 p-4 text-center">
              <p className="text-sm text-[#00ff88]">✓ Strong password — looks good!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
