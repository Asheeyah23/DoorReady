/**
 * Reinforces the product's one non-negotiable rule wherever it's placed.
 * Reuse this component rather than restating the copy inline, so the
 * wording of the constraint never drifts between screens.
 */
export function HumanDecisionBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200 rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
        Readiness assistance only
      </span>
    );
  }

  return (
    <div className="rounded-2xl bg-teal-950 text-center px-6 py-10">
      <span className="font-mono text-[11px] uppercase tracking-wider text-teal-200">
        The one rule that never bends
      </span>
      <h3 className="font-display text-3xl text-white mt-3">
        DoorReady prepares. Humans decide.
      </h3>
      <p className="text-teal-100/80 text-sm mt-3 max-w-md mx-auto leading-relaxed">
        DoorReady does not determine eligibility, approve, or deny applications. Every explanation
        is traceable to a cited source.
      </p>
    </div>
  );
}
