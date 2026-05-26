export default function NachbereitungPage() {
  return (
    <>
      <header style={{
        background: 'var(--c-header)', padding: '2rem 2rem 2.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--c-teal-light)',
          marginBottom: '0.5rem', marginTop: 0,
        }}>
          Nachbereitung
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
        }}>
          Nachbereitung & Selfcare
        </h1>
      </header>

      <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>

        <section style={{
          background: '#fff', borderRadius: '10px',
          border: '1px solid var(--c-lightgray)',
          padding: '2rem', marginBottom: '1.5rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.67rem', fontWeight: 600,
            color: 'var(--c-dark)', margin: '0 0 1rem',
          }}>
            Gesprächsnachbereitung – was dokumentieren?
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
            Eine kurze Dokumentation schützt dich, schafft Klarheit für Folgegespräche und ist bei Eskalationen rechtlich relevant.
          </p>

          <h3 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.45rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.25rem 0 0.5rem',
          }}>
            Checkliste Gesprächsprotokoll
          </h3>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {[
              'Datum und Uhrzeit',
              'Teilnehmende Personen (wer war anwesend?)',
              'Gesprächsanlass / Thema',
              'Wesentliche besprochene Punkte',
              'Vereinbarte Maßnahmen (wer, was, bis wann?)',
              'Nächster Kontakt oder Termin (falls vereinbart)',
              'Besonderheiten / Spannungsmomente',
            ].map(item => (
              <li key={item} style={{ marginBottom: '0.4rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)' }}>
                {item}
              </li>
            ))}
          </ul>

          <div style={{
            background: 'rgba(15,123,108,0.06)', border: '1px solid rgba(15,123,108,0.15)',
            borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '1.25rem',
          }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-dark)', margin: 0, lineHeight: 1.6 }}>
              <strong>Wann Schulleitung informieren?</strong> Wenn Gefährdungshinweise vorliegen, wenn Eltern rechtliche Schritte ankündigen, bei wiederholten Eskalationen oder wenn externe Stellen einbezogen werden müssen.
            </p>
          </div>
        </section>

        <section style={{
          background: '#fff', borderRadius: '10px',
          border: '1px solid var(--c-lightgray)',
          padding: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.67rem', fontWeight: 600,
            color: 'var(--c-dark)', margin: '0 0 0.5rem',
          }}>
            Selfcare – warum das zählt
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
            Schwierige Elterngespräche sind kognitiv und emotional anspruchsvoll. Du trägst Verantwortung für ein Kind, begegnest möglicherweise Überforderung oder Aggression – und musst gleichzeitig professionell bleiben. Das zehrt.
          </p>

          <h3 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.45rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.25rem 0 0.5rem',
          }}>
            Techniken zum Abschalten
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              ['Mentales Abschluss-Ritual', 'Schreib eine kurze Notiz: Was war gut? Was nimmst du mit? Dann: Akte schließen – bildlich wie physisch.'],
              ['Körperliche Unterbrechung', 'Kurzer Spaziergang, Raumwechsel, Wasser trinken. Der Körper signalisiert dem Gehirn: andere Situation.'],
              ['Atemübung (4–7–8)', 'Einatmen: 4 Sekunden. Halten: 7 Sekunden. Ausatmen: 8 Sekunden. Zweimal wiederholen.'],
            ].map(([titel, text]) => (
              <div key={titel} style={{
                background: 'rgba(15,123,108,0.04)', borderRadius: '8px',
                border: '1px solid rgba(15,123,108,0.12)',
                padding: '1rem',
              }}>
                <strong style={{ fontSize: '0.875rem', color: 'var(--c-dark)', display: 'block', marginBottom: '0.4rem' }}>
                  {titel}
                </strong>
                <p style={{ fontSize: '0.83rem', color: 'rgba(0,0,0,0.55)', margin: 0, lineHeight: 1.5 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.45rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem',
          }}>
            Wann professionelle Unterstützung?
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, margin: 0 }}>
            Schulpsychologischer Dienst, kollegiale Beratung oder Supervision sind keine Zeichen von Schwäche – sondern kluge Nutzung verfügbarer Ressourcen. Besonders nach wiederholt belastenden Gesprächen lohnt sich ein professioneller Austausch.
          </p>
        </section>

      </main>
    </>
  )
}
