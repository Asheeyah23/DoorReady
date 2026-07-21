import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const REQUIRED_CATEGORIES = [
  "income",
  "identity",
  "residency",
  "household_composition",
] as const;

/**
 * GET /api/readiness?applicationId=...
 * Computes the composite readiness score. This is explicitly a confidence
 * indicator over document completeness/quality — never an eligibility signal.
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const applicationId = request.nextUrl.searchParams.get("applicationId");

  if (!applicationId) {
    return NextResponse.json({ error: "applicationId is required." }, { status: 400 });
  }

  const [{ data: documents }, { data: citations }, { data: gaps }] = await Promise.all([
    supabase.from("documents").select("category, status, confidence").eq("application_id", applicationId),
    supabase.from("rule_citations").select("id").eq("application_id", applicationId),
    supabase.from("packet_gaps").select("id").eq("application_id", applicationId).is("resolved_at", null),
  ]);

  const uploadedCategories = new Set((documents ?? []).map((d) => d.category));
  const documentsUploaded = uploadedCategories.size;
  const documentsRequired = REQUIRED_CATEGORIES.length;

  const avgConfidence =
    (documents ?? []).length > 0
      ? (documents ?? []).reduce((sum, d) => sum + (d.confidence ?? 0), 0) / (documents ?? []).length
      : 0;

  const completenessScore = (documentsUploaded / documentsRequired) * 60;
  const qualityScore = avgConfidence * 25;
  const gapPenalty = Math.min((gaps ?? []).length * 8, 25);
  const score = Math.max(0, Math.min(100, Math.round(completenessScore + qualityScore + 15 - gapPenalty)));

  const result = {
    applicationId,
    score,
    documentsUploaded,
    documentsRequired,
    citationCount: (citations ?? []).length,
    openGaps: (gaps ?? []).length,
    computedAt: new Date().toISOString(),
  };

  await supabase.from("readiness_scores").insert({
    application_id: applicationId,
    score: result.score,
    documents_uploaded: result.documentsUploaded,
    documents_required: result.documentsRequired,
    citation_count: result.citationCount,
    open_gaps: result.openGaps,
  });

  return NextResponse.json(result);
}
