# DoorReady

An application-readiness copilot for affordable housing. DoorReady reads a household's
documents, explains eligibility rules in plain language with citations back to source policy,
and assembles an application-ready packet — flagging gaps before submission.

**DoorReady never decides eligibility.** It prepares the renter and the packet; a qualified
human at the housing authority always makes that call. This constraint is enforced throughout
the codebase: there is no "approved" / "denied" / "eligible" field anywhere in the schema or
types, and the Claude system prompt in `lib/claude.ts` explicitly forbids the model from
stating one.

Built for the Hack-Nation Global AI Hackathon, RealDoor Track (sponsored by RealPage), July 2026.

## What's in this repo

- **`/demo/index.html`** — a standalone, dependency-free visual walkthrough of the whole
  product (landing page + dashboard preview). Open it directly in a browser — no install needed.
  Useful for a quick look or a hackathon pitch screen.
- Everything else is the real Next.js 15 / TypeScript application described below.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database & Storage | Supabase (Postgres + Row-Level Security + Storage) |
| AI | Claude API (`@anthropic-ai/sdk`) — document interpretation, cited rule explanations, gap detection |
| Voice (stretch) | ElevenLabs text-to-speech |
| Deployment | Vercel-ready |

## Getting started

This was built in a sandboxed environment without package-registry access, so dependencies
have **not** been installed or the app built/run here — you'll do that step locally:

```bash
npm install
cp .env.example .env.local   # fill in the keys below
npm run dev
```

### Environment variables (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
```

### Database setup

Run `database/schema.sql` against a fresh Supabase project (SQL Editor, or `supabase db push`).
It creates every table with Row-Level Security enabled, plus the `household-documents` storage
bucket. No table in this schema has an eligibility/approval column — see the comment at the top
of the file.

## Project structure

```
app/
  page.tsx                 landing page
  dashboard/                authenticated renter dashboard (overview, documents, rules, packet, voice, settings)
  api/
    upload/                 stores a document in Supabase Storage
    analyze/                 runs Claude's document-interpretation pipeline
    citations/                every cited rule explanation for an application
    readiness/                computes the composite readiness (confidence) score
    packet/                   assembles the application-ready packet
    voice/                     ElevenLabs playback of already-cited text
    documents/, history/, settings/, auth/
components/
  layout/                    navbar, sidebar
  landing/                   hero, how-it-works, features
  shared/                    citation-chip, gap-chip, readiness-ring, human-decision-banner
features/                   feature-scoped hooks/components (documents, readiness, citations, packet, voice)
lib/
  claude.ts                  Claude API layer — system prompt, structured JSON outputs, citation enforcement
  elevenlabs.ts               ElevenLabs text-to-speech wrapper
  supabase/                    client/server/middleware helpers
types/index.ts               domain types — intentionally has no eligibility field
database/schema.sql          full Postgres schema + RLS policies
```

## Design language

Teal primary (`#0F6B62` / `#17A398`), orange accent (`#D9601A`) — consistent with prior builds
(SafeAid, TrustLine, Truvend). Citations and trust indicators render in teal; flagged gaps and
action items render in orange, so a glance at the UI never implies a decision has been made.
Display type is Fraunces, body is Inter, and anything evidentiary — citations, scores, doc
IDs — is set in IBM Plex Mono. Full tokens are in `tailwind.config.ts`.

The signature UI element is the **citation chip** (`components/shared/citation-chip.tsx`): a
small pill that appears inline wherever DoorReady makes a claim, and expands to show the exact
rule, source, section, and confidence it came from. It's the same component used in the hero,
the dashboard, and the rules page — one visual promise repeated everywhere the product speaks.

## Open questions carried over from the product brief

- Which specific affordable-housing program's rules to cite against for the demo.
- Scope of RealPage's synthetic document set — determines extraction complexity in `lib/claude.ts`.
- Whether the full workflow (upload → cite → flag → packet) fits the hackathon window, or a
  partial slice is safer to demo live.
