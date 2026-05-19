import type { Metadata } from 'next'
import Link from 'next/link'
import DataDeleteButton from './DataDeleteButton'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – NLP trainieren mit KI',
  robots: 'noindex,follow',
}

export default function DatenschutzPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-offwhite)', fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}>

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
        <span style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: '1.1rem',
          fontWeight: 500,
          color: 'var(--c-dark)',
        }}>
          NLP trainieren <span style={{ color: 'var(--c-teal)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>mit KI</span>
        </span>
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
          NLP trainieren mit KI · Rechtliches
        </span>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 300,
          color: 'var(--c-dark)',
          lineHeight: 1.15,
        }}>
          Datenschutz&shy;erklärung
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
        <Link href="/impressum" style={tabInactive}>Impressum</Link>
        <span style={tabActive}>Datenschutzerklärung</span>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--page-py) var(--page-px) calc(var(--page-py) * 1.25)' }}>

        {/* Deine Daten im Überblick */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Deine Daten im Überblick</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <DataCard icon="📧" title="E-Mail-Adresse & Account">
              Für Anmeldung und Zugangscode-Zuordnung. Niemals an Dritte weitergegeben.
            </DataCard>
            <DataCard icon="🎓" title="Übungs-Sessions">
              Coaching-Gespräch, Chat-Verlauf und Auswertungsergebnisse. Gespeichert für deinen persönlichen Lernfortschritt. Nur für dich sichtbar.
            </DataCard>
            <DataCard icon="📊" title="Lernfortschritt">
              Erkannte Muster, Scores und Übungsstatistiken. Nur für dich sichtbar, niemals für KI-Training verwendet.
            </DataCard>
            <DataCard icon="🔑" title="Zugangscode">
              Welcher Code für deine Registrierung verwendet wurde. Zur Zugangsverwaltung.
            </DataCard>
          </div>

          <div style={{ ...infoBoxStyle, background: 'rgba(95,211,200,0.08)', borderColor: 'var(--c-mint)' }}>
            <p style={{ ...pStyle, marginBottom: '1rem', fontSize: '0.84rem' }}>
              <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>Datenlöschung:</strong> Du kannst jederzeit alle deine gespeicherten Übungs-Sessions löschen. Dein Account und deine Login-Daten bleiben dabei erhalten.
            </p>
            <DataDeleteButton />
          </div>
        </section>

        {/* Intro */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Datenschutz&shy;erklärung</h2>
          <p style={pStyle}>
            Der Schutz deiner persönlichen Daten ist mir ein wichtiges Anliegen. Diese Erklärung informiert dich darüber, welche Daten beim Besuch und der Nutzung von <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>NLP trainieren mit KI</strong> verarbeitet werden, zu welchem Zweck und auf welcher Rechtsgrundlage.
          </p>
          <p style={pStyle}>
            Die Verarbeitung personenbezogener Daten erfolgt stets im Einklang mit der Datenschutz-Grundverordnung (DS-GVO) sowie den geltenden nationalen Datenschutzbestimmungen.
          </p>

          <div style={infoBoxStyle}>
            <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.84rem' }}>
              <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>Kurzfassung:</strong> Diese App verwendet kein Analytics, kein Tracking und keine Werbe-Cookies. Die einzige gesetzte Session besteht durch die Authentifizierung via Supabase. Coaching-Gespräche werden nach der Auswertung als Lernprotokoll gespeichert und sind nur für dich sichtbar.
            </p>
          </div>
        </section>

        {/* Verantwortliche */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>1. Verantwortliche Person</h3>
          <p style={pStyle}>Verantwortlich im Sinne der DS-GVO:</p>
          <address style={addressStyle}>
            Antje Backwinkel<br />
            Am Marienpfad 17<br />
            55128 Mainz<br />
            Deutschland<br /><br />
            Telefon: 06131-3271674<br />
            E-Mail: <a href="mailto:antje@antje-backwinkel.de" style={linkStyle}>antje@antje-backwinkel.de</a>
          </address>
        </section>

        {/* Zugang & Auth */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>2. Zugang und Authentifizierung</h3>
          <p style={pStyle}>
            Die Nutzung dieser Plattform setzt eine Registrierung per Einladungscode voraus. Dabei werden Ihre <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>E-Mail-Adresse</strong> und ein <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>Passwort</strong> erhoben. Diese Daten werden ausschließlich zur Authentifizierung und Zugangssteuerung verwendet.
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung / vorvertragliche Maßnahmen).
          </p>
          <p style={pStyle}>
            Nach Ihrer Abmeldung oder auf Anfrage können Ihre Zugangsdaten gelöscht werden. Wenden Sie sich dafür an <a href="mailto:antje@antje-backwinkel.de" style={linkStyle}>antje@antje-backwinkel.de</a>.
          </p>
        </section>

        {/* Cookies */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>3. Cookies und Sitzungsdaten</h3>
          <p style={pStyle}>
            Diese App verwendet <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>keine Tracking-Cookies</strong> und kein Analytics. Es wird ausschließlich ein technisch notwendiges Session-Cookie gesetzt, das von Supabase Auth zur Aufrechterhaltung Ihrer Anmeldung benötigt wird.
          </p>
          <p style={pStyle}>
            Dieses Cookie ist für den Betrieb der App erforderlich und kann nicht deaktiviert werden, ohne die Nutzung der Plattform zu verhindern. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DS-GVO (berechtigtes Interesse am sicheren Betrieb).
          </p>
        </section>

        {/* KI-Verarbeitung */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>4. KI-gestützte Funktionen (Anthropic API)</h3>
          <p style={pStyle}>
            Für die interaktiven Übungsfunktionen dieser Plattform wird die API von <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>Anthropic, PBC</strong> (548 Market St., San Francisco, CA 94104, USA) eingesetzt. Dabei werden folgende Funktionen genutzt:
          </p>

          <h4 style={h4Style}>Übungs-Coaching (Claude Haiku)</h4>
          <p style={pStyle}>
            Deine Eingaben im Coaching-Gespräch werden an die Anthropic API übertragen, um eine simulierte Klientenantwort zu erzeugen. Der laufende Gesprächsverlauf wird im Browser gehalten und erst nach Abschluss der Auswertung dauerhaft als Lernprotokoll gespeichert (siehe Abschnitt 5).
          </p>

          <h4 style={h4Style}>Auswertung (Claude Sonnet)</h4>
          <p style={pStyle}>
            Nach Abschluss eines Coaching-Gesprächs wird der Gesprächsverlauf zur Analyse an die Anthropic API übertragen. Die Auswertung identifiziert erkannte Sprachmuster und gibt strukturiertes Feedback. Gesprächsverlauf und Auswertungsergebnis werden anschließend als Lernprotokoll in der Datenbank gespeichert und sind ausschließlich für dich sichtbar. Du kannst diese Daten jederzeit löschen.
          </p>

          <h4 style={h4Style}>Übungs-Tools (Claude Haiku)</h4>
          <p style={pStyle}>
            Die Feedback-Funktionen in den Bereichen Metaprogramme-Generator, Meta-Modell-Herausforderung und Metaphern-Umdeuten übertragen Ihre eingegebenen Texte zur Verarbeitung an die Anthropic API. Es erfolgt keine dauerhafte Speicherung Ihrer Eingaben.
          </p>

          <div style={infoBoxStyle}>
            <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.84rem' }}>
              Anthropic verarbeitet Daten auf Grundlage der EU-Standardvertragsklauseln (SCCs). Weitere Informationen: <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>anthropic.com/privacy</a>
            </p>
          </div>

          <p style={{ ...pStyle, marginTop: '1rem' }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung – die KI-Verarbeitung ist zentraler Bestandteil des Dienstleistungsangebots).
          </p>
        </section>

        {/* Supabase */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>5. Authentifizierung und Datenbank (Supabase)</h3>
          <p style={pStyle}>
            Für die Verwaltung von Benutzerkonten, Zugangscodes und Lernprotokollen wird <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>Supabase</strong> (Supabase Inc., 970 Toa Payoh North, #07-04, Singapur 318992) eingesetzt. Supabase verarbeitet E-Mail-Adressen, Passwörter (gehasht), die Nutzungsdaten des Einladungscodes sowie die gespeicherten Übungs-Sessions (Gesprächsverlauf, Auswertung, Lernstatistiken). Alle gespeicherten Sessions sind über Row Level Security ausschließlich für den jeweiligen Account sichtbar.
          </p>
          <p style={pStyle}>
            Die Datenbankinfrastruktur läuft auf AWS in der Region EU (Frankfurt). Supabase verarbeitet Daten auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>supabase.com/privacy</a>
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung).
          </p>
        </section>

        {/* Vercel */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>6. Hosting (Vercel)</h3>
          <p style={pStyle}>
            Diese Plattform wird gehostet bei <strong style={{ fontWeight: 500, color: 'var(--c-dark)' }}>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA). Im Rahmen des Hostings werden technische Zugriffsdaten (IP-Adresse, Browser-Informationen, Datum und Uhrzeit des Zugriffs) in Server-Logfiles verarbeitet.
          </p>
          <p style={pStyle}>
            Vercel verarbeitet Daten auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>vercel.com/legal/privacy-policy</a>
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DS-GVO (berechtigtes Interesse am sicheren und stabilen Betrieb).
          </p>
        </section>

        {/* Speicherdauer */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>7. Speicherdauer</h3>
          <p style={pStyle}>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen dies verlangen. Accountdaten (E-Mail, Passwort-Hash) werden nach Löschung des Accounts entfernt. Gespeicherte Übungs-Sessions bleiben erhalten, bis du sie selbst löschst oder deinen Account löscht – oder bis auf Anfrage eine manuelle Löschung durch die Betreiberin erfolgt. Du kannst deine Sessions jederzeit über den Button „Sessions löschen" in diesem Bereich entfernen.
          </p>
        </section>

        {/* Rechte */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>8. Ihre Rechte</h3>
          <p style={pStyle}>Sie haben gegenüber mir folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>

          <h4 style={h4Style}>Auskunft (Art. 15 DS-GVO)</h4>
          <p style={pStyle}>Sie können Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.</p>

          <h4 style={h4Style}>Berichtigung (Art. 16 DS-GVO)</h4>
          <p style={pStyle}>Sie haben das Recht, unrichtige Daten berichtigen zu lassen.</p>

          <h4 style={h4Style}>Löschung (Art. 17 DS-GVO)</h4>
          <p style={pStyle}>Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>

          <h4 style={h4Style}>Einschränkung der Verarbeitung (Art. 18 DS-GVO)</h4>
          <p style={pStyle}>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.</p>

          <h4 style={h4Style}>Datenübertragbarkeit (Art. 20 DS-GVO)</h4>
          <p style={pStyle}>Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</p>

          <h4 style={h4Style}>Widerspruch (Art. 21 DS-GVO)</h4>
          <p style={pStyle}>Sie können der Verarbeitung Ihrer Daten auf Grundlage von Art. 6 Abs. 1 lit. f DS-GVO jederzeit widersprechen.</p>

          <h4 style={h4Style}>Beschwerderecht</h4>
          <p style={pStyle}>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig für Rheinland-Pfalz ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.
          </p>

          <p style={pStyle}>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:antje@antje-backwinkel.de" style={linkStyle}>antje@antje-backwinkel.de</a>
          </p>
        </section>

        {/* Stand */}
        <section style={{ ...sectionStyle, borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
          <h3 style={h3Style}>9. Aktualität dieser Erklärung</h3>
          <p style={pStyle}>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2026. Durch die Weiterentwicklung dieser Plattform oder durch geänderte gesetzliche Vorgaben kann eine Anpassung erforderlich werden. Die jeweils aktuelle Datenschutzerklärung ist stets unter <a href="/datenschutz" style={linkStyle}>/datenschutz</a> abrufbar.
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

function DataCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--c-lightgray)',
      borderRadius: '0.875rem',
      padding: '1.1rem 1.25rem',
    }}>
      <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{icon}</div>
      <div style={{
        fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-dark)',
        marginBottom: '0.4rem', letterSpacing: '0.02em',
      }}>
        {title}
      </div>
      <div style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.6 }}>{children}</div>
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

const infoBoxStyle: React.CSSProperties = {
  background: '#e8eef0',
  borderLeft: '3px solid var(--c-teal)',
  borderRadius: '0 8px 8px 0',
  padding: '1.2rem 1.6rem',
  margin: '1.5rem 0',
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
