import { ReadinessRing } from "@/components/shared/readiness-ring";
import { CitationChip } from "@/components/shared/citation-chip";
import { GapChip } from "@/components/shared/gap-chip";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Hack-Nation Global AI Hackathon · RealDoor Track
          </span>
          <h1 className="font-display font-medium text-5xl sm:text-6xl leading-[1.06] mt-6 tracking-tight text-teal-950">
            Every claim DoorReady makes has a source.
          </h1>
          <p className="text-lg text-ink-soft mt-6 max-w-md leading-relaxed">
            DoorReady reads a household&apos;s documents, explains affordable-housing rules in
            plain language, and assembles an application-ready packet. It never decides
            eligibility — a qualified human always makes that call.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="/dashboard"
              className="rounded-full bg-orange-600 hover:bg-orange-500 transition text-white font-semibold px-6 py-3 text-sm shadow-lg shadow-orange-600/20"
            >
              Try the demo
            </a>
            <a
              href="#how"
              className="rounded-full border border-teal-700 text-teal-700 hover:bg-teal-50 transition font-semibold px-6 py-3 text-sm"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="relative rounded-3xl p-6 bg-teal-950 min-h-[380px] flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono text-[11px] text-teal-200/80">
            <span>APPLICATION PACKET · UNIT 4B</span>
            <span>78% READY</span>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3.5 shadow-lg flex items-center justify-between">
              <span className="text-xs font-semibold">Proof of Income</span>
              <CitationChip
                label="§ 24 CFR 5.609"
                citation={{
                  ruleSummary: "Definition of annual income used to verify wage documentation.",
                  sourceName: "24 CFR § 5.609(a)",
                  sourceSection: "HUD Handbook 4350.3",
                  confidence: "high",
                }}
              />
            </div>
            <div className="bg-white rounded-xl p-3.5 shadow-lg flex items-center justify-between">
              <span className="text-xs font-semibold">Government ID</span>
              <GapChip label="Expired 3/2026" />
            </div>
          </div>
          <div className="bg-white/95 rounded-xl p-3 flex items-center gap-3">
            <ReadinessRing score={78} size={34} />
            <div className="text-xs">
              <div className="font-semibold text-teal-950">Readiness score: 78</div>
              <div className="text-ink-soft">1 gap flagged · fix to continue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
