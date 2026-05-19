import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    // 1. User prüfen (Anon Key)
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ step: 'auth', status: 'kein User eingeloggt', error: userError?.message })
    }

    // 2. Service-Role-Verbindung prüfen
    const serviceClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() { return [] },
          setAll() {},
        },
      }
    )

    const { data: profile, error: profileError } = await serviceClient
      .from('user_profiles')
      .select('subscription_status, trial_started_at')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      step: 'komplett',
      userId: user.id,
      email: user.email,
      profile,
      profileError: profileError?.message ?? null,
      serviceKeyPrefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20) + '...',
    })
  } catch (e: any) {
    return NextResponse.json({ step: 'exception', error: e.message })
  }
}
