import type { Metadata } from 'next'
import Link from 'next/link'
import DataDeleteButton from './DataDeleteButton'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Elterngespräche trainieren',
  robots: 'noindex,follow',
}

// Stand September 2026. Jede Aussage hier muss zum Code passen – und umgekehrt:
// Datenschutz-Hinweis und Namensfeld in components/gespraech/KonfigurationsForm.tsx,
// Speichern in app/api/gespraech/session/route.ts, Löschen in app/api/daten/loeschen/route.ts,
// Überlastungsschutz in lib/api-guard.ts, Feedback in components/ui/FeedbackButton.tsx
// und app/api/feedback-digest/route.ts. Neue Dienste (etwa ThriveCart beim Start des
// Abos) brauchen VORHER einen eigenen Abschnitt.

export default function DatenschutzPage() {
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
            <DataCard icon="📧" title="E-Mail-Adresse & Konto">
              Für Anmeldung und Zugang. Keine Weitergabe zu Werbezwecken.
            </DataCard>
            <DataCard icon="🗣️" title="Gesprächsverläufe">
              Deine Übungsgespräche mit Reflexion&nbsp;– nach dem Gesprächsende automatisch gespeichert, damit du sie nachlesen kannst.
            </DataCard>
            <DataCard icon="📁" title="Gespeicherte Fälle">
              Nur wenn du „Fall speichern“ wählst. Den Vornamen des Kindes nur als Anfangsbuchstaben.
            </DataCard>
            <DataCard icon="📊" title="Quiz-Ergebnisse">
              Welche Fragen du richtig beantwortet hast&nbsp;– für deinen Lernfortschritt.
            </DataCard>
            <DataCard icon="💬" title="Feedback">
              Nur wenn du es abschickst: Nachricht, Bewertung, Seite, Browserangabe und deine E-Mail-Adresse.
            </DataCard>
          </div>

          <div style={{ ...infoBoxStyle, background: 'rgba(95,211,200,0.08)', borderColor: 'var(--c-mint)' }}>
            <p style={{ ...pStyle, marginBottom: '1rem', fontSize: '0.84rem' }}>
              <strong style={strongStyle}>Datenlöschung:</strong> Du kannst deine Gesprächsverläufe, Quiz-Ergebnisse und gespeicherten Fälle hier jederzeit selbst löschen. Dein Konto und deine Anmeldedaten bleiben dabei erhalten; das Konto lösche ich auf Anfrage per E-Mail.
            </p>
            <DataDeleteButton />
          </div>

          <div style={infoBoxStyle}>
            <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.84rem' }}>
              <strong style={strongStyle}>Bitte keine echten Personen:</strong>{' '}Die Plattform ist für erfundene Fälle gedacht. Gib keine echten Namen von Schülerinnen, Schülern oder Eltern ein und nichts, woran man ein Kind, eine Familie oder eine Schule erkennen kann&nbsp;– weder im Namensfeld noch in der Situationsbeschreibung oder im Gespräch. Den Vornamen des Kindes kürzt die App auf den Anfangsbuchstaben, solange du nicht ausdrücklich bestätigst, dass er erfunden ist. Für echte Fälle aus deiner Schule gelten außerdem die Datenschutzregeln deines Bundeslandes und deiner Schule.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Datenschutz&shy;erklärung</h2>
          <p style={pStyle}>
            Der Schutz deiner Daten ist mir wichtig. Diese Erklärung informiert dich darüber, welche personenbezogenen Daten bei der Nutzung von <strong style={strongStyle}>Elterngespräche trainieren</strong> verarbeitet werden, zu welchem Zweck, auf welcher Rechtsgrundlage und wie lange.
          </p>
          <p style={pStyle}>
            Grundlage sind die Datenschutz-Grundverordnung (DS-GVO), das Bundesdatenschutzgesetz und das Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG).
          </p>

          <div style={infoBoxStyle}>
            <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.84rem' }}>
              <strong style={strongStyle}>Kurzfassung:</strong> Kein Tracking, keine Analyse- und keine Werbe-Cookies. Für die Gesprächssimulation gehen deine Eingaben an die KI von Anthropic (USA). Deine Übungsdaten liegen in einer Datenbank in Frankfurt am Main und sind in der App nur für dich sichtbar.
            </p>
          </div>
        </section>

        {/* 1. Verantwortliche */}
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

        {/* 2. Konto */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>2. Konto und Zugang</h3>
          <p style={pStyle}>
            Für die Nutzung legst du ein Konto mit deiner <strong style={strongStyle}>E-Mail-Adresse</strong> und einem <strong style={strongStyle}>Passwort</strong> an. Das Passwort wird nur als Hashwert gespeichert, nicht im Klartext. Außerdem werden der Zeitpunkt der Registrierung, der Beginn deines 7-tägigen Probezeitraums und dein Zugangsstatus (Probezeit, Beta-Zugang oder Abo) gespeichert. Löst du einen Beta-Code ein, wird festgehalten, welcher Code wann mit deinem Konto eingelöst wurde; zu jedem Beta-Code kann ich mir notieren, an wen ich ihn vergeben habe.
          </p>
          <p style={pStyle}>
            Die Daten dienen dazu, dein Konto zu führen und dir den Zugang zu gewähren. Ohne E-Mail-Adresse und Passwort kann kein Konto angelegt werden.
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DS-GVO (Vertrag über die Nutzung der Plattform).
          </p>
        </section>

        {/* 3. Cookies und Browser-Speicher */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>3. Cookies und Speicher im Browser</h3>
          <p style={pStyle}>
            Diese App setzt <strong style={strongStyle}>keine Tracking-, Analyse- oder Werbe-Cookies</strong>. Auf deinem Gerät werden nur zwei Arten von Einträgen gespeichert:
          </p>

          <h4 style={h4Style}>Anmelde-Cookies</h4>
          <p style={pStyle}>
            Supabase setzt Cookies, die deine Anmeldung aufrechterhalten. Ohne sie kannst du die Plattform nicht nutzen.
          </p>

          <h4 style={h4Style}>Hinweis gelesen</h4>
          <p style={pStyle}>
            Bestätigst du den Datenschutz-Hinweis vor einem Gespräch, merkt sich dein Browser das für die laufende Sitzung. Wählst du „Diesen Hinweis in diesem Browser nicht mehr anzeigen“, bleibt der Eintrag gespeichert, bis du die Browserdaten löschst. Er enthält nur die Information, dass der Hinweis gelesen wurde.
          </p>

          <p style={pStyle}>
            Beide Einträge sind für den Dienst, den du nutzt, unbedingt erforderlich (§&nbsp;25 Abs.&nbsp;2 Nr.&nbsp;2 TDDDG); eine Einwilligung ist dafür nicht nötig. Rechtsgrundlage für die weitere Verarbeitung: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DS-GVO.
          </p>
          <p style={pStyle}>
            Die Schriften werden zusammen mit der Seite ausgeliefert; beim Aufruf wird keine Verbindung zu Google-Servern aufgebaut.
          </p>
        </section>

        {/* 4. KI */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>4. Gesprächssimulation mit KI (Anthropic)</h3>
          <p style={pStyle}>
            Die Gesprächssimulation nutzt die KI-Schnittstelle von <strong style={strongStyle}>Anthropic, PBC</strong> (548 Market St., San Francisco, CA 94104, USA). Übermittelt werden:
          </p>
          <ul style={ulStyle}>
            <li>die Angaben zum Fall, z.&nbsp;B. Schulform, Klassenstufe, Anlass, Elternprofil, Familiensituation, Gesprächsinitiative, Sprachbarriere, Schwierigkeitsgrad und Geschlecht des Kindes,</li>
            <li>deine Beschreibung der Situation, falls du eine eingibst,</li>
            <li>der Vorname des Kindes&nbsp;– als Anfangsbuchstabe oder, wenn du bestätigst, dass er erfunden ist, vollständig,</li>
            <li>der Gesprächsverlauf, also deine Beiträge und die Antworten des simulierten Elternteils.</li>
          </ul>

          <h4 style={h4Style}>Wofür</h4>
          <ul style={ulStyle}>
            <li>Antworten des simulierten Elternteils und Sofort-Feedback zu deinen Beiträgen (Claude Haiku),</li>
            <li>Reflexion zum Abschluss des Gesprächs (Claude Sonnet).</li>
          </ul>

          <p style={pStyle}>
            Die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln. Nach den <a href="https://www.anthropic.com/legal/commercial-terms" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vertragsbedingungen von Anthropic</a> werden Eingaben über die Schnittstelle nicht zum Training der KI-Modelle verwendet. Weitere Informationen: <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>anthropic.com/legal/privacy</a>
          </p>

          <div style={infoBoxStyle}>
            <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.84rem' }}>
              <strong style={strongStyle}>Hinweis:</strong> Die Antworten des simulierten Elternteils, das Feedback und die Reflexion erzeugt eine KI. Sie können unzutreffend sein und ersetzen keine rechtliche, schulrechtliche oder psychologische Beratung.
            </p>
          </div>

          <p style={{ ...pStyle, marginTop: '1rem' }}>
            Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DS-GVO&nbsp;– die Simulation ist der Kern des Angebots.
          </p>
        </section>

        {/* 5. Supabase */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>5. Gespeicherte Übungsdaten (Supabase)</h3>
          <p style={pStyle}>
            Konto und Übungsdaten liegen bei <strong style={strongStyle}>Supabase</strong> (Supabase Inc., 970 Toa Payoh North, #07-04, Singapur 318992) in einem Rechenzentrum von Amazon Web Services in Frankfurt am Main. Gespeichert werden:
          </p>
          <ul style={ulStyle}>
            <li><strong style={strongStyle}>Gesprächsverläufe:</strong> nach dem Ende eines Gesprächs automatisch die Angaben zum Fall (Schulform, Klassenstufe, Anlass, Familiensituation, Elternprofil, Schwierigkeitsgrad), der vollständige Gesprächsverlauf und die Reflexion,</li>
            <li><strong style={strongStyle}>gespeicherte Fälle:</strong> nur wenn du „Fall speichern“ wählst&nbsp;– die Angaben zum Fall einschließlich deiner Situationsbeschreibung, den Vornamen des Kindes nur als Anfangsbuchstaben,</li>
            <li><strong style={strongStyle}>Quiz-Ergebnisse:</strong> Modul, Frage, ob die Antwort richtig war, und der Schwierigkeitsgrad.</li>
          </ul>
          <p style={pStyle}>
            In der App sieht nur dein eigenes Konto diese Daten; die Datenbank setzt das mit Zugriffsregeln je Konto durch. Als Betreiberin habe ich technisch Zugriff auf die Datenbank und sehe Übungsdaten nur ein, wenn es für den Betrieb, eine Fehlersuche oder auf deine Anfrage nötig ist.
          </p>
          <p style={pStyle}>
            Supabase verarbeitet die Daten als Auftragsverarbeiter auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>supabase.com/privacy</a>
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DS-GVO.
          </p>
        </section>

        {/* 6. Upstash */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>6. Schutz vor Überlastung (Upstash)</h3>
          <p style={pStyle}>
            Damit die KI-Funktionen nicht überlastet oder missbraucht werden, zähle ich die KI-Anfragen je Konto und begrenze sie pro Minute und pro Tag. Dafür wird die Kennnummer deines Kontos&nbsp;– nicht deine E-Mail-Adresse&nbsp;– zusammen mit einem Zähler bei <strong style={strongStyle}>Upstash</strong> (Anbieter mit Sitz in den USA) gespeichert. Die Zähler löschen sich nach spätestens zwei Minuten bzw. 26 Stunden von selbst.
          </p>
          <p style={pStyle}>
            Die Übermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer" style={linkStyle}>upstash.com/trust/privacy.pdf</a>
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DS-GVO (berechtigtes Interesse an einem sicheren und bezahlbaren Betrieb).
          </p>
        </section>

        {/* 7. Feedback */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>7. Feedback-Funktion (Resend)</h3>
          <p style={pStyle}>
            Angemeldet kannst du mir über den Feedback-Knopf Rückmeldungen schicken. Gespeichert werden deine Nachricht, eine freiwillige Sternebewertung, die Seite, auf der du warst, die technische Kennung deines Browsers (User-Agent) sowie deine E-Mail-Adresse und die Kennnummer deines Kontos, damit ich dir antworten kann.
          </p>
          <p style={pStyle}>
            Einmal täglich bekomme ich neue Rückmeldungen (Nachricht, Seite, Bewertung und E-Mail-Adresse) per E-Mail zugeschickt. Den Versand übernimmt <strong style={strongStyle}>Resend</strong> (Anbieter mit Sitz in den USA) auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>resend.com/legal/privacy-policy</a>
          </p>
          <p style={pStyle}>
            Rückmeldungen bleiben gespeichert, bis ich sie lösche; auf deine Anfrage lösche ich sie sofort. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DS-GVO (berechtigtes Interesse, die Plattform zu verbessern und auf Rückmeldungen zu antworten).
          </p>
        </section>

        {/* 8. Vercel */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>8. Hosting (Vercel)</h3>
          <p style={pStyle}>
            Die Plattform wird bei <strong style={strongStyle}>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) betrieben. Dabei verarbeitet Vercel technische Zugriffsdaten wie IP-Adresse, Browserangaben sowie Datum und Uhrzeit des Zugriffs in Server-Logdateien, die für begrenzte Zeit gespeichert werden.
          </p>
          <p style={pStyle}>
            Vercel verarbeitet die Daten als Auftragsverarbeiter auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer" style={linkStyle}>vercel.com/legal/privacy-notice</a>
          </p>
          <p style={pStyle}>
            Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DS-GVO (berechtigtes Interesse am sicheren und stabilen Betrieb).
          </p>
        </section>

        {/* 9. Speicherdauer */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>9. Speicherdauer</h3>
          <ul style={ulStyle}>
            <li><strong style={strongStyle}>Konto:</strong> bis du es löschen lässt; eine Anfrage per E-Mail genügt. Mit dem Konto werden auch Gesprächsverläufe, gespeicherte Fälle und Quiz-Ergebnisse gelöscht.</li>
            <li><strong style={strongStyle}>Gesprächsverläufe, gespeicherte Fälle, Quiz-Ergebnisse:</strong> bis du sie löschst&nbsp;– alles auf einmal mit dem Knopf oben auf dieser Seite, einzelne Fälle unter „Meine Fälle“.</li>
            <li><strong style={strongStyle}>Rückmeldungen:</strong> bis ich sie lösche, auf deine Anfrage sofort.</li>
            <li><strong style={strongStyle}>Zähler des Überlastungsschutzes:</strong> höchstens 26 Stunden.</li>
            <li><strong style={strongStyle}>Einträge im Browser:</strong> bis zum Ende der Sitzung bzw. bis du die Browserdaten löschst.</li>
          </ul>
        </section>

        {/* 10. Pflicht und Automatisierung */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>10. Pflichtangaben und automatisierte Entscheidungen</h3>
          <p style={pStyle}>
            Für ein Konto brauchst du eine E-Mail-Adresse und ein Passwort. Alle anderen Angaben sind freiwillig; ohne Angaben zum Fall kann die Simulation aber kein Gespräch erzeugen.
          </p>
          <p style={pStyle}>
            Eine automatisierte Entscheidung im Sinne von Art.&nbsp;22 DS-GVO findet nicht statt. Feedback und Reflexion der KI sind Lernhilfen ohne rechtliche Wirkung.
          </p>
        </section>

        {/* 11. Rechte */}
        <section style={sectionStyle}>
          <h3 style={h3Style}>11. Deine Rechte</h3>
          <p style={pStyle}>Du hast mir gegenüber folgende Rechte hinsichtlich deiner personenbezogenen Daten:</p>

          <h4 style={h4Style}>Auskunft (Art.&nbsp;15 DS-GVO)</h4>
          <p style={pStyle}>Du kannst Auskunft über die zu deiner Person gespeicherten Daten verlangen.</p>

          <h4 style={h4Style}>Berichtigung (Art.&nbsp;16 DS-GVO)</h4>
          <p style={pStyle}>Du hast das Recht, unrichtige Daten berichtigen zu lassen.</p>

          <h4 style={h4Style}>Löschung (Art.&nbsp;17 DS-GVO)</h4>
          <p style={pStyle}>Du kannst die Löschung deiner Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>

          <h4 style={h4Style}>Einschränkung der Verarbeitung (Art.&nbsp;18 DS-GVO)</h4>
          <p style={pStyle}>Du hast das Recht, die Einschränkung der Verarbeitung deiner Daten zu verlangen.</p>

          <h4 style={h4Style}>Datenübertragbarkeit (Art.&nbsp;20 DS-GVO)</h4>
          <p style={pStyle}>Du hast das Recht, die Daten, die du bereitgestellt hast, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</p>

          <h4 style={h4Style}>Widerspruch (Art.&nbsp;21 DS-GVO)</h4>
          <p style={pStyle}>Du kannst der Verarbeitung deiner Daten auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DS-GVO jederzeit widersprechen.</p>

          <h4 style={h4Style}>Beschwerderecht</h4>
          <p style={pStyle}>
            Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der für mich zuständigen: dem Landesbeauftragten für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz (<a href="https://www.datenschutz.rlp.de/" target="_blank" rel="noopener noreferrer" style={linkStyle}>datenschutz.rlp.de</a>).
          </p>

          <p style={pStyle}>
            Zur Ausübung deiner Rechte genügt eine E-Mail an <a href="mailto:antje@antje-backwinkel.de" style={linkStyle}>antje@antje-backwinkel.de</a>.
          </p>
        </section>

        {/* 12. Stand */}
        <section style={{ ...sectionStyle, borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
          <h3 style={h3Style}>12. Stand dieser Erklärung</h3>
          <p style={pStyle}>
            Diese Datenschutzerklärung hat den Stand September 2026. Ändern sich die Plattform oder die Rechtslage, passe ich sie an; die aktuelle Fassung steht immer unter <a href="/datenschutz" style={linkStyle}>/datenschutz</a>.
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

const ulStyle: React.CSSProperties = {
  ...pStyle,
  paddingLeft: '1.2rem',
  listStyle: 'disc',
}

const strongStyle: React.CSSProperties = {
  fontWeight: 500,
  color: 'var(--c-dark)',
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
