-- Auth profiles linked to Supabase Auth users.
-- Run after enabling Email auth in Supabase Dashboard.

create type if not exists public.user_role as enum ('admin', 'marketing_intern', 'member');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'member',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role public.user_role := 'member';
  meta_role text;
begin
  meta_role := new.raw_user_meta_data->>'role';
  if meta_role in ('admin', 'marketing_intern', 'member') then
    assigned_role := meta_role::public.user_role;
  end if;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    nullif(new.raw_user_meta_data->>'full_name', ''),
    assigned_role
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create first admin in Supabase Dashboard (Authentication → Users), then run:
-- update public.profiles set role = 'admin' where email = 'your-admin@email.com';
