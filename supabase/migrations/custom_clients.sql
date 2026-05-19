-- Migration: custom_clients
-- Nutzer können eigene KI-Klienten für Coaching-Sessions erstellen.
-- Hinweis: "alter" ist ein reserviertes SQL-Schlüsselwort → klient_alter

CREATE TABLE custom_clients (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  name           TEXT NOT NULL,
  klient_alter   INT,
  geschlecht     TEXT CHECK (geschlecht IN ('weiblich', 'männlich', 'divers', 'keine Angabe')),
  thema          TEXT NOT NULL,
  hintergrund    TEXT,
  besonderheiten TEXT,
  muster_fokus   TEXT[] NOT NULL DEFAULT '{}',
  aktiv          BOOLEAN NOT NULL DEFAULT TRUE
);

ALTER TABLE custom_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own custom clients" ON custom_clients
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
