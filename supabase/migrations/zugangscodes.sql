-- Sprint D: Zugangsbeschränkung via Einladungscodes
-- Im Supabase-Dashboard unter SQL Editor ausführen

create table zugangscodes (
  id        uuid        primary key default gen_random_uuid(),
  code      text        unique not null,
  used      boolean     default false,
  used_by   uuid        references auth.users(id),
  used_at   timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security aktivieren
alter table zugangscodes enable row level security;

-- Anon darf Codes lesen (für Validierung)
create policy "anon_select"
  on zugangscodes for select
  to anon
  using (true);

-- Anon darf einen ungenutzten Code als "verwendet" markieren
create policy "anon_use_code"
  on zugangscodes for update
  to anon
  using (used = false)
  with check (used = true);

-- Eingeloggte User dürfen eigene Einlösung einsehen
create policy "user_select_own"
  on zugangscodes for select
  to authenticated
  using (used_by = auth.uid() or used = false);
