-- Sprint G: Session-Speicherung (Phase 2)
-- Im Supabase-Dashboard unter SQL Editor ausführen

create table sessions (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        not null references auth.users(id) on delete cascade,
  created_at          timestamptz default now(),

  -- Konfigurations-Metadaten
  client_id           text        not null,
  client_name         text        not null,
  difficulty          text        not null,
  pattern_focus       text[]      not null default '{}',
  motivation_style    text,

  -- Gesprächs-Inhalt
  messages            jsonb       not null default '[]',
  duration_seconds    integer,

  -- Auswertung
  evaluation_text     text,
  highlights          jsonb       not null default '[]',
  recognized_patterns jsonb       not null default '{}',

  -- Gamification-Metriken (direkt aus dem Auswertungs-JSON)
  score               integer,    -- erkennungsrate_prozent (0–100)
  patterns_marked     integer     not null default 0,  -- erkannte_muster
  patterns_embedded   integer     not null default 0,  -- eingebettete_muster
  notes_created       boolean     not null default false
);

-- Row Level Security
alter table sessions enable row level security;

-- Nutzer sehen nur eigene Sessions
create policy "user_select_own"
  on sessions for select
  to authenticated
  using (user_id = auth.uid());

-- Nutzer können eigene Sessions anlegen
create policy "user_insert_own"
  on sessions for insert
  to authenticated
  with check (user_id = auth.uid());

-- Nutzer können eigene Sessions löschen (Datenlöschung auf Anfrage)
create policy "user_delete_own"
  on sessions for delete
  to authenticated
  using (user_id = auth.uid());

-- Schneller Index für Verlaufsabfragen (neueste zuerst)
create index sessions_user_id_idx on sessions(user_id, created_at desc);
