import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum – Elterngespräche trainieren',
  robots: 'noindex,follow',
}

// Stand September 2026: Angaben nach § 5 DDG (löste im Mai 2024 das TMG ab). Der Hinweis
// auf die EU-Plattform zur Online-Streitbeilegung entfällt – sie ist seit 20.07.2025
// abgeschaltet (Verordnung (EU) 2024/3228).

export default function ImpressumPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-offwhite)', fontFamily: 'var(--font-inter, "Inter", sans-serif)' }}>

      {/* Top-Bar */}
      <header style={{
        background: 'var(--c-offwhite)',
        borderBottom: '1px solid var(--c-lightgray)',
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 60,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: '1.1rem',
          fontWeight: 500,
          color: 'var(--c-dark)',
          textDecoration: 'none',
        }}>
          Elterngespräche trainieren
        </Link>
        <Link href="/" style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--c-dark)',
          textDecoration: 'none',
        }}>
          ← Zur App
        </Link>
      </header>

      {/* Hero */}
      <div style={{
        background: '#e8eef0',
        padding: 'var(--page-py) var(--page-px) 3rem',
        borderBottom: '1px solid var(--c-lightgray)',
      }}>
        <span style={{
          display: 'block',
          fontSize: '0.58rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--c-teal)',
          marginBottom: '0.8rem',
        }}>
          Elterngespräche trainieren · Rechtliches
        </span>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 300,
          color: 'var(--c-dark)',
          lineHeight: 1.15,
        }}>
          Impressum
        </h1>
      </div>

      {/* Tab-Nav */}
      <nav style={{
        background: '#fff',
        borderBottom: '1px solid var(--c-lightgray)',
        padding: '0 5%',
        display: 'flex',
        gap: 0,
        position: 'sticky',
        top: 60,
        zIndex: 9,
      }}>
        <span style={tabActive}>Impressum</span>
        <Link href="/datenschutz" style={tabInactive}>Datenschutzerklärung</Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--page-py) var(--page-px) calc(var(--page-py) * 1.25)' }}>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Impressum <em style={{ color: 'var(--c-teal)', fontStyle: 'italic' }}>(§&nbsp;5 DDG)</em></h2>

          <h3 style={h3Style}>Anbieterin</h3>
          <address style={addressStyle}>
            Antje Backwinkel<br />
            Am Marienpfad 17<br />
            55128 Mainz<br />
            Deutschland
          </address>

          <h4 style={h4Style}>Kontakt</h4>
          <p style={pStyle}>
            Telefon: 06131-3271674<br />
            E-Mail: <a href="mailto:antje@antje-backwinkel.de" style={linkStyle}>antje@antje-backwinkel.de</a><br />
            Website: <a href="https://www.elterngespraeche-trainieren.de" target="_blank" rel="noopener noreferrer" style={linkStyle}>elterngespraeche-trainieren.de</a>
          </p>

          <h4 style={h4Style}>Kleinunternehmerregelung</h4>
          <p style={pStyle}>Gemäß §&nbsp;19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.</p>

          <h4 style={h4Style}>Verantwortlich für den Inhalt nach §&nbsp;18 Abs.&nbsp;2 MStV</h4>
          <address style={addressStyle}>
            Antje Backwinkel<br />
            Am Marienpfad 17<br />
            55128 Mainz
          </address>
        </section>

        <section style={sectionStyle}>
          <h3 style={h3Style}>Verbraucherstreitbeilegung</h3>
          <p style={pStyle}>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>

        <section style={sectionStyle}>
          <h3 style={h3Style}>Hinweis zu den Inhalten</h3>
          <p style={pStyle}>
            Die Inhalte dieser Plattform&nbsp;– auch die Gesprächsbeiträge, Rückmeldungen und Reflexionen, die eine KI erzeugt&nbsp;– dienen der Übung und Vorbereitung. Sie ersetzen keine rechtliche, schulrechtliche oder psychologische Beratung. Für eigene Inhalte bin ich nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={h3Style}>Links auf andere Websites</h3>
          <p style={pStyle}>
            Diese Plattform enthält Links zu Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese Inhalte ist der jeweilige Anbieter verantwortlich. Werden mir Rechtsverletzungen bekannt, entferne ich den betreffenden Link umgehend.
          </p>
        </section>

        <section style={{ ...sectionStyle, borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
          <h3 style={h3Style}>Urheberrecht</h3>
          <p style={pStyle}>
            Die Inhalte und Werke auf dieser Plattform unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--c-dark)',
        color: 'rgba(255,255,255,0.4)',
        padding: '2rem 5%',
        textAlign: 'center',
        fontSize: '0.72rem',
      }}>
        <p>© 2026 Antje Backwinkel · <Link href="/impressum" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Impressum</Link> · <Link href="/datenschutz" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Datenschutz</Link></p>
      </footer>

    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '3.5rem',
  paddingBottom: '3.5rem',
  borderBottom: '1px solid var(--c-lightgray)',
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
  fontWeight: 300,
  color: 'var(--c-dark)',
  marginBottom: '2rem',
  lineHeight: 1.2,
}

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
  fontSize: '1.4rem',
  fontWeight: 400,
  color: 'var(--c-dark)',
  margin: '0 0 0.8rem',
  lineHeight: 1.25,
}

const h4Style: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--c-dark)',
  margin: '1.5rem 0 0.4rem',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
}

const pStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  fontWeight: 300,
  color: '#444',
  lineHeight: 1.95,
  marginBottom: '0.9rem',
}

const addressStyle: React.CSSProperties = {
  fontStyle: 'normal',
  fontSize: '0.88rem',
  fontWeight: 300,
  color: '#444',
  lineHeight: 2.1,
  marginBottom: '1rem',
}

const linkStyle: React.CSSProperties = {
  color: 'var(--c-teal)',
  textDecoration: 'none',
}

const tabActive: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--c-teal)',
  padding: '1rem 1.2rem',
  display: 'block',
  borderBottom: '2px solid var(--c-teal)',
}

const tabInactive: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--c-gray)',
  padding: '1rem 1.2rem',
  display: 'block',
  borderBottom: '2px solid transparent',
  textDecoration: 'none',
}
