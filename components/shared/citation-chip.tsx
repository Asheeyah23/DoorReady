"use client";

import { useState } from "react";
import type { RuleCitation } from "@/types";

/**
 * The product's signature element. Renders inline wherever DoorReady makes
 * a claim, and expands on hover/click to show the exact source it came
 * from — rule, source document, section, and confidence. Never render this
 * component with a citation object that lacks a sourceName/sourceSection;
 * that combination is what "no unsourced claims" means in practice.
 */
export function CitationChip({
  citation,
  label,
}: {
  citation: Pick<RuleCitation, "ruleSummary" | "sourceName" | "sourceSection" | "confidence">;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="cite-chip"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
        {label}
      </button>
      {open && (
        <div
          role="tooltip"
          className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-teal-950 text-teal-50 text-xs leading-relaxed p-3 shadow-xl z-30"
        >
          {citation.ruleSummary}
          <div className="mt-1.5 font-mono text-[10.5px] text-teal-200">
            {citation.sourceName} · {citation.sourceSection} · {citation.confidence} confidence
          </div>
        </div>
      )}
    </span>
  );
}
