# Übergabe an Claude Code – Zugriffsproblem Elterngesprächs-Trainer

**Datum:** 2026-05-19  
**User:** antje@antje-backwinkel.de  
**Projekt:** `C:\Users\atmos\Documents\elterngespraeche-trainer`  
**Vercel-URL:** `https://elterngespraeche-trainer-abackwinkels-projects.vercel.app`

---

## Problem

Antje kann sich einloggen, landet aber danach immer auf `/paywall` statt auf der App. Der Zugriff wird in `proxy.ts` (früher `middleware.ts`) geprüft.

---

## Diagnose (bisheriger Stand)

Die Middleware/Proxy prüft den Zugriff so:

1. User eingeloggt? → via Anon Key (`createMiddlewareClient`)
2. `user_profiles`-Eintrag abrufen → via **Service Role Key**
3. `subscription_status` prüfen: `active`, `beta` oder `trial` (innerhalb 7 Tage)

Wenn Schritt 2 fehlschlägt (kein Profil zurück), landet der User auf `/paywall`.

**Ursprüngliche CC-Diagnose:** `SUPABASE_SERVICE_ROLE_KEY` in Vercel war falsch (Leerzeichen beim Copy-Paste).

---

## Was bereits gemacht wurde

1. ✅ `SUPABASE_SERVICE_ROLE_KEY` in Vercel gelöscht und neu eingegeben (direkt aus `.env.local`)
2. ✅ Alle 5 Env-Variablen jetzt auf Projekt-Ebene in Vercel gesetzt:
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `THRIVECART_WEBHOOK_SECRET`
3. ✅ `middleware.ts` → `proxy.ts` umbenannt (Next.js 16 deprecation warning)
   - Funktion heißt jetzt `proxy` statt `middleware`
4. ✅ Temporärer Debug-Endpunkt angelegt: `app/api/debug/route.ts`
   - Dieser gibt aber **Internal Server Error** zurück – Ursache unklar

---

## Aktueller Codestand

### `proxy.ts` (Root-Verzeichnis)
- Prüft Auth + Service-Role-Datenbankabfrage
- Funktion exportiert als `export async function proxy(...)`
- `config.matcher` schließt nur `api/thrivecart`, `_next/*`, `favicon.ico` aus

### `lib/supabase.ts`
- `createMiddlewareClient` → nutzt Anon Key
- `createClient` → Browser-Client

### `lib/supabase-server.ts`
- `createServerSupabaseClient` → Server-seitiger Client mit Anon Key

### Datenbankschema `user_profiles` (001_user_profiles.sql)
```sql
id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
trial_started_at TIMESTAMPTZ DEFAULT NOW(),
subscription_status TEXT NOT NULL DEFAULT 'trial'
-- Werte: 'trial' | 'active' | 'expired' | 'beta'
```

---

## Nächste Schritte für CC

1. **Internal Server Error bei `/api/debug` klären** – warum crasht der Endpunkt?
2. **Service Role Key verifizieren** – tatsächlich korrekt in Vercel gesetzt?
3. **Datenbankabfrage testen** – kommt ein Profil zurück für Antjes User-ID?
4. **`subscription_status` prüfen** – ist es `trial` mit abgelaufenem Datum?
5. **Evtl. direkter Fix:** Antjes `subscription_status` in Supabase auf `beta` setzen

### Schnellfix (wenn DB-Zugriff funktioniert):
Im Supabase SQL-Editor:
```sql
UPDATE user_profiles 
SET subscription_status = 'beta' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'antje@antje-backwinkel.de');
```

---

## Git-Situation

- GitHub Desktop ist jetzt installiert – bitte für alle Commits verwenden
- Git-Operationen aus der Cowork-Bash-Sandbox schlagen fehl (Windows-Mount-Problem)
- Alle lokalen Änderungen sind **noch nicht committed/gepusht** (debug route + proxy.ts liegen lokal)
