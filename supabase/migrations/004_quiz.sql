-- elterngespraech_quiz: Quiz-Ergebnisse
CREATE TABLE public.elterngespraech_quiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  modul TEXT NOT NULL,
  -- 'gespraechsphasen' | 'reaktionen' | 'rechtswissen' | 'gfk' | 'vorbereitung' | 'koerpersignale'
  frage_id TEXT NOT NULL,
  korrekt BOOLEAN NOT NULL,
  schwierigkeit TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.elterngespraech_quiz ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users sehen eigene Quiz-Ergebnisse"
  ON public.elterngespraech_quiz FOR ALL
  USING (auth.uid() = user_id);
