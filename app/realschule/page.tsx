import Link from 'next/link'

const HERO = {
  href: '/realschule/gespraech',
  icon: '🎭',
  label: 'Gesprächsschmiede',
  desc: 'KI-simulierte Elterngespräche mit Sofortfeedback – abgestimmt auf typische Realschul-Szenarien. Wähle Elterntyp, Schwierigkeit und Gesprächsanlass frei.',
}

export default function RealschulePage() {
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
          Realschule
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(2rem, 4vw, 2.77rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
        }}>
          Deine Trainingsmodule
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: '52ch', lineHeight: 1.6 }}>
          Trainiere Elterngespräche mit KI-Szenarien, die auf den Realschulalltag zugeschnitten sind.
        </p>
      </header>

      <main style={{ padding: '2rem 2rem 4rem', maxWidth: 960, margin: '0 auto' }}>
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
      </main>
    </>
  )
}
