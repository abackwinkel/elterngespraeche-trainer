# Symptom-Picker: Mapping Symptom → Maßnahmen
**Für `/massnahmen`-Startseite der Elterngespräche-Trainer-App.**
Zweck: Lehrkraft klickt ein Symptom an → bekommt gefilterte Maßnahmenliste aus allen drei Stufen, sortiert nach Eingriffstiefe.

---

## Maßnahmen-IDs (Referenz)

**Stufe A — Sofortmaßnahmen (allein umsetzbar)**

| ID | Maßnahme |
|---|---|
| a01 | Sitzplatz verändern |
| a02 | Gezielte Ansprache im Unterricht |
| a03 | Strukturierte Aufgabenformate |
| a04 | Beobachtungsnotizen anlegen |
| a05 | Gesprächstermin proaktiv anbieten |
| a06 | Hausaufgaben-Heft einführen oder prüfen |
| a07 | Reminder-Ritual am Ende der Stunde |
| a08 | Klare Regel für Verspätungen kommunizieren |
| a09 | Nachhol-Aufgabe statt Strafe |
| a10 | Nachrichten-Ritual etablieren |
| a11 | Digitalen Elternkanal nutzen |
| a12 | Spiegelgespräch führen |
| a13 | Lob und positive Verstärkung gezielt einsetzen |
| a14 | Kontakt bei positivem Erlebnis aufnehmen |
| a15 | Fehlzeiten dokumentieren und Muster erkennen |

**Stufe B — Kooperative Maßnahmen (mit Eltern oder Schule)**

| ID | Maßnahme |
|---|---|
| b01 | Verbindliche Vereinbarung schriftlich festhalten |
| b02 | Kommunikationsheft oder App-Kanal etablieren |
| b03 | Nachfolgetermin vereinbaren |
| b04 | Absprache zu Hausaufgaben-Unterstützung |
| b05 | Schulsozialdienst hinzuziehen |
| b06 | Beratungslehrkraft einschalten |
| b07 | Förderplan erstellen |
| b08 | Schulleitung informieren |
| b09 | Klassenkonferenz einberufen |
| b10 | Nachteilsausgleich beantragen |
| b11 | Schüler aktiv in Gespräch einbeziehen |

**Stufe C — Externe Fachstellen**

| ID | Stelle |
|---|---|
| c01 | Schulpsychologischer Dienst |
| c02 | Erziehungsberatungsstelle |
| c03 | Kinderarzt / Hausarzt |
| c04 | Kinder- und Jugendpsychiatrische Beratung (KJP) |
| c05 | Jugendamt / ASD (§ 8a SGB VIII) |

---

## 13 Symptome — Empfohlene UI-Reihenfolge

Sortierung: häufig & alltagsnah zuerst, schwere/Krisen-Themen am Ende.

| # | Symptom-Label (UI) | Untertitel/Trigger |
|---|---|---|
| 1 | Häufiges Zuspätkommen | „Kommt regelmäßig zu spät" |
| 2 | Hausaufgaben fehlen oder unvollständig | „Vergisst HA, schlechte Selbstorganisation" |
| 3 | Konzentrationsprobleme, klinkt sich aus | „Wirkt abwesend, ‚taucht ab'" |
| 4 | Plötzlicher Leistungsabfall | „Leistungen brechen ein" |
| 5 | Demotivation, Resignation | „Wirkt entmutigt, sagt ‚Ich kann das eh nicht'" |
| 6 | Unterrichtsstörungen, auffälliges Verhalten | „Stört wiederholt, ohne klaren Grund" |
| 7 | Mobbing-Verdacht, Konflikte mit Mitschüler:innen | „Wird ausgegrenzt oder ist Auslöser" |
| 8 | Häufiges Fehlen, Schulangst, Schulverweigerung | „Fehlt gehäuft, körperliche Beschwerden morgens" |
| 9 | Anerkannte LRS, ADHS, Förderbedarf | „Diagnose liegt vor — wie weitergehen?" |
| 10 | Familiäre Belastung, Eltern überfordert | „Trennung, Krise, ‚Ich weiß nicht mehr weiter'" |
| 11 | Mitteilungen kommen nicht zu Eltern, Kontakt schwierig | „Zettel verschwinden, Eltern reagieren nicht" |
| 12 | Verdacht auf Kindeswohlgefährdung | „Blaue Flecken, Vernachlässigung, häusliche Gewalt" |
| 13 | Akute psychische Krise, Suizidäußerungen | „Sagt ‚alles keinen Sinn', Selbstverletzung" |

---

## Symptom → Maßnahmen-Mapping

**Sortierprinzip pro Symptom:** Stufe A zuerst (allein umsetzbar), dann B (kooperativ), dann C (extern). Innerhalb jeder Stufe nach Anwendungsreihenfolge im typischen Fall.

### 1. Häufiges Zuspätkommen

| Stufe | Maßnahmen-IDs | Warum diese Maßnahmen |
|---|---|---|
| A | a08, a09, a04, a15 | Klare Regel → Nachhol-Aufgabe statt Strafe → mit Beobachtungsnotizen Muster erkennen → bei Häufung Fehlzeiten dokumentieren |
| B | b01, b03, b05 | Bei Wiederholung schriftliche Vereinbarung mit Eltern + Folgetermin; bei familiärem Hintergrund Schulsozialarbeit |
| C | c02, c05 | Bei familiärer Überforderung Erziehungsberatung; bei verfestigter Schulpflichtverletzung Jugendamt (bundeslandabhängig) |

### 2. Hausaufgaben fehlen oder unvollständig

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a06, a07, a09, a03 | Hausaufgaben-Heft + Reminder-Ritual + Nachhol-Aufgabe; strukturierte Formate bei Überforderung |
| B | b04, b01, b02 | Mit Eltern realistische Absprache treffen; verbindliche Vereinbarung; Kommunikationsheft als Tracking |
| C | c03 | Bei ADHS-Verdacht oder Konzentrationsproblemen Kinderarzt einbeziehen |

### 3. Konzentrationsprobleme, klinkt sich aus

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a01, a02, a03, a04, a12 | Sitzplatz wechseln + gezielte Ansprache + strukturierte Aufgaben + Beobachtungsnotizen + Spiegelgespräch zur Ursachenklärung |
| B | b06, b07 | Bei verfestigtem Muster Beratungslehrkraft; bei Förderbedarf Förderplan |
| C | c01, c03 | Schulpsychologie zur Einschätzung; Kinderarzt bei Verdacht auf körperliche/neurologische Ursachen (ADHS, Sehprobleme) |

### 4. Plötzlicher Leistungsabfall

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a04, a05, a12, a02 | Erst beobachten und dokumentieren, dann proaktiv Eltern einladen; mit Kind Spiegelgespräch |
| B | b06, b09, b03 | Beratungslehrkraft bei psychischer Belastung; Klassenkonferenz wenn fächerübergreifend; Folgetermin |
| C | c01, c02, c03, c04 | Schulpsychologie bei schulbezogenen Ursachen; Erziehungsberatung bei familiärem Hintergrund; Arzt bei körperlichen Anzeichen; KJP bei psychischen Symptomen |

### 5. Demotivation, Resignation

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a13, a14, a02, a12, a03 | Lob konkret einsetzen + positiver Elternkontakt → Beziehungsdynamik verändern; gezielte Ansprache; Spiegelgespräch; strukturierte Aufgaben für Erfolgserlebnisse |
| B | b11, b06, b07 | Schüler aktiv ins Gespräch einbeziehen; Beratungslehrkraft; ggf. Förderplan |
| C | c01, c04 | Schulpsychologie; bei depressiven Anzeichen KJP |

### 6. Unterrichtsstörungen, auffälliges Verhalten

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a01, a02, a12, a04, a13 | Sitzplatz + gezielte Ansprache + Spiegelgespräch + Beobachtungsnotizen + Lob für ruhige Phasen |
| B | b01, b09, b06, b08 | Schriftliche Vereinbarung, Klassenkonferenz bei fächerübergreifend, Beratungslehrkraft; Schulleitung bei Eskalation/Gewalt |
| C | c01, c03 | Schulpsychologie; Kinderarzt bei ADHS-/Konzentrationsverdacht |

### 7. Mobbing-Verdacht, Konflikte mit Mitschüler:innen

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a04, a12, a02, a01 | Beobachtungsnotizen, Spiegelgespräch mit Kind, gezielte Ansprache, ggf. Sitzplatz |
| B | b05, b06, b09, b08 | Schulsozialdienst, Beratungslehrkraft, Klassenkonferenz, bei Eskalation Schulleitung |
| C | c01, c04 | Schulpsychologie; bei massiver psychischer Belastung KJP |

### 8. Häufiges Fehlen, Schulangst, Schulverweigerung

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a15, a04, a05, a02 | Fehlzeiten systematisch dokumentieren, Beobachtungen, proaktives Gespräch mit Eltern, behutsame Ansprache |
| B | b01, b06, b05, b08 | Vereinbarung, Beratungslehrkraft, Schulsozialdienst; bei Schulpflichtverletzung Schulleitung |
| C | c01, c04, c05 | Schulpsychologie zur Einschätzung der Schulangst; KJP bei anhaltenden Symptomen; Jugendamt bei verfestigtem Schulabsentismus (bundeslandabhängig oft verpflichtend) |

### 9. Anerkannte LRS, ADHS, Förderbedarf

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a03, a04, a13 | Strukturierte Aufgabenformate; Beobachtungen; Lob auf Anstrengung beziehen |
| B | b07, b10, b04, b01 | Förderplan; Nachteilsausgleich beantragen; Hausaufgaben-Absprache; Vereinbarung |
| C | c01, c03 | Schulpsychologie für Diagnostik/Gutachten; Kinderarzt bei ADHS für medizinische Abklärung |

### 10. Familiäre Belastung, Eltern überfordert

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a05, a04, a14 | Behutsamer Erstkontakt, Beobachtungen, positiver Kontakt zur Vertrauensbildung |
| B | b05, b04, b03, b06 | Schulsozialdienst, realistische Absprache zu Unterstützung, Folgetermin, Beratungslehrkraft |
| C | c02, c05 | Erziehungsberatung (freiwillig); Jugendamt nur bei Hinweisen auf Kindeswohl |

### 11. Mitteilungen kommen nicht zu Eltern, Kontakt schwierig

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a10, a11, a14 | Nachrichten-Ritual etablieren; digitalen Elternkanal nutzen; positiver Kontakt verändert Dynamik |
| B | b02, b05, b08 | Kommunikationsheft etablieren; bei strukturellen Problemen Schulsozialdienst; bei Erreichbarkeitsproblemen ggf. Schulleitung |
| C | c02 | Wenn dahinter familiäre Überforderung steht: Erziehungsberatung |

### 12. Verdacht auf Kindeswohlgefährdung

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a04 | Beobachtungen sorgfältig dokumentieren — Datum, Verletzungen, Aussagen, Stimmung |
| B | b08, b05, b06 | **Sofort Schulleitung** (zwingend), Schulsozialarbeit, Beratungslehrkraft / Kinderschutzbeauftragte |
| C | c05 | Jugendamt / ASD nach § 8a SGB VIII — **nicht allein, immer über Schulleitung** |

**Wichtig:** Bei diesem Symptom darf die App keinesfalls vermitteln, die Lehrkraft solle „erst Stufe A durchspielen". Das Detail-Panel von a04 und c05 muss klar Vorrang signalisieren: Dokumentation + Schulleitung sofort.

### 13. Akute psychische Krise, Suizidäußerungen

| Stufe | Maßnahmen-IDs | Warum |
|---|---|---|
| A | a04 | Aussagen sorgfältig dokumentieren — wörtlich, mit Datum |
| B | b08, b06, b05 | **Sofort Schulleitung**, Beratungslehrkraft, Schulsozialarbeit |
| C | c04, c05 | KJP (Notfall-Wege bei akuter Suizidgefahr); bei familiärem Kontext + Gefährdung auch Jugendamt |

**Wichtig:** Bei akuter Suizidgefahr (konkrete Pläne, Vorbereitungen, kürzliche Selbstverletzung) gilt: **Krisendienst / Notarzt / KJP-Notaufnahme sofort** — Empfehlung allein reicht nicht. Das Detail-Panel von c04 enthält das bereits; in der App sollte beim Symptom-Aufruf ggf. ein Notfall-Hinweis als Top-Bar erscheinen.

---

## JSON-Repräsentation für Claude Code

```json
{
  "symptoms": [
    {
      "id": "s01",
      "label": "Häufiges Zuspätkommen",
      "subtitle": "Kommt regelmäßig zu spät",
      "measures": {
        "a": ["a08", "a09", "a04", "a15"],
        "b": ["b01", "b03", "b05"],
        "c": ["c02", "c05"]
      }
    },
    {
      "id": "s02",
      "label": "Hausaufgaben fehlen oder unvollständig",
      "subtitle": "Vergisst HA, schlechte Selbstorganisation",
      "measures": {
        "a": ["a06", "a07", "a09", "a03"],
        "b": ["b04", "b01", "b02"],
        "c": ["c03"]
      }
    },
    {
      "id": "s03",
      "label": "Konzentrationsprobleme, klinkt sich aus",
      "subtitle": "Wirkt abwesend, „taucht ab\"",
      "measures": {
        "a": ["a01", "a02", "a03", "a04", "a12"],
        "b": ["b06", "b07"],
        "c": ["c01", "c03"]
      }
    },
    {
      "id": "s04",
      "label": "Plötzlicher Leistungsabfall",
      "subtitle": "Leistungen brechen ein",
      "measures": {
        "a": ["a04", "a05", "a12", "a02"],
        "b": ["b06", "b09", "b03"],
        "c": ["c01", "c02", "c03", "c04"]
      }
    },
    {
      "id": "s05",
      "label": "Demotivation, Resignation",
      "subtitle": "Wirkt entmutigt, sagt „Ich kann das eh nicht\"",
      "measures": {
        "a": ["a13", "a14", "a02", "a12", "a03"],
        "b": ["b11", "b06", "b07"],
        "c": ["c01", "c04"]
      }
    },
    {
      "id": "s06",
      "label": "Unterrichtsstörungen, auffälliges Verhalten",
      "subtitle": "Stört wiederholt, ohne klaren Grund",
      "measures": {
        "a": ["a01", "a02", "a12", "a04", "a13"],
        "b": ["b01", "b09", "b06", "b08"],
        "c": ["c01", "c03"]
      }
    },
    {
      "id": "s07",
      "label": "Mobbing-Verdacht, Konflikte mit Mitschüler:innen",
      "subtitle": "Wird ausgegrenzt oder ist Auslöser",
      "measures": {
        "a": ["a04", "a12", "a02", "a01"],
        "b": ["b05", "b06", "b09", "b08"],
        "c": ["c01", "c04"]
      }
    },
    {
      "id": "s08",
      "label": "Häufiges Fehlen, Schulangst, Schulverweigerung",
      "subtitle": "Fehlt gehäuft, körperliche Beschwerden morgens",
      "measures": {
        "a": ["a15", "a04", "a05", "a02"],
        "b": ["b01", "b06", "b05", "b08"],
        "c": ["c01", "c04", "c05"]
      }
    },
    {
      "id": "s09",
      "label": "Anerkannte LRS, ADHS, Förderbedarf",
      "subtitle": "Diagnose liegt vor — wie weitergehen?",
      "measures": {
        "a": ["a03", "a04", "a13"],
        "b": ["b07", "b10", "b04", "b01"],
        "c": ["c01", "c03"]
      }
    },
    {
      "id": "s10",
      "label": "Familiäre Belastung, Eltern überfordert",
      "subtitle": "Trennung, Krise, „Ich weiß nicht mehr weiter\"",
      "measures": {
        "a": ["a05", "a04", "a14"],
        "b": ["b05", "b04", "b03", "b06"],
        "c": ["c02", "c05"]
      }
    },
    {
      "id": "s11",
      "label": "Mitteilungen kommen nicht zu Eltern, Kontakt schwierig",
      "subtitle": "Zettel verschwinden, Eltern reagieren nicht",
      "measures": {
        "a": ["a10", "a11", "a14"],
        "b": ["b02", "b05", "b08"],
        "c": ["c02"]
      }
    },
    {
      "id": "s12",
      "label": "Verdacht auf Kindeswohlgefährdung",
      "subtitle": "Blaue Flecken, Vernachlässigung, häusliche Gewalt",
      "priority": "urgent",
      "topNotice": "Schulleitung zwingend einbeziehen. Nicht allein handeln. § 8a SGB VIII.",
      "measures": {
        "a": ["a04"],
        "b": ["b08", "b05", "b06"],
        "c": ["c05"]
      }
    },
    {
      "id": "s13",
      "label": "Akute psychische Krise, Suizidäußerungen",
      "subtitle": "Sagt „alles keinen Sinn\", Selbstverletzung",
      "priority": "urgent",
      "topNotice": "Bei akuter Suizidgefahr: Krisendienst, Notarzt oder KJP-Notaufnahme sofort. Empfehlung allein reicht nicht.",
      "measures": {
        "a": ["a04"],
        "b": ["b08", "b06", "b05"],
        "c": ["c04", "c05"]
      }
    }
  ]
}
```

---

## Hinweise für die App-Logik

- **Doppelte Maßnahmen-Anzeige:** Die Browse-Tabs (Stufe A/B/C) und der Symptom-Picker zeigen am Ende dieselben Detail-Panels. Beim Klick auf eine Maßnahme aus der Symptom-Trefferliste sollte die App im Detail-Panel auch zeigen, zu welcher Stufe die Maßnahme gehört (kleines Badge „Stufe B — kooperativ").
- **Reihenfolge im Treffer-Panel:** Stufe-Header („Was du allein tun kannst" / „Mit Eltern oder Schule" / „Externe Fachstellen") als visuelle Trennung; in jeder Stufe Maßnahmen in der Reihenfolge der Liste oben.
- **Priorität `urgent`:** Bei s12 und s13 oben im UI eine Warnbox mit `topNotice` — nicht versteckt, nicht aufklappbar.
- **„Keine Maßnahme passt"-Fallback:** Wenn die Lehrkraft nichts Passendes findet, Link zurück zur Browse-Ansicht.
- **Maßnahmen-Mehrfachverwendung:** Viele Maßnahmen (z. B. a04 Beobachtungsnotizen, b08 Schulleitung) tauchen bei mehreren Symptomen auf. Das ist Absicht — sie sind universelle Bausteine.
