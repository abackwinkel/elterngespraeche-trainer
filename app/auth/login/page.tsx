'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password || loading) return

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (authError) {
      setError('E-Mail oder Passwort ist nicht korrekt.')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div style={{ width: '100%', maxWidth: 440 }}>
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={eyebrowStyle}>Elterngespräche trainieren mit KI</div>
        <h1 style={headlineStyle}>Willkommen zurück.</h1>
        <p style={subStyle}>Melde dich mit deinen Zugangsdaten an.</p>
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
            placeholder="Dein Passwort"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--c-teal)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
          />
        </div>

        {error && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem 1rem',
            background: 'rgba(201,91,80,0.15)',
            border: '1px solid rgba(201,91,80,0.4)',
            borderRadius: 6,
            fontSize: '0.85rem',
            color: '#f08080',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={btnPrimaryStyle(loading)}>
          {loading ? 'Anmeldung läuft …' : 'Anmelden'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
        Noch kein Konto?{' '}
        <Link href="/auth" style={{ color: 'var(--c-teal)', textDecoration: 'none' }}>
          Kostenlos registrieren
        </Link>
      </p>
    </div>
  )
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'var(--c-teal)',
  marginBottom: '0.75rem',
}

const headlineStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '2.2rem',
  fontWeight: 400,
  color: '#fff',
  lineHeight: 1.15,
  margin: 0,
}

const subStyle: React.CSSProperties = {
  marginTop: '1rem',
  fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.6,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.4rem',
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: 6,
  fontSize: '1rem',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
}

function btnPrimaryStyle(disabled: boolean): React.CSSProperties {
  return {
    display: 'block',
    width: '100%',
    padding: '0.85rem 1rem',
    background: disabled ? 'rgba(0,151,178,0.4)' : 'var(--c-teal)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s',
  }
}
