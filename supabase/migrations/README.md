# Supabase-Migrations — Elterngespräche-Trainer

## Einrichtung (einmalig, im Supabase-Dashboard)

1. **Supabase-Projekt anlegen:**
   - supabase.com → „New Project"
   - Name: `elterngespraeche-trainer`
   - Region: `eu-central-1` (Frankfurt)
   - Passwort notieren

2. **SQL-Scripts ausführen** (Reihenfolge wichtig):
   - Dashboard → SQL Editor → jeweils „New query" → Script einfügen → Run
   1. `001_user_profiles.sql`
   2. `002_beta_codes.sql`
   3. `003_sessions.sql`
   4. `004_quiz.sql`

3. **API-Keys notieren:**
   - Settings → API
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. **Auth-Einstellungen:**
   - Authentication → Settings
   - Site URL: `https://elterngespraeche-trainieren.de`
   - Redirect URLs: `https://elterngespraeche-trainieren.de/**`
   - Für lokale Entwicklung zusätzlich: `http://localhost:3000/**`

5. **Beta-Codes anlegen** (nach Bedarf):
   ```sql
   INSERT INTO public.beta_codes (code, note)
   VALUES ('BETA-GYMN-2026', 'Gymnasiallehrerin Beta-Gruppe');
   ```
