import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const APP_LABEL = 'Elterngespräche-Trainer'
const DEFAULT_FROM = 'onboarding@resend.dev'
const DEFAULT_TO = 'antje@antje-backwinkel.de'

// Auf "true" setzen, wenn du auch bei 0 neuen Feedbacks eine Mail willst (Heartbeat).
const SEND_EMPTY = false

interface Feedback {
  created_at: string
  app: string
  page: string | null
  message: string
  rating: number | null
  user_email: string | null
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function fmt(iso: string): string {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin',
  })
}

function stars(r: number | null): string {
  return r ? '★'.repeat(r) + '☆'.repeat(5 - r) : '–'
}

function buildHtml(rows: Feedback[]): string {
  const items = rows.map(r => `
    <div style="border:1px solid #e8e6e3;border-radius:8px;padding:14px 16px;margin:0 0 12px;">
      <div style="font-size:13px;color:#6b7280;margin-bottom:6px;">
        ${fmt(r.created_at)} · ${esc(r.app)} · <code>${esc(r.page ?? '–')}</code>
        ${r.rating ? ` · <span style="color:#caa300;">${stars(r.rating)}</span>` : ''}
      </div>
      <div style="font-size:15px;color:#1a1a1a;white-space:pre-wrap;line-height:1.5;">${esc(r.message)}</div>
      ${r.user_email ? `<div style="font-size:12px;color:#6b7280;margin-top:8px;">${esc(r.user_email)}</div>` : ''}
    </div>`).join('')

  return `<!doctype html><html><body style="margin:0;background:#f8f7f5;padding:24px;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;">
      <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 4px;">${APP_LABEL} · Feedback</h1>
      <p style="font-size:14px;color:#6b7280;margin:0 0 20px;">${rows.length} neue${rows.length === 1 ? 's' : ''} Feedback${rows.length === 1 ? '' : 's'} in den letzten 24 Stunden.</p>
      ${items}
    </div>
  </body></html>`
}

function buildText(rows: Feedback[]): string {
  const head = `${APP_LABEL} – ${rows.length} neue${rows.length === 1 ? 's' : ''} Feedback${rows.length === 1 ? '' : 's'} (letzte 24 h)\n\n`
  return head + rows.map(r =>
    `[${fmt(r.created_at)}] ${r.app} · ${r.page ?? '–'}${r.rating ? ` · ${stars(r.rating)}` : ''}\n` +
    `${r.message}\n` +
    `${r.user_email ?? ''}\n`
  ).join('\n----------------------------------------\n\n')
}

export async function GET(req: NextRequest) {
  // 1) Schutz: nur mit korrektem CRON_SECRET (Vercel Cron sendet ihn automatisch)
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendKey = process.env.RESEND_API_KEY
  if (!url || !serviceKey || !resendKey) {
    return NextResponse.json({ error: 'Env-Variablen fehlen (SUPABASE_SERVICE_ROLE_KEY / RESEND_API_KEY)' }, { status: 500 })
  }

  // 2) Feedback der letzten 24 h lesen (Service-Role umgeht RLS)
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data, error } = await supabase
    .from('feedback')
    .select('created_at, app, page, message, rating, user_email')
    .gte('created_at', since)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'DB-Abfrage fehlgeschlagen', detail: error.message }, { status: 500 })
  }

  const rows = (data ?? []) as Feedback[]

  if (rows.length === 0 && !SEND_EMPTY) {
    return NextResponse.json({ sent: false, count: 0, reason: 'keine neuen Feedbacks' })
  }

  // 3) Mail über Resend versenden
  const to = process.env.FEEDBACK_DIGEST_TO || DEFAULT_TO
  const from = process.env.RESEND_FROM || DEFAULT_FROM
  const subject = `${APP_LABEL} · ${rows.length} neue${rows.length === 1 ? 's' : ''} Feedback${rows.length === 1 ? '' : 's'}`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${APP_LABEL} Feedback <${from}>`,
      to: [to],
      subject,
      html: buildHtml(rows),
      text: buildText(rows),
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return NextResponse.json({ error: 'Resend-Versand fehlgeschlagen', status: res.status, detail }, { status: 502 })
  }

  return NextResponse.json({ sent: true, count: rows.length })
}
