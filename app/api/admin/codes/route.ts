import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServerClient } from '@supabase/ssr'

const ADMIN_EMAIL = 'antje@antje-backwinkel.de'

async function getAdminServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

async function checkAdmin() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.email === ADMIN_EMAIL ? user : null
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const segment = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `ET-${segment(4)}-${segment(4)}`
}

// GET /api/admin/codes – alle Codes auflisten
export async function GET() {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })

  const service = await getAdminServiceClient()
  const { data, error } = await service
    .from('beta_codes')
    .select('code, note, used_by, used_at, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ codes: data })
}

// POST /api/admin/codes – neuen Code generieren
export async function POST(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })

  let note = ''
  try {
    const body = await req.json()
    note = typeof body.note === 'string' ? body.note.trim() : ''
  } catch {
    // note bleibt leer
  }

  const code = generateCode()
  const service = await getAdminServiceClient()
  const { error } = await service
    .from('beta_codes')
    .insert({ code, note: note || null })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ code })
}
