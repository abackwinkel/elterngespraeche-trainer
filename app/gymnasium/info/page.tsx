import Sidebar from '@/components/layout/Sidebar'

const TABS = [
  { id: 'grundlagen', label: 'Gesprächsführung' },
  { id: 'vorbereitung', label: 'Vorbereitung' },
  { id: 'koerpersprache', label: 'Körpersprache' },
  { id: 'recht', label: 'Rechtliches' },
  { id: 'schwierig', label: 'Schwierige Situationen' },
]

export default function InfoPage() {
  return (
    <div className="flex h-screen overflow-hidden page-with-sidebar" style={{ background: 'var(--c-offwhite)' }}>
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
        <header style={{
          background: 'var(--c-dark)', padding: '2rem 2rem 2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <p style={{
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--c-teal-light)',
            marginBottom: '0.5rem', marginTop: 0,
          }}>
            Gymnasium · Info
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
          }}>
            Grundlagen & Infoseiten
          </h1>
        </header>

        {/* Tab-Navigation */}
        <div style={{
          background: '#fff', borderBottom: '1px solid var(--c-lightgray)',
          padding: '0 2rem',
          display: 'flex', gap: '0', overflowX: 'auto',
        }}>
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              style={{
                padding: '0.875rem 1.25rem',
                fontSize: '0.875rem', fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? 'var(--c-teal)' : 'rgba(0,0,0,0.5)',
                background: 'none', border: 'none',
                borderBottom: i === 0 ? '2px solid var(--c-teal)' : '2px solid transparent',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
          {/* Sprint 2: Inhalte für alle 5 Tabs */}
          <div style={{
            background: '#fff', borderRadius: '10px',
            border: '1px solid var(--c-lightgray)',
            padding: '2rem',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontSize: '1.6rem', fontWeight: 600,
              color: 'var(--c-dark)', margin: '0 0 1rem',
            }}>
              Gesprächsführung – Grundlagen
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
              Ein gutes Elterngespräch beginnt lange vor dem eigentlichen Termin. Die Lehrkraft übernimmt die Gesprächsführung – nicht autoritär, sondern durch klare Struktur und echte Gesprächsbereitschaft.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
              Die fünf Gesprächsphasen
            </h3>
            <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
              {[
                ['Begrüßung & Ankommen', 'Atmosphäre schaffen, kurzes Small Talk, Danke für das Kommen.'],
                ['Themeneinführung', 'Anlass des Gesprächs klar und wertfrei benennen. Das Kind in den Mittelpunkt stellen.'],
                ['Dialog & Zuhören', 'Elternperspektive aktiv hören. Paraphrasieren. Offene Fragen stellen.'],
                ['Ergebnis & Vereinbarungen', 'Konkrete, umsetzbare Schritte festhalten. Wer macht was bis wann?'],
                ['Abschluss', 'Zusammenfassung, Dank, nächster Kontakt oder Termin.'],
              ].map(([title, text]) => (
                <li key={title} style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--c-dark)' }}>{title}:</strong>{' '}
                  <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>{text}</span>
                </li>
              ))}
            </ol>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
              Aktives Zuhören
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
              Aktives Zuhören bedeutet: Nicht nur hören, was gesagt wird – sondern auch, was dahintersteckt. Paraphrasiere das Gesagte: „Wenn ich Sie richtig verstehe, meinen Sie..." Das gibt Eltern das Gefühl, wirklich gehört zu werden, und schafft Vertrauen.
            </p>

            <div style={{
              background: 'rgba(15,123,108,0.06)', border: '1px solid rgba(15,123,108,0.15)',
              borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '1.5rem',
            }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--c-dark)', margin: 0, lineHeight: 1.6 }}>
                <strong>Wichtig:</strong> Das Kind steht im Mittelpunkt – nicht die Eltern-Lehrkraft-Beziehung, nicht der Leistungsvergleich. Jede Aussage kann an der Frage gemessen werden: „Was hilft diesem Kind am meisten?"
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.3)', marginTop: '1.5rem', textAlign: 'center' }}>
            Weitere Inhalte (Vorbereitung, Körpersprache, Rechtliches, Schwierige Situationen) folgen in Sprint 2.
          </p>
        </main>
      </div>
    </div>
  )
}
