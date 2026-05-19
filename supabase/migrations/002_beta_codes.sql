-- beta_codes: Zugangscodes für Beta-Tester
CREATE TABLE public.beta_codes (
  code TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_by UUID REFERENCES auth.users ON DELETE SET NULL,
  used_at TIMESTAMPTZ,
  note TEXT  -- z.B. "Tester-Gruppe 1", "Gymnasiallehrerin München"
);

-- Nur Service-Role darf lesen/schreiben (Validierung über API-Route)
ALTER TABLE public.beta_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service-Role vollzugriff beta_codes"
  ON public.beta_codes FOR ALL
  USING (auth.role() = 'service_role');

-- Beispiel-Codes einfügen (im Dashboard nach Bedarf ergänzen)
-- INSERT INTO public.beta_codes (code, note) VALUES ('BETA-GYMN-2026', 'Gymnasiallehrerin Beta-Gruppe');
