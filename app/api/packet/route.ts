import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { DocumentCategory, PacketSection } from "@/types";

const SECTION_LABELS: Record<DocumentCategory, string> = {
  identity: "Identity",
  income: "Income",
  residency: "Residency",
  household_composition: "Household",
  employment: "Employment",
  supporting: "Supporting documents",
};

/**
 * POST /api/packet
 * Assembles the current application-ready packet from verified documents.
 * The packet is a readiness artifact only — submitting it to the housing
 * authority is a separate, explicit renter action, and the eligibility
 * decision happens entirely outside DoorReady.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { applicationId } = await request.json();

  if (!applicationId) {
    return NextResponse.json({ error: "applicationId is required." }, { status: 400 });
  }

  const { data: documents, error } = await supabase
    .from("documents")
    .select("*")
    .eq("application_id", applicationId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const byCategory = new Map<DocumentCategory, typeof documents>();
  for (const doc of documents ?? []) {
    const list = byCategory.get(doc.category) ?? [];
    list.push(doc);
    byCategory.set(doc.category, list);
  }

  const sections: PacketSection[] = Array.from(byCategory.entries()).map(([category, docs]) => ({
    category,
    label: SECTION_LABELS[category],
    documents: docs as any,
    status: docs.every((d) => d.status === "verified") ? "verified" : "needs_review",
  }));

  const allVerified = sections.length > 0 && sections.every((s) => s.status === "verified");

  const { data: packet, error: packetError } = await supabase
    .from("packet_versions")
    .insert({
      application_id: applicationId,
      status: allVerified ? "ready_for_submission" : "in_progress",
      sections,
      generated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (packetError) {
    return NextResponse.json({ error: packetError.message }, { status: 500 });
  }

  return NextResponse.json({ packet });
}
