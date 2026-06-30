-- Run this in the Supabase SQL editor to create required tables.

create table if not exists public.website_content (
  page_key text primary key,
  title text not null default '',
  sections jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.website_versions (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  timestamp bigint not null,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.marketing_interns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  recruits integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  intern_id uuid not null references public.marketing_interns(id) on delete cascade,
  name text not null,
  email text not null,
  join_date date not null,
  referred_by text,
  created_at timestamptz not null default now()
);

alter table public.website_content enable row level security;
alter table public.website_versions enable row level security;
alter table public.marketing_interns enable row level security;
alter table public.members enable row level security;

create policy "website_content_public_access"
  on public.website_content for all using (true) with check (true);

create policy "website_versions_public_access"
  on public.website_versions for all using (true) with check (true);

create policy "marketing_interns_public_access"
  on public.marketing_interns for all using (true) with check (true);

create policy "members_public_access"
  on public.members for all using (true) with check (true);
