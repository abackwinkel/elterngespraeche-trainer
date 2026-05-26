import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Sidebar from '@/components/layout/Sidebar'

export default async function StartPage() {
  let trialDaysLeft: number | null = null

  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_status, trial_started_at')
        .eq('id', user.id)
        .single()

      if (profile?.subscription_status === 'trial' && profile.trial_started_at) {
        const elapsed = Date.now() - new Date(profile.trial_started_at).getTime()
        const daysLeft = 7 - Math.floor(elapsed / 86400000)
        trialDaysLeft = Math.max(0, daysLeft)
      }
    }
  } catch {
    // Supabase nicht verfügbar — Trial-Info weglassen
  }

  return (
    <div className="flex h-screen overflow-hidden page-with-sidebar" style={{ background: 'var(--c-offwhite)' }}>
      <Sidebar />

      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Header */}
        <header style={{
          background: 'var(--c-header)',
          padding: '2rem 2rem 2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {trialDaysLeft !== null && (
            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--c-teal-light)',
              background: 'rgba(15,123,108,0.15)',
              border: '1px solid rgba(15,123,108,0.3)',
              borderRadius: '4px',
              padding: '0.2rem 0.7rem',
              marginBottom: '0.75rem',
            }}>
              {trialDaysLeft > 0
                ? `Kostenloser Testzugang – noch ${trialDaysLeft} ${trialDaysLeft === 1 ? 'Tag' : 'Tage'}`
                : 'Testzeitraum endet heute'}
            </div>
          )}
          <p style={{
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--c-teal-light)',
            marginBottom: '0.5rem', marginTop: 0,
          }}>
            Elterngespräche trainieren
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
          }}>
            Wo möchtest du heute starten?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: '52ch', lineHeight: 1.6 }}>
            Wähle einen Bereich und leg direkt los – ob Hintergrundwissen, Quiz oder live Gespräch üben.
          </p>
        </header>

        <main style={{ padding: '2rem 2rem 4rem', maxWidth: 960, margin: '0 auto' }}>

          {/* Feature-Kacheln */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>

            <Link
              href="/info"
              style={{
                display: 'block', textDecoration: 'none',
                background: '#fff', borderRadius: '10px',
                border: '2px solid var(--c-teal)',
                padding: '1.75rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              className="card-lift"
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1 }}>📖</div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.5rem', fontWeight: 600,
                color: 'var(--c-dark)', margin: '0 0 0.4rem',
              }}>
                Grundlagen & Info
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.5)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Gesprächsführung, Vorbereitung, Körpersprache, Rechtliches, schwierige Situationen und Nachbereitung.
              </p>
              <span style={{
                display: 'inline-block', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--c-teal)', padding: '0.25rem 0.75rem',
                background: 'rgba(15,123,108,0.08)', borderRadius: '4px',
              }}>
                Zum Wissen →
              </span>
            </Link>

            <Link
              href="/quiz"
              style={{
                display: 'block', textDecoration: 'none',
                background: '#fff', borderRadius: '10px',
                border: '2px solid var(--c-teal)',
                padding: '1.75rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              className="card-lift"
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1 }}>🧠</div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.5rem', fontWeight: 600,
                color: 'var(--c-dark)', margin: '0 0 0.4rem',
              }}>
                Wissensquiz
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.5)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                7 Wissensmodule trainieren – von Gesprächsphasen über Rechtswissen bis zu Elternreaktionen.
              </p>
              <span style={{
                display: 'inline-block', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--c-teal)', padding: '0.25rem 0.75rem',
                background: 'rgba(15,123,108,0.08)', borderRadius: '4px',
              }}>
                Zum Quiz →
              </span>
            </Link>

            <Link
              href="/gesprach"
              style={{
                display: 'block', textDecoration: 'none',
                background: '#fff', borderRadius: '10px',
                border: '2px solid var(--c-teal)',
                padding: '1.75rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              className="card-lift"
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1 }}>🎭</div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.5rem', fontWeight: 600,
                color: 'var(--c-dark)', margin: '0 0 0.4rem',
              }}>
                Gesprächsschmiede
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.5)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Live mit der KI üben – alle Schultypen, alle Elterntypen, mit gezieltem Feedback nach jeder Eingabe.
              </p>
              <span style={{
                display: 'inline-block', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--c-teal)', padding: '0.25rem 0.75rem',
                background: 'rgba(15,123,108,0.08)', borderRadius: '4px',
              }}>
                Gespräch starten →
              </span>
            </Link>

          </div>

          {/* Kurzinfo */}
          <section style={{
            background: '#fff', borderRadius: '10px',
            border: '1px solid var(--c-lightgray)',
            padding: '1.5rem 2rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontSize: '1.4rem', fontWeight: 600,
              color: 'var(--c-dark)', margin: '0 0 0.75rem',
            }}>
              Wie das Training funktioniert
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '🎭', text: 'Die KI übernimmt die Elternrolle – du führst das Gespräch.' },
                { icon: '💬', text: 'Nach jeder Eingabe: Sofort-Feedback was gut war und was besser gehen könnte.' },
                { icon: '📊', text: 'Am Ende: Gesamtreflexion mit konkreten Hinweisen für deine Praxis.' },
                { icon: '⚙️', text: 'Wähle Elterntyp und Schwierigkeitsstufe – von kooperativ bis fordernd.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.6)', margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
