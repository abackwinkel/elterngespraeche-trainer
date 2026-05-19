# Übergabe – Elterngespräche-Trainer

**Datum:** 2026-05-19
**Projekt:** `C:\Users\atmos\Documents\elterngespraeche-trainer`
**Live:** https://www.elterngespraeche-trainieren.de
**Vercel:** https://elterngespraeche-trainer.vercel.app
**GitHub:** https://github.com/abackwinkel/elterngespraeche-trainer
**Supabase-Projekt-ID:** uyshekimoafjecsxotaq

---

## Status: App läuft ✅

Sprint 1 vollständig deployed und funktionsfähig. Login, Zugangsprüfung und Beta-Zugang funktionieren.

**Antjes Account:** antje@antje-backwinkel.de
**User-ID:** 9af58f3f-3f74-4dce-b5f6-12cb2501ae7f
**Status in DB:** subscription_status = 'beta' ✅

---

## Was in Sprint 1 gebaut wurde

- Auth + Trial-Middleware (proxy.ts) mit 7-Tage-Trial-Check
- Startseite, Gymnasium-Übersicht, alle Shell-Seiten
- Gesprächsschmiede: KonfigurationsForm + GespraechsInterface + AuswertungsPanel
- Quiz-Modul (gymnasium/quiz)
- Körpersignale-Modul (gymnasium/koerpersignale)
- Alle 6 Elterntyp-Prompts + Auswertungs-Prompts
- Alle API-Routen (gespraech/elternteil, feedback, reflexion, quiz/check, beta/validate, thrivecart/webhook)
- Supabase: user_profiles, beta_codes, elterngespraech_sessions, elterngespraech_quiz

---

## Bekannte offene Punkte (Sprint 2)

- **Supabase Auth-URL** noch nicht auf Custom Domain gesetzt:
  Supabase → Authentication → URL Configuration → Site URL auf `https://www.elterngespraeche-trainieren.de` ändern (damit Bestätigungs-E-Mails korrekte Links haben)
- **Infoseiten** (gymnasium/info): Tabs 2–5 sind noch Platzhalter
- **Beta-Code-Verwaltung** nur über Supabase Table Editor (kein Admin-Panel)
- **ThriveCart** noch nicht konfiguriert (THRIVECART_WEBHOOK_SECRET = "placeholder")
- **Debug-Endpunkt** `/api/debug` noch aktiv – vor Launch entfernen
- **SSL-Zertifikat** auf Custom Domain: Warnung sollte von selbst verschwinden, ggf. in Vercel prüfen

---

## Technische Besonderheiten

**proxy.ts statt middleware.ts:** Next.js 16 verwendet proxy.ts (nicht middleware.ts).
Export heißt `proxy`, Config heißt `config` mit `matcher`.

**Service-Role-Client ohne Cookies:** Der Service-Client im Proxy muss mit leeren Cookies laufen:
```typescript
{ cookies: { getAll: () => [], setAll: () => {} } }
```
Sonst sendet @supabase/ssr den User-JWT statt den Service-Role-Key → falsche DB-Rolle → Paywall.

**Supabase Grants:** Nach Tabellen-Erstellung via SQL müssen Grants manuell gesetzt werden:
```sql
GRANT ALL ON public.user_profiles TO service_role;
-- etc.
```

---

## Nächste Sprint-2-Themen (Vorschlag)

1. Infoseiten (gymnasium/info) Tabs 2–5 mit Inhalten füllen
2. Beta-Codes: kleine Admin-UI oder zumindest Anleitung
3. ThriveCart-Integration testen
4. SSL-Warnung auf Custom Domain klären
5. Debug-Endpunkt entfernen
