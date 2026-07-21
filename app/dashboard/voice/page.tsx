"use client";

import { useState } from "react";

export default function VoicePage() {
  const [playing, setPlaying] = useState(false);
  const summary =
    "Your packet is 78% ready. Proof of income is verified. Your government ID expired in March 2026 — upload a current one to continue.";

  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl text-teal-950 mb-2">Voice</h1>
      <p className="text-sm text-ink-soft mb-8">
        Listen to your packet summary and rule explanations — the same cited text shown on
        screen, read aloud via ElevenLabs.
      </p>
      <div className="border border-line rounded-2xl p-6 bg-orange-100/30">
        <p className="text-sm leading-relaxed mb-4">&ldquo;{summary}&rdquo;</p>
        <button
          onClick={() => setPlaying((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-orange-600 bg-white rounded-full px-5 py-2.5 border border-orange-500/30 hover:border-orange-500 transition"
        >
          {playing ? "Pause" : "Listen"}
        </button>
      </div>
    </div>
  );
}
