import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'FEHLT'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'FEHLT'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'FEHLT'

  // ── Service-Role-Client: Profil-Check ──────────────────────────────────────
  const serviceClient = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  })

  const { data: antjesProfil, error: profileError } = await serviceClient
    .from('user_profiles')
    .select('id, subscription_status, trial_started_at')
    .eq('id', '9af58f3f-3f74-4dce-b5f6-12cb2501ae7f')
    .single()

  // ── Cookie-basierter Client: Auth-Check ────────────────────────────────────
  let authUser: string | null = null
  let authError: string | null = null
  let sessionInsertError: string | null = null
  let quizInsertError: string | null = null

  try {
    const userClient = await createServerSupabaseClient()
    const { data: { user }, error: uErr } = await userClient.auth.getUser()

    if (uErr) {
      authError = uErr.message
    } else if (!user) {
      authError = 'Kein User in Cookies – nicht eingeloggt'
    } else {
      authUser = user.id

      // Test-Insert Sessions
      const { error: sErr } = await userClient
        .from('elterngespraech_sessions')
        .insert({
          user_id: user.id,
          schultyp: 'debug-test',
          elterntyp: 'debug',
          schwierigkeit: 'ruhige-see',
          turns: [],
        })
        .select('id')
        .single()

      if (sErr) {
        sessionInsertError = sErr.message
      } else {
        // Test-Datensatz sofort löschen
        await userClient
          .from('elterngespraech_sessions')
          .delete()
          .eq('user_id', user.id)
          .eq('schultyp', 'debug-test')
      }

      // Test-Insert Quiz
      const { error: qErr } = await userClient
        .from('elterngespraech_quiz')
        .insert({
          user_id: user.id,
          modul: 'debug-test',
          frage_id: 'debug-test',
          korrekt: true,
          schwierigkeit: 'ruhige-see',
        })
        .select('id')
        .single()

      if (qErr) {
        quizInsertError = qErr.message
      } else {
        await userClient
          .from('elterngespraech_quiz')
          .delete()
          .eq('user_id', user.id)
          .eq('modul', 'debug-test')
      }
    }
  } catch (e) {
    authError = String(e)
  }

  return NextResponse.json({
    supabaseUrl: url,
    anonKeyLength: anonKey.length,
    serviceKeyLength: serviceKey.length,
    antjesProfil: antjesProfil ?? null,
    profileError: profileError?.message ?? null,
    authUser,
    authError,
    sessionInsertError,
    quizInsertError,
    sessionSave: sessionInsertError === null && authUser !== null ? 'OK' : 'FEHLER',
    quizSave: quizInsertError === null && authUser !== null ? 'OK' : 'FEHLER',
  })
}
