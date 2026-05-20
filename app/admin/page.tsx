'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import { createClient } from '@/lib/supabase'

const ADMIN_EMAIL = 'antje@antje-backwinkel.de'

interface Code {
  code: string
  name: string | null
  typ: string
  active: boolean
  used_by: string | null
  used_at: string | null
  expires_at: string | null
  created_at: string
}

type Filter = 'alle' | 'aktiv' | 'eingeloest' | 'deaktiviert' | 'abgelaufen'
type EditField = 'name' | 'typ' | 'expires_at'

function codeStatus(c: Code): 'aktiv' | 'eingeloest' | 'deaktiviert' | 'abgelaufen' {
  if (!c.active) return 'deaktiviert'
  if (c.used_by) return 'eingeloest'
  if (c.expires_at && new Date(c.expires_at) < new Date()) return 'abgelaufen'
  return 'aktiv'
}

function fmtDate(iso: string | null) {
  if (!iso) return '–'
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function toDateInput(iso: string | null) {
  if (!iso) return ''
  return iso.slice(0, 10)
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [codes, setCodes] = useState<Code[]>([])
  const [filter, setFilter] = useState<Filter>('alle')
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newTyp, setNewTyp] = useState('beta')
  const [newExpiry, setNewExpiry] = useState('')
  const [creating, setCreating] = useState(false)

  const [editCell, setEditCell] = useState<{ code: string; field: EditField } | null>(null)
  const [editVal, setEditVal] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

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
  }, [router])

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/codes')
    const data = await res.json()
    setLoading(false)
    if (data.error) { setError(data.error); return }
    setCodes(data.codes ?? [])
  }, [])

  async function createCodes(count: number) {
    setCreating(true)
    setError('')
    const res = await fetch('/api/admin/codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: count === 1 ? newName.trim() : undefined,
        typ: newTyp || 'beta',
        expires_at: newExpiry || undefined,
        count,
      }),
    })
    const data = await res.json()
    setCreating(false)
    if (data.error) { setError(data.error); return }
    setNewName(''); setNewExpiry('')
    setShowForm(false)
    setCodes(prev => [...(data.codes ?? []), ...prev])
  }

  async function deleteCode(code: string) {
    const res = await fetch(`/api/admin/codes?code=${encodeURIComponent(code)}`, { method: 'DELETE' })
    const data = await res.json()
    if (data.error) { setError(data.error); return }
    setCodes(prev => prev.filter(c => c.code !== code))
  }

  async function toggleActive(c: Code) {
    const res = await fetch('/api/admin/codes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: c.code, field: 'active', value: !c.active }),
    })
    const data = await res.json()
    if (data.error) { setError(data.error); return }
    setCodes(prev => prev.map(x => x.code === c.code ? { ...x, active: !c.active } : x))
  }

  function startEdit(code: string, field: EditField, current: string | null) {
    setEditCell({ code, field })
    setEditVal(field === 'expires_at' ? toDateInput(current) : (current ?? ''))
  }

  async function saveEdit(code: string, field: EditField) {
    setEditCell(null)
    let value: string | null = editVal.trim() || null
    if (field === 'expires_at') value = editVal || null

    const res = await fetch('/api/admin/codes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, field, value }),
    })
    const data = await res.json()
    if (data.error) { setError(data.error); return }
    setCodes(prev => prev.map(c => c.code === code ? { ...c, [field]: value } : c))
  }

  function copy(code: string) {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 1800)
  }

  const filtered = codes.filter(c => filter === 'alle' || codeStatus(c) === filter)

  const counts = {
    alle: codes.length,
    aktiv: codes.filter(c => codeStatus(c) === 'aktiv').length,
    eingeloest: codes.filter(c => codeStatus(c) === 'eingeloest').length,
    deaktiviert: codes.filter(c => codeStatus(c) === 'deaktiviert').length,
    abgelaufen: codes.filter(c => codeStatus(c) === 'abgelaufen').length,
  }

  if (loading) return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={mainStyle}><p style={{ color: 'var(--c-gray)' }}>Laden …</p></main>
    </div>
  )

  if (!authorized) return null

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={mainStyle}>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={eyebrow}>Administration</div>
          <h1 style={h1}>Einladungscodes</h1>
          <p style={{ color: 'var(--c-gray)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
            {codes.length} Codes gesamt · {counts.aktiv} aktiv · {counts.eingeloest} eingeloest
          </p>
        </div>

        {error && <div style={errorBox}>{error}</div>}

        {/* Create form */}
        <div style={{ marginBottom: '1.75rem' }}>
          <button onClick={() => setShowForm(v => !v)} style={btnPrimary(false)}>
            {showForm ? '× Abbrechen' : '+ Neuen Code erstellen'}
          </button>

          {showForm && (
            <div style={{
              marginTop: '1rem', padding: '1.25rem 1.5rem',
              background: '#f7f9fa', border: '1px solid var(--c-lightgray)',
              borderRadius: 10, display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end',
            }}>
              <div style={{ flex: '1 1 180px' }}>
                <label style={lbl}>Name / Label</label>
                <input
                  value={newName} onChange={e => setNewName(e.target.value)}
                  placeholder="z. B. Sarah Muller"
                  style={inp}
                />
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label style={lbl}>Typ</label>
                <select value={newTyp} onChange={e => setNewTyp(e.target.value)} style={inp}>
                  <option value="beta">Beta</option>
                  <option value="premium">Premium</option>
                  <option value="test">Test</option>
                </select>
              </div>
              <div style={{ flex: '1 1 150px' }}>
                <label style={lbl}>Ablaufdatum (optional)</label>
                <input
                  type="date" value={newExpiry} onChange={e => setNewExpiry(e.target.value)}
                  style={inp}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', paddingBottom: '1px' }}>
                <button onClick={() => createCodes(1)} disabled={creating} style={btnPrimary(creating)}>
                  {creating ? 'Erstellt …' : '1 Code erstellen'}
                </button>
                <button onClick={() => createCodes(10)} disabled={creating} style={btnOutline(creating)}>
                  10 Codes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: '1.25rem', borderBottom: '2px solid var(--c-lightgray)' }}>
          {(['alle', 'aktiv', 'eingeloest', 'deaktiviert', 'abgelaufen'] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={tabBtn(filter === f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Code list */}
        {filtered.length === 0
          ? <p style={{ color: 'var(--c-gray)', fontSize: '0.9rem' }}>Keine Codes in dieser Kategorie.</p>
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {filtered.map(c => {
                const status = codeStatus(c)
                return (
                  <div key={c.code} style={rowStyle(status)}>

                    {/* Status badge */}
                    <div style={{ flexShrink: 0 }}>
                      <span style={badge(status)}>{statusLabel(status)}</span>
                    </div>

                    {/* Code + copy */}
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', color: 'var(--c-dark)' }}>
                        {c.code}
                      </span>
                      <button onClick={() => copy(c.code)} style={iconBtn(copied === c.code)}>
                        {copied === c.code ? '✓' : '⎘'}
                      </button>
                    </div>

                    {/* Name – inline edit */}
                    <div style={{ flex: '1 1 140px', minWidth: 0 }}>
                      <div style={metaLabel}>Name</div>
                      {editCell?.code === c.code && editCell.field === 'name' ? (
                        <input
                          autoFocus value={editVal} onChange={e => setEditVal(e.target.value)}
                          onBlur={() => saveEdit(c.code, 'name')}
                          onKeyDown={e => { if (e.key === 'Enter') saveEdit(c.code, 'name') }}
                          style={inlineInput}
                        />
                      ) : (
                        <div
                          onClick={() => startEdit(c.code, 'name', c.name)}
                          style={editableCell}
                          title="Klicken zum Bearbeiten"
                        >
                          {c.name || <span style={{ color: 'var(--c-lightgray)' }}>–</span>}
                        </div>
                      )}
                    </div>

                    {/* Typ – inline edit */}
                    <div style={{ flex: '0 0 90px' }}>
                      <div style={metaLabel}>Typ</div>
                      {editCell?.code === c.code && editCell.field === 'typ' ? (
                        <select
                          autoFocus value={editVal} onChange={e => setEditVal(e.target.value)}
                          onBlur={() => saveEdit(c.code, 'typ')}
                          style={inlineInput}
                        >
                          <option value="beta">beta</option>
                          <option value="premium">premium</option>
                          <option value="test">test</option>
                        </select>
                      ) : (
                        <div onClick={() => startEdit(c.code, 'typ', c.typ)} style={editableCell} title="Klicken zum Bearbeiten">
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.1rem 0.45rem', background: 'rgba(0,151,178,0.1)', color: 'var(--c-teal)', borderRadius: 4 }}>
                            {c.typ || 'beta'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Ablauf – inline edit */}
                    <div style={{ flex: '0 0 110px' }}>
                      <div style={metaLabel}>Ablauf</div>
                      {editCell?.code === c.code && editCell.field === 'expires_at' ? (
                        <input
                          autoFocus type="date" value={editVal} onChange={e => setEditVal(e.target.value)}
                          onBlur={() => saveEdit(c.code, 'expires_at')}
                          onKeyDown={e => { if (e.key === 'Enter') saveEdit(c.code, 'expires_at') }}
                          style={inlineInput}
                        />
                      ) : (
                        <div onClick={() => startEdit(c.code, 'expires_at', c.expires_at)} style={editableCell} title="Klicken zum Bearbeiten">
                          {c.expires_at
                            ? <span style={{ color: new Date(c.expires_at) < new Date() ? '#c95b50' : 'inherit' }}>{fmtDate(c.expires_at)}</span>
                            : <span style={{ color: 'var(--c-lightgray)' }}>kein</span>}
                        </div>
                      )}
                    </div>

                    {/* Dates */}
                    <div style={{ flex: '0 0 90px' }}>
                      <div style={metaLabel}>Erstellt</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--c-gray)' }}>{fmtDate(c.created_at)}</div>
                    </div>
                    <div style={{ flex: '0 0 90px' }}>
                      <div style={metaLabel}>Aktiviert</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--c-gray)' }}>{fmtDate(c.used_at)}</div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, alignItems: 'center' }}>
                      <button
                        onClick={() => toggleActive(c)}
                        style={toggleBtn(c.active)}
                        title={c.active ? 'Deaktivieren' : 'Aktivieren'}
                      >
                        {c.active ? 'Deaktiv.' : 'Aktivieren'}
                      </button>
                      {!c.used_by && (
                        <button onClick={() => deleteCode(c.code)} style={delBtn} title="Loeschen">✕</button>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>
          )}
      </main>
    </div>
  )
}

function statusLabel(s: ReturnType<typeof codeStatus>) {
  return { aktiv: 'Aktiv', eingeloest: 'Eingeloest', deaktiviert: 'Deaktiviert', abgelaufen: 'Abgelaufen' }[s]
}

function badge(s: ReturnType<typeof codeStatus>): React.CSSProperties {
  const colors = {
    aktiv:       { bg: 'rgba(0,151,178,0.1)',    color: 'var(--c-teal)' },
    eingeloest:  { bg: 'rgba(138,157,160,0.15)', color: 'var(--c-gray)' },
    deaktiviert: { bg: 'rgba(201,91,80,0.1)',    color: '#c95b50' },
    abgelaufen:  { bg: 'rgba(201,91,80,0.1)',    color: '#c95b50' },
  }[s]
  return {
    display: 'inline-block', padding: '0.2rem 0.55rem',
    borderRadius: 4, fontSize: '0.7rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    background: colors.bg, color: colors.color,
  }
}

const mainStyle: React.CSSProperties = {
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
  display: 'block', width: '100%', padding: '0.55rem 0.75rem',
  border: '1.5px solid var(--c-lightgray)', borderRadius: 6,
  fontSize: '0.88rem', color: 'var(--c-dark)', outline: 'none',
  background: '#fff', boxSizing: 'border-box',
}

function btnPrimary(disabled: boolean): React.CSSProperties {
  return {
    padding: '0.55rem 1.1rem', background: disabled ? 'rgba(0,151,178,0.4)' : 'var(--c-teal)',
    color: '#fff', fontWeight: 600, fontSize: '0.85rem',
    border: 'none', borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
  }
}

function btnOutline(disabled: boolean): React.CSSProperties {
  return {
    padding: '0.55rem 1.1rem', background: 'transparent',
    color: disabled ? 'var(--c-gray)' : 'var(--c-teal)',
    fontWeight: 600, fontSize: '0.85rem',
    border: `1.5px solid ${disabled ? 'var(--c-lightgray)' : 'var(--c-teal)'}`,
    borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
  }
}

function tabBtn(active: boolean): React.CSSProperties {
  return {
    padding: '0.45rem 1rem', fontSize: '0.78rem',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--c-teal)' : 'var(--c-gray)',
    background: 'none', border: 'none',
    borderBottom: `2px solid ${active ? 'var(--c-teal)' : 'transparent'}`,
    marginBottom: '-2px', cursor: 'pointer',
  }
}

function rowStyle(status: string): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
    padding: '0.7rem 1rem',
    background: status === 'deaktiviert' || status === 'abgelaufen' ? '#f7f7f5' : '#fff',
    border: '1px solid var(--c-lightgray)', borderRadius: 8,
    opacity: status === 'deaktiviert' ? 0.7 : 1,
  }
}

const metaLabel: React.CSSProperties = {
  fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--c-gray)', marginBottom: '0.15rem',
}

const editableCell: React.CSSProperties = {
  fontSize: '0.82rem', color: 'var(--c-dark)', cursor: 'pointer',
  borderBottom: '1px dashed var(--c-lightgray)', paddingBottom: '1px',
  minHeight: '1.2em',
}

const inlineInput: React.CSSProperties = {
  fontSize: '0.82rem', color: 'var(--c-dark)',
  border: '1.5px solid var(--c-teal)', borderRadius: 4,
  padding: '0.15rem 0.4rem', outline: 'none', background: '#fff',
  width: '100%', boxSizing: 'border-box',
}

function iconBtn(active: boolean): React.CSSProperties {
  return {
    padding: '0.1rem 0.35rem', fontSize: '0.75rem',
    background: active ? 'rgba(0,151,178,0.1)' : 'transparent',
    color: active ? 'var(--c-teal)' : 'var(--c-gray)',
    border: `1px solid ${active ? 'var(--c-teal)' : 'var(--c-lightgray)'}`,
    borderRadius: 4, cursor: 'pointer',
  }
}

function toggleBtn(active: boolean): React.CSSProperties {
  return {
    padding: '0.25rem 0.6rem', fontSize: '0.72rem', fontWeight: 600,
    background: active ? 'rgba(201,91,80,0.08)' : 'rgba(0,151,178,0.08)',
    color: active ? '#c95b50' : 'var(--c-teal)',
    border: `1px solid ${active ? 'rgba(201,91,80,0.25)' : 'rgba(0,151,178,0.25)'}`,
    borderRadius: 5, cursor: 'pointer',
  }
}

const delBtn: React.CSSProperties = {
  padding: '0.25rem 0.5rem', fontSize: '0.72rem',
  background: 'transparent', color: 'var(--c-gray)',
  border: '1px solid var(--c-lightgray)',
  borderRadius: 5, cursor: 'pointer',
}
