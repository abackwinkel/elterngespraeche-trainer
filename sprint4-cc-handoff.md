# Sprint 4 – CC Handoff

**Stand:** 2026-05-26  
**Deployed:** Sprint 3 + Bug-Fixes sind live auf www.elterngespraeche-trainieren.de  
**Commit:** 5300e6c (feat: nachträgliches Speichern)

---

## Überblick: Was Sprint 4 liefern soll

Sprint 4 ist ein **struktureller Umbau** der App – keine neuen Inhalte, aber eine deutlich klarere Navigation und modernere UX. Die Schultypen verschwinden als eigenständige Navigationspunkte. Stattdessen gibt es drei klare Feature-Bereiche.

---

## S19 – Header-Farbe aufhellen (Kleinfix, zuerst erledigen)

**Problem:** `--c-header: #1A2E35` ist ein sehr dunkles Navy – laut Nutzer zu dunkel.  
**Fix:** In `app/globals.css` Zeile 21 ändern:

```css
--c-header: #1A2E35;   /* alt – zu dunkel */
--c-header: #1b6b5e;   /* neu – mittleres Teal, passt zur Sidebar-Palette */
```

Das wirkt sich automatisch auf alle 14 Seiten aus, die `var(--c-header)` nutzen:
- `app/page.tsx`, `app/fortschritt/page.tsx`, `app/nachbereitung/page.tsx`
- `app/info/page.tsx`, `app/gymnasium/info/page.tsx`, `app/realschule/info/page.tsx`
- `app/gesamtschule/info/page.tsx`, `app/grundschule/info/page.tsx`
- `app/gymnasium/nachbereitung/page.tsx`
- Alle schultyp-spezifischen `page.tsx` (gymnasium, realschule, gesamtschule, grundschule, mittelschule)

Kein TypeScript-Fehler, kein Deployment-Risiko – einfache CSS-Änderung.

---

## S20 – Neue Standalone-Seite `/massnahmen`

**Hintergrund:** „Maßnahmen & Folgeschritte" war zuerst ein Tab in `/grundschule/info`. Der 6. Tab soll dort wieder entfernt werden. Stattdessen bekommt das Thema eine eigene Seite, die für alle Schultypen gilt und in der Sidebar erscheint.

### Routen-Datei

Neue Datei: `app/massnahmen/page.tsx`  
Layout-Datei: `app/massnahmen/layout.tsx` (identisch zu anderen layouts – nur `<Sidebar />` + children)

### Tabs

```
[ Sofortmaßnahmen ] [ Kooperative Maßnahmen ] [ Externe Unterstützung ]
```

Inhalte: exakt die Daten aus dem gerade entfernten 6. Tab in `/grundschule/info/page.tsx` (Section A → Sofortmaßnahmen, Section B → Kooperative Maßnahmen, Section C → Externe Unterstützung). Der §8a-Hinweis (Section D) kommt als Infobox unter den Tab-Content von Sofortmaßnahmen.

### Expandable Detail-Panel – UX-Entscheidung

**Desktop (≥ 768 px):** Beim Klick auf eine Maßnahme schiebt sich von rechts ein Panel ein (50 % Breite, `position: fixed`, `right: 0`, `top: 0`, `height: 100%`). Backdrop-Overlay mit 50 % Opacity links davon. Panel enthält:
- Titel der Maßnahme (h2)
- Fließtext-Erklärung (Warum, Wann, Hintergrund)
- Konkrete Schritte als nummerierte Liste
- 2–3 Praxis-Beispiele (Kursivtext, leicht abgesetzt)
- Schließen-Button oben rechts (`×`) + Klick auf Backdrop schließt

**Mobile (< 768 px):** Bottom Sheet (schiebt von unten hoch, ~75 % Viewport-Höhe, drag handle oben). Gleicher Inhalt. Standard-Mobile-Muster, kein externes Paket nötig – CSS `transform: translateY` + `transition`.

Daten-Struktur: Ein Array von Objekten je Tab:
```typescript
type MassnahmeDetail = {
  id: string
  titel: string
  wann: string
  beispiel: string
  detail: {
    erklaerung: string   // Fließtext-Absätze
    schritte: string[]   // nummerierte Liste
    beispiele: string[]  // 2-3 konkrete Praxisbeispiele
  }
}
```

### Grundschule Info – 6. Tab entfernen

In `app/grundschule/info/page.tsx` den Tab `{ id: 'massnahmen', label: 'Maßnahmen & Folgeschritte' }` aus dem `TABS`-Array streichen und den kompletten Render-Block für `tab === 'massnahmen'` entfernen.

---

## S21 – Nachbereitung wird Tab in `/info`

**Hintergrund:** „Nachbereitung" ist aktuell als eigener Sidebar-Link `/nachbereitung` geführt. Das soll in die allgemeine Info-Seite als Tab wandern.

- In `app/info/page.tsx`: neuen Tab `{ id: 'nachbereitung', label: 'Nachbereitung' }` hinzufügen (letzter Tab)
- Inhalte: aus `app/nachbereitung/page.tsx` und `app/gymnasium/nachbereitung/page.tsx` übernehmen/zusammenführen
- Die Route `/nachbereitung` bleibt technisch erhalten, zeigt aber entweder eine Weiterleitung nach `/info` oder kann vorerst bleiben
- `app/gymnasium/nachbereitung/page.tsx` kann ebenfalls auf `/info` verweisen

---

## S22 – Sidebar-Umbau

**Vorher (aktuell):**
```
Startseite
─────────────
Grundlagen & Info  → /info
Wissensquiz        → /quiz
Nachbereitung      → /nachbereitung
─────────────
GESPRÄCHSSCHMIEDE [Label]
  🎭 Gymnasium     → /gymnasium/gespraech
  🎭 Realschule    → /realschule/gespraech
  🎭 Gesamtschule  → /gesamtschule/gespraech
  🎭 Grundschule   → /grundschule/gespraech
  🎭 Mittelschule  → /mittelschule/gespraech
─────────────
Mein Fortschritt
```

**Nachher (Ziel):**
```
Startseite
─────────────
Grundlagen & Info        → /info
Maßnahmen & Folgeschritte → /massnahmen      [NEU]
Wissensquiz              → /quiz
─────────────
🎭 Gesprächsschmiede     → /gesprach         [NEU – unified]
🎭 Referendare           → /referendare      [NEU – fixed cases]
─────────────
Mein Fortschritt
```

**Änderungen in `components/layout/Sidebar.tsx`:**
- `NavLink` für Nachbereitung entfernen
- `GespraechsschmiedeLink` für alle 5 Schultypen entfernen
- Section-Label „GESPRÄCHSSCHMIEDE" entfernen
- Neue `NavLink`-Einträge für `/massnahmen`, `/gesprach`, `/referendare`
- `isActive`/`isPrefix` für neue Routen korrekt setzen

---

## S23 – Neue Route `/gesprach` (unified Gesprächsschmiede)

**Konzept:** Eine einzige Gesprächsschmiede, bei der man oben den Schultyp wählt, dann konfiguriert und startet. Die 5 alten `/*/gesprach`-Routen bleiben im Code erhalten (404-Schutz für Bookmarks), sind aber nicht mehr verlinkt.

### Implementierung

`app/gesprach/page.tsx`:
```tsx
'use client'
// Zustand: ausgewählter Schultyp (null = noch nicht gewählt)
// Schritt 1: Schultyp-Selector (5 Kacheln: Gymnasium, Realschule, Gesamtschule, Grundschule, Mittelschule)
// Schritt 2: KonfigurationsForm schultyp={selectedSchultyp} onStart={...}
// Schritt 3: GespraechsInterface (wie gehabt)
```

`app/gesprach/layout.tsx`:
```tsx
import Sidebar from '@/components/layout/Sidebar'
export default function GespraechLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden page-with-sidebar" style={{ background: 'var(--c-offwhite)' }}>
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  )
}
```

Schultyp-Selector-UI: 5 schmale Kacheln (oder Dropdown), stimmig mit dem übrigen Design. Kein großer Hero – direkt wählen und weiter.

---

## S24 – Neue Route `/referendare` (Fixed Cases)

**Konzept:** Vorgegebene Fallbeispiele ohne freie Konfiguration – für Referendare, die nicht selbst konfigurieren wollen. Ursprungsidee des Trainers.

Inhalt-Vorschlag (3–4 fixe Szenarien):
1. Elterngespräch nach schlechtem Zeugnis (Gymnasium, besorgter Vater)
2. Verhaltensauffälligkeit Grundschule (aufgebrachte Mutter)
3. Aufklärungsgespräch Lernbehinderung (Elternpaar, zurückhaltend)
4. Schulmüdigkeit / Schulverweigerung (alleinerziehende Mutter, erschöpft)

Jedes Szenario: kurze Beschreibung + „Gespräch starten"-Button → landet direkt in `GespraechsInterface` mit vorkonfiguriertem `config`-Objekt (kein KonfigurationsForm).

`app/referendare/page.tsx`: Szenario-Auswahl-Grid  
`app/referendare/layout.tsx`: Standard-Sidebar-Layout

---

## S25 – Startseite `/` umgestalten

**Vorher:** 3 Schultyp-Kacheln (Gymnasium, Grundschule, Mittelschule) – Grundschule und Mittelschule waren „Demnächst".

**Nachher:** 3 Feature-Kacheln:

```
[ Grundlagen & Info ]    [ Wissensquiz ]    [ Gesprächsschmiede ]
→ /info                  → /quiz            → /gesprach
```

**Design-Anforderungen:**
- Hover-Lift-Effekt (bereits als `card-lift`-CSS-Klasse vorhanden)
- Türkiser Rahmen (border: `2px solid var(--c-teal)`) – kein grüner
- Kein „Demnächst"-Platzhalter mehr
- Header-Text anpassen: statt „Dein Schultyp – dein Einstieg" etwas wie „Wo möchtest du heute starten?"
- Untertabellen-Karte „Wie das Training funktioniert" kann bleiben oder wird zu einer kompakten Willkommens-Box

---

## Reihenfolge für Implementierung

1. S19 – Header-Farbe (2 Minuten, kein Risiko)
2. S20 – `/massnahmen` + Grundschule-Tab entfernen
3. S21 – Nachbereitung → Tab in `/info`
4. S22 – Sidebar-Umbau (erst nach S21 und S20, da Sidebar die neuen Links braucht)
5. S23 – `/gesprach` unified
6. S24 – `/referendare`
7. S25 – Startseite

TypeScript-Check nach jedem größeren Schritt. Deploy erst am Ende.

---

## Bestehende Routen nach Sprint 4

| Route | Status |
|-------|--------|
| `/gymnasium/gespraech` | Bleibt im Code, nicht mehr in Sidebar verlinkt |
| `/realschule/gespraech` | Bleibt im Code, nicht mehr verlinkt |
| `/gesamtschule/gespraech` | Bleibt im Code, nicht mehr verlinkt |
| `/grundschule/gespraech` | Bleibt im Code, nicht mehr verlinkt |
| `/mittelschule/gespraech` | Bleibt im Code, nicht mehr verlinkt |
| `/nachbereitung` | Bleibt vorerst erhalten (evtl. später Redirect) |
| `/gymnasium/nachbereitung` | Bleibt vorerst erhalten |

Kein SEO-Risiko (alle Seiten hinter Auth/Paywall).

---

## Referenzdaten

- **Projektordner:** `C:\Users\atmos\Documents\elterngespraeche-trainer`
- **Live-URL:** https://www.elterngespraeche-trainieren.de
- **Vercel-Projekt:** abackwinkels-projects/elterngespraeche-trainer
- **Supabase-Tabellen:** `elterngespraech_konfigurationen`, `elterngespraech_sessions`, `elterngespraech_quiz`, `user_profiles` (alle im Data API exponiert)
- **Schultyp-Typ:** `'gymnasium' | 'realschule' | 'gesamtschule' | 'grundschule' | 'mittelschule'`
- **QuizModul-Typ:** `'gespraechsphasen' | 'reaktionen' | 'rechtswissen' | 'gfk' | 'vorbereitung' | 'koerpersignale' | 'massnahmen'` (in `types/index.ts`)
