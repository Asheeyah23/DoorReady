const FEATURES = [
  { title: "Document Intelligence", body: "Reads income, ID, residency, and household records automatically." },
  { title: "Policy Citation", body: "Plain-language rules always linked back to source policy." },
  { title: "Gap Detection", body: "Flags missing or mismatched documents with fix guidance." },
  { title: "Packet Builder", body: "Assembles a clean, submission-ready application packet." },
  { title: "Readiness Score", body: "A composite confidence indicator — never an eligibility verdict." },
  { title: "Voice Accessibility", body: "Spoken playback of any cited rule explanation or summary." },
  { title: "Caseworker View", body: "The same evidence trail, built for faster human review." },
  { title: "Progress Tracking", body: "End-to-end packet status, always visible to the renter." },
];

export function Features() {
  return (
    <section id="features" className="bg-paper-2 py-24 border-y border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-xl mb-14">
          <span className="font-mono text-[11px] uppercase tracking-wider text-teal-600">Features</span>
          <h2 className="font-display text-4xl mt-3 tracking-tight text-teal-950">
            Everything needed to get a packet right the first time.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-line rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-lg hover:border-teal-200"
            >
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-xs text-ink-soft leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
