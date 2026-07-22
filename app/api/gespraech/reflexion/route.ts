import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient } from '@/lib/anthropic'
import { requireAiUser, tooLong, tooLongResponse, turnsTooLong } from '@/lib/api-guard'
import { buildReflexionPrompt } from '@/prompts/evaluation'
import { normalizeStreamChunk } from '@/lib/germanTypography.mjs'
import type { ReflexionRequest } from '@/types'

function validateRequest(body: unknown): body is ReflexionRequest {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    Array.isArray(b.turns) &&
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

  const { turns, szenarioKontext, elterntyp, schwierigkeit } = body as ReflexionRequest

  if (turnsTooLong(turns) || tooLong(szenarioKontext)) {
    return tooLongResponse()
  }

  const prompt = buildReflexionPrompt(turns, szenarioKontext, elterntyp, schwierigkeit)

  try {
    const anthropic = getAnthropicClient()
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              // Pro Chunk nur em->en; Vollnormalisierung clientseitig am Ende.
              controller.enqueue(encoder.encode(normalizeStreamChunk(chunk.delta.text)))
            }
          }
        } catch (streamErr) {
          console.error('[reflexion] Stream-Fehler:', streamErr instanceof Error ? streamErr.message : String(streamErr))
          controller.enqueue(encoder.encode('\n\n[Die Auswertung wurde unterbrochen – bitte das Gespräch erneut beenden.]'))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('[reflexion] Anthropic-Fehler:', err instanceof Error ? err.message : String(err))
    return NextResponse.json({ error: 'Die Auswertung konnte nicht geladen werden.' }, { status: 502 })
  }
}
