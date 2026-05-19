-- elterngespraech_sessions: Gespeicherte Gesprächs-Sessions
CREATE TABLE public.elterngespraech_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  schultyp TEXT NOT NULL DEFAULT 'gymnasium',
  klassenstufe TEXT,
  gespraechsanlass TEXT,
  familiensituation TEXT,
  elterntyp TEXT,
  schwierigkeit TEXT,
  turns JSONB NOT NULL DEFAULT '[]',
  -- Format: [{ role: 'elternteil' | 'lehrkraft' | 'situation', content: string, timestamp: string }]
  reflexion TEXT,  -- Sonnet-Gesamtreflexion am Ende
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.elterngespraech_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users sehen eigene Sessions"
  ON public.elterngespraech_sessions FOR ALL
  USING (auth.uid() = user_id);
