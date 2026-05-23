import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import { AdSlot } from "@/components/layout/AdSlot";
import type { LucideIcon } from "lucide-react";

interface RelatedTool {
  name: string;
  href: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  // Tool metadata
  toolName: string;
  toolDescription: string;
  icon: LucideIcon;
  category: string;
  categoryHref: string;

  // Tool UI
  children: React.ReactNode;

  // SEO content
  seoTitle: string;
  seoIntro: string;
  whatIsContent: string;
  howToSteps: string[];
  useCases: string[];
  isSafeContent: string;
  relatedTools: RelatedTool[];
  faqs: FAQItem[];

  // Optional affiliate/note content
  affiliateNote?: React.ReactNode;
}

export function ToolLayout({
  toolName,
  toolDescription,
  icon: Icon,
  category,
  categoryHref,
  children,
  seoTitle,
  seoIntro,
  whatIsContent,
  howToSteps,
  useCases,
  isSafeContent,
  relatedTools,
  faqs,
  affiliateNote,
}: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#00ff88] transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/tools" className="hover:text-[#00ff88] transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={categoryHref}
          className="hover:text-[#00ff88] transition-colors"
        >
          {category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-400">{toolName}</span>
      </nav>

      {/* Tool header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/10">
          <Icon className="h-6 w-6 text-[#00ff88]" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {toolName}
          </h1>
          <p className="mt-1 text-sm text-slate-400">{toolDescription}</p>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="mb-6 flex items-center gap-2 rounded border border-[#00ff88]/15 bg-[#00ff88]/5 px-4 py-2.5">
        <Shield className="h-4 w-4 shrink-0 text-[#00ff88]" />
        <p className="text-xs text-[#00ff88]/80">
          Your input never leaves your browser — all processing happens
          client-side.
        </p>
      </div>

      {/* Ad slot - top */}
      <AdSlot slot="1234567890" className="mb-6" />

      {/* Tool UI */}
      <div className="rounded-xl border border-[#0d2a1f] bg-[#070f1e] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
        {children}
      </div>

      {/* Affiliate note if provided */}
      {affiliateNote && (
        <div className="mt-6 rounded-lg border border-[#00d4ff]/20 bg-[#00d4ff]/5 p-4 text-sm text-slate-400">
          {affiliateNote}
        </div>
      )}

      {/* Ad slot - middle */}
      <AdSlot slot="0987654321" className="my-8" format="rectangle" />

      {/* SEO Content Section */}
      <div className="mt-10 space-y-8 border-t border-[#0d2a1f] pt-10">
        {/* H1 / Intro */}
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            {seoTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-slate-400">{seoIntro}</p>
        </div>

        {/* What is... */}
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100">
            What is {toolName}?
          </h2>
          <p className="mt-3 leading-relaxed text-slate-400">
            {whatIsContent}
          </p>
        </div>

        {/* How to use */}
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100">
            How to Use This Tool
          </h2>
          <ol className="mt-3 space-y-2">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-slate-400">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#00ff88]/10 font-mono text-xs font-bold text-[#00ff88]">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Use cases */}
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100">
            Use Cases
          </h2>
          <ul className="mt-3 space-y-2">
            {useCases.map((useCase, i) => (
              <li key={i} className="flex gap-2 text-slate-400">
                <span className="mt-1 text-[#00ff88]">▸</span>
                <span className="leading-relaxed">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Is it safe? */}
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100">
            Is It Safe to Use?
          </h2>
          <p className="mt-3 leading-relaxed text-slate-400">
            {isSafeContent}
          </p>
        </div>

        {/* Related tools */}
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100">
            Related Tools
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-3 transition-all hover:border-[#00ff88]/25"
              >
                <p className="text-sm font-medium text-slate-200 transition-colors group-hover:text-[#00ff88]">
                  {tool.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#0d2a1f] bg-[#070f1e] p-4"
              >
                <h3 className="font-medium text-slate-200">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ad slot - bottom */}
      <AdSlot slot="1122334455" className="mt-8" />
    </div>
  );
}
