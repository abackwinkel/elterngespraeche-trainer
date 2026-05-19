import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServerClient } from '@supabase/ssr'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 })
  }

  const { code } = body as Record<string, unknown>
  if (typeof code !== 'string' || !code.trim()) {
    return NextResponse.json({ error: 'Code fehlt' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  }

  // Service-Role für beta_codes (nur service_role darf lesen)
  const serviceClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { data: betaCode, error: fetchError } = await serviceClient
    .from('beta_codes')
    .select('code, used_by')
    .eq('code', code.trim().toUpperCase())
    .single()

  if (fetchError || !betaCode) {
    return NextResponse.json({ error: 'Code ungültig oder nicht gefunden' }, { status: 404 })
  }

  if (betaCode.used_by) {
    return NextResponse.json({ error: 'Code wurde bereits verwendet' }, { status: 409 })
  }

  // Code als verwendet markieren + User-Status auf 'beta' setzen
  await Promise.all([
    serviceClient
      .from('beta_codes')
      .update({ used_by: user.id, used_at: new Date().toISOString() })
      .eq('code', betaCode.code),
    serviceClient
      .from('user_profiles')
      .update({ subscription_status: 'beta' })
      .eq('id', user.id),
  ])

  return NextResponse.json({ ok: true, message: 'Beta-Zugang aktiviert' })
}
