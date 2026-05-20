'use client'

import { useState } from 'react'

type BetaCode = {
  code: string
  note: string | null
  used_by: string | null
  used_at: string | null
  created_at: string
}

export default function AdminClient({ initialCodes }: { initialCodes: BetaCode[] }) {
  const [codes, setCodes] = useState<BetaCode[]>(initialCodes)
  const [note, setNote] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  async function handleGenerate() {
    setGenerating(true)
    const res = await fetch('/api/admin/codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    })
    const data = await res.json()
    setGenerating(false)
    if (data.code) {
      const newCode: BetaCode = {
        code: data.code,
        note: note || null,
        used_by: null,
        used_at: null,
        created_at: new Date().toISOString(),
      }
      setCodes(prev => [newCode, ...prev])
      setNote('')
    }
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 1800)
  }

  const unused = codes.filter(c => !c.used_by)
  const used = codes.filter(c => c.used_by)

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Admin – Zugangscodes</h1>
      <p style={metaStyle}>{unused.length} offen · {used.length} verwendet</p>

      {/* Generator */}
      <div style={cardStyle}>
        <h2 style={h2Style}>Neuen Code generieren</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Notiz (optional) – z.B. «Maria Muster, Testgruppe A»"
            style={inputStyle}
            onKeyDown={e => e.key === 'Enter' && !generating && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            style={btnStyle(generating)}
          >
            {generating ? 'Wird erstellt …' : '+ Code erstellen'}
          </button>
        </div>
      </div>

      {/* Codes-Tabelle */}
      {codes.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '2rem' }}>Noch keine Codes.</p>
      ) : (
        <div style={cardStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Code', 'Notiz', 'Erstellt', 'Verwendet am'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
                <th style={thStyle} />
              </tr>
            </thead>
            <tbody>
              {codes.map(c => (
                <tr key={c.code} style={{ opacity: c.used_by ? 0.45 : 1 }}>
                  <td style={tdStyle}>
                    <span style={codeChipStyle(!!c.used_by)}>{c.code}</span>
                  </td>
                  <td style={tdStyle}>{c.note ?? <span style={{ color: 'rgba(255,255,255,0.3)' }}>–</span>}</td>
                  <td style={tdStyle}>{formatDate(c.created_at)}</td>
                  <td style={tdStyle}>
                    {c.used_at
                      ? formatDate(c.used_at)
                      : <span style={{ color: 'rgba(255,255,255,0.3)' }}>–</span>}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    {!c.used_by && (
                      <button
                        onClick={() => copyCode(c.code)}
                        style={copyBtnStyle}
                      >
                        {copied === c.code ? '✓ Kopiert' : 'Kopieren'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: '3rem 2rem',
  maxWidth: 860,
  margin: '0 auto',
  color: '#fff',
}

const h1Style: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '2.4rem',
  fontWeight: 400,
  margin: '0 0 0.25rem',
}

const metaStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '2rem',
}

const h2Style: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  margin: '0 0 1rem',
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '1.5rem',
  marginBottom: '1.5rem',
  overflowX: 'auto',
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 220,
  padding: '0.7rem 1rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: 6,
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: '0.7rem 1.25rem',
    background: disabled ? 'rgba(0,151,178,0.4)' : 'var(--c-teal)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.875rem',
    border: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
  }
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  padding: '0.4rem 0.75rem',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
}

const tdStyle: React.CSSProperties = {
  padding: '0.65rem 0.75rem',
  fontSize: '0.875rem',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  verticalAlign: 'middle',
}

function codeChipStyle(used: boolean): React.CSSProperties {
  return {
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: used ? 'rgba(255,255,255,0.35)' : 'var(--c-teal)',
  }
}

const copyBtnStyle: React.CSSProperties = {
  padding: '0.3rem 0.75rem',
  background: 'rgba(0,151,178,0.15)',
  border: '1px solid rgba(0,151,178,0.3)',
  borderRadius: 5,
  color: 'var(--c-teal)',
  fontSize: '0.78rem',
  fontWeight: 600,
  cursor: 'pointer',
}
