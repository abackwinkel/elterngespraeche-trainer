'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration } from '@/types'
import GespraechsInterface from '@/components/gespraech/GespraechsInterface'

type FixesFall = {
  id: string
  titel: string
  beschreibung: string
  kontext: string
  config: GespraechsKonfiguration
}

const FAELLE: FixesFall[] = [
  {
    id: 'zeugnis',
    titel: 'Schlechtes Zeugnis – Gymnasium',
    beschreibung: 'Gespräch mit einem Vater, dessen Sohn mehrere Fünfen erhalten hat. Er macht Druck und sucht die Schuld bei der Lehrkraft.',
    kontext: 'Klasse 8, Leistungsabfall, defensiv-aggressiver Vater mit hohem Erwartungsdruck',
    config: {
      schultyp: 'gymnasium',
      klassenstufe: '7-8',
      anlass: 'leistungsabfall',
      familie: 'leistungsdruck',
      elterntyp: 'defensiv',
      schwierigkeit: 'gegenwind',
      person1: 'Vater',
      kindName: 'L.',
      kindGeschlecht: 'keine-angabe',
      gespraechsinitiative: 'schule',
      situationText: 'Das Zeugnis enthält mehrere Fünfen in Hauptfächern. Der Vater ist deutlich unter Druck – er hat hohe Erwartungen an das Kind und stellt die Bewertungen der Lehrkraft in Frage.',
      sprachbarriere: 'deutsch',
    },
  },
  {
    id: 'verhalten',
    titel: 'Verhaltensauffälligkeit – Grundschule',
    beschreibung: 'Ein Kind aus einer Scheidungsfamilie stört zunehmend den Unterricht. Die Mutter ist aufgebracht und defensiv.',
    kontext: 'Klasse 3/4, Verhalten, aufgebrachte alleinerziehende Mutter',
    config: {
      schultyp: 'grundschule',
      klassenstufe: '3-4',
      anlass: 'verhalten',
      familie: 'scheidung',
      elterntyp: 'aggressiv',
      schwierigkeit: 'gegenwind',
      person1: 'Mutter',
      kindName: 'T.',
      kindGeschlecht: 'keine-angabe',
      gespraechsinitiative: 'schule',
      situationText: 'Das Kind stört zunehmend den Unterricht und provoziert andere Kinder. Die Mutter fühlt sich angegriffen – sie ist in einer schwierigen Lebenssituation und wirkt gereizt.',
      sprachbarriere: 'deutsch',
    },
  },
  {
    id: 'lernschwaeche',
    titel: 'Lernschwäche klären – Grundschule',
    beschreibung: 'Erste Hinweise auf Legasthenie. Die Eltern sind verunsichert und bisher nicht informiert. Das Gespräch dient der Aufklärung.',
    kontext: 'Klasse 1/2, Leistungsabfall, zurückhaltendes Elternpaar',
    config: {
      schultyp: 'grundschule',
      klassenstufe: '1-2',
      anlass: 'leistungsabfall',
      familie: 'keine',
      elterntyp: 'passiv',
      schwierigkeit: 'ruhige-see',
      person1: 'Mutter',
      person2: 'Vater',
      kindName: 'M.',
      kindGeschlecht: 'keine-angabe',
      gespraechsinitiative: 'schule',
      situationText: 'Erste Hinweise auf Legasthenie oder Lernschwäche. Die Eltern sind verunsichert, bisher nicht informiert. Das Gespräch dient der Aufklärung über mögliche nächste Schritte – kein Vorwurf, kein Druck.',
      sprachbarriere: 'deutsch',
    },
  },
  {
    id: 'schulmuedigkeit',
    titel: 'Schulmüdigkeit – Mittelschule',
    beschreibung: 'Eine alleinerziehende Mutter ist erschöpft und am Limit. Ihr Kind fehlt regelmäßig. Sie braucht Unterstützung, nicht Vorwürfe.',
    kontext: 'Klasse 7/8, Fehlzeiten, alleinerziehende Mutter, emotional überwältigt',
    config: {
      schultyp: 'mittelschule',
      klassenstufe: '7-8',
      anlass: 'verhalten',
      familie: 'alleinerziehend',
      elterntyp: 'weinend',
      schwierigkeit: 'gegenwind',
      person1: 'Mutter',
      kindName: 'J.',
      kindGeschlecht: 'keine-angabe',
      gespraechsinitiative: 'schule',
      situationText: 'Das Kind fehlt regelmäßig, zeigt Schulverweigerungstendenzen. Die Mutter ist alleinerziehend, erschöpft und fühlt sich mit der Situation überfordert. Sie braucht Unterstützung und Orientierung, keine Verurteilung.',
      sprachbarriere: 'deutsch',
    },
  },
]

export default function ReferendarePage() {
  const [activeConfig, setActiveConfig] = useState<GespraechsKonfiguration | null>(null)

  if (activeConfig) {
    return (
      <div className="p-6 md:p-10 h-full">
        <GespraechsInterface
          config={activeConfig}
          fallVorherGespeichert={false}
          onNeustart={() => setActiveConfig(null)}
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
          Referendare
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: '0 0 0.75rem',
        }}>
          Vorgegebene Fallbeispiele
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', margin: 0, maxWidth: '56ch', lineHeight: 1.6 }}>
          Springe direkt ins Gespräch – ohne Konfiguration. Jeder Fall ist realistisch vorbereitet und eignet sich besonders für den ersten Einstieg.
        </p>
      </header>

      <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAELLE.map((fall, i) => (
            <div
              key={fall.id}
              style={{
                background: '#fff', borderRadius: '10px',
                border: '1px solid var(--c-lightgray)',
                padding: '1.5rem 2rem',
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
              }}
            >
              <div style={{
                flexShrink: 0,
                width: '2.25rem', height: '2.25rem',
                background: 'rgba(15,123,108,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.1rem', fontWeight: 600,
                color: 'var(--c-teal)',
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontSize: '1.35rem', fontWeight: 600,
                  color: 'var(--c-dark)', margin: '0 0 0.4rem',
                }}>
                  {fall.titel}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
                  {fall.beschreibung}
                </p>
                <p style={{
                  fontSize: '0.775rem', color: 'var(--c-teal)',
                  background: 'rgba(15,123,108,0.06)', borderRadius: '4px',
                  display: 'inline-block', padding: '0.15rem 0.6rem',
                  margin: '0 0 1rem', lineHeight: 1.6,
                }}>
                  {fall.kontext}
                </p>
                <div>
                  <button
                    onClick={() => setActiveConfig(fall.config)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.55rem 1.25rem',
                      background: 'var(--c-teal)', color: '#fff',
                      border: 'none', borderRadius: '8px',
                      fontSize: '0.875rem', fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = 'var(--c-teal-light)' }}
                    onMouseOut={e => { e.currentTarget.style.background = 'var(--c-teal)' }}
                  >
                    🎭 Gespräch starten
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
