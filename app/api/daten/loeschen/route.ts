import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// Löscht alle Übungsdaten des angemeldeten Kontos: Gesprächsverläufe mit Reflexion,
// Quiz-Ergebnisse und gespeicherte Fälle. Konto und Anmeldedaten bleiben.
// Umfang muss zu app/datenschutz/DataDeleteButton.tsx und app/datenschutz/page.tsx passen.
const TABELLEN = [
  'elterngespraech_sessions',
  'elterngespraech_quiz',
  'elterngespraech_konfigurationen',
] as const

export async function DELETE() {
  const supabase = await createServerSupabaseClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  }

  for (const tabelle of TABELLEN) {
    const { error } = await supabase.from(tabelle).delete().eq('user_id', user.id)
    if (error) {
      console.error(`[daten/loeschen] ${tabelle}:`, error.message)
      return NextResponse.json({ error: 'Löschen fehlgeschlagen' }, { status: 500 })
    }
  }

  // Gegenprobe: Ein DELETE, das keine Zeilen-Richtlinie erlaubt, meldet keinen Fehler,
  // sondern löscht einfach nichts. Deshalb nachzählen, statt Erfolg anzunehmen.
  for (const tabelle of TABELLEN) {
    const { count, error } = await supabase
      .from(tabelle)
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
    if (error || (count ?? 0) > 0) {
      console.error(`[daten/loeschen] ${tabelle}: nach dem Löschen noch ${count ?? '?'} Zeilen`, error?.message ?? '')
      return NextResponse.json({ error: 'Nicht vollständig gelöscht' }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
