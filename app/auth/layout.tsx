import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Zugang – Elterngespräche trainieren mit KI',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--c-dark)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        {children}
      </div>
      <footer style={{
        textAlign: 'center',
        padding: '1.25rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontSize: '0.68rem',
        color: 'rgba(255,255,255,0.22)',
        display: 'flex',
        gap: '1.2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <span>© 2026 Antje Backwinkel</span>
        <Link href="/impressum" style={{ color: 'rgba(255,255,255,0.22)', textDecoration: 'none' }}>
          Impressum
        </Link>
        <Link href="/datenschutz" style={{ color: 'rgba(255,255,255,0.22)', textDecoration: 'none' }}>
          Datenschutz
        </Link>
      </footer>
    </div>
  )
}
