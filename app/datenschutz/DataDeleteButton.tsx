'use client'

import { useState } from 'react'

export default function DataDeleteButton() {
  const [status, setStatus] = useState<'idle' | 'confirm' | 'loading' | 'done' | 'error'>('idle')

  async function handleDelete() {
    setStatus('loading')
    try {
      const [r1, r2] = await Promise.all([
        fetch('/api/sessions/delete-all', { method: 'DELETE' }),
        fetch('/api/quiz-results/delete-all', { method: 'DELETE' }),
      ])
      if (!r1.ok || !r2.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p style={{ fontSize: '0.82rem', color: 'var(--c-teal)', fontWeight: 500 }}>
        Alle deine Sessions und Quiz-Ergebnisse wurden gelöscht.
      </p>
    )
  }

  if (status === 'confirm') {
    return (
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.82rem', color: '#444' }}>
          Wirklich alle Sessions löschen? Das kann nicht rückgängig gemacht werden.
        </span>
        <button
          onClick={handleDelete}
          disabled={false}
          style={{
            padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.78rem',
            fontWeight: 600, background: '#dc2626', color: '#fff',
            border: 'none', cursor: 'pointer',
          }}
        >
          Ja, löschen
        </button>
        <button
          onClick={() => setStatus('idle')}
          style={{
            padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.78rem',
            fontWeight: 500, background: 'transparent', color: 'var(--c-gray)',
            border: '1px solid var(--c-lightgray)', cursor: 'pointer',
          }}
        >
          Abbrechen
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setStatus('confirm')}
        style={{
          padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.78rem',
          fontWeight: 600, background: 'transparent', color: 'var(--c-dark)',
          border: '1.5px solid var(--c-lightgray)', cursor: 'pointer',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseOver={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#dc2626' }}
        onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--c-lightgray)'; e.currentTarget.style.color = 'var(--c-dark)' }}
      >
        Sessions löschen
      </button>
      {status === 'error' && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#dc2626' }}>
          Löschen fehlgeschlagen. Bitte versuche es erneut oder schreibe an antje@antje-backwinkel.de.
        </p>
      )}
    </div>
  )
}
