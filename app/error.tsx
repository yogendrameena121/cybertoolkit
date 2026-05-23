"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/8">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>

      <h1 className="font-display text-2xl font-bold text-white">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-slate-400">
        An unexpected error occurred. This is usually a temporary issue — try
        refreshing the page.
      </p>

      {error.digest && (
        <p className="mt-2 font-mono text-xs text-slate-600">
          Error ID: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/8 px-5 py-2.5 text-sm font-medium text-[#00ff88] transition-all hover:border-[#00ff88]/60"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-[#0d2a1f] px-5 py-2.5 text-sm text-slate-400 transition-all hover:border-[#00ff88]/25 hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
