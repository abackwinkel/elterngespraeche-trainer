-- Feedback: Nutzer-Feedback aus der App (globaler Feedback-Button)
-- Im Supabase-Dashboard unter SQL Editor ausführen.
-- Referenz-Implementierung: NLP-Trainer (siehe Vault: 04-NLP-trainieren-mit-KI/Feedback-Funktion-Referenz-und-Uebergabe.md)

create table if not exists public.feedback (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  app         text not null,                 -- 'elterngespraechstrainer'
  page        text,                          -- window.location.pathname
  message     text not null,
  rating      smallint,                      -- optional 1-5
  user_email  text,                          -- aus Session, falls eingeloggt
  user_id     uuid,                          -- aus Session, falls eingeloggt
  user_agent  text,                          -- Browser-Info, für Kontext
  status      text not null default 'new'    -- new | reviewed | done
);

create index if not exists feedback_created_at_idx on public.feedback (created_at desc);

-- Row Level Security
alter table public.feedback enable row level security;

-- Eingeloggte Nutzer dürfen Feedback einreichen
create policy "authenticated can insert feedback"
  on public.feedback for insert
  to authenticated
  with check (true);

-- Nur Admin (Antje) darf Feedback lesen – Admin-Panel läuft clientseitig (Variante B)
create policy "admin can read feedback"
  on public.feedback for select
  to authenticated
  using ( (auth.jwt() ->> 'email') = 'antje@antje-backwinkel.de' );

-- Nur Admin darf Status ändern (new -> reviewed -> done)
create policy "admin can update feedback"
  on public.feedback for update
  to authenticated
  using ( (auth.jwt() ->> 'email') = 'antje@antje-backwinkel.de' )
  with check ( (auth.jwt() ->> 'email') = 'antje@antje-backwinkel.de' );

grant insert, select, update on public.feedback to authenticated;

-- Service-Role (für den täglichen E-Mail-Digest, server-seitig) darf lesen.
-- WICHTIG: ohne diesen Grant scheitert der Digest mit "permission denied for table feedback".
grant select on public.feedback to service_role;
