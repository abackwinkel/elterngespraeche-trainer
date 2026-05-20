import type { Elterntyp, Schwierigkeit } from '@/types'

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

## Was das Elternteil gerade gesagt hat
${elternTurn}

## Was die Lehrkraft darauf geantwortet hat
${userTurn}

## Deine Aufgabe

Gib eine kurze, konkrete Auswertung dieser einen Lehrkraft-Aussage.
Antworte ausschliesslich als JSON in diesem Format – kein weiterer Text:

{
  "gut": "Was die Lehrkraft gut gemacht hat (1-2 Saetze, konkret und spezifisch)",
  "besser": "Was besser haette sein koennen – oder null, wenn nichts zu verbessern ist",
  "alternativ": "Eine alternative Formulierung als Vorschlag – oder null, wenn die Aussage gut war"
}

## Bewertungskriterien

1. Behaelt die Lehrkraft die Gespraechsfuehrung? Gibt sie das Steuer nicht ab?
2. Steht das Kind und sein Wohlergehen im Mittelpunkt der Aussage?
3. Wird Wertschaetzung oder Verstaendnis fuer die Elternperspektive gezeigt?
4. Werden konkrete, umsetzbare Schritte angestrebt?
5. Wird beschreibend statt bewertend formuliert (Beobachtung statt Urteil)?

## Wichtig

- "gut" darf nie leer sein – finde immer etwas Positives, auch wenn es nur die Haltung oder der Versuch ist
- "besser" und "alternativ" duerfen null sein, wenn die Aussage gut war
- Keine NLP- oder GFK-Fachbegriffe verwenden
- Spreche die Lehrkraft direkt an: Sie haben..., Ihre Frage...
- Kurze, klare Sprache – keine langen Erklaerungen
- Ausschliesslich Deutsch – keine englischen Woerter (z. B. defensiv statt defensive)
- Die Antwort muss exakt das JSON-Format erfuellen – kein weiterer Text davor oder danach
- Saetze muessen grammatikalisch vollstaendig und korrekt sein`
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

  return `Du reflektierst ein abgeschlossenes Elterngespraech aus einer Trainingsplattform fuer Lehrkraefte.

## Kontext
${szenarioKontext}
Elterntyp: ${elterntyp}
Schwierigkeitsstufe: ${schwierigkeit}

## Eingeblendete Situationen (Koerpersignale)
${situationen || 'Keine Situationsbeschreibungen im Gespraech.'}

## Gespraechsverlauf
${gespraechstext}

## Deine Aufgabe

Verfasse eine strukturierte Gesamtreflexion des Gespraechs. Sprich die Lehrkraft direkt an.

Schreibe in gut lesbaren Abschnitten, keine starre Liste. Nutze folgende Struktur:

**Was gut gelungen ist**
Nenne 2-3 konkrete Staerken aus dem Gespraech mit Bezug auf konkrete Aussagen.

**Entwicklungspotenzial**
Nenne 1-2 Bereiche, in denen das Gespraech besser haette laufen koennen. Konkret, ohne zu urteilen.

**Der entscheidende Moment**
Identifiziere den Moment im Gespraech, der die groesste Wirkung hatte – positiv oder als verpasste Gelegenheit.

**Empfehlung fuer die Praxis**
Ein konkreter Tipp fuer das naechste Gespraech mit diesem Elterntyp.

## Wichtig

- Warme, professionelle Sprache – nicht belehrend
- Das Kind steht immer im Mittelpunkt der Bewertung
- Keine NLP- oder GFK-Fachbegriffe
- Deutsch
- Ca. 250-350 Woerter
- Keine Dokumentueberschrift – beginne direkt mit dem ersten Abschnitt **Was gut gelungen ist**
- Abschnittstitel als **fett** in einer eigenen Zeile, kein #
- Deutsche Anfuehrungszeichen: „...“ (oeffnend unten, schliessend oben)
- Einfache Anfuehrungszeichen ebenfalls: ‚...‘ (oeffnend unten, schliessend oben)
- Alle Saetze grammatikalisch vollstaendig`
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

  const isCouple = /\bund\b/.test(szenarioKontext.split('\n')[0] ?? '')
  const coupleRules = isCouple
    ? `
- Beide Elternteile sind anwesend. Beginne jede Antwort mit "Herr [Name]:" oder "Frau [Name]:" (wer spricht) und wechsle realistisch.
- Stage Directions (*...*) fuer gemeinsame Aktionen in der Mehrzahl: *betreten den Raum*, *setzen sich*, *tauschen einen Blick*.
- Im allerersten Turn: Zeige zuerst als Koerpersignal wie beide eintreten und sich setzen (Plural), dann spricht eine Person.`
    : `
- Im allerersten Turn: Zeige zuerst als Koerpersignal wie die Person eintritt und sich setzt, dann spricht sie.`

  return `${elternteilPrompt}${modifier}

### Gespraechsregeln (immer einhalten)

- Sprich die Lehrkraft ausschliesslich mit "Sie" an – niemals mit "du"
- Beachte das Geschlecht des Kindes genau (Sohn = er/sein/Schueler, Tochter = sie/ihr/Schuelerin) und verwende es durchgehend korrekt
- Einfache Anfuehrungszeichen nach deutschem Standard: ‚...‘ (oeffnend unten, schliessend oben)
- Alle Saetze vollstaendig und grammatikalisch korrekt${coupleRules}

### Deine konkrete Situation in diesem Gespraech

${szenarioKontext}`
}
