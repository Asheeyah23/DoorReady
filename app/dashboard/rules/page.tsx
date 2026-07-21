import { CitationChip } from "@/components/shared/citation-chip";

export default function RulesPage() {
  const citations = [
    {
      label: "24 CFR § 5.609",
      summary: "Definition of annual income used to verify wage documentation.",
      section: "Income eligibility",
    },
    {
      label: "Program Guide § 3.2",
      summary: "Household size determines the applicable income limit tier.",
      section: "Household composition",
    },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <h1 className="font-display text-2xl text-teal-950 mb-2">Rules</h1>
      <p className="text-sm text-ink-soft mb-8">Every rule DoorReady has explained for this application, with its source.</p>
      <div className="space-y-3">
        {citations.map((c) => (
          <div key={c.label} className="border border-line rounded-xl p-4 flex items-start justify-between gap-4">
            <p className="text-sm">{c.summary}</p>
            <CitationChip
              label={c.label}
              citation={{ ruleSummary: c.summary, sourceName: c.label, sourceSection: c.section, confidence: "high" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
