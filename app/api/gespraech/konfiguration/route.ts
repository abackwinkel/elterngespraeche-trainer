import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { GespraechsKonfiguration } from '@/types'

// ─── GET /api/gespraech/konfiguration?schultyp=gymnasium ──────────────────────

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const schultyp = req.nextUrl.searchParams.get('schultyp')

  let query = supabase
    .from('elterngespraech_konfigurationen')
    .select(
      'id, label, schultyp, klassenstufe, person1, person2, elterntyp, familiensituation, ' +
      'gespraechsinitiative, gespraechsanlass, situation_text, kind_initial, kind_geschlecht, ' +
      'sprachbarriere, created_at'
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (schultyp) {
    query = query.eq('schultyp', schultyp)
  }

  const { data, error } = await query

  if (error) {
    console.error('[konfiguration GET] Supabase-Fehler:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ konfigurationen: data })
}

// ─── DELETE /api/gespraech/konfiguration?id=uuid ──────────────────────────────

export async function DELETE(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID fehlt' }, { status: 400 })
  }

  const { error } = await supabase
    .from('elterngespraech_konfigurationen')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('[konfiguration DELETE] Supabase-Fehler:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// ─── POST /api/gespraech/konfiguration ────────────────────────────────────────

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
