import Link from 'next/link'

const HERO = {
  href: '/gymnasium/gespraech',
  icon: '🎭',
  label: 'Gesprächsschmiede',
  desc: 'Das Kernfeature: Trainiere mit KI-simulierten Eltern, erhalte Sofortfeedback nach jeder Antwort und eine Gesamtreflexion am Ende. Wähle Elterntyp, Schwierigkeit und Gesprächsanlass frei.',
}

const MODULE = [
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
    <>
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
          fontSize: 'clamp(2rem, 4vw, 2.77rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
        }}>
          Deine Trainingsmodule
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: '52ch', lineHeight: 1.6 }}>
          Alle Module für die Vorbereitung auf Elterngespräche am Gymnasium – von der Theorie bis zur Praxis.
        </p>
      </header>

      <main style={{ padding: '2rem 2rem 4rem', maxWidth: 960, margin: '0 auto' }}>
        {/* Hero: Gesprächsschmiede */}
        <Link
          href={HERO.href}
          style={{
            display: 'block', textDecoration: 'none',
            background: 'var(--c-dark)',
            borderRadius: '12px',
            border: '2px solid var(--c-teal)',
            padding: '2rem 2.25rem',
            marginBottom: '1.75rem',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="card-lift"
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, var(--c-teal), var(--c-teal-light))',
          }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0, marginTop: '0.2rem' }}>
              {HERO.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontSize: '1.77rem', fontWeight: 600,
                  color: '#fff', margin: 0,
                }}>
                  {HERO.label}
                </h2>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--c-teal-light)', background: 'rgba(15,160,138,0.15)',
                  border: '1px solid rgba(15,160,138,0.3)',
                  borderRadius: '4px', padding: '0.2rem 0.6rem',
                }}>
                  Kernfeature
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6, maxWidth: '60ch' }}>
                {HERO.desc}
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                marginTop: '1.25rem', color: 'var(--c-teal-light)',
                fontSize: '0.875rem', fontWeight: 500,
              }}>
                Jetzt trainieren →
              </div>
            </div>
          </div>
        </Link>

        {/* Weitere Module */}
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: '0.875rem' }}>
          Weitere Module
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
          {MODULE.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="module-card card-lift"
              style={{
                display: 'block', textDecoration: 'none',
                background: '#fff', borderRadius: '10px',
                border: '1px solid var(--c-lightgray)',
                padding: '1.25rem',
              }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem', lineHeight: 1 }}>
                {mod.icon}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.17rem', fontWeight: 600,
                color: 'var(--c-dark)', margin: '0 0 0.3rem',
              }}>
                {mod.label}
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                {mod.desc}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
