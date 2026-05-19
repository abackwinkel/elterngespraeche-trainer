-- user_profiles: Trial-Tracking und Subscription-Status
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  trial_started_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_status TEXT NOT NULL DEFAULT 'trial',
  -- Mögliche Werte: 'trial' | 'active' | 'expired' | 'beta'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users lesen eigenes Profil"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users aktualisieren eigenes Profil"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service-Role darf alles (für Middleware + Webhook)
CREATE POLICY "Service-Role vollzugriff"
  ON public.user_profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Trigger: user_profiles automatisch bei Registrierung anlegen
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, trial_started_at, subscription_status)
  VALUES (NEW.id, NOW(), 'trial');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
