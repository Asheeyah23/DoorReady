import Anthropic from "@anthropic-ai/sdk";
import type { DocumentAnalysisResult, DocumentCategory } from "@/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = "claude-sonnet-4-6";

/**
 * System prompt shared by every DoorReady AI call.
 * Two rules are load-bearing for the whole product and must never be
 * relaxed by a caller: (1) never state an eligibility outcome, and
 * (2) never produce a citation that isn't grounded in the supplied
 * program rules text.
 */
const SYSTEM_PROMPT = `You are DoorReady's document-interpretation assistant for affordable-housing
applications. You help a renter's household prepare a complete, accurate application packet.

Hard rules, never to be broken:
1. You never determine, state, or imply eligibility ("qualifies", "will be approved", "meets income limit
   and therefore qualifies", etc.). You only describe what a rule says and whether the household's documents
   satisfy that rule's *documentation requirement* — the eligibility decision belongs to a human reviewer
   at the housing authority.
2. Every rule explanation you produce MUST be paired with a citation to the specific source text you were
   given in the program rules context. If you are not given source text that supports a claim, do not make
   the claim — say the information is not available rather than inventing a citation. Never fabricate a
   source name, section number, or URL.
3. Write plain-language explanations a renter without legal or housing-policy background can understand.
4. Flag missing or inconsistent information factually and neutrally — never speculate about intent.

Always respond with ONLY valid JSON matching the requested schema. No markdown fences, no preamble.`;

export interface AnalyzeDocumentInput {
  documentText: string;
  documentFileName: string;
  programRulesContext: string; // retrieved source policy text to ground citations in
}

/**
 * Sends one household document plus the relevant program rules text to Claude
 * and returns a structured analysis: extracted fields, plain-language rule
 * explanations (each cited), missing information, and confidence.
 */
export async function analyzeDocument(
  input: AnalyzeDocumentInput
): Promise<DocumentAnalysisResult> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Analyze this household document and map it against the applicable program rules.

DOCUMENT FILE NAME: ${input.documentFileName}

DOCUMENT TEXT:
"""
${input.documentText}
"""

PROGRAM RULES CONTEXT (the only source you may cite):
"""
${input.programRulesContext}
"""

Respond with ONLY this JSON shape:
{
  "summary": string,
  "documentCategory": "income" | "identity" | "residency" | "household_composition" | "employment" | "supporting",
  "extractedFields": { [fieldName: string]: string | number | null },
  "missingInformation": string[],
  "recommendations": string[],
  "confidence": number,
  "citations": [
    {
      "ruleId": string,
      "ruleSummary": string,
      "sourceName": string,
      "sourceSection": string,
      "sourceUrl": string | null,
      "confidence": "high" | "medium" | "low"
    }
  ]
}`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content for document analysis.");
  }

  return JSON.parse(textBlock.text) as DocumentAnalysisResult;
}

export interface DetectGapsInput {
  applicationSummary: string; // plain description of documents on file so far
  requiredDocumentCategories: DocumentCategory[];
  programRulesContext: string;
}

export interface DetectedGap {
  documentCategory: DocumentCategory;
  title: string;
  description: string;
  fixGuidance: string;
  severity: "blocking" | "advisory";
  citation: {
    ruleId: string;
    ruleSummary: string;
    sourceName: string;
    sourceSection: string;
    confidence: "high" | "medium" | "low";
  } | null;
}

/** Compares what's on file against what's required and returns cited, plain-language gaps. */
export async function detectGaps(input: DetectGapsInput): Promise<DetectedGap[]> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Compare what's on file against what's required and flag gaps in plain language.

DOCUMENTS ON FILE:
"""
${input.applicationSummary}
"""

REQUIRED DOCUMENT CATEGORIES: ${input.requiredDocumentCategories.join(", ")}

PROGRAM RULES CONTEXT (the only source you may cite):
"""
${input.programRulesContext}
"""

Respond with ONLY a JSON array of gap objects:
[
  {
    "documentCategory": "income" | "identity" | "residency" | "household_composition" | "employment" | "supporting",
    "title": string,
    "description": string,
    "fixGuidance": string,
    "severity": "blocking" | "advisory",
    "citation": { "ruleId": string, "ruleSummary": string, "sourceName": string, "sourceSection": string, "confidence": "high" | "medium" | "low" } | null
  }
]`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content for gap detection.");
  }

  return JSON.parse(textBlock.text) as DetectedGap[];
}

/**
 * Generates the plain-language packet summary that's shown to the renter
 * and optionally sent to ElevenLabs for the "Listen" feature. This text is
 * the single source of truth for both the visual summary and the voice
 * playback — no separate voice-only content is ever generated.
 */
export async function generatePacketSummary(input: {
  readinessScore: number;
  verifiedCategories: string[];
  openGaps: { title: string; fixGuidance: string }[];
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Write a short, warm, plain-language packet status summary (3-4 sentences, suitable to be
read aloud) for a renter. Do not state or imply eligibility. Mention the readiness score as a confidence
indicator, what's verified, and what's still needed.

Readiness score: ${input.readinessScore}/100
Verified: ${input.verifiedCategories.join(", ") || "none yet"}
Open gaps: ${JSON.stringify(input.openGaps)}

Respond with ONLY the summary text, no JSON, no preamble.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content for packet summary.");
  }
  return textBlock.text.trim();
}
