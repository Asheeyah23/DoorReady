-- DoorReady database schema (Supabase / Postgres)
-- Row-Level Security is enabled on every table that holds household data.
-- Design principle: this schema has no "eligibility" or "approved" column
-- anywhere. That decision is made by a human, off-platform, in the housing
-- authority's system of record — DoorReady only tracks readiness.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- profiles: one row per authenticated renter or caseworker
-- ---------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'renter' check (role in ('renter', 'caseworker', 'admin')),
  household_id uuid,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles are self-readable"
  on profiles for select
  using (auth.uid() = id);

create policy "profiles are self-updatable"
  on profiles for update
  using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- applications: one row per household application to a program
-- ---------------------------------------------------------------------------
create table applications (
  id uuid primary key default uuid_generate_v4(),
  household_id uuid not null,
  program_id text not null,
  program_name text not null,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

alter table applications enable row level security;

create policy "applications are owner-readable"
  on applications for select
  using (created_by = auth.uid());

create policy "applications are owner-writable"
  on applications for insert
  with check (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- documents: uploaded household records + extraction status
-- ---------------------------------------------------------------------------
create table documents (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  category text not null check (category in
    ('income', 'identity', 'residency', 'household_composition', 'employment', 'supporting')),
  file_name text not null,
  storage_path text not null,
  status text not null default 'processing' check (status in
    ('processing', 'verified', 'needs_review', 'missing', 'expired')),
  extracted_fields jsonb not null default '{}'::jsonb,
  confidence numeric(3,2) check (confidence between 0 and 1),
  uploaded_at timestamptz not null default now()
);

alter table documents enable row level security;

create policy "documents follow application ownership"
  on documents for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- rule_citations: every explanation Claude generates, with its source
-- ---------------------------------------------------------------------------
create table rule_citations (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  document_id uuid references documents(id) on delete set null,
  rule_id text not null,
  rule_summary text not null,
  source_name text not null,
  source_section text not null,
  source_url text,
  confidence text not null check (confidence in ('high', 'medium', 'low')),
  created_at timestamptz not null default now()
);

alter table rule_citations enable row level security;

create policy "citations follow application ownership"
  on rule_citations for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- packet_gaps: flagged issues, plain-language, with fix guidance
-- ---------------------------------------------------------------------------
create table packet_gaps (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  document_category text not null,
  title text not null,
  description text not null,
  fix_guidance text not null,
  severity text not null check (severity in ('blocking', 'advisory')),
  citation_id uuid references rule_citations(id),
  resolved_at timestamptz
);

alter table packet_gaps enable row level security;

create policy "gaps follow application ownership"
  on packet_gaps for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- readiness_scores: composite CONFIDENCE score history (not an eligibility verdict)
-- ---------------------------------------------------------------------------
create table readiness_scores (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  score int not null check (score between 0 and 100),
  documents_uploaded int not null default 0,
  documents_required int not null default 0,
  citation_count int not null default 0,
  open_gaps int not null default 0,
  computed_at timestamptz not null default now()
);

alter table readiness_scores enable row level security;

create policy "readiness follows application ownership"
  on readiness_scores for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- packet_versions: generated application-ready packet snapshots
-- ---------------------------------------------------------------------------
create table packet_versions (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  status text not null default 'in_progress' check (status in
    ('in_progress', 'ready_for_submission', 'submitted')),
  sections jsonb not null default '[]'::jsonb,
  generated_at timestamptz
);

alter table packet_versions enable row level security;

create policy "packets follow application ownership"
  on packet_versions for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- voice_requests: ElevenLabs playback requests over already-cited text
-- ---------------------------------------------------------------------------
create table voice_requests (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  source_text text not null,
  audio_url text,
  status text not null default 'queued' check (status in ('queued', 'ready', 'failed')),
  created_at timestamptz not null default now()
);

alter table voice_requests enable row level security;

create policy "voice requests follow application ownership"
  on voice_requests for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- activity_logs: audit trail surfaced in the dashboard activity feed
-- ---------------------------------------------------------------------------
create table activity_logs (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  actor uuid references profiles(id),
  action text not null,
  detail text,
  created_at timestamptz not null default now()
);

alter table activity_logs enable row level security;

create policy "activity follows application ownership"
  on activity_logs for all
  using (
    application_id in (select id from applications where created_by = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- storage bucket for uploaded household documents
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('household-documents', 'household-documents', false)
on conflict do nothing;

create policy "users manage their own uploaded documents"
  on storage.objects for all
  using (bucket_id = 'household-documents' and owner = auth.uid());
