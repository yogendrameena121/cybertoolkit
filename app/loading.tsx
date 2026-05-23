export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center gap-2">
        {[64, 48, 72].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-3 animate-pulse rounded bg-[#0d2a1f]"
              style={{ width: `${w}px` }}
            />
            {i < 2 && <div className="h-3 w-3 rounded bg-[#0d2a1f]" />}
          </div>
        ))}
      </div>

      {/* Tool header skeleton */}
      <div className="mb-6 flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-[#0d2a1f]" />
        <div className="space-y-2">
          <div className="h-7 w-48 animate-pulse rounded bg-[#0d2a1f]" />
          <div className="h-4 w-72 animate-pulse rounded bg-[#0d2a1f]" />
        </div>
      </div>

      {/* Privacy notice skeleton */}
      <div className="mb-6 h-10 animate-pulse rounded-lg bg-[#0d2a1f]" />

      {/* Tool UI skeleton */}
      <div className="space-y-4 rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-[#0d2a1f]" />
        <div className="h-24 animate-pulse rounded bg-[#0d2a1f]" />
        <div className="h-10 w-28 animate-pulse rounded bg-[#0d2a1f]" />
        <div className="h-20 animate-pulse rounded bg-[#0d2a1f]" />
      </div>
    </div>
  );
}
