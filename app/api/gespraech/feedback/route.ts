import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient } from '@/lib/anthropic'
import { requireAiUser, tooLong, tooLongResponse } from '@/lib/api-guard'
import { buildFeedbackPrompt } from '@/prompts/evaluation'
import { normalizeGermanQuotes } from '@/lib/text-sanitizer'
import type { FeedbackRequest, FeedbackResponse, Elterntyp, Schwierigkeit } from '@/types'

function validateRequest(body: unknown): body is FeedbackRequest & { elterntyp: Elterntyp; schwierigkeit: Schwierigkeit } {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.userTurn === 'string' &&
    typeof b.elternTurn === 'string' &&
    typeof b.szenarioKontext === 'string' &&
    typeof b.elterntyp === 'string' &&
    typeof b.schwierigkeit === 'string'
  )
}

export async function POST(req: NextRequest) {
  const auth = await requireAiUser()
  if ('error' in auth) return auth.error

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 })
  }

  if (!validateRequest(body)) {
    return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
  }

  const { userTurn, elternTurn, szenarioKontext, elterntyp, schwierigkeit } = body as FeedbackRequest & { elterntyp: Elterntyp; schwierigkeit: Schwierigkeit }

  if (tooLong(userTurn) || tooLong(elternTurn) || tooLong(szenarioKontext)) {
    return tooLongResponse()
  }

  const prompt = buildFeedbackPrompt(userTurn, elternTurn, szenarioKontext, elterntyp, schwierigkeit)

  let text: string
  try {
    const anthropic = getAnthropicClient()
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    })
    text = message.content[0].type === 'text' ? message.content[0].text : ''
  } catch (err) {
    console.error('[feedback] Anthropic-Fehler:', err instanceof Error ? err.message : String(err))
    return NextResponse.json({ error: 'Die Auswertung konnte nicht geladen werden.' }, { status: 502 })
  }

  let feedback: FeedbackResponse
  try {
    const stripped = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    // Try direct parse, then fallback to extracting the first JSON object
    let parsed: unknown
    try {
      parsed = JSON.parse(stripped)
    } catch {
      const match = stripped.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('no JSON found')
      parsed = JSON.parse(match[0])
    }
    feedback = parsed as FeedbackResponse
  } catch {
    feedback = {
      gut: 'Auswertung konnte nicht geladen werden – bitte erneut senden.',
      besser: null,
      alternativ: null,
    }
  }

  // Anführungszeichen normalisieren (KI gibt teils englische Curly- oder ASCII-Quotes aus)
  feedback = {
    gut:       normalizeGermanQuotes(feedback.gut),
    besser:    feedback.besser    ? normalizeGermanQuotes(feedback.besser)    : null,
    alternativ:feedback.alternativ? normalizeGermanQuotes(feedback.alternativ): null,
  }

  return NextResponse.json(feedback)
}
