'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password || loading) return

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message ?? 'Registrierung fehlgeschlagen.')
      return
    }

    if (data.session) {
      // Session sofort aktiv (E-Mail-Bestätigung deaktiviert)
      router.push('/')
      router.refresh()
    } else {
      // E-Mail-Bestätigung aktiv
      setDone(true)
    }
  }

  if (done) {
    return (
      <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
        <h2 style={headlineStyle}>Fast geschafft!</h2>
        <p style={subStyle}>
          Wir haben dir eine Bestätigungs-E-Mail geschickt. Bitte klicke auf den Link darin, um dein Konto zu aktivieren.
        </p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 440 }}>
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={eyebrowStyle}>Elterngespräche trainieren mit KI</div>
        <h1 style={headlineStyle}>7 Tage kostenlos testen.</h1>
        <p style={subStyle}>
          Ohne Kreditkarte. Kein Abo, das automatisch startet. Registriere dich jetzt und trainiere sofort.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>E-Mail-Adresse</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="deine@email.de"
            autoFocus
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--c-teal)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Passwort</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mindestens 6 Zeichen"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--c-teal)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
          />
        </div>

        {error && (
          <div style={{
            marginBottom: '1rem', padding: '0.75rem 1rem',
            background: 'rgba(201,91,80,0.15)', border: '1px solid rgba(201,91,80,0.4)',
            borderRadius: 6, fontSize: '0.875rem', color: '#f08080',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={btnStyle(loading)}>
          {loading ? 'Konto wird erstellt …' : 'Jetzt kostenlos starten'}
        </button>

        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '0.75rem' }}>
          7 Tage Vollzugriff. Keine Kreditkarte. Kein automatisches Abo.
        </p>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)' }}>
        Bereits registriert?{' '}
        <Link href="/auth/login" style={{ color: 'var(--c-teal)', textDecoration: 'none' }}>
          Anmelden
        </Link>
      </p>
    </div>
  )
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '0.72rem', fontWeight: 600,
  letterSpacing: '0.22em', textTransform: 'uppercase',
  color: 'var(--c-teal-light, #15a08a)', marginBottom: '0.75rem',
}

const headlineStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '2.2rem', fontWeight: 400,
  color: '#fff', lineHeight: 1.15, margin: 0,
}

const subStyle: React.CSSProperties = {
  marginTop: '1rem', fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '0.4rem',
  fontSize: '0.78rem', fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
}

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: 6, fontSize: '1rem', color: '#fff',
  outline: 'none', transition: 'border-color 0.15s',
  boxSizing: 'border-box',
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    display: 'block', width: '100%',
    padding: '0.875rem 1rem',
    background: disabled ? 'rgba(15,123,108,0.4)' : 'var(--c-teal)',
    color: '#fff', fontWeight: 600, fontSize: '0.9rem',
    border: 'none', borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s',
  }
}
