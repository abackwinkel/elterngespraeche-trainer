import Sidebar from '@/components/layout/Sidebar'

export default function MittelschulePage() {
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
            Demnächst
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
          }}>
            Mittelschule
          </h1>
        </header>
        <main style={{ padding: '3rem 2rem', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: '#fff', borderRadius: '12px',
            border: '1px solid var(--c-lightgray)',
            padding: '2.5rem 2rem',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗</div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontSize: '1.5rem', fontWeight: 600,
              color: 'var(--c-dark)', margin: '0 0 0.75rem',
            }}>
              In Vorbereitung
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6, margin: 0 }}>
              Das Mittelschul-Modul folgt nach dem Gymnasium-Launch – mit spezifischen Szenarien für die besonderen Herausforderungen dieser Schulstufe.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
