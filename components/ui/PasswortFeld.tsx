'use client'

// Passwortfeld mit Augen-Knopf (Antje, 25.09.2026 – derselbe Baustein wie im
// Manuskript-Kompass, dort src/lib/passwortFeld.jsx). Anklicken zeigt das
// Passwort, noch einmal anklicken verbirgt es wieder.
//
// Er fasst die Anmeldung NICHT an: Wert, onChange, placeholder, autoComplete,
// style, onFocus und onBlur gehen unverändert an das <input>. Der Knopf
// schaltet nur `type` zwischen "password" und "text" um.
//
// 🔴 Der Cursor springt beim Umschalten an den Anfang – gemessen im Kompass
// (Chromium, 25.09.2026): „Probe“ getippt, aufs Auge geklickt, „-Weiter“
// getippt, im Feld stand „-WeiterProbe“. Beim Registrieren wäre das ein
// anderes Passwort als das, das man zu tippen glaubt. Chromium baut das Feld
// nach dem Typwechsel beim NÄCHSTEN LAYOUT neu auf und setzt dabei die Auswahl
// auf 0 – nach dem React-Effekt. Deshalb: Auswahl vor dem Wechsel merken, im
// Layout-Effekt das Layout erzwingen (offsetWidth), dann zurücksetzen.
// onMouseDown am Knopf hält den Fokus im Feld: wer mitten im Tippen nachsieht,
// tippt danach weiter.
//
// spellCheck, autoCapitalize und autoCorrect: ein sichtbares Passwort darf
// weder an die Rechtschreibprüfung des Browsers gehen noch auf dem Handy einen
// großen Anfangsbuchstaben oder eine „Verbesserung“ bekommen.

import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ChangeEvent, FocusEvent } from 'react'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
  style?: CSSProperties
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export default function PasswortFeld({ value, onChange, placeholder, autoComplete, style, onFocus, onBlur }: Props) {
  const [sichtbar, setSichtbar] = useState(false)
  const feldRef = useRef<HTMLInputElement>(null)
  const auswahlRef = useRef<[number, number] | null>(null)
  const text = sichtbar ? 'Passwort verbergen' : 'Passwort anzeigen'

  function umschalten() {
    const f = feldRef.current
    auswahlRef.current =
      f && document.activeElement === f && f.selectionStart != null && f.selectionEnd != null
        ? [f.selectionStart, f.selectionEnd]
        : null
    setSichtbar(s => !s)
  }

  useLayoutEffect(() => {
    const f = feldRef.current
    const a = auswahlRef.current
    auswahlRef.current = null
    if (!f || !a) return
    void f.offsetWidth
    try { f.setSelectionRange(a[0], a[1]) } catch { /* Feldart ohne Auswahl – dann bleibt es beim Browser */ }
  }, [sichtbar])

  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={feldRef}
        type={sichtbar ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        style={{ ...style, paddingRight: '2.9rem' }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={umschalten}
        onMouseDown={e => e.preventDefault()}
        aria-label={text}
        title={text}
        style={augeStyle}
      >
        {sichtbar ? <AugeZu /> : <AugeOffen />}
      </button>
    </div>
  )
}

const augeStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  width: '2.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  background: 'transparent',
  border: 'none',
  borderRadius: '0 6px 6px 0',
  color: 'rgba(255,255,255,0.55)',
  cursor: 'pointer',
}

function AugeOffen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function AugeZu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M9.9 5.2A9.8 9.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.8 3.7" />
      <path d="M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="M2 2l20 20" />
    </svg>
  )
}
