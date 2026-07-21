import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeDocument } from "@/lib/claude";

/**
 * POST /api/analyze
 * Runs Claude's document-interpretation pipeline for one uploaded document:
 * extract text → classify → identify fields → map rules → generate citations
 * → detect missing data → store results. Never writes an eligibility verdict.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { documentId, documentText, programRulesContext } = await request.json();

  if (!documentId || !documentText || !programRulesContext) {
    return NextResponse.json(
      { error: "documentId, documentText, and programRulesContext are required." },
      { status: 400 }
    );
  }

  const { data: document } = await supabase
    .from("documents")
    .select("file_name, application_id")
    .eq("id", documentId)
    .single();

  if (!document) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  const analysis = await analyzeDocument({
    documentText,
    documentFileName: document.file_name,
    programRulesContext,
  });

  await supabase
    .from("documents")
    .update({
      status: analysis.missingInformation.length > 0 ? "needs_review" : "verified",
      extracted_fields: analysis.extractedFields,
      confidence: analysis.confidence,
      category: analysis.documentCategory,
    })
    .eq("id", documentId);

  if (analysis.citations.length > 0) {
    await supabase.from("rule_citations").insert(
      analysis.citations.map((c) => ({
        application_id: document.application_id,
        document_id: documentId,
        rule_id: c.ruleId,
        rule_summary: c.ruleSummary,
        source_name: c.sourceName,
        source_section: c.sourceSection,
        source_url: c.sourceUrl ?? null,
        confidence: c.confidence,
      }))
    );
  }

  return NextResponse.json({ analysis });
}
