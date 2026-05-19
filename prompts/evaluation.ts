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
5. Wird beschreibend statt bewertend formuliert (Beobachtung statt Urteil)?

## Wichtig

- "gut" darf nie leer sein – finde immer etwas Positives, auch wenn es nur die Haltung oder der Versuch ist
- "besser" und "alternativ" dürfen null sein, wenn die Aussage gut war
- Keine NLP- oder GFK-Fachbegriffe verwenden
- Spreche die Lehrkraft direkt an: "Sie haben...", "Ihre Frage..."
- Kurze, klare Sprache – keine langen Erklärungen
- Deutsch`
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

Verfasse eine strukturierte Gesamtreflexion des Gesprächs. Sprich die Lehrkraft direkt an ("Sie haben...").

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
- Keine Dokumentüberschrift (z. B. "# Gesprächsreflexion") – beginne direkt mit dem ersten Abschnitt **Was gut gelungen ist**
- Abschnittstitel als **fett** in einer eigenen Zeile, kein #
- Deutsche Anführungszeichen verwenden: „..." (öffnend unten, schließend oben) – niemals "..." oder "..."`
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

  return `${elternteilPrompt}${modifier}

### Deine konkrete Situation in diesem Gespräch

${szenarioKontext}`
}
