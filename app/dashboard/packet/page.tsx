export default function PacketPage() {
  const sections = [
    { label: "Identity", status: "Needs review" },
    { label: "Income", status: "Verified" },
    { label: "Residency", status: "Verified" },
    { label: "Household", status: "Verified" },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <h1 className="font-display text-2xl text-teal-950 mb-2">Packet</h1>
      <p className="text-sm text-ink-soft mb-8">
        Your application-ready packet, assembled from verified documents. Submitting is a separate
        step you take once every section is verified — the eligibility decision happens with your
        housing authority.
      </p>
      <div className="space-y-2.5">
        {sections.map((s) => (
          <div key={s.label} className="flex items-center justify-between border border-line rounded-xl px-4 py-3 text-sm">
            <span>{s.label}</span>
            <span className={s.status === "Verified" ? "text-teal-700 font-medium" : "text-orange-600 font-medium"}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
