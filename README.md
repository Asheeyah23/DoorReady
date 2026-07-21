# 🚪 DoorReady

### **The Application-Readiness Copilot for Affordable Housing**

> **Before a human makes the decision, DoorReady makes sure the application is ready.**

[![Hack-Nation](https://img.shields.io/badge/Hack--Nation-Global%20AI%20Hackathon-0f766e?style=for-the-badge)](#)
[![RealDoor Track](https://img.shields.io/badge/Track-RealDoor-ff7a00?style=for-the-badge)](#)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](#)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?style=for-the-badge&logo=supabase)](#)
[![Claude](https://img.shields.io/badge/AI-Claude-cc785c?style=for-the-badge)](#)
[![ElevenLabs](https://img.shields.io/badge/Voice-ElevenLabs-000000?style=for-the-badge)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](#)

---

##  What is DoorReady?

**DoorReady is a renter-controlled application-readiness copilot for affordable housing.**

It helps renters understand complex housing requirements, analyze their application documents, identify missing or inconsistent information, and prepare a complete application packet before submission.

The system explains requirements in plain language and connects every rule explanation to its underlying policy source.

> **DoorReady prepares the renter and the packet. A qualified human still makes the eligibility decision.**

---

##  The Problem

A single documentation error can delay an affordable-housing application by weeks. Renters face dense eligibility rules, scattered document requirements, and no reliable way to check their packet before submitting — while housing authorities need every eligibility decision to remain in qualified human hands.

---

## The Solution

DoorReady transforms the application preparation process into an evidence-backed workflow.

DoorReady is a renter-controlled copilot that:

•	Interprets uploaded household documents (income, ID, residency, household composition)
	
•	Explains the relevant eligibility rules in plain language, every explanation backed by a citation to source policy

•	Flags missing or inconsistent documents, with guidance on how to fix them

•	Compiles a clean, application-ready packet once everything checks out

DoorReady never decides eligibility. It gets the renter and the packet ready — a qualified human still makes the call.

```
DOCUMENTS
    ↓
DOCUMENT UNDERSTANDING
    ↓
STRUCTURED EXTRACTION
    ↓
RULE MAPPING
    ↓
CITED EXPLANATIONS
    ↓
GAP & INCONSISTENCY DETECTION
    ↓
CORRECTION
    ↓
APPLICATION-READY PACKET
    ↓
HUMAN ELIGIBILITY REVIEW
```

DoorReady helps answer:

What do I need?

Why do I need it?

What is missing?

What appears inconsistent?

What should I fix before submitting?

---

## The Core Principle

AI for preparation. Humans for decisions.

DoorReady is deliberately designed as a human-in-the-loop system.

DoorReady can:

• Interpret uploaded documents

• Extract relevant information

• Map evidence against program rules

• Explain requirements in plain language

• Cite the source policy behind each explanation

• Detect gaps and inconsistencies

• Provide renter-facing guidance

• Generate an application-readiness assessment

• Prepare an application-ready packet

• Provide spoken explanations through voice accessibility features

DoorReady cannot:

• Approve an application

• Deny an application

• Determine final eligibility

• Replace a qualified caseworker

• Make unsupported policy claims

```
┌─────────────────────────────┐
│      RENTER / APPLICANT     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       DOORREADY AI          │
│                             │
│  Document Understanding     │
│  Rule Explanation           │
│  Evidence Mapping           │
│  Gap Detection              │
│  Packet Preparation         │
│  Voice Accessibility        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ APPLICATION-READY PACKET    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     QUALIFIED HUMAN         │
│                             │
│   FINAL ELIGIBILITY         │
│       DECISION              │
└─────────────────────────────┘
```

---

## How DoorReady Works

1. Upload

The renter uploads household documents such as:

• Identification

• Proof of income

• Residency documents

• Household composition records

• Supporting application documents

```
┌─────────────┐
│ ID Document │
├─────────────┤
│ Income Proof│
├─────────────┤
│ Residency   │
├─────────────┤
│ Household   │
└──────┬──────┘
       │
       ▼
```

2. Understand

DoorReady interprets uploaded documents and extracts relevant structured information.

Example:

```
{
  "document_type": "income_statement",
  "applicant_name": "Example Applicant",
  "employer": "Example Company",
  "reported_income": 42000,
  "currency": "USD",
  "document_date": "2026-06-30",
  "confidence": 0.96
}
```

The system transforms:

```
UNSTRUCTURED DOCUMENT
        ↓
STRUCTURED EVIDENCE
```

3. Map Evidence to Rules

Extracted information is mapped against the applicable affordable-housing program requirements.

```
┌────────────────────┐
│ HOUSEHOLD EVIDENCE │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ EXTRACTED FACTS    │
│                    │
│ Income: $42,000    │
│ Household: 3       │
│ Residency: ✓       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ PROGRAM RULES      │
│                    │
│ Income requirements │
│ Document rules     │
│ Residency rules    │
└────────────────────┘
```

---

## Citation-Backed Rule Explanations

DoorReady does not simply generate an answer and ask users to trust the AI.

Every rule explanation is connected to its source policy or guideline.

### Instead of:

❌ “You need this document because the AI says so.”

### DoorReady provides:

✅ “This document is required because the applicable program policy specifies it under the relevant requirement.”

```
┌────────────────────────────┐
│ REQUIREMENT                 │
│ Proof of income required    │
├────────────────────────────┤
│ STATUS                      │
│ ✓ Evidence found            │
├────────────────────────────┤
│ SOURCE                      │
│ Program Policy → Section X │
├────────────────────────────┤
│ EXPLANATION                 │
│ Plain-language explanation  │
├────────────────────────────┤
│ 🔊 LISTEN                   │
│ Hear this explanation       │
└────────────────────────────┘
```

Design Principle

```
NO SOURCE
    ↓
NO UNSUPPORTED CLAIM
```

---

## Gap & Inconsistency Detection

DoorReady does not only ask:

“Do you have a document?”

It also asks:

“Does the evidence make sense together?”

Missing Document

```
⚠️ MISSING DOCUMENT

Required:
Proof of residency

Status:
Not detected

Next step:
Upload an accepted residency document.
```

Potential Inconsistency

```
⚠️ POTENTIAL INCONSISTENCY

Name on income document:
John A. Smith

Name on identification:
John Smith

Action:
Review the information before submitting.
```

The system converts technical detection into clear, actionable guidance.

---

## Application-Ready Packet

Once identified gaps are addressed, DoorReady organizes the available evidence into a clean application packet.

```
APPLICATION PACKET
──────────────────────────────
✓ Identity
✓ Income
✓ Household Composition
✓ Residency
✓ Supporting Documents
──────────────────────────────
STATUS: READY FOR HUMAN REVIEW
```

The packet is prepared for submission.

The eligibility decision remains with the housing authority or qualified human reviewer.

---

## Readiness ≠ Eligibility

This distinction is fundamental to DoorReady.

```
┌─────────────────────────────┐
│       DOORREADY SCOPE       │
│                             │
│  Document completeness      │
│  Evidence coverage          │
│  Missing information        │
│  Inconsistency detection    │
│  Rule explanations          │
│  Application preparation    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       HUMAN DECISION        │
│                             │
│  Final eligibility review   │
│  Approval or denial         │
└─────────────────────────────┘
```

The Application Readiness Score is a composite confidence indicator.

It is:

• ❌ Not an eligibility score

• ❌ Not an approval probability

• ❌ Not a denial probability

• ❌ Not a replacement for human judgment

It answers one question:

How ready is this application for human review?

---

## System Architecture

```
┌─────────────────────────────────────────────┐
│                  NEXT.JS                    │
│                                             │
│  Renter Dashboard                           │
│  Document Upload                            │
│  Packet Status                              │
│  Rule Explanations                          │
│  Evidence Trail                             │
│  Readiness Visualization                    │
│  Voice Playback                             │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│              APPLICATION API                │
│                                             │
│  Upload Management                          │
│  Workflow Orchestration                     │
│  Packet State                               │
│  Readiness Calculation                      │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌───────────────┐     ┌────────────────────┐
│   SUPABASE    │     │    CLAUDE API      │
│               │     │                    │
│ Documents     │     │ Document Analysis  │
│ Evidence      │     │ Rule Explanation   │
│ Packet State   │     │ Gap Detection      │
│ Application   │     │ Evidence Mapping   │
└───────────────┘     └────────────────────┘
        │                     │
        └──────────┬──────────┘
                   ▼
        ┌─────────────────────┐
        │     TRUST LAYER     │
        │                     │
        │ Evidence Trail      │
        │ Source Citations    │
        │ Confidence Signals  │
        │ Readiness Score     │
        │ Renter View         │
        │ Caseworker View     │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │   ELEVENLABS TTS    │
        │                     │
        │ Cited Rule Audio    │
        │ Packet Summary Audio│
        └─────────────────────┘
```

---

## Architecture Philosophy

### 1. Evidence before inference

DoorReady prefers a traceable chain:

```
SOURCE DOCUMENT
      ↓
EXTRACTED FACT
      ↓
APPLICABLE RULE
      ↓
CITED EXPLANATION
      ↓
READINESS SIGNAL
```

Over

```
QUESTION
      ↓
UNSUPPORTED AI ANSWER
```

### 2. Traceability by default

Every important system output should be able to answer:

Why did the system say this?

The evidence trail can expose:

• The source document

• The extracted field

• The applicable rule

• The source citation

• The generated explanation

• The confidence signal


### 3. Human authority remains explicit

AI prepares evidence.

AI explains requirements.

AI identifies potential gaps.

A qualified human makes the final eligibility decision.


### 4. Accessibility is part of the workflow

Voice is not a separate experience.

The same cited, plain-language text generated for the renter can be read aloud.

```
CITED RULE EXPLANATION
          │
          ├──────────────► READ
          │
          └──────────────► LISTEN 🔊
```

This supports renters experiencing:

• Literacy barriers

• Vision impairment

• Reading fatigue

• Difficulty navigating dense paperwork

---

## Voice Accessibility

Stretch Goal

DoorReady can add a Listen option to:

• Rule explanations

• Completed application packet summaries

The flow is intentionally lightweight:

```
CLAUDE GENERATES
CITED PLAIN-LANGUAGE TEXT
          │
          ▼
      LISTEN
          │
          ▼
 ELEVENLABS TEXT-TO-SPEECH
          │
          ▼
    SPOKEN OUTPUT
```

The voice layer does not create a separate workflow or duplicate the core logic.

It reuses the same text already generated by the application.

---

## Readiness Model

Conceptually:

```
 READINESS =
    DOCUMENT COMPLETENESS
  + EVIDENCE COVERAGE
  + CONSISTENCY CHECKS
  + REQUIRED FIELD COVERAGE
  + CITATION COVERAGE
```

The readiness score is designed to communicate packet preparedness.

It does not make a final determination about whether the renter qualifies for housing.

---

## End-to-End Workflow


```
┌──────────────────────────────┐
│          1. APPLICANT        │
│                              │
│  Starts an affordable        │
│  housing application         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       2. UPLOAD DOCUMENTS    │
│                              │
│  • Identification            │
│  • Proof of income           │
│  • Residency documents       │
│  • Household information     │
│  • Supporting documents      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│    3. DOCUMENT UNDERSTANDING │
│                              │
│  DoorReady analyzes uploaded │
│  documents and identifies    │
│  relevant information.       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   4. STRUCTURED EXTRACTION   │
│                              │
│  Unstructured documents are  │
│  transformed into structured │
│  evidence.                   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     5. RULE MAPPING          │
│                              │
│  Extracted evidence is mapped│
│  against applicable housing  │
│  program requirements.       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  6. SOURCE-CITED EXPLANATION │
│                              │
│  DoorReady explains what is  │
│  required and why, linking   │
│  guidance to its source.     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  7. GAP & INCONSISTENCY      │
│         DETECTION            │
│                              │
│  The system checks for:      │
│                              │
│  • Missing documents         │
│  • Missing information       │
│  • Conflicting information   │
│  • Potential inconsistencies │
└──────────────┬───────────────┘
               │
               ▼
       ┌───────────────────┐
       │  ISSUE DETECTED?  │
       └─────────┬─────────┘
                 │
        ┌────────┴────────┐
        │                 │
       YES                NO
        │                 │
        ▼                 ▼
┌───────────────┐  ┌────────────────────┐
│ 8. EXPLAIN GAP│  │ 9. EVIDENCE TRAIL │
│               │  │                    │
│ Show the user │  │ Connect documents, │
│ what is wrong │  │ extracted facts,   │
│ or missing.   │  │ rules and sources. │
└───────┬───────┘  └──────────┬─────────┘
        │                     │
        ▼                     ▼
┌───────────────┐  ┌────────────────────┐
│ 9. CORRECTION │  │ 10. READINESS      │
│               │  │     ASSESSMENT     │
│ User uploads  │  │                    │
│ or corrects   │  │ Calculate how      │
│ information.  │  │ prepared the packet │
│               │  │ is for review.     │
└───────┬───────┘  └──────────┬─────────┘
        │                     │
        └──────────┐          ▼
                   │  ┌────────────────────┐
                   │  │ 11. PACKET          │
                   │  │     PREPARATION     │
                   │  │                    │
                   │  │ Organize available  │
                   │  │ evidence into an    │
                   │  │ application-ready   │
                   │  │ packet.             │
                   │  └──────────┬─────────┘
                   │             │
                   └─────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │ 12. VOICE ACCESSIBILITY│
                    │                        │
                    │ Optional: listen to    │
                    │ rule explanations and │
                    │ packet summaries using │
                    │ ElevenLabs.            │
                    └────────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │ 13. HUMAN REVIEW        │
                    │                        │
                    │ A qualified human      │
                    │ reviews the prepared   │
                    │ application packet.    │
                    └────────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │ 14. FINAL ELIGIBILITY   │
                    │        DECISION         │
                    │                        │
                    │ The qualified human or │
                    │ housing authority makes│
                    │ the final decision.    │
                    └────────────────────────┘
```

---

## Product Flow


```
RENTER
  ↓
UPLOAD DOCUMENTS
  ↓
DOORREADY UNDERSTANDS DOCUMENTS
  ↓
EXTRACT STRUCTURED EVIDENCE
  ↓
MAP EVIDENCE TO PROGRAM RULES
  ↓
EXPLAIN REQUIREMENTS WITH SOURCES
  ↓
CHECK FOR GAPS & INCONSISTENCIES
  ↓
┌───────────────────────────────┐
│ MISSING OR INCONSISTENT DATA? │
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        │               │
       YES              NO
        │               │
        ▼               ▼
EXPLAIN THE GAP    GENERATE EVIDENCE
        │               │
        ▼               ▼
RENTER CORRECTS    CALCULATE READINESS
OR UPLOADS MORE           │
DOCUMENTS                  ▼
        │          ASSEMBLE APPLICATION
        │              READY PACKET
        │                   │
        └──────────┐        ▼
                   │  OPTIONAL VOICE
                   │    ACCESSIBILITY
                   │        │
                   │        ▼
                   │  HUMAN REVIEW
                   │        │
                   │        ▼
                   │ FINAL ELIGIBILITY
                   │     DECISION
                   │
                   └──────► LOOP
```

---

## Suggested Data Model

```
applications
├── id
├── applicant_id
├── program_id
├── readiness_score
├── status
└── created_at

documents
├── id
├── application_id
├── document_type
├── storage_path
├── processing_status
└── uploaded_at

extracted_evidence
├── id
├── document_id
├── field_name
├── field_value
├── confidence
└── source_location

program_rules
├── id
├── program_id
├── rule_text
├── source_document
├── source_location
└── rule_type

evidence_mappings
├── id
├── evidence_id
├── rule_id
├── status
├── explanation
└── citation

gaps
├── id
├── application_id
├── gap_type
├── severity
├── explanation
└── resolution_status
```

---

## The Evidence Trail

The most important part of DoorReady is not simply the chatbot.

It is the chain of evidence.

```
┌──────────────────┐
│ Uploaded Document│
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Extracted Fact   │
│ Income: $42,000  │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Applied Rule     │
│ Source: Policy X │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Explanation      │
│ Plain Language   │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Readiness Signal │
└──────────────────┘
```

This allows both renters and reviewers to understand:

What was found?

Where did it come from?

Which rule does it relate to?

Why was this guidance provided?

---

## Designed for Multiple Stakeholders

### 🧑‍💼 Renters

• Understand complex requirements

• See what is missing

• Receive actionable guidance

• Track application readiness

• Listen to explanations when reading is difficult

### 🧑‍⚖️ Housing Counselors & Caseworkers

• Review more complete packets

• See the evidence trail

• Understand how the application was prepared

• Spend less time on preventable completeness issues

### 🏢 Housing Authorities

• Receive fewer defective applications

• Preserve human decision-making

• Improve application preparation

• Increase transparency around documentation


---

## Technology Architecture

```
┌──────────────────────────────────────────────┐
│                 NEXT.JS APP                  │
│                                              │
│  Renter Dashboard                            │
│  Document Upload                             │
│  Requirements Explorer                       │
│  Evidence Trail                              │
│  Gap Detection                               │
│  Readiness Dashboard                         │
│  Application Packet                          │
│  Voice Playback                              │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              APPLICATION LAYER               │
│                                              │
│  Upload Management                           │
│  Workflow Orchestration                      │
│  Evidence Processing                          │
│  Readiness Calculation                        │
│  Packet Generation                            │
└───────────────┬──────────────────────────────┘
                │
       ┌────────┴─────────┐
       ▼                  ▼
┌───────────────┐  ┌────────────────────────┐
│   SUPABASE    │  │      CLAUDE API        │
│               │  │                        │
│ Database      │  │ Document Understanding │
│ Storage       │  │ Evidence Extraction    │
│ Auth          │  │ Rule Explanation       │
│ Application   │  │ Gap Detection          │
│ State         │  │ Inconsistency Analysis │
└───────────────┘  └────────────┬───────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │      TRUST LAYER       │
                    │                        │
                    │ Source Citations       │
                    │ Evidence Trail         │
                    │ Confidence Signals     │
                    │ Readiness Score        │
                    │ Human Review Boundary   │
                    └────────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │      ELEVENLABS         │
                    │                        │
                    │ Rule Explanation Audio  │
                    │ Packet Summary Audio    │
                    └────────────────────────┘
```


## Technology Stack


```
┌──────────────────────────────────────────┐
│              USER INTERFACE              │
│                                          │
│      Next.js + React + TypeScript        │
│              + Tailwind CSS              │
└─────────────────────┬────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────┐
│              APPLICATION LAYER            │
│                                          │
│       Workflow Orchestration             │
│       Document Processing                │
│       Readiness Calculation              │
│       Packet Preparation                 │
└───────────────┬──────────────┬───────────┘
                │              │
                ▼              ▼
┌────────────────────┐  ┌────────────────────┐
│     SUPABASE       │  │     CLAUDE API     │
│                    │  │                    │
│  Database          │  │  Document Analysis │
│  Authentication    │  │  Evidence          │
│  File Storage      │  │  Extraction        │
│  Application State │  │  Rule Explanation  │
└────────────────────┘  │  Gap Detection     │
                        └─────────┬──────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │       TRUST LAYER       │
                    │                         │
                    │  Evidence Trail         │
                    │  Source Citations       │
                    │  Confidence Signals     │
                    │  Readiness Assessment   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       ELEVENLABS        │
                    │                         │
                    │  Voice Accessibility    │
                    │  Rule Explanations      │
                    │  Packet Summaries       │
                    └─────────────────────────┘
```

---

## Security & Trust Considerations

DoorReady is designed with the sensitivity of housing application data in mind.

Important principles include:

• Minimize unnecessary data exposure.

• Separate raw documents from extracted evidence.

• Use controlled access to applicant records. Avoid exposing sensitive documents in client-side logs.

• Preserve source references for AI-generated explanations.

• Make system limitations visible.

• Keep readiness assistance separate from eligibility determination.

---

## What DoorReady Is Not

DoorReady is not:

• An automated eligibility judge

• An approval engine

• A denial engine

• A replacement for housing professionals

• An opaque AI score

• A system that makes unsupported policy claims

DoorReady is:

• A transparent preparation layer between the applicant and the human decision-maker.

---

## Success Metrics

The DoorReady demo is successful when it demonstrates:

• End-to-end document upload

• Document interpretation

• Cited rule explanations

• Gap detection

• Clear correction guidance

• Readiness recalculation

• Application packet preparation

• Zero unsourced rule explanations in the demo path

• Clear separation between readiness assistance and eligibility decisions

• Optional voice playback of existing cited content

---

## Future Directions

DoorReady can evolve into a broader application-readiness infrastructure layer.

🧠 Multi-document reasoning

Understand relationships between multiple household documents.

🔍 Advanced inconsistency detection

Identify contradictions across:

• Names

• Addresses

• Dates

• Income records

• Household information

📚 Program-aware rule engines

Support multiple affordable-housing programs with independently versioned rule sources.

🧾 Caseworker Workspace

Allow professionals to review the same evidence trail generated for renters.

🧩 Explainable AI Audit Logs

Preserve the full reasoning and source trail behind system outputs.

🌐 Multilingual Accessibility

Explain complex housing requirements in the applicant’s preferred language.

🔊 Expanded Voice Accessibility

Provide spoken versions of:

• Rule explanations
• Missing-document guidance
• Application summaries
• Next-step instructions

🔄 Continuous Document Updates

Detect when an existing document becomes outdated or requires replacement.

---

## The Vision

Housing applications should not fail because people could not understand the paperwork.

DoorReady exists to reduce the distance between:

```
"I want to apply."
```
and

```
"My application is ready for human review."
```

The future of high-stakes AI should not be:

AI makes every decision.

It should be:

AI makes the process more understandable, more complete, more transparent, and more humanly reviewable.

---

## Built with

Next.js · React · TypeScript · Supabase · Claude API · ElevenLabs

