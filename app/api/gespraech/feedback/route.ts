import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient } from '@/lib/anthropic'
import { buildFeedbackPrompt } from '@/prompts/evaluation'
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

  const prompt = buildFeedbackPrompt(userTurn, elternTurn, szenarioKontext, elterntyp, schwierigkeit)

  const anthropic = getAnthropicClient()
  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  let feedback: FeedbackResponse
  try {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    feedback = JSON.parse(cleaned)
  } catch {
    feedback = {
      gut: 'Auswertung konnte nicht verarbeitet werden.',
      besser: null,
      alternativ: null,
    }
  }

  return NextResponse.json(feedback)
}
