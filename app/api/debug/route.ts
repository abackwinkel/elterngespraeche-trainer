import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'FEHLT'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'FEHLT'

  const serviceClient = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  })

  // Antjes Profil direkt per UUID abfragen
  const { data: profile, error } = await serviceClient
    .from('user_profiles')
    .select('id, subscription_status, trial_started_at')
    .eq('id', '9af58f3f-3f74-4dce-b5f6-12cb2501ae7f')
    .single()

  // Alle Profile (max 5) für Überblick
  const { data: allProfiles } = await serviceClient
    .from('user_profiles')
    .select('id, subscription_status')
    .limit(5)

  return NextResponse.json({
    supabaseUrl: url,
    serviceKeyLength: serviceKey.length,
    antjesProfil: profile ?? null,
    queryError: error?.message ?? null,
    alleProfile: allProfiles ?? [],
  })
}
