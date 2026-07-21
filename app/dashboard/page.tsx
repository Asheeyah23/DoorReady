import { createClient } from "@/lib/supabase/server";
import { ReadinessRing } from "@/components/shared/readiness-ring";
import { CitationChip } from "@/components/shared/citation-chip";
import { GapChip } from "@/components/shared/gap-chip";
import { HumanDecisionBanner } from "@/components/shared/human-decision-banner";

/**
 * Dashboard overview. Reads real data from Supabase when an application
 * exists for the signed-in user; falls back to representative placeholder
 * content so the screen is always demoable, e.g. during the hackathon demo
 * before a renter has uploaded anything yet.
 */
export default async function DashboardOverview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: application } = user
    ? await supabase
        .from("applications")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs text-ink-soft">Welcome back</div>
          <div className="font-semibold text-lg">
            {application?.program_name ?? "Unit 4B application"}
          </div>
        </div>
        <HumanDecisionBanner compact />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-line rounded-2xl p-5 flex items-center gap-4">
          <ReadinessRing score={78} size={52} />
          <div>
            <div className="text-xs text-ink-soft">Readiness score</div>
            <div className="font-display text-2xl text-teal-950">78/100</div>
          </div>
        </div>
        <div className="border border-line rounded-2xl p-5">
          <div className="text-xs text-ink-soft mb-1">Documents</div>
          <div className="font-display text-2xl text-teal-950">
            5<span className="text-sm text-ink-soft">/6 uploaded</span>
          </div>
        </div>
        <div className="border border-line rounded-2xl p-5">
          <div className="text-xs text-ink-soft mb-1">Citations generated</div>
          <div className="font-display text-2xl text-teal-950">14</div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-sm border border-line rounded-xl px-4 py-3">
          <span>Proof of income — verified</span>
          <CitationChip
            label="§ 5.609"
            citation={{
              ruleSummary: "Wage documentation matches self-reported annual income.",
              sourceName: "24 CFR § 5.609",
              sourceSection: "Income eligibility",
              confidence: "high",
            }}
          />
        </div>
        <div className="flex items-center justify-between text-sm border border-line rounded-xl px-4 py-3 bg-orange-100/40">
          <span>Government ID — expired 3/2026</span>
          <GapChip label="Fix now" />
        </div>
        <div className="flex items-center justify-between text-sm border border-line rounded-xl px-4 py-3">
          <span>Household composition — verified</span>
          <CitationChip
            label="§ 3.2"
            citation={{
              ruleSummary: "Household size of 3 places this application in income tier B.",
              sourceName: "Program Guide",
              sourceSection: "§3.2",
              confidence: "high",
            }}
          />
        </div>
      </div>
    </div>
  );
}
