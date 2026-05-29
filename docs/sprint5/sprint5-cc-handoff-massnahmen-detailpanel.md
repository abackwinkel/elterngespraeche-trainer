# Sprint 5 — CC Handoff: Maßnahmen-Detail-Panel + Symptom-Picker
Projekt: Elterngespräche-Trainer (elterngespraeche-trainieren.de)
Stack: Next.js + TypeScript + Tailwind + Supabase + Vercel
Datum: 28.05.2026

## Was dieser Sprint baut

1. **Detail-Inhalte für alle 31 Maßnahmen** auf `/massnahmen` (15 Stufe A + 11 Stufe B + 5 Stufe C). Bisher: Tab-Titel mit knappen Einzeilern wie „Klare Regel für Verspätungen kommunizieren". Neu: aufklappbares Detail-Panel mit Ziel, Bausteine-Tabelle, wörtlichen Formulierungen, Fallstricken, Eskalationspfad.
2. **Symptom-Picker oben auf `/massnahmen`-Startseite**: 13 typische Symptome (z. B. „Häufiges Zuspätkommen", „Verdacht auf Kindeswohlgefährdung"). Klick → gefilterte Maßnahmenliste aus allen 3 Stufen, sortiert nach Eingriffstiefe. Detail-Panels sind dieselben wie über Browse.

Die bestehende Tab-Struktur (Stufe A/B/C) bleibt als Browse-Pfad erhalten.

## Quelldateien (alle im selben Ordner)

- `massnahmen-stufe-a-detailpanel.md` — Stufe A, 15 Maßnahmen
- `massnahmen-stufe-b-detailpanel.md` — Stufe B, 11 Maßnahmen
- `massnahmen-stufe-c-detailpanel.md` — Stufe C, 5 externe Fachstellen
- `massnahmen-symptom-mapping.md` — 13 Symptome + JSON-Mapping Symptom → Maßnahmen-IDs

Jede Maßnahme ist im selben Format strukturiert:
- Trigger-Untertitel (kursiv)
- Ziel (1 Satz)
- Wann NICHT
- Bausteine-Tabelle: `Was tun | Beispiel-Formulierung | Material`
- Typische Fehler
- Eskalation
- (bei einigen) Schulform-Hinweis, Vorlagen-Skelett, Strukturhinweis zur Behörde

## Vorgeschlagenes Datenmodell

```typescript
type Stufe = 'a' | 'b' | 'c';

interface Massnahme {
  id: string;              // "a01" ... "c05"
  stufe: Stufe;
  nummer: number;          // 1-15 / 1-11 / 1-5
  titel: string;           // "Sitzplatz verändern"
  trigger: string;         // "Konzentrationsprobleme, soziale Konflikte, …"
  ziel: string;            // 1 Satz
  wannNicht: string[];     // 2-3 Bullets
  bausteine: Baustein[];
  fallstricke: string[];   // 3 Bullets
  eskalation: string;      // 1-2 Sätze
  schulformHinweis?: string;
  vorlage?: string;        // Markdown-Skelett (b01, b07 haben das)
  strukturHinweis?: string; // bei Stufe C: Behördenstruktur
}

interface Baustein {
  nummer: number;
  wasTun: string;
  beispielFormulierung: string;  // wörtlich, in Anführungszeichen
  material: string;
}

interface Symptom {
  id: string;              // "s01" ... "s13"
  label: string;
  subtitle: string;
  priority?: 'urgent';     // s12, s13
  topNotice?: string;      // bei urgent: Warnbanner-Text
  measures: {
    a: string[];           // Maßnahmen-IDs aus Stufe A
    b: string[];
    c: string[];
  };
}
```

## Persistenz / Quelle der Wahrheit

**Empfehlung:** Maßnahmen als statische Konstanten im Code (`/data/massnahmen.ts`, `/data/symptome.ts`). Kein DB-Eintrag nötig — die Inhalte ändern sich selten und sollen versioniert mit der Code-Basis laufen. Vorteile: schnelles Rendering, SEO, keine Supabase-Abfrage beim Seitenaufruf.

Falls später Editierung über UI gewünscht: Migration auf Supabase ist trivial, weil die Struktur sauber ist.

## UI / UX

### `/massnahmen` Startseite (Umbau)

Bisheriges Layout: 3 Tabs (Stufe A / B / C) mit jeweiliger Liste.

**Neuer Aufbau, von oben nach unten:**

1. **Symptom-Picker** als prominenter Hero-Block
   - Überschrift: „Was beobachten Sie?"
   - 13 Symptom-Chips/Cards in Grid (3-4 pro Reihe Desktop, 2 Mobile)
   - Bei Klick: scrollt zur dynamisch eingeblendeten Treffer-Sektion **oder** öffnet eine Modal-Liste (Empfehlung: inline scroll, weniger Friktion)
2. **Treffer-Sektion** (erscheint nach Symptom-Klick)
   - **Bei `priority: 'urgent'` (s12, s13):** Rote Warnbox oben mit `topNotice`, NICHT aufklappbar, NICHT überspringbar
   - Drei Header in Reihenfolge: „Was Sie allein tun können" / „Mit Eltern oder Schule" / „Externe Fachstellen"
   - Pro Header: die gemappten Maßnahmen aus der Symptom-Definition, in der dort vorgegebenen Reihenfolge
   - Jede Maßnahme als klickbare Karte → öffnet Detail-Panel (gleiches Panel wie in Browse-Ansicht)
   - Stufen-Badge an jeder Karte: „A — Sofort" / „B — Kooperativ" / „C — Extern"
3. **Browse-Tabs** (bisheriger Tab-Bereich) bleiben darunter erhalten — als zweiter Pfad für Lehrkräfte, die stöbern wollen
4. **Bestehende Meldepflicht-Box (§ 8a SGB VIII)** bleibt unverändert am unteren Seitenende

### Detail-Panel (Desktop + Mobile)

Das bestehende Detail-Panel-Muster aus Sprint 4 (`Desktop: position:fixed rechts 50% Breite + Backdrop; Mobile: Bottom Sheet 75vh`) bleibt. Inhalt:

```
┌─────────────────────────────────────┐
│ [Stufe-Badge]  Maßnahme-Titel       │
│ [Trigger-Untertitel kursiv]         │
├─────────────────────────────────────┤
│ Ziel: [1 Satz]                       │
│                                      │
│ Wann NICHT:                          │
│  • …                                 │
│                                      │
│ Bausteine                            │
│ ┌──┬──────────┬──────────┬────────┐ │
│ │# │Was tun   │Beispiel  │Material│ │
│ │1 │…         │„…"       │…       │ │
│ └──┴──────────┴──────────┴────────┘ │
│                                      │
│ [bei Bedarf: Vorlage-Skelett ausklappbar]│
│                                      │
│ Typische Fehler:                     │
│  • …                                 │
│                                      │
│ Eskalation: [1-2 Sätze]              │
│                                      │
│ [bei Stufe C: Behördenstruktur-Hinweis]│
└─────────────────────────────────────┘
```

- **Beispiel-Formulierungen** in `<blockquote>` mit visueller Hervorhebung (linker Rand farbig, kursiv)
- **Bausteine-Tabelle** auf Mobile in gestapeltes Card-Layout umbrechen (3 Spalten Tabelle ist auf 380px nicht lesbar)

## Quiz-Anbindung (S18 aus Sprint 3)

Die bestehende Quiz-Kategorie „Maßnahmen & Folgeschritte" verweist in den Erklärungen auf einzelne Maßnahmen. Optional in diesem Sprint: nach Quiz-Frage-Auswertung Link „Mehr dazu im Detail-Panel" → öffnet die entsprechende Maßnahme. Anbindung über Maßnahmen-ID.

## Nicht in diesem Sprint

- Eigene Notiz/Repertoire-Funktion für Lehrkräfte („meine Formulierungen") — Phase 2
- Maßnahmen-Querverlinkung (z. B. b01 verweist auf b03) als anklickbare Links — kann nachgezogen werden, wenn die Datenstruktur steht
- Per-Bundesland-Anpassung der bundeslandspezifischen Hinweise — vorerst generischer Hinweis „Erlasse Ihres Bundeslandes prüfen"

## Akzeptanzkriterien

- [ ] Alle 31 Maßnahmen im Detail-Panel anzeigbar, Inhalte aus den 3 Quelldateien übernommen, sprachlich unverändert
- [ ] Symptom-Picker mit 13 Symptomen funktional, Klick filtert Maßnahmen korrekt nach Mapping
- [ ] Urgent-Warnbox bei s12 (Kindeswohlgefährdung) und s13 (Suizidäußerungen) erscheint zwingend, kann nicht weggeklickt werden
- [ ] Detail-Panel öffnet aus Browse UND aus Symptom-Treffer identisch
- [ ] Mobile: Bausteine-Tabelle ist als gestapeltes Card-Layout lesbar
- [ ] Stufen-Badge ist an jeder Maßnahme sichtbar (egal aus welchem Pfad)
- [ ] § 8a-Box am Seitenende unverändert sichtbar
- [ ] Build grün, Vercel-Deploy erfolgreich

## Liefer-Reihenfolge (Empfehlung)

1. Datenmodell + statische Konstanten aus Markdown extrahieren (kannst du teils per Skript machen, teils manuell)
2. Detail-Panel mit Beispiel-Maßnahme (a01) vollständig zum Laufen bringen — Layout testen
3. Alle 31 Maßnahmen einspielen, durchklicken
4. Symptom-Picker auf Startseite ergänzen
5. Urgent-Warnbox implementieren
6. Mobile-Layout finalisieren
7. Quiz-Verlinkung optional

---

Quelldateien-Pfade (relativ zur App):
- Beim Import in `/data/`-Verzeichnis kopieren
- Konvertierung Markdown → TypeScript-Objekt kann manuell oder per kleinem Node-Skript erfolgen
