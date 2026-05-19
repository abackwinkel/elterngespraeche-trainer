import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { createServerClient } from '@supabase/ssr'

function verifySignature(body: string, signature: string, secret: string): boolean {
  const computed = createHmac('sha256', secret).update(body).digest('hex')
  return computed === signature
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-thrivecart-signature') ?? ''
  const secret = process.env.THRIVECART_WEBHOOK_SECRET ?? ''

  if (secret && !verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Ungültige Signatur' }, { status: 401 })
  }

  let event: Record<string, unknown>
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Ungültiges JSON' }, { status: 400 })
  }

  const eventType = event.event as string
  const customerEmail = (event.customer as Record<string, unknown>)?.email as string | undefined

  if (!customerEmail) {
    return NextResponse.json({ ok: true, message: 'Kein Customer-Email – ignoriert' })
  }

  const serviceClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  // User-ID via E-Mail auflösen
  const { data: { users } } = await serviceClient.auth.admin.listUsers()
  const user = users?.find(u => u.email === customerEmail)

  if (!user) {
    // User noch nicht registriert — OK, kein Fehler
    return NextResponse.json({ ok: true, message: 'User nicht gefunden – ignoriert' })
  }

  let newStatus: string | null = null

  if (eventType === 'order.success') {
    newStatus = 'active'
  } else if (
    eventType === 'subscription.cancelled' ||
    eventType === 'subscription.failed' ||
    eventType === 'subscription.expired'
  ) {
    newStatus = 'expired'
  }

  if (newStatus) {
    await serviceClient
      .from('user_profiles')
      .update({ subscription_status: newStatus })
      .eq('id', user.id)
  }

  return NextResponse.json({ ok: true })
}
