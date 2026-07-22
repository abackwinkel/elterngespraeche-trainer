import type { Elterntyp, Schwierigkeit } from '@/types'

import { KOOPERATIV_PROMPT, KOOPERATIV_SCHWIERIGKEIT } from './kooperativ'
import { DEFENSIV_PROMPT, DEFENSIV_SCHWIERIGKEIT } from './defensiv'
import { AGGRESSIV_PROMPT, AGGRESSIV_SCHWIERIGKEIT } from './aggressiv'
import { WEINEND_PROMPT, WEINEND_SCHWIERIGKEIT } from './weinend'
import { PASSIV_PROMPT, PASSIV_SCHWIERIGKEIT } from './passiv'
import { UEBERGRIFFIG_PROMPT, UEBERGRIFFIG_SCHWIERIGKEIT } from './uebergriffig'

// Minimaler Prompt für 'unbekannt' – Verhalten wird aus Freitext abgeleitet
const UNBEKANNT_PROMPT = `Du spielst ein Elternteil in einem simulierten Schulgesprächs-Training für Lehrkräfte. Dein Name und deine Situation werden im Kontext beschrieben.

### Deine Grundhaltung

Dein Verhalten ist nicht vorherbestimmt. Leite deine Haltung, Emotionen und Reaktionen vollständig aus dem Situationskontext ab, der dir im Abschnitt „Deine konkrete Situation in diesem Gespräch“ beschrieben wird. Wenn dort ein Elternverhalten beschrieben ist, halte dich genau daran.

Gibt es keinen Hinweis auf das Verhalten, spiele einen unvorhersehbaren, neutralen Gesprächspartner, der weder besonders offen noch besonders schwierig ist.

### Wie du sprichst

– Natürlich und situationsgemäß
– Deiner Grundstimmung entsprechend, wie sie sich aus dem Kontext ergibt
– Kurze, authentische Antworten – nicht theatralisch, nicht übertrieben`

const PROMPTS: Record<Elterntyp, string> = {
  kooperativ:   KOOPERATIV_PROMPT,
  defensiv:     DEFENSIV_PROMPT,
  aggressiv:    AGGRESSIV_PROMPT,
  weinend:      WEINEND_PROMPT,
  passiv:       PASSIV_PROMPT,
  uebergriffig: UEBERGRIFFIG_PROMPT,
  unbekannt:    UNBEKANNT_PROMPT,
}

const LEERE_SCHWIERIGKEIT: Record<Schwierigkeit, string> = {
  'ruhige-see':    '',
  'gegenwind':     '',
  'gewitterfront': '',
}

const SCHWIERIGKEIT: Record<Elterntyp, Record<Schwierigkeit, string>> = {
  kooperativ:   KOOPERATIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  defensiv:     DEFENSIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  aggressiv:    AGGRESSIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  weinend:      WEINEND_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  passiv:       PASSIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  uebergriffig: UEBERGRIFFIG_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  unbekannt:    LEERE_SCHWIERIGKEIT,
}

export function getElternteilPrompt(elterntyp: Elterntyp): string {
  return PROMPTS[elterntyp] ?? PROMPTS.kooperativ
}

export function getSchwierigkeitsModifier(elterntyp: Elterntyp, schwierigkeit: Schwierigkeit): string {
  return SCHWIERIGKEIT[elterntyp]?.[schwierigkeit] ?? ''
}
