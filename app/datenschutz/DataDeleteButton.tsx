'use client'

import { useState } from 'react'

// Ruft /api/daten/loeschen auf. Umfang und Texte müssen zur Route und zu
// app/datenschutz/page.tsx passen: Gesprächsverläufe, Quiz-Ergebnisse, gespeicherte Fälle.
export default function DataDeleteButton() {
  const [status, setStatus] = useState<'idle' | 'confirm' | 'loading' | 'done' | 'error' | 'login'>('idle')

  async function handleDelete() {
    setStatus('loading')
    try {
      const res = await fetch('/api/daten/loeschen', { method: 'DELETE' })
      if (res.status === 401) {
        setStatus('login')
        return
      }
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p style={{ fontSize: '0.82rem', color: 'var(--c-teal)', fontWeight: 500 }}>
        Deine Gesprächsverläufe, Quiz-Ergebnisse und gespeicherten Fälle sind gelöscht.
      </p>
    )
  }

  if (status === 'loading') {
    return (
      <p style={{ fontSize: '0.82rem', color: '#444' }}>
        Wird gelöscht&nbsp;…
      </p>
    )
  }

  if (status === 'confirm') {
    return (
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.82rem', color: '#444' }}>
          Wirklich alle Gesprächsverläufe, Quiz-Ergebnisse und gespeicherten Fälle löschen? Das lässt sich nicht rückgängig machen.
        </span>
        <button
          onClick={handleDelete}
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
        Übungsdaten löschen
      </button>
      {status === 'login' && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#444' }}>
          Bitte melde dich zuerst an&nbsp;– gelöscht werden die Daten des angemeldeten Kontos.{' '}
          <a href="/auth/login" style={{ color: 'var(--c-teal)' }}>Zur Anmeldung</a>
        </p>
      )}
      {status === 'error' && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#dc2626' }}>
          Löschen fehlgeschlagen. Bitte versuch es noch einmal oder schreib an antje@antje-backwinkel.de.
        </p>
      )}
    </div>
  )
}
