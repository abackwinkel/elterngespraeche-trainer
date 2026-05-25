import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { GespraechsKonfiguration } from '@/types'

export async function POST(req: NextRequest) {
  let body: GespraechsKonfiguration & { kind_initial?: string | null }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  // Auto-Label: "{kind_initial}, Kl. {klassenstufe} – {anlass}"
  const label = [
    body.kind_initial ? `${body.kind_initial},` : null,
    `Kl. ${body.klassenstufe}`,
    '–',
    body.anlass,
  ].filter(Boolean).join(' ')

  const { error } = await supabase
    .from('elterngespraech_konfigurationen')
    .insert({
      user_id:             user.id,
      label,
      schultyp:            body.schultyp,
      klassenstufe:        body.klassenstufe,
      person1:             body.person1,
      person2:             body.person2 ?? null,
      elterntyp:           body.elterntyp,
      familiensituation:   body.familie,
      gespraechsinitiative: body.gespraechsinitiative ?? null,
      gespraechsanlass:    body.anlass,
      situation_text:      body.situationText ?? null,
      kind_initial:        body.kind_initial ?? null,
      kind_geschlecht:     body.kindGeschlecht ?? null,
      sprachbarriere:      body.sprachbarriere ?? null,
    })

  if (error) {
    console.error('[konfiguration] Supabase-Fehler:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
