import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServerClient } from '@supabase/ssr'

const ADMIN_EMAIL = 'antje@antje-backwinkel.de'

function serviceClient() {
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

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
function generateCode(): string {
  const r = () => CHARS[Math.floor(Math.random() * CHARS.length)]
  return 'ET-' + Array.from({length: 4}, r).join('') + '-' + Array.from({length: 4}, r).join('')
}

// GET – alle Codes
export async function GET() {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })

  const { data, error } = await serviceClient()
    .from('beta_codes')
    .select('code, name, typ, active, used_by, used_at, expires_at, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ codes: data })
}

// POST – neuen Code generieren
export async function POST(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })

  let body: { name?: string; typ?: string; expires_at?: string; count?: number } = {}
  try { body = await req.json() } catch { /* leer */ }

  const count = Math.min(body.count ?? 1, 50)
  const rows = Array.from({ length: count }, () => ({
    code: generateCode(),
    name: count === 1 ? (body.name?.trim() || null) : null,
    typ: body.typ || 'beta',
    expires_at: body.expires_at ? new Date(body.expires_at).toISOString() : null,
  }))

  const { data, error } = await serviceClient()
    .from('beta_codes')
    .insert(rows)
    .select('code, name, typ, active, used_by, used_at, expires_at, created_at')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ codes: data })
}

// PATCH – Code aktualisieren (name / typ / active / expires_at)
export async function PATCH(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })

  let body: { code: string; field: string; value: unknown } = { code: '', field: '', value: null }
  try { body = await req.json() } catch { /* leer */ }

  const allowed = ['name', 'typ', 'active', 'expires_at']
  if (!body.code || !allowed.includes(body.field)) {
    return NextResponse.json({ error: 'Ungueltige Parameter' }, { status: 400 })
  }

  let value = body.value
  if (body.field === 'expires_at' && typeof value === 'string' && value) {
    value = new Date(value).toISOString()
  }
  if (body.field === 'expires_at' && value === '') value = null
  if (body.field === 'name' && value === '') value = null

  const { error } = await serviceClient()
    .from('beta_codes')
    .update({ [body.field]: value })
    .eq('code', body.code)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE – Code loeschen (nur ungenutzte)
export async function DELETE(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Code fehlt' }, { status: 400 })

  const { error } = await serviceClient()
    .from('beta_codes')
    .delete()
    .eq('code', code)
    .is('used_by', null)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
