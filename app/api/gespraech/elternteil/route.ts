import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient } from '@/lib/anthropic'
import { getElternteilPrompt, getSchwierigkeitsModifier } from '@/prompts/elterntypen/index'
import { buildElternteilSystemPrompt } from '@/prompts/evaluation'
import type { ElternteilRequest, Elterntyp, Schwierigkeit } from '@/types'

function validateRequest(body: unknown): body is ElternteilRequest {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    Array.isArray(b.messages) &&
    typeof b.elterntyp === 'string' &&
    typeof b.schwierigkeit === 'string' &&
    typeof b.szenarioKontext === 'string'
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

  const { messages, elterntyp, schwierigkeit, szenarioKontext, sessionStart, opener } = body

  const basePrompt = getElternteilPrompt(elterntyp as Elterntyp)
  const modifier = getSchwierigkeitsModifier(elterntyp as Elterntyp, schwierigkeit as Schwierigkeit)
  const systemPrompt = buildElternteilSystemPrompt(basePrompt, modifier, szenarioKontext)

  const isOpening = sessionStart && messages.length === 0
  let messagesForAPI: { role: 'user' | 'assistant'; content: string }[]

  if (isOpening) {
    const openerInstruction = opener
      ? `(Das Gespräch beginnt jetzt. Eröffne es mit folgendem Satz oder einer natürlichen Variation davon: "${opener}" – nicht mehr als 2-3 Sätze.)`
      : '(Das Gespräch beginnt jetzt. Bitte eröffne es natürlich – als wärst du gerade eingetreten. Sage wer du bist und worum es dir geht. Nicht mehr als 2-3 Sätze.)'

    messagesForAPI = [{ role: 'user', content: openerInstruction }]
  } else {
    messagesForAPI = messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))
  }

  try {
    const anthropic = getAnthropicClient()
    const stream = await anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: isOpening ? 300 : 512,
      system: systemPrompt,
      messages: messagesForAPI,
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
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
        } catch (streamErr) {
          const msg = streamErr instanceof Error ? streamErr.message : String(streamErr)
          console.error('[elternteil] Stream-Fehler:', msg)
          controller.enqueue(encoder.encode(`\n\n[Fehler beim Streaming: ${msg}]`))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[elternteil] Anthropic-Fehler:', msg)
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
