import type { Elterntyp, Schwierigkeit } from '@/types'
import { RECHTSCHREIB_REGEL, RECHTSCHREIB_REGEL_JSON, TYPOGRAFIE_REGEL } from '@/lib/germanTypography.mjs'

// ─── Sofort-Feedback (Haiku, nach jeder Lehrkraft-Eingabe) ────────────────────

export function buildFeedbackPrompt(
  userTurn: string,
  elternTurn: string,
  szenarioKontext: string,
  elterntyp: Elterntyp,
  schwierigkeit: Schwierigkeit
): string {
  return `Du bewertest eine einzelne Aussage einer Lehrkraft in einem simulierten Elterngespräch.

## Kontext
${szenarioKontext}
Elterntyp: ${elterntyp}
Schwierigkeitsstufe: ${schwierigkeit}

## Was das Elternteil VOR dieser Antwort zuletzt gesagt hat
${elternTurn}

## Was die Lehrkraft darauf geantwortet hat
${userTurn}

## Deine Aufgabe

Gib eine kurze, konkrete Auswertung dieser einen Lehrkraft-Aussage.
Antworte ausschließlich als JSON in diesem Format – kein weiterer Text:

{
  "gut": "Was die Lehrkraft gut gemacht hat (1-2 Sätze, konkret und spezifisch)",
  "besser": "Was besser hätte sein können – oder null, wenn nichts zu verbessern ist",
  "alternativ": "Eine alternative Formulierung als Vorschlag – oder null, wenn die Aussage gut war"
}

## Bewertungskriterien

1. Behält die Lehrkraft die Gesprächsführung? Gibt sie das Steuer nicht ab?
2. Steht das Kind und sein Wohlergehen im Mittelpunkt der Aussage?
3. Wird Wertschätzung oder Verständnis für die Elternperspektive gezeigt?
4. Werden konkrete, umsetzbare Schritte angestrebt?
5. Spricht die Lehrkraft konkret aus, was sie gehört oder gesehen hat – ohne sofort zu urteilen?

## Wichtig

- Du kennst NUR den Gesprächsstand bis einschließlich dieser Lehrkraft-Aussage. Wie das Elternteil darauf reagiert, weißt du nicht – beziehe dich ausschließlich auf das, was oben steht, und erfinde keine Reaktion oder spätere Information
- "gut" darf nie leer sein – finde immer etwas Positives, auch wenn es nur die Haltung oder der Versuch ist
- "besser" und "alternativ" dürfen null sein, wenn die Aussage gut war
- Keine NLP- oder GFK-Fachbegriffe verwenden
- Spreche die Lehrkraft direkt an: Sie haben..., Ihre Frage...
- Kurze, klare Sprache – keine langen Erklärungen
- Ausschließlich Deutsch – keine englischen Wörter (z. B. defensiv statt defensive)
- Die Antwort muss exakt das JSON-Format erfüllen – kein weiterer Text davor oder danach
- Sätze müssen grammatikalisch vollständig und korrekt sein

## Sprache und Schreibweise

${RECHTSCHREIB_REGEL_JSON}

${TYPOGRAFIE_REGEL}`
}

// ─── Gesamtreflexion (Sonnet, am Ende des Gesprächs) ─────────────────────────

export function buildReflexionPrompt(
  turns: { role: string; content: string }[],
  szenarioKontext: string,
  elterntyp: Elterntyp,
  schwierigkeit: Schwierigkeit
): string {
  const gespraechstext = turns
    .filter(t => t.role !== 'situation')
    .map(t => `${t.role === 'lehrkraft' ? 'Lehrkraft' : 'Elternteil'}: ${t.content}`)
    .join('\n\n')

  const situationen = turns
    .filter(t => t.role === 'situation')
    .map(t => `[Situation: ${t.content}]`)
    .join('\n')

  return `Du reflektierst ein abgeschlossenes Elterngespräch aus einer Trainingsplattform für Lehrkräfte.

## Kontext
${szenarioKontext}
Elterntyp: ${elterntyp}
Schwierigkeitsstufe: ${schwierigkeit}

## Eingeblendete Situationen (Körpersignale)
${situationen || 'Keine Situationsbeschreibungen im Gespräch.'}

## Gesprächsverlauf
${gespraechstext}

## Deine Aufgabe

Verfasse eine strukturierte Gesamtreflexion des Gesprächs. Sprich die Lehrkraft direkt an.

Schreibe in gut lesbaren Abschnitten, keine starre Liste. Nutze folgende Struktur:

**Was gut gelungen ist**
Nenne 2-3 konkrete Stärken aus dem Gespräch mit Bezug auf konkrete Aussagen.

**Entwicklungspotenzial**
Nenne 1-2 Bereiche, in denen das Gespräch besser hätte laufen können. Konkret, ohne zu urteilen.

**Der entscheidende Moment**
Identifiziere den Moment im Gespräch, der die größte Wirkung hatte – positiv oder als verpasste Gelegenheit.

**Empfehlung für die Praxis**
Ein konkreter Tipp für das nächste Gespräch mit diesem Elterntyp.

## Wichtig

- Warme, professionelle Sprache – nicht belehrend
- Das Kind steht immer im Mittelpunkt der Bewertung
- Keine NLP- oder GFK-Fachbegriffe
- Deutsch
- Ca. 250-350 Wörter
- Keine Dokumentüberschrift – beginne direkt mit dem ersten Abschnitt **Was gut gelungen ist**
- Abschnittstitel als **fett** in einer eigenen Zeile, kein #
- Alle Sätze grammatikalisch vollständig

## Sprache und Schreibweise

${RECHTSCHREIB_REGEL}

${TYPOGRAFIE_REGEL}`
}

// ─── System-Prompt für Elternteil-Rolle ──────────────────────────────────────

export function buildElternteilSystemPrompt(
  elternteilPrompt: string,
  schwierigkeitsModifier: string,
  szenarioKontext: string
): string {
  const modifier = schwierigkeitsModifier
    ? `\n\n### Schwierigkeitsgrad-Anpassung\n${schwierigkeitsModifier}`
    : ''

  // Zwei-Personen-Erkennung: entweder [PRIMÄR]-Marker (Formular-Konfiguration)
  // oder „und“ in der ersten Zeile (vorgefertigte Szenarien wie „Herr und Frau Berger“)
  const firstLine = szenarioKontext.split('\n')[0] ?? ''
  const twoPersonMatch = firstLine.match(/Elternteil\(e\):\s*(.+?)\s*\[PRIMÄR\]\s*und\s*(.+?)\s*\[SEKUNDÄR\]/)
  const isCouple = twoPersonMatch !== null || /\bund\b/.test(firstLine)

  let coupleRules: string
  if (twoPersonMatch) {
    // Formular-Konfiguration: konkrete Rollen bekannt
    const primärRaw = twoPersonMatch[1]
    const sekundärRaw = twoPersonMatch[2]
    // Wenn beide die gleiche Rollenbezeichnung haben (z. B. zwei Mütter), nummerieren
    const primär = primärRaw === sekundärRaw ? `${primärRaw} 1` : primärRaw
    const sekundär = primärRaw === sekundärRaw ? `${sekundärRaw} 2` : sekundärRaw
    coupleRules = `
- Beide Elternteile sind anwesend. ${primär} ist die Primärperson und spricht häufiger; ${sekundär} schaltet sich gelegentlich ein.
- Zeige an, wer spricht: Beginne den jeweiligen Redebeitrag mit „${primär}:“ oder „${sekundär}:“ gefolgt von der Aussage.
- Stage Directions (*…*) für gemeinsame Aktionen in der Mehrzahl: *betreten den Raum*, *setzen sich*, *tauschen einen Blick*.
- Im allerersten Turn: Zeige zuerst als Körpersignal wie beide eintreten und sich setzen (Plural), dann spricht ${primär}.`
  } else if (isCouple) {
    // Vorgefertigtes Szenario mit Namensangabe
    coupleRules = `
- Beide Elternteile sind anwesend. Beginne jede Antwort mit „Herr [Name]:“ oder „Frau [Name]:“ (wer spricht) und wechsle realistisch.
- Stage Directions (*…*) für gemeinsame Aktionen in der Mehrzahl: *betreten den Raum*, *setzen sich*, *tauschen einen Blick*.
- Im allerersten Turn: Zeige zuerst als Körpersignal wie beide eintreten und sich setzen (Plural), dann spricht eine Person.`
  } else {
    coupleRules = `
- Im allerersten Turn: Zeige zuerst als Körpersignal wie die Person eintritt und sich setzt, dann spricht sie.`
  }

  return `${elternteilPrompt}${modifier}

### Gesprächsregeln (immer einhalten)

- Sprich die Lehrkraft ausschließlich mit „Sie“ an – niemals mit „du“
- Beachte das Geschlecht des Kindes genau (Sohn = er/sein/Schüler, Tochter = sie/ihr/Schülerin) und verwende es durchgehend korrekt
- Stage Directions (*…*) immer in der dritten Person formulieren: *Er lehnt sich zurück*, *Sie atmet kurz aus*, *Er schüttelt leicht den Kopf* – niemals in der Ich-Form wie *Ich lehne mich zurück*
- Alle Sätze vollständig und grammatikalisch korrekt
- Verwende für das Kind ausschließlich den Namen oder das Initial aus dem Kontext (z. B. „M.“) – erfinde niemals einen anderen oder vollständigen Namen${coupleRules}

### Sprache und Schreibweise

${RECHTSCHREIB_REGEL}

${TYPOGRAFIE_REGEL}

### Deine konkrete Situation in diesem Gespräch

${szenarioKontext}`
}
