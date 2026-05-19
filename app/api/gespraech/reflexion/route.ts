import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient } from '@/lib/anthropic'
import { buildReflexionPrompt } from '@/prompts/evaluation'
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

  const prompt = buildReflexionPrompt(turns, szenarioKontext, elterntyp, schwierigkeit)

  const anthropic = getAnthropicClient()
  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
