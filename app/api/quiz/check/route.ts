import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { QUIZ_FRAGEN } from '@/lib/quiz-data'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 })
  }

  const b = body as Record<string, unknown>

  if (typeof b.frageId !== 'string' || typeof b.antwortIndex !== 'number') {
    return NextResponse.json({ error: 'frageId und antwortIndex sind Pflichtfelder' }, { status: 400 })
  }

  const frage = QUIZ_FRAGEN.find(f => f.id === b.frageId)
  if (!frage) {
    return NextResponse.json({ error: 'Frage nicht gefunden' }, { status: 404 })
  }

  const korrekt = b.antwortIndex === frage.korrektIndex

  // In Supabase speichern (optional, wenn eingeloggt)
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('elterngespraech_quiz').insert({
        user_id: user.id,
        modul: frage.modul,
        frage_id: frage.id,
        korrekt,
        schwierigkeit: frage.schwierigkeit,
      })
    }
  } catch {
    // Speichern schlägt still fehl — Antwort trotzdem zurückgeben
  }

  return NextResponse.json({
    korrekt,
    erklaerung: frage.erklaerung,
    korrektIndex: frage.korrektIndex,
  })
}
