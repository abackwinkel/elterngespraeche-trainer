'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const APP_NAME = 'elterngespraechstrainer'

// EGT hat kein --c-yellow-Token; warmes Gold passend zum Teal-Theme.
const STAR = '#E0A82E'

type SendState = 'idle' | 'sending' | 'done' | 'error'

export default function FeedbackButton() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [state, setState] = useState<SendState>('idle')

  // Nur für eingeloggte Nutzer anzeigen (RLS erlaubt Insert nur authenticated)
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user)
    })
  }, [])

  function close() {
    setOpen(false)
    // kurz verzögert zurücksetzen, damit das Schließen nicht „springt"
    setTimeout(() => {
      setState('idle')
      setMessage('')
      setRating(0)
      setHover(0)
    }, 200)
  }

  async function submit() {
    if (!message.trim() || state === 'sending') return
    setState('sending')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('feedback').insert({
      app: APP_NAME,
      page: window.location.pathname,
      message: message.trim(),
      rating: rating || null,
      user_email: user?.email ?? null,
      user_id: user?.id ?? null,
      user_agent: navigator.userAgent,
    })
    if (error) {
      setState('error')
      return
    }
    setState('done')
    setMessage('')
    setRating(0)
    setHover(0)
    setTimeout(close, 1600)
  }

  if (!loggedIn) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={triggerBtn}
        aria-label="Feedback geben"
      >
        <span aria-hidden style={{ fontSize: '1rem' }}>💬</span>
        Feedback
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Feedback geben"
          style={overlay}
          onClick={close}
        >
          <div style={card} onClick={(e) => e.stopPropagation()}>
            <h3 style={h3}>Dein Feedback</h3>
            <p style={hint}>
              Dein Feedback wird gespeichert, um die App zu verbessern.
              Bitte keine sensiblen personenbezogenen Daten eingeben.
            </p>

            <div style={{ marginBottom: '0.9rem' }}>
              <div style={label}>Bewertung (optional)</div>
              <div
                style={{ display: 'flex', gap: '0.15rem' }}
                onMouseLeave={() => setHover(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n === rating ? 0 : n)}
                    onMouseEnter={() => setHover(n)}
                    aria-label={`${n} von 5 Sternen`}
                    style={starBtn(n <= (hover || rating))}
                  >
                    {n <= (hover || rating) ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '0.9rem' }}>
              <label style={label} htmlFor="feedback-message">Nachricht</label>
              <textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Was möchtest du uns mitteilen?"
                style={textarea}
                autoFocus
              />
            </div>

            {state === 'error' && (
              <p style={{ ...msg, color: '#c95b50' }}>
                Fehler – bitte erneut versuchen.
              </p>
            )}
            {state === 'done' && (
              <p style={{ ...msg, color: 'var(--c-teal)' }}>
                Danke für dein Feedback!
              </p>
            )}

            <div style={actions}>
              <button onClick={close} style={btnOutline} type="button">
                Abbrechen
              </button>
              <button
                onClick={submit}
                disabled={state === 'sending' || state === 'done' || !message.trim()}
                style={btnPrimary(state === 'sending' || state === 'done' || !message.trim())}
                type="button"
              >
                {state === 'sending' ? 'Senden …' : 'Absenden'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ---- Styles ----

const triggerBtn: React.CSSProperties = {
  position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
  display: 'flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.6rem 1rem', borderRadius: 999,
  background: 'var(--c-teal)', color: '#fff',
  fontFamily: 'var(--font-inter, sans-serif)',
  fontSize: '0.85rem', fontWeight: 600,
  border: 'none', cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(15,123,108,0.35)',
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 10000,
  background: 'rgba(26,26,26,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '1rem',
}

const card: React.CSSProperties = {
  background: '#fff', padding: '1.75rem', borderRadius: 12,
  width: 'min(440px, 92vw)',
  boxShadow: '0 12px 40px rgba(26,26,26,0.25)',
  fontFamily: 'var(--font-inter, sans-serif)',
}

const h3: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '1.6rem', fontWeight: 400, color: 'var(--c-dark)',
  margin: '0 0 0.5rem',
}

const hint: React.CSSProperties = {
  fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--c-gray)',
  margin: '0 0 1.1rem',
}

const label: React.CSSProperties = {
  display: 'block', marginBottom: '0.35rem',
  fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'var(--c-gray)',
}

function starBtn(active: boolean): React.CSSProperties {
  return {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '0 0.05rem', fontSize: '1.5rem', lineHeight: 1,
    color: active ? STAR : 'var(--c-lightgray)',
  }
}

const textarea: React.CSSProperties = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  padding: '0.6rem 0.75rem', resize: 'vertical',
  border: '1.5px solid var(--c-lightgray)', borderRadius: 6,
  fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--c-dark)',
  outline: 'none', background: '#fff',
}

const msg: React.CSSProperties = {
  fontSize: '0.82rem', fontWeight: 600, margin: '0 0 0.6rem',
}

const actions: React.CSSProperties = {
  display: 'flex', gap: '0.6rem', justifyContent: 'flex-end',
  marginTop: '0.5rem',
}

const btnOutline: React.CSSProperties = {
  padding: '0.55rem 1.1rem', background: 'transparent',
  color: 'var(--c-gray)', fontWeight: 600, fontSize: '0.85rem',
  border: '1.5px solid var(--c-lightgray)', borderRadius: 6,
  cursor: 'pointer', fontFamily: 'inherit',
}

function btnPrimary(disabled: boolean): React.CSSProperties {
  return {
    padding: '0.55rem 1.1rem',
    background: disabled ? 'rgba(15,123,108,0.4)' : 'var(--c-teal)',
    color: '#fff', fontWeight: 600, fontSize: '0.85rem',
    border: 'none', borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
  }
}
