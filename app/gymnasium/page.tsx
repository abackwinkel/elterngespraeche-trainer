import Link from 'next/link'
import Sidebar from '@/components/layout/Sidebar'

const MODULE = [
  {
    href: '/gymnasium/gespraech',
    icon: '🎭',
    label: 'Gesprächsschmiede',
    desc: 'KI-simulierte Eltern, Sofortfeedback, Gesamtreflexion',
    highlight: true,
  },
  {
    href: '/gymnasium/info',
    icon: '📖',
    label: 'Grundlagen & Info',
    desc: 'Gesprächsführung, Vorbereitung, Körpersprache, Recht, schwierige Situationen',
  },
  {
    href: '/gymnasium/quiz',
    icon: '❓',
    label: 'Quiz',
    desc: 'Gesprächsphasen, GFK, Rechtswissen, Reaktionen testen',
  },
  {
    href: '/gymnasium/koerpersignale',
    icon: '👁',
    label: 'Körpersignale',
    desc: 'Signale erkennen und angemessen reagieren',
  },
  {
    href: '/gymnasium/nachbereitung',
    icon: '🌿',
    label: 'Nachbereitung & Selfcare',
    desc: 'Protokoll, Folgeschritte, Selbstfürsorge nach dem Gespräch',
  },
]

export default function GymnasiumPage() {
  return (
    <div className="flex h-screen overflow-hidden page-with-sidebar" style={{ background: 'var(--c-offwhite)' }}>
      <Sidebar />

      <div className="flex-1 min-w-0 overflow-y-auto">
        <header style={{
          background: 'var(--c-dark)',
          padding: '2rem 2rem 2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <p style={{
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--c-teal-light)',
            marginBottom: '0.5rem', marginTop: 0,
          }}>
            Gymnasium
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
          }}>
            Deine Trainingsmodule
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: '52ch', lineHeight: 1.6 }}>
            Alle Module für die Vorbereitung auf Elterngespräche am Gymnasium – von der Theorie bis zur Praxis.
          </p>
        </header>

        <main style={{ padding: '2rem 2rem 4rem', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {MODULE.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="module-card card-lift"
                style={{
                  display: 'block', textDecoration: 'none',
                  background: '#fff', borderRadius: '10px',
                  border: mod.highlight ? '2px solid var(--c-teal)' : '1px solid var(--c-lightgray)',
                  padding: '1.5rem',
                }}
              >
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.6rem', lineHeight: 1 }}>
                  {mod.icon}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontSize: '1.3rem', fontWeight: 600,
                  color: 'var(--c-dark)', margin: '0 0 0.35rem',
                }}>
                  {mod.label}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                  {mod.desc}
                </p>
                {mod.highlight && (
                  <span style={{
                    display: 'inline-block', marginTop: '0.75rem',
                    fontSize: '0.7rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--c-teal)', padding: '0.2rem 0.65rem',
                    background: 'rgba(15,123,108,0.08)', borderRadius: '4px',
                  }}>
                    Kernfeature
                  </span>
                )}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
