-- Sprint H: Quiz-Ergebnisse speichern
-- Im Supabase-Dashboard unter SQL Editor ausführen

create table quiz_results (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  created_at    timestamptz default now(),
  category      text        not null,  -- 'vakog-sprachmuster' | 'vakog-koerper' | 'metaprogramme' | 'metamodell' | 'metaphern'
  score         integer     not null,  -- Anzahl richtige Antworten
  total         integer     not null,  -- Gesamtzahl Fragen
  score_percent integer     not null   -- 0–100
);

alter table quiz_results enable row level security;

create policy "user_select_own"
  on quiz_results for select
  to authenticated
  using (user_id = auth.uid());

create policy "user_insert_own"
  on quiz_results for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "user_delete_own"
  on quiz_results for delete
  to authenticated
  using (user_id = auth.uid());

create index quiz_results_user_idx on quiz_results(user_id, category, created_at desc);
