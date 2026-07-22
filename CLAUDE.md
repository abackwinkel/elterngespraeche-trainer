@AGENTS.md

## Projektstatus

**Sprint 5 deployed – 2026-05-31 (Commit 03d4dfd)**  
Live: https://www.elterngespraeche-trainieren.de

### Aktuelle Architektur

```
app/
  massnahmen/page.tsx    ← Symptom-Picker + 31 Maßnahmen-Detailpanels (Sprint 5)
  gesprach/page.tsx      ← KI-Gesprächsschmiede (unified, Sprint 4)
  referendare/page.tsx   ← 4 fixe Fallbeispiele
  quiz/page.tsx
  info/page.tsx
lib/
  massnahmen-data.ts     ← 31 Maßnahmen (A01–C05) statische TS-Konstanten
  symptome-data.ts       ← 13 Symptome (s01–s13) mit Maßnahmen-Zuordnung
```

### Kritische technische Hinweise

- **Supabase Auth in Next.js:** `createBrowserClient()` für Client-Components; `createServerClient()` in Route Handlers liest Cookies NICHT zuverlässig
- **Anthropic Messages:** Erste Nachricht muss `role:'user'` sein — Opener-Turn (assistant) mit `slice(1)` droppen
- **Feedback-Prompt (JSON):** Das JSON-Formatbeispiel im Prompt MUSS gerade Anführungszeichen als Begrenzer behalten — eine uneingeschränkte „deutsche Anführungszeichen“-Anweisung bringt das Modell dazu, sie als String-Begrenzer zu setzen, und der Output ist unlesbar. Deshalb dort `RECHTSCHREIB_REGEL_JSON` (nicht die Textvariante), Sanierung erst NACH dem Parsen über `sanitizeJsonDeep`, und `repairGermanQuotedJson` als Auffangnetz vor dem Parsen. Umlaute sind unproblematisch.
- **Typografie:** SSOT ist `lib/germanTypography.mjs` — byte-gleiche Kopie von `~/.claude/skills/deutsche-typografie/scripts/german_typography.mjs` bis auf die `isCli`-Zeile. `diff` gegen die Skill-Datei ist der Drift-Check; Änderungen immer in BEIDEN nachziehen. Selbsttest: `node lib/germanTypography.mjs --test`. **`--fix` niemals auf `.ts`-Dateien** — es würde die String-Begrenzer im Code zu `„…“` machen.
- **Detail-Panel:** Desktop: `position:fixed` rechts 50% Breite + Backdrop; Mobile: Bottom Sheet 75vh — CSS-only, kein externes Package
- **s12 + s13:** Urgente Symptome — Warnbox darf NICHT dismissible sein

### Offene Aufgaben

1. ThriveCart-Integration: `THRIVECART_WEBHOOK_SECRET` in Vercel, Kauf-Flow testen, Paywall aktivieren
2. Optional: Weitere Referendare-Fälle (aktuell 4, ideal 6–8)
