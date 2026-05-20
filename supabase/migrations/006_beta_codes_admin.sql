-- Sprint 2: Beta-Codes Admin-Panel
-- Im Supabase-Dashboard unter SQL Editor ausfuehren

ALTER TABLE public.beta_codes
  ADD COLUMN IF NOT EXISTS name       TEXT,
  ADD COLUMN IF NOT EXISTS typ        TEXT NOT NULL DEFAULT 'beta',
  ADD COLUMN IF NOT EXISTS active     BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- Bestehende "note"-Werte in "name" uebertragen (falls vorhanden)
UPDATE public.beta_codes SET name = note WHERE name IS NULL AND note IS NOT NULL;
