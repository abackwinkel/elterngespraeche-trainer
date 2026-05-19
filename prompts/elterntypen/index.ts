import type { Elterntyp, Schwierigkeit } from '@/types'

import { KOOPERATIV_PROMPT, KOOPERATIV_SCHWIERIGKEIT } from './kooperativ'
import { DEFENSIV_PROMPT, DEFENSIV_SCHWIERIGKEIT } from './defensiv'
import { AGGRESSIV_PROMPT, AGGRESSIV_SCHWIERIGKEIT } from './aggressiv'
import { WEINEND_PROMPT, WEINEND_SCHWIERIGKEIT } from './weinend'
import { PASSIV_PROMPT, PASSIV_SCHWIERIGKEIT } from './passiv'
import { UEBERGRIFFIG_PROMPT, UEBERGRIFFIG_SCHWIERIGKEIT } from './uebergriffig'

const PROMPTS: Record<Elterntyp, string> = {
  kooperativ:   KOOPERATIV_PROMPT,
  defensiv:     DEFENSIV_PROMPT,
  aggressiv:    AGGRESSIV_PROMPT,
  weinend:      WEINEND_PROMPT,
  passiv:       PASSIV_PROMPT,
  uebergriffig: UEBERGRIFFIG_PROMPT,
}

const SCHWIERIGKEIT: Record<Elterntyp, Record<Schwierigkeit, string>> = {
  kooperativ:   KOOPERATIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  defensiv:     DEFENSIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  aggressiv:    AGGRESSIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  weinend:      WEINEND_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  passiv:       PASSIV_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
  uebergriffig: UEBERGRIFFIG_SCHWIERIGKEIT as Record<Schwierigkeit, string>,
}

export function getElternteilPrompt(elterntyp: Elterntyp): string {
  return PROMPTS[elterntyp] ?? PROMPTS.kooperativ
}

export function getSchwierigkeitsModifier(elterntyp: Elterntyp, schwierigkeit: Schwierigkeit): string {
  return SCHWIERIGKEIT[elterntyp]?.[schwierigkeit] ?? ''
}
