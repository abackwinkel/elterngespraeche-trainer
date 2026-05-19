import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'FEHLT'
  const keyRaw = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'FEHLT'
  const keyPreview = keyRaw.length > 10 ? keyRaw.slice(0, 12) + '...' + keyRaw.slice(-6) : keyRaw

  // Service-Role-Verbindung ohne Cookie-Kontext testen
  const serviceClient = createServerClient(url, keyRaw, {
    cookies: { getAll: () => [], setAll: () => {} },
  })

  const { data, error } = await serviceClient
    .from('user_profiles')
    .select('id, subscription_status, trial_started_at')
    .limit(3)

  return NextResponse.json({
    supabaseUrl: url,
    serviceKeyPreview: keyPreview,
    queryResult: data,
    queryError: error?.message ?? null,
  })
}
