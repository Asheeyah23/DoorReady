/**
 * Core domain types for DoorReady.
 * DoorReady never determines eligibility — these types intentionally
 * have no "approved" / "denied" / "eligible" fields anywhere. Only a
 * human housing-authority reviewer produces that outcome, outside this system.
 */

export type DocumentCategory =
  | "income"
  | "identity"
  | "residency"
  | "household_composition"
  | "employment"
  | "supporting";

export type DocumentStatus = "processing" | "verified" | "needs_review" | "missing" | "expired";

export interface HouseholdDocument {
  id: string;
  applicationId: string;
  category: DocumentCategory;
  fileName: string;
  storagePath: string;
  status: DocumentStatus;
  uploadedAt: string;
  extractedFields: Record<string, string | number | null>;
  confidence: number; // 0–1, extraction confidence — not an eligibility signal
}

export interface RuleCitation {
  id: string;
  ruleId: string;
  ruleSummary: string; // plain-language explanation
  sourceName: string; // e.g. "24 CFR § 5.609" or "Housing Authority Admin Plan"
  sourceSection: string;
  sourceUrl?: string;
  confidence: "high" | "medium" | "low";
  relatedDocumentId?: string;
}

export type GapSeverity = "blocking" | "advisory";

export interface PacketGap {
  id: string;
  applicationId: string;
  documentCategory: DocumentCategory;
  title: string;
  description: string; // plain-language explanation of what's wrong
  fixGuidance: string; // plain-language explanation of how to fix it
  severity: GapSeverity;
  citationId?: string;
  resolvedAt?: string | null;
}

/**
 * Readiness score is a composite CONFIDENCE indicator only.
 * It is explicitly not, and must never be presented as, an eligibility verdict.
 */
export interface ReadinessScore {
  applicationId: string;
  score: number; // 0–100
  documentsUploaded: number;
  documentsRequired: number;
  citationCount: number;
  openGaps: number;
  computedAt: string;
}

export interface ApplicationPacket {
  id: string;
  applicationId: string;
  programId: string;
  status: "in_progress" | "ready_for_submission" | "submitted";
  sections: PacketSection[];
  generatedAt: string | null;
}

export interface PacketSection {
  category: DocumentCategory;
  label: string;
  documents: HouseholdDocument[];
  status: DocumentStatus;
}

export interface VoiceRequest {
  id: string;
  applicationId: string;
  sourceText: string; // the exact cited text being read aloud — no new content
  audioUrl: string | null;
  status: "queued" | "ready" | "failed";
  createdAt: string;
}

export interface Application {
  id: string;
  householdId: string;
  programId: string;
  programName: string;
  createdAt: string;
}

/** Structured output contract Claude must return from /api/analyze — see lib/claude.ts */
export interface DocumentAnalysisResult {
  summary: string;
  documentCategory: DocumentCategory;
  extractedFields: Record<string, string | number | null>;
  missingInformation: string[];
  recommendations: string[];
  confidence: number; // 0–1
  citations: Omit<RuleCitation, "id" | "relatedDocumentId">[];
}
