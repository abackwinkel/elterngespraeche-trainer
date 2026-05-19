import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'FEHLT',
    serviceKeyLength: (process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').length,
    anonKeyLength: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').length,
    anthropicKeyLength: (process.env.ANTHROPIC_API_KEY ?? '').length,
  })
}
