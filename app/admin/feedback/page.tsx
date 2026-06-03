'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import { createClient } from '@/lib/supabase'

const ADMIN_EMAIL = 'antje@antje-backwinkel.de'

// EGT hat kein --c-yellow-Token; warmes Gold passend zum Teal-Theme.
const STAR = '#E0A82E'

interface Feedback {
  id: string
  created_at: string
  app: string
  page: string | null
  message: string
  rating: number | null
  user_email: string | null
  user_id: string | null
  user_agent: string | null
  status: string
}

type Status = 'new' | 'reviewed' | 'done'
type StatusFilter = 'alle' | Status

const STATUS_LABEL: Record<Status, string> = {
  new: 'Neu',
  reviewed: 'Gesehen',
  done: 'Erledigt',
}

// Klick auf Status schaltet weiter: new -> reviewed -> done -> new
const NEXT_STATUS: Record<Status, Status> = {
  new: 'reviewed',
  reviewed: 'done',
  done: 'new',
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function toCSV(rows: Feedback[]): string {
  const headers = ['Datum', 'App', 'Seite', 'Bewertung', 'Nachricht', 'E-Mail', 'Status']
  const esc = (v: string | number | null) => {
    const s = (v ?? '').toString()
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
  }
  const lines = [headers.join(';')]
  for (const r of rows) {
    lines.push([
      fmtDateTime(r.created_at),
      r.app,
      r.page ?? '',
      r.rating ?? '',
      r.message,
      r.user_email ?? '',
      STATUS_LABEL[(r.status as Status)] ?? r.status,
    ].map(esc).join(';'))
  }
  // BOM, damit deutsches Excel UTF-8 erkennt; CRLF für saubere Zeilen
  return '﻿' + lines.join('\r\n')
}

export default function AdminFeedbackPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Feedback[]>([])
  const [error, setError] = useState('')

  const [filterApp, setFilterApp] = useState<string>('alle')
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('alle')

  const load = useCallback(async () => {
    const { data, error: e } = await createClient()
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
    setLoading(false)
    if (e) { setError(e.message); return }
    setItems(data ?? [])
  }, [])

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user?.email === ADMIN_EMAIL) {
        setAuthorized(true)
        load()
      } else {
        setLoading(false)
        router.push('/auth/login')
      }
    })
  }, [load, router])

  async function cycleStatus(f: Feedback) {
    const next = NEXT_STATUS[(f.status as Status) ?? 'new'] ?? 'new'
    // optimistisch
    setItems(prev => prev.map(x => x.id === f.id ? { ...x, status: next } : x))
    const { error: e } = await createClient()
      .from('feedback')
      .update({ status: next })
      .eq('id', f.id)
    if (e) {
      setError(e.message)
      setItems(prev => prev.map(x => x.id === f.id ? { ...x, status: f.status } : x))
    }
  }

  const apps = Array.from(new Set(items.map(i => i.app))).sort()

  const filtered = items.filter(i =>
    (filterApp === 'alle' || i.app === filterApp) &&
    (filterStatus === 'alle' || i.status === filterStatus)
  )

  function downloadCSV() {
    const csv = toCSV(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `feedback-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const counts = {
    alle: items.length,
    new: items.filter(i => i.status === 'new').length,
    reviewed: items.filter(i => i.status === 'reviewed').length,
    done: items.filter(i => i.status === 'done').length,
  }

  if (loading) return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={main}><p style={{ color: 'var(--c-gray)' }}>Laden …</p></main>
    </div>
  )

  if (!authorized) return null

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={main}>

        {/* Admin-Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Link href="/admin" style={adminTab(false)}>Einladungscodes</Link>
          <Link href="/admin/feedback" style={adminTab(true)}>Feedback</Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={eyebrow}>Administration</div>
          <h1 style={h1}>Feedback</h1>
          <p style={{ color: 'var(--c-gray)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
            {counts.alle} gesamt · {counts.new} neu · {counts.reviewed} gesehen · {counts.done} erledigt
          </p>
        </div>

        {error && <div style={errorBox}>{error}</div>}

        {/* Filter + Export */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <label style={lbl}>App</label>
            <select value={filterApp} onChange={e => setFilterApp(e.target.value)} style={inp}>
              <option value="alle">Alle Apps</option>
              {apps.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as StatusFilter)} style={inp}>
              <option value="alle">Alle ({counts.alle})</option>
              <option value="new">Neu ({counts.new})</option>
              <option value="reviewed">Gesehen ({counts.reviewed})</option>
              <option value="done">Erledigt ({counts.done})</option>
            </select>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={downloadCSV} disabled={filtered.length === 0} style={btnPrimary(filtered.length === 0)}>
              ↓ Als CSV herunterladen ({filtered.length})
            </button>
          </div>
        </div>

        {/* Tabelle */}
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--c-gray)', fontSize: '0.9rem' }}>Kein Feedback in dieser Auswahl.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Datum</th>
                  <th style={th}>App</th>
                  <th style={th}>Seite</th>
                  <th style={{ ...th, textAlign: 'center' }}>Bewertung</th>
                  <th style={th}>Nachricht</th>
                  <th style={th}>E-Mail</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} style={tr}>
                    <td style={{ ...td, whiteSpace: 'nowrap', color: 'var(--c-gray)' }}>{fmtDateTime(f.created_at)}</td>
                    <td style={td}>{f.app}</td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--c-gray)' }}>{f.page || '–'}</td>
                    <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap', color: STAR }}>
                      {f.rating ? '★'.repeat(f.rating) + '☆'.repeat(5 - f.rating) : <span style={{ color: 'var(--c-lightgray)' }}>–</span>}
                    </td>
                    <td style={{ ...td, minWidth: 260, whiteSpace: 'pre-wrap', color: 'var(--c-dark)' }}>{f.message}</td>
                    <td style={{ ...td, fontSize: '0.78rem', color: 'var(--c-gray)' }}>{f.user_email || '–'}</td>
                    <td style={td}>
                      <button
                        onClick={() => cycleStatus(f)}
                        style={statusBtn(f.status as Status)}
                        title="Klicken zum Weiterschalten"
                      >
                        {STATUS_LABEL[(f.status as Status)] ?? f.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

// ---- Styles (an bestehendes Admin-Panel angelehnt) ----

const main: React.CSSProperties = {
  flex: 1, padding: '2.5rem', overflowY: 'auto', overflowX: 'auto',
  background: 'var(--c-offwhite)',
}

const eyebrow: React.CSSProperties = {
  fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: 'var(--c-teal)', marginBottom: '0.35rem',
}

const h1: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant,"Cormorant Garamond",serif)',
  fontSize: '2.1rem', fontWeight: 400, color: 'var(--c-dark)', margin: 0, lineHeight: 1.15,
}

const errorBox: React.CSSProperties = {
  marginBottom: '1rem', padding: '0.75rem 1rem',
  background: 'rgba(201,91,80,0.1)', border: '1px solid rgba(201,91,80,0.3)',
  borderRadius: 6, fontSize: '0.85rem', color: '#c95b50',
}

const lbl: React.CSSProperties = {
  display: 'block', marginBottom: '0.3rem',
  fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'var(--c-gray)',
}

const inp: React.CSSProperties = {
  display: 'block', padding: '0.5rem 0.75rem',
  border: '1.5px solid var(--c-lightgray)', borderRadius: 6,
  fontSize: '0.88rem', color: 'var(--c-dark)', outline: 'none',
  background: '#fff', boxSizing: 'border-box',
}

function adminTab(active: boolean): React.CSSProperties {
  return {
    padding: '0.4rem 0.9rem', fontSize: '0.8rem', fontWeight: 600,
    textDecoration: 'none', borderRadius: 6,
    color: active ? '#fff' : 'var(--c-teal)',
    background: active ? 'var(--c-teal)' : 'transparent',
    border: `1.5px solid ${active ? 'var(--c-teal)' : 'var(--c-lightgray)'}`,
  }
}

function btnPrimary(disabled: boolean): React.CSSProperties {
  return {
    padding: '0.55rem 1.1rem', background: disabled ? 'rgba(15,123,108,0.4)' : 'var(--c-teal)',
    color: '#fff', fontWeight: 600, fontSize: '0.85rem',
    border: 'none', borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
  }
}

const table: React.CSSProperties = {
  width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem',
}

const th: React.CSSProperties = {
  textAlign: 'left', padding: '0.5rem 0.7rem',
  fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--c-gray)',
  borderBottom: '2px solid var(--c-lightgray)', whiteSpace: 'nowrap',
}

const tr: React.CSSProperties = {
  borderBottom: '1px solid var(--c-lightgray)',
}

const td: React.CSSProperties = {
  padding: '0.6rem 0.7rem', verticalAlign: 'top', lineHeight: 1.5,
}

function statusBtn(status: Status): React.CSSProperties {
  const colors: Record<Status, { bg: string; color: string }> = {
    new:      { bg: 'rgba(15,123,108,0.12)',  color: 'var(--c-teal)' },
    reviewed: { bg: 'rgba(224,168,46,0.22)',  color: '#8a6d00' },
    done:     { bg: 'rgba(107,114,128,0.18)', color: 'var(--c-gray)' },
  }
  const c = colors[status] ?? colors.new
  return {
    padding: '0.25rem 0.6rem', fontSize: '0.72rem', fontWeight: 700,
    letterSpacing: '0.04em', textTransform: 'uppercase',
    background: c.bg, color: c.color,
    border: 'none', borderRadius: 5, cursor: 'pointer', whiteSpace: 'nowrap',
  }
}
