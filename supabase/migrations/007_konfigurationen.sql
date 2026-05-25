-- Migration 007: Gespeicherte Gesprächskonfigurationen (S10)
-- Ermöglicht Lehrkräften, selbst konfigurierte Fälle zu speichern und später wiederzuverwenden.
-- WICHTIG: kind_initial speichert NUR den Anfangsbuchstaben, NIE den vollen Namen.

CREATE TABLE IF NOT EXISTS public.elterngespraech_konfigurationen (
  id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID         REFERENCES auth.users ON DELETE CASCADE,
  label               TEXT,                         -- z. B. "M., Kl. 3 – Leistungsabfall"
  schultyp            TEXT         NOT NULL,
  klassenstufe        TEXT         NOT NULL,
  person1             TEXT         NOT NULL,
  person2             TEXT,                         -- NULL wenn keine zweite Person
  elterntyp           TEXT         NOT NULL,
  familiensituation   TEXT         NOT NULL,
  gespraechsinitiative TEXT,
  gespraechsanlass    TEXT         NOT NULL,
  situation_text      TEXT,
  kind_initial        TEXT,                         -- NUR Anfangsbuchstabe (z. B. "M.")
  kind_geschlecht     TEXT,
  sprachbarriere      TEXT,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Nur eigene Konfigurationen sichtbar
ALTER TABLE public.elterngespraech_konfigurationen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Eigene Konfigurationen lesen"
  ON public.elterngespraech_konfigurationen FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Eigene Konfigurationen anlegen"
  ON public.elterngespraech_konfigurationen FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Eigene Konfigurationen löschen"
  ON public.elterngespraech_konfigurationen FOR DELETE
  USING (auth.uid() = user_id);

-- Service-Role braucht vollen Zugriff für die API-Route
GRANT ALL ON public.elterngespraech_konfigurationen TO service_role;

-- Index für schnelle Abfragen je Nutzer
CREATE INDEX IF NOT EXISTS idx_konfigurationen_user_id
  ON public.elterngespraech_konfigurationen (user_id, created_at DESC);
