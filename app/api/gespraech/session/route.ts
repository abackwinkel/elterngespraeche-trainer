import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  }

  const b = body as Record<string, unknown>

  const { error } = await supabase
    .from('elterngespraech_sessions')
    .insert({
      user_id: user.id,
      schultyp: b.schultyp ?? 'gymnasium',
      klassenstufe: b.klassenstufe,
      gespraechsanlass: b.gespraechsanlass,
      familiensituation: b.familiensituation,
      elterntyp: b.elterntyp,
      schwierigkeit: b.schwierigkeit,
      turns: b.turns ?? [],
      reflexion: b.reflexion ?? null,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
