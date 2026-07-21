const STEPS = [
  { n: "01", title: "Upload", body: "Household documents — income, ID, residency, household composition." },
  { n: "02", title: "AI analysis", body: "Claude extracts fields and classifies each document." },
  { n: "03", title: "Rule citation", body: "Every applicable rule linked to its source policy text." },
  { n: "04", title: "Gap detection", body: "Missing or mismatched documents flagged in plain language." },
  { n: "05", title: "Packet generation", body: "A clean, application-ready packet is assembled for review." },
  { n: "06", title: "Human decides", body: "Housing authority makes the eligibility call — always.", highlight: true },
];

export function HowItWorks() {
  return (
    <section id="how" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="font-mono text-[11px] uppercase tracking-wider text-teal-600">How it works</span>
        <h2 className="font-display text-4xl mt-3 tracking-tight text-teal-950">
          Six steps, one continuous thread of evidence.
        </h2>
      </div>
      <div className="grid md:grid-cols-6 gap-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className={`card border rounded-2xl p-5 h-full transition hover:-translate-y-1 hover:shadow-lg ${
              s.highlight ? "border-teal-700" : "border-line"
            }`}
          >
            <span className="font-mono text-xs text-teal-600">{s.n}</span>
            <h4 className="font-semibold mt-3 mb-1.5 text-sm">{s.title}</h4>
            <p className="text-xs text-ink-soft leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
