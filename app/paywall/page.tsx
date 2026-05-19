import Link from 'next/link'

export default function PaywallPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--c-offwhite)', padding: '2rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: '14px',
        border: '1px solid var(--c-lightgray)',
        padding: '2.5rem 2rem', maxWidth: 480, width: '100%', textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔑</div>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: '2rem', fontWeight: 600,
          color: 'var(--c-dark)', margin: '0 0 0.75rem',
        }}>
          Dein Testzugang ist abgelaufen
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6, margin: '0 0 2rem' }}>
          Du hattest 7 Tage kostenlosen Vollzugriff – ohne Kreditkarte. Wenn du weiter trainieren möchtest, kannst du jetzt ein Abo abschließen.
        </p>

        {/* ThriveCart-Link — wird vor Launch mit echtem Checkout-Link ersetzt */}
        <a
          href="https://elterngespraeche-trainieren.de/checkout"
          style={{
            display: 'block', width: '100%',
            background: 'var(--c-teal)', color: '#fff',
            padding: '0.875rem 1.5rem', borderRadius: '8px',
            fontSize: '1rem', fontWeight: 600,
            textDecoration: 'none', marginBottom: '0.75rem',
            transition: 'background 0.2s',
          }}
        >
          Jetzt Abo abschließen
        </a>

        <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.35)', margin: '1rem 0 0' }}>
          Du hast einen Beta-Code?{' '}
          <Link href="/auth/beta-code" style={{ color: 'var(--c-teal)', textDecoration: 'underline' }}>
            Hier einlösen
          </Link>
        </p>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--c-lightgray)' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.35)', margin: 0 }}>
            Fragen?{' '}
            <a href="mailto:hallo@elterngespraeche-trainieren.de" style={{ color: 'var(--c-teal)', textDecoration: 'none' }}>
              hallo@elterngespraeche-trainieren.de
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
