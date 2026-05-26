import { createServerSupabaseClient } from '@/lib/supabase-server'
import Sidebar from '@/components/layout/Sidebar'
import FortschrittDownload from './FortschrittDownload'
import SessionDownloads, { type SessionData } from './SessionDownloads'

interface SessionRow {
  id: string
  elterntyp: string
  schwierigkeit: string
  gespraechsanlass: string | null
  created_at: string
  turns: Array<{ role: string; content: string }>
  reflexion: string | null
}

interface QuizRow {
  modul: string
  korrekt: boolean
}

export default async function FortschrittPage() {
  let sessions: SessionRow[] = []
  let quizRows: QuizRow[] = []

  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const [{ data: s }, { data: q }] = await Promise.all([
        supabase
          .from('elterngespraech_sessions')
          .select('id, elterntyp, schwierigkeit, gespraechsanlass, created_at, turns, reflexion')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('elterngespraech_quiz')
          .select('modul, korrekt')
          .eq('user_id', user.id)
          .limit(500),
      ])
      sessions = (s ?? []) as SessionRow[]
      quizRows = (q ?? []) as QuizRow[]
    }
  } catch {
    // Supabase nicht verfügbar
  }

  const totalSessions = sessions.length
  const totalQuiz = quizRows.length
  const quizKorrekt = quizRows.filter(q => q.korrekt).length
  const quizRate = totalQuiz > 0 ? Math.round((quizKorrekt / totalQuiz) * 100) : null

  // Quiz nach Modul gruppieren
  const QUIZ_MODULE = ['gespraechsphasen', 'reaktionen', 'rechtswissen', 'gfk', 'vorbereitung', 'koerpersignale']
  const MODULE_LABEL: Record<string, string> = {
    gespraechsphasen: 'Gesprächsphasen',
    reaktionen: 'Reaktionen',
    rechtswissen: 'Rechtswissen',
    gfk: 'Klärende Kommunikation',
    vorbereitung: 'Vorbereitung',
    koerpersignale: 'Körpersignale',
  }

  const quizByModule = QUIZ_MODULE.map(modul => {
    const rows = quizRows.filter(q => q.modul === modul)
    const total = rows.length
    const correct = rows.filter(q => q.korrekt).length
    return {
      modul,
      label: MODULE_LABEL[modul],
      total,
      correct,
      rate: total > 0 ? Math.round((correct / total) * 100) : null,
    }
  })

  // Elterntyp-Verteilung
  const ELTERNTYP_LABEL: Record<string, string> = {
    kooperativ: 'Kooperativ', defensiv: 'Defensiv',
    aggressiv: 'Aggressiv', weinend: 'Überfordernd',
    passiv: 'Passiv', uebergriffig: 'Übergriffig',
  }

  const typCounts: Record<string, number> = {}
  sessions.forEach(s => {
    const t = s.elterntyp || 'unbekannt'
    typCounts[t] = (typCounts[t] || 0) + 1
  })

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
            Mein Fortschritt
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: 'clamp(2rem, 4vw, 2.57rem)',
            fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
          }}>
            Dein Trainingsstand
          </h1>
        </header>

        <main style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>

          {(totalSessions > 0 || totalQuiz > 0) && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <FortschrittDownload
                totalSessions={totalSessions}
                totalQuiz={totalQuiz}
                quizRate={quizRate}
                quizByModule={quizByModule}
                sessionTypen={Object.entries(typCounts).map(([typ, count]) => ({
                  label: ELTERNTYP_LABEL[typ] || typ,
                  count,
                }))}
              />
            </div>
          )}

          {totalSessions === 0 && totalQuiz === 0 ? (
            <div style={{
              background: '#fff', borderRadius: '10px',
              border: '1px solid var(--c-lightgray)',
              padding: '3rem 2rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: '1.67rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 0.75rem',
              }}>
                Noch keine Daten
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.6 }}>
                Absolviere dein erstes Gespräch oder Quiz – dein Fortschritt erscheint hier.
              </p>
            </div>
          ) : (
            <>
              {/* Stats-Karten */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <StatCard icon="🎭" value={String(totalSessions)} label="Gespräche" />
                <StatCard icon="❓" value={String(totalQuiz)} label="Quiz-Fragen" />
                {quizRate !== null && (
                  <StatCard icon="🎯" value={`${quizRate} %`} label="Quiz-Trefferquote" />
                )}
              </div>

              {/* Quiz-Fortschritt */}
              {totalQuiz > 0 && (
                <section style={{
                  background: '#fff', borderRadius: '10px',
                  border: '1px solid var(--c-lightgray)',
                  padding: '1.75rem', marginBottom: '1.5rem',
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                    fontSize: '1.52rem', fontWeight: 600,
                    color: 'var(--c-dark)', margin: '0 0 1rem',
                  }}>
                    Quiz-Ergebnisse nach Modul
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    {quizByModule.map(m => (
                      <div key={m.modul} style={{
                        padding: '0.875rem 1rem',
                        background: 'var(--c-offwhite)',
                        borderRadius: '8px',
                        border: '1px solid var(--c-lightgray)',
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--c-dark)', marginBottom: '0.35rem' }}>
                          {m.label}
                        </div>
                        {m.total === 0 ? (
                          <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.3)' }}>Noch nicht geübt</div>
                        ) : (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                              <span style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.45)' }}>{m.correct}/{m.total} richtig</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-teal)' }}>{m.rate} %</span>
                            </div>
                            <div style={{ height: '4px', background: 'var(--c-lightgray)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${m.rate}%`, background: 'var(--c-teal)', borderRadius: '2px' }} />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Elterntyp-Verteilung */}
              {totalSessions > 0 && (
                <section style={{
                  background: '#fff', borderRadius: '10px',
                  border: '1px solid var(--c-lightgray)',
                  padding: '1.75rem',
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                    fontSize: '1.52rem', fontWeight: 600,
                    color: 'var(--c-dark)', margin: '0 0 1rem',
                  }}>
                    Geübte Elterntypen
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {Object.entries(typCounts).map(([typ, count]) => (
                      <span key={typ} style={{
                        fontSize: '0.84rem', fontWeight: 500,
                        color: 'var(--c-teal)',
                        background: 'rgba(15,123,108,0.08)',
                        border: '1px solid rgba(15,123,108,0.2)',
                        borderRadius: '20px',
                        padding: '0.25rem 0.75rem',
                      }}>
                        {ELTERNTYP_LABEL[typ] || typ} ({count}×)
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Gesprächsverläufe zum Download */}
              <SessionDownloads sessions={sessions as SessionData[]} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--c-lightgray)',
      borderRadius: '0.875rem', padding: '1rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
        fontSize: '1.6rem', fontWeight: 600, color: 'var(--c-dark)', lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--c-gray)', marginTop: '0.25rem', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  )
}
