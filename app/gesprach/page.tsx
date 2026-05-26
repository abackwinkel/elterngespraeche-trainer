'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration, Schultyp } from '@/types'
import KonfigurationsForm from '@/components/gespraech/KonfigurationsForm'
import GespraechsInterface from '@/components/gespraech/GespraechsInterface'

type StartData = { config: GespraechsKonfiguration; fallGespeichert: boolean }

const SCHULTYPEN: { id: Schultyp; label: string; beschreibung: string }[] = [
  { id: 'gymnasium',    label: 'Gymnasium',    beschreibung: 'Klassen 5–13, G8/G9, Leistungsdruck und Oberstufenplanung' },
  { id: 'realschule',   label: 'Realschule',   beschreibung: 'Klassen 5–10, Übergang Schule/Beruf, Kurswahl' },
  { id: 'gesamtschule', label: 'Gesamtschule', beschreibung: 'Klassen 5–10 (+Oberstufe), differenziertes Lernen, Kurswechsel' },
  { id: 'grundschule',  label: 'Grundschule',  beschreibung: 'Klassen 1–4, Übergangsempfehlung, frühe Elternkommunikation' },
  { id: 'mittelschule', label: 'Mittelschule', beschreibung: 'Klassen 5–10, Berufsvorbereitung, Abschlussperspektive' },
]

export default function GespraechPage() {
  const [schultyp, setSchultyp] = useState<Schultyp | null>(null)
  const [startData, setStartData] = useState<StartData | null>(null)

  if (startData) {
    return (
      <div className="p-6 md:p-10 h-full">
        <GespraechsInterface
          config={startData.config}
          fallVorherGespeichert={startData.fallGespeichert}
          onNeustart={() => { setStartData(null); setSchultyp(null) }}
        />
      </div>
    )
  }

  if (schultyp) {
    return (
      <div className="p-6 md:p-10">
        <button
          onClick={() => setSchultyp(null)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.875rem', color: 'var(--c-gray)',
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            marginBottom: '1.5rem', padding: 0,
          }}
        >
          ← Schultyp wechseln
        </button>
        <KonfigurationsForm
          schultyp={schultyp}
          onStart={(c, fg) => setStartData({ config: c, fallGespeichert: fg })}
        />
      </div>
    )
  }

  return (
    <>
      <header style={{
        background: 'var(--c-header)', padding: '2rem 2rem 2.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--c-teal-light)',
          marginBottom: '0.5rem', marginTop: 0,
        }}>
          Gesprächsschmiede
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: '0 0 0.75rem',
        }}>
          Welchen Schultyp unterrichtest du?
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', margin: 0, maxWidth: '52ch', lineHeight: 1.6 }}>
          Wähle deine Schulform – die KI passt Szenarien, Elterntypen und Klassenstufen entsprechend an.
        </p>
      </header>

      <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {SCHULTYPEN.map(s => (
            <button
              key={s.id}
              onClick={() => setSchultyp(s.id)}
              style={{
                background: '#fff', borderRadius: '10px',
                border: '2px solid var(--c-lightgray)',
                padding: '1.5rem',
                textAlign: 'left', cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'var(--c-teal)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,123,108,0.12)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'var(--c-lightgray)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem', lineHeight: 1 }}>🎭</div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.3rem', fontWeight: 600,
                color: 'var(--c-dark)', margin: '0 0 0.4rem',
              }}>
                {s.label}
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                {s.beschreibung}
              </p>
            </button>
          ))}
        </div>
      </main>
    </>
  )
}
