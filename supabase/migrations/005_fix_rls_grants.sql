-- Fix: Grants + korrekte RLS-Policies für elterngespraech_sessions und elterngespraech_quiz
-- Im Supabase Dashboard unter SQL Editor ausführen

-- ─── elterngespraech_sessions ─────────────────────────────────────────────────

-- Grants für authenticated und service_role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.elterngespraech_sessions TO authenticated;
GRANT ALL ON public.elterngespraech_sessions TO service_role;

-- Alte Policy entfernen (FOR ALL mit nur USING ist für INSERT nicht sicher)
DROP POLICY IF EXISTS "Users sehen eigene Sessions" ON public.elterngespraech_sessions;

-- Neue, korrekte Policies
CREATE POLICY "sessions_select_own"
  ON public.elterngespraech_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "sessions_insert_own"
  ON public.elterngespraech_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sessions_delete_own"
  ON public.elterngespraech_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ─── elterngespraech_quiz ─────────────────────────────────────────────────────

GRANT SELECT, INSERT, UPDATE, DELETE ON public.elterngespraech_quiz TO authenticated;
GRANT ALL ON public.elterngespraech_quiz TO service_role;

DROP POLICY IF EXISTS "Users sehen eigene Quiz-Ergebnisse" ON public.elterngespraech_quiz;

CREATE POLICY "quiz_select_own"
  ON public.elterngespraech_quiz FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "quiz_insert_own"
  ON public.elterngespraech_quiz FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "quiz_delete_own"
  ON public.elterngespraech_quiz FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
