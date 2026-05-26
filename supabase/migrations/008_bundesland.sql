-- S16: Bundesland-Feld
-- Kein UI-Feld (nur DB-Vorbereitung für spätere Erweiterung).
-- Die Spalte ist optional (NULL = nicht angegeben).

ALTER TABLE elterngespraech_konfigurationen
  ADD COLUMN IF NOT EXISTS bundesland TEXT;
