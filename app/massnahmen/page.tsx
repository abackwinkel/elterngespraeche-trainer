'use client'

import { useState, useRef } from 'react'
import { MASSNAHMEN_A, MASSNAHMEN_B, MASSNAHMEN_C, getMassnahmeById, Massnahme } from '@/lib/massnahmen-data'
import { SYMPTOME, Symptom } from '@/lib/symptome-data'

// ─── Konfig pro Stufe ─────────────────────────────────────────────────────────

const STUFE_CFG = {
  a: { label: 'Stufe A — Sofortmaßnahme', short: 'A', color: 'var(--c-teal)', bg: 'rgba(15,123,108,0.08)' },
  b: { label: 'Stufe B — Kooperativ',      short: 'B', color: '#2563eb',        bg: 'rgba(37,99,235,0.08)' },
  c: { label: 'Stufe C — Extern',           short: 'C', color: '#b45309',        bg: 'rgba(180,83,9,0.08)' },
}

const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '0.5rem 0.625rem',
  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)',
  borderBottom: '2px solid var(--c-lightgray)',
}
const tdStyle: React.CSSProperties = {
  padding: '0.625rem 0.625rem', verticalAlign: 'top',
  fontSize: '0.82rem', lineHeight: 1.55, color: 'rgba(0,0,0,0.75)',
}

// ─── Hilfkomponente Section ───────────────────────────────────────────────────

function Section({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      {label && (
        <div style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '0.5rem',
        }}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

// ─── Detail-Panel ─────────────────────────────────────────────────────────────

function DetailPanel({ massnahme, onClose }: { massnahme: Massnahme; onClose: () => void }) {
  const cfg = STUFE_CFG[massnahme.stufe]
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 40 }}
      />

      <div
        className="detail-panel"
        style={{
          position: 'fixed', zIndex: 50, background: '#fff', overflowY: 'auto',
          top: 0, right: 0, width: 'min(50%, 540px)', height: '100%',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ padding: '2rem 2rem 3rem' }}>
          {/* Schließen */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
              color: 'rgba(0,0,0,0.4)', lineHeight: 1, padding: '0.25rem',
            }}
            aria-label="Schließen"
          >×</button>

          {/* Stufen-Badge */}
          <span style={{
            display: 'inline-block', fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: cfg.color, background: cfg.bg,
            borderRadius: '4px', padding: '0.2rem 0.6rem', marginBottom: '0.75rem',
          }}>
            {cfg.label}
          </span>

          {/* Titel */}
          <h2 style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.6rem', fontWeight: 600, color: 'var(--c-dark)',
            margin: '0 0 0.25rem', lineHeight: 1.2, paddingRight: '2rem',
          }}>
            {massnahme.titel}
          </h2>

          {/* Trigger (kursiv) */}
          <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', fontStyle: 'italic', margin: '0 0 1.75rem', lineHeight: 1.5 }}>
            {massnahme.trigger}
          </p>

          {/* Ziel */}
          <Section label="Ziel">
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.75)', lineHeight: 1.65 }}>
              {massnahme.ziel}
            </p>
          </Section>

          {/* Wann NICHT */}
          <Section label="Wann NICHT">
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {massnahme.wannNicht.map((w, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, marginBottom: '0.2rem' }}>
                  {w}
                </li>
              ))}
            </ul>
          </Section>

          {/* Bausteine — Tabelle Desktop */}
          <Section label="Bausteine">
            <div className="bausteine-table" style={{ overflowX: 'auto', borderRadius: '6px', border: '1px solid var(--c-lightgray)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <th style={{ ...thStyle, width: '28px' }}>#</th>
                    <th style={{ ...thStyle, width: '22%' }}>Was tun</th>
                    <th style={thStyle}>Beispiel-Formulierung</th>
                    <th style={{ ...thStyle, width: '16%' }}>Material</th>
                  </tr>
                </thead>
                <tbody>
                  {massnahme.bausteine.map(b => (
                    <tr key={b.nummer} style={{ borderBottom: '1px solid var(--c-lightgray)' }}>
                      <td style={{ ...tdStyle, color: 'rgba(0,0,0,0.3)', fontWeight: 700, paddingRight: '0.25rem', textAlign: 'center' }}>
                        {b.nummer}
                      </td>
                      <td style={tdStyle}>{b.wasTun}</td>
                      <td style={tdStyle}>
                        {b.beispielFormulierung !== '—' ? (
                          <blockquote style={{
                            margin: 0, paddingLeft: '0.75rem',
                            borderLeft: `3px solid ${cfg.color}`,
                            color: 'rgba(0,0,0,0.72)', fontStyle: 'italic', lineHeight: 1.55,
                          }}>
                            {b.beispielFormulierung}
                          </blockquote>
                        ) : (
                          <span style={{ color: 'rgba(0,0,0,0.25)' }}>—</span>
                        )}
                      </td>
                      <td style={{ ...tdStyle, color: 'rgba(0,0,0,0.45)', fontSize: '0.78rem' }}>
                        {b.material}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bausteine — gestapelte Cards Mobile */}
            <div className="bausteine-cards">
              {massnahme.bausteine.map(b => (
                <div key={b.nummer} style={{
                  background: 'rgba(0,0,0,0.02)', border: '1px solid var(--c-lightgray)',
                  borderRadius: '8px', padding: '0.875rem', marginBottom: '0.75rem',
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{
                      fontWeight: 700, fontSize: '0.72rem', color: cfg.color,
                      background: cfg.bg, borderRadius: '4px', padding: '0.1rem 0.5rem', flexShrink: 0,
                    }}>
                      {b.nummer}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-dark)', lineHeight: 1.4 }}>
                      {b.wasTun}
                    </span>
                  </div>
                  {b.beispielFormulierung !== '—' && (
                    <blockquote style={{
                      margin: '0 0 0.5rem', paddingLeft: '0.75rem',
                      borderLeft: `3px solid ${cfg.color}`,
                      color: 'rgba(0,0,0,0.7)', fontStyle: 'italic', fontSize: '0.82rem', lineHeight: 1.5,
                    }}>
                      {b.beispielFormulierung}
                    </blockquote>
                  )}
                  {b.material !== '—' && (
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(0,0,0,0.45)' }}>
                      Material: {b.material}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Vorlage (aufklappbar, nur b01 + b07) */}
          {massnahme.vorlage && (
            <div style={{ marginBottom: '1.25rem' }}>
              <details style={{
                background: 'rgba(0,0,0,0.02)', border: '1px solid var(--c-lightgray)',
                borderRadius: '8px', padding: '0.75rem 1rem',
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', color: cfg.color, userSelect: 'none' }}>
                  Vorlage anzeigen
                </summary>
                <pre style={{
                  margin: '0.75rem 0 0', fontFamily: 'inherit', fontSize: '0.82rem',
                  color: 'rgba(0,0,0,0.7)', whiteSpace: 'pre-wrap', lineHeight: 1.65,
                }}>
                  {massnahme.vorlage}
                </pre>
              </details>
            </div>
          )}

          {/* Typische Fehler */}
          <Section label="Typische Fehler">
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {massnahme.fallstricke.map((f, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, marginBottom: '0.2rem' }}>
                  {f}
                </li>
              ))}
            </ul>
          </Section>

          {/* Eskalation */}
          <Section label="Eskalation">
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.65 }}>
              {massnahme.eskalation}
            </p>
          </Section>

          {/* Schulform-Hinweis */}
          {massnahme.schulformHinweis && (
            <div style={{
              background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.18)',
              borderRadius: '8px', padding: '0.875rem 1rem', marginBottom: '0.75rem',
            }}>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(30,64,175,0.9)', lineHeight: 1.6 }}>
                <strong>Schulform-Hinweis:</strong> {massnahme.schulformHinweis}
              </p>
            </div>
          )}

          {/* Struktur-Hinweis (Stufe C) */}
          {massnahme.strukturHinweis && (
            <div style={{
              background: 'rgba(180,83,9,0.04)', border: '1px solid rgba(180,83,9,0.18)',
              borderRadius: '8px', padding: '0.875rem 1rem',
            }}>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(120,53,15,0.9)', lineHeight: 1.6 }}>
                <strong>Struktur / Zuständigkeit:</strong> {massnahme.strukturHinweis}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .detail-panel {
            top: auto !important; bottom: 0 !important;
            left: 0 !important; right: 0 !important;
            width: 100% !important; height: 75vh !important;
            border-radius: 16px 16px 0 0;
            box-shadow: 0 -4px 24px rgba(0,0,0,0.15) !important;
          }
          .bausteine-table { display: none !important; }
          .bausteine-cards { display: block !important; }
        }
        @media (min-width: 768px) {
          .bausteine-table { display: block; }
          .bausteine-cards { display: none; }
        }
      `}</style>
    </>
  )
}

// ─── Maßnahme-Karte (Browse + Treffer) ───────────────────────────────────────

function MassnahmeKarte({ massnahme, onClick }: { massnahme: Massnahme; onClick: () => void }) {
  const cfg = STUFE_CFG[massnahme.stufe]
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '0.875rem 1rem', background: 'none', border: 'none',
        borderBottom: '1px solid var(--c-lightgray)', cursor: 'pointer', transition: 'background 0.15s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(15,123,108,0.04)' }}
      onMouseOut={e => { e.currentTarget.style.background = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div>
          <span style={{
            display: 'inline-block', fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: cfg.color, background: cfg.bg,
            borderRadius: '3px', padding: '0.1rem 0.45rem', marginBottom: '0.3rem',
          }}>
            {cfg.label}
          </span>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-dark)', marginBottom: '0.15rem' }}>
            {massnahme.titel}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'rgba(0,0,0,0.45)', fontStyle: 'italic', lineHeight: 1.4 }}>
            {massnahme.trigger}
          </div>
        </div>
        <span style={{ color: 'rgba(0,0,0,0.25)', fontSize: '1rem', flexShrink: 0 }}>›</span>
      </div>
    </button>
  )
}

// ─── Symptom-Picker ───────────────────────────────────────────────────────────

function SymptomPicker({
  selected,
  onSelect,
}: {
  selected: Symptom | null
  onSelect: (s: Symptom | null) => void
}) {
  return (
    <div style={{ padding: '1.75rem 2rem', background: '#fff', borderBottom: '1px solid var(--c-lightgray)' }}>
      <div style={{
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--c-teal)', marginBottom: '0.4rem',
      }}>
        Symptom-Picker
      </div>
      <h2 style={{
        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
        fontSize: '1.4rem', fontWeight: 500, color: 'var(--c-dark)',
        margin: '0 0 0.35rem', lineHeight: 1.2,
      }}>
        Was beobachten Sie?
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
        Klicken Sie ein Symptom an — Sie sehen passende Maßnahmen aus allen drei Stufen.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '0.625rem',
      }}>
        {SYMPTOME.map(s => {
          const isActive = selected?.id === s.id
          const isUrgent = s.priority === 'urgent'
          return (
            <button
              key={s.id}
              onClick={() => onSelect(isActive ? null : s)}
              style={{
                textAlign: 'left', padding: '0.75rem 0.875rem',
                borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s',
                border: isActive
                  ? `2px solid ${isUrgent ? '#dc2626' : 'var(--c-teal)'}`
                  : `1px solid ${isUrgent ? 'rgba(220,38,38,0.3)' : 'var(--c-lightgray)'}`,
                background: isActive
                  ? (isUrgent ? 'rgba(220,38,38,0.07)' : 'rgba(15,123,108,0.07)')
                  : (isUrgent ? 'rgba(220,38,38,0.03)' : '#fff'),
              }}
            >
              {isUrgent && (
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.2rem', letterSpacing: '0.08em' }}>
                  ⚠ KRITISCH
                </div>
              )}
              <div style={{
                fontWeight: 600, fontSize: '0.82rem',
                color: isUrgent ? '#b91c1c' : 'var(--c-dark)',
                lineHeight: 1.35, marginBottom: '0.2rem',
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.4, fontStyle: 'italic' }}>
                {s.subtitle}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Treffer-Sektion ──────────────────────────────────────────────────────────

function TrefferSektion({
  symptom,
  onSelect,
  sectionRef,
}: {
  symptom: Symptom
  onSelect: (m: Massnahme) => void
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const getMassnahmen = (ids: string[]) =>
    ids.map(id => getMassnahmeById(id)).filter((m): m is Massnahme => !!m)

  const massnahmenA = getMassnahmen(symptom.measures.a)
  const massnahmenB = getMassnahmen(symptom.measures.b)
  const massnahmenC = getMassnahmen(symptom.measures.c)

  const stufeHeaders = [
    { title: 'Was Sie allein tun können', items: massnahmenA },
    { title: 'Mit Eltern oder Schule',     items: massnahmenB },
    { title: 'Externe Fachstellen',         items: massnahmenC },
  ]

  return (
    <div ref={sectionRef} style={{ padding: '1.5rem 2rem', maxWidth: 800, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '0.2rem' }}>
            Ergebnisse für
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--c-dark)', margin: 0 }}>
            {symptom.label}
          </h3>
        </div>
      </div>

      {/* Urgent-Warnbox — nicht weggklickbar */}
      {symptom.priority === 'urgent' && symptom.topNotice && (
        <div style={{
          background: '#fef2f2', border: '2px solid #dc2626', borderRadius: '10px',
          padding: '1rem 1.25rem', marginBottom: '1.5rem',
          display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#991b1b', lineHeight: 1.55 }}>
            {symptom.topNotice}
          </p>
        </div>
      )}

      {/* Maßnahmen nach Stufe */}
      {stufeHeaders.map(({ title, items }) =>
        items.length === 0 ? null : (
          <div key={title} style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
              padding: '0.4rem 0', borderBottom: '2px solid var(--c-lightgray)',
              marginBottom: '0.25rem',
            }}>
              {title}
            </div>
            <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid var(--c-lightgray)', overflow: 'hidden' }}>
              {items.map(m => (
                <MassnahmeKarte key={m.id} massnahme={m} onClick={() => onSelect(m)} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'sofort',     label: 'Stufe A — Sofortmaßnahmen',   data: MASSNAHMEN_A },
  { id: 'kooperativ', label: 'Stufe B — Kooperativ',         data: MASSNAHMEN_B },
  { id: 'extern',     label: 'Stufe C — Externe Stellen',    data: MASSNAHMEN_C },
]

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export default function MassnahmenPage() {
  const [activeTab, setActiveTab]             = useState<string>('sofort')
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null)
  const [selectedMassnahme, setSelectedMassnahme] = useState<Massnahme | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  function handleSymptomSelect(s: Symptom | null) {
    setSelectedSymptom(s)
    if (s) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  return (
    <>
      {/* ── Header ── */}
      <header style={{
        background: 'var(--c-header)', padding: '2rem 2rem 2.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--c-teal-light)',
          marginBottom: '0.5rem', marginTop: 0,
        }}>
          Maßnahmen & Folgeschritte
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: '0 0 0.75rem',
        }}>
          Was tun nach dem Gespräch?
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', margin: 0, maxWidth: '52ch', lineHeight: 1.6 }}>
          Von einfachen Sofortmaßnahmen bis zur Einbeziehung externer Stellen – ein praktischer Überblick.
        </p>
      </header>

      {/* ── Symptom-Picker ── */}
      <SymptomPicker selected={selectedSymptom} onSelect={handleSymptomSelect} />

      {/* ── Treffer-Sektion (erscheint nach Symptom-Klick) ── */}
      {selectedSymptom && (
        <TrefferSektion
          symptom={selectedSymptom}
          onSelect={setSelectedMassnahme}
          sectionRef={resultsRef}
        />
      )}

      {/* ── Trennlinie + Browse-Label ── */}
      <div style={{
        background: 'var(--c-offwhite)', borderTop: '1px solid var(--c-lightgray)',
        padding: '1rem 2rem 0',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
          margin: 0,
        }}>
          Oder stöbern nach Stufe
        </p>
      </div>

      {/* ── Tab-Navigation ── */}
      <div style={{
        background: 'var(--c-offwhite)',
        borderBottom: '2px solid var(--c-lightgray)',
        padding: '0 1.5rem',
      }}>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(tab => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.1rem', fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'var(--c-teal)' : 'rgba(0,0,0,0.5)',
                  background: 'none', border: 'none',
                  borderBottom: isActive ? '3px solid var(--c-teal)' : '3px solid transparent',
                  marginBottom: '-2px', cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Tab-Inhalt ── */}
      <main style={{ padding: '1.5rem 2rem 2rem', maxWidth: 800, margin: '0 auto' }}>
        {TABS.map(tab =>
          tab.id !== activeTab ? null : (
            <div key={tab.id}>
              <div style={{
                background: '#fff', borderRadius: '10px',
                border: '1px solid var(--c-lightgray)', overflow: 'hidden',
              }}>
                <div style={{ padding: '1rem 1rem 0.5rem', borderBottom: '1px solid var(--c-lightgray)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                    {tab.id === 'sofort'     && 'Diese Maßnahmen können Sie ohne Abstimmung mit anderen sofort einleiten.'}
                    {tab.id === 'kooperativ' && 'Diese Maßnahmen erfordern Abstimmung mit Eltern oder schulinternen Stellen.'}
                    {tab.id === 'extern'     && 'Wenn schulinterne Maßnahmen nicht ausreichen oder besondere Fachkompetenz gefragt ist.'}
                  </p>
                </div>
                {tab.data.map(m => (
                  <MassnahmeKarte key={m.id} massnahme={m} onClick={() => setSelectedMassnahme(m)} />
                ))}
              </div>
            </div>
          )
        )}

        {/* ── § 8a-Box (immer sichtbar) ── */}
        <div style={{
          marginTop: '2rem',
          background: 'rgba(180,83,9,0.04)',
          borderTop: '4px solid rgba(180,83,9,0.5)',
          borderRadius: '0 0 8px 8px',
          padding: '1.25rem 1.5rem',
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'rgba(120,53,15,0.9)', margin: '0 0 0.5rem' }}>
            Meldepflicht – wann und wie?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.65, margin: '0 0 0.75rem' }}>
            § 8a SGB VIII verpflichtet Schulen zum Handeln bei konkreten Hinweisen auf Kindeswohlgefährdung: Vernachlässigung, Gewalt, sexueller Missbrauch oder erhebliche psychische Gefährdung.
          </p>
          <ol style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.8 }}>
            <li>Beobachtungen sachlich dokumentieren</li>
            <li>Schulleitung und/oder Schulsozialdienst informieren</li>
            <li>Risikoeinschätzung – ggf. mit ASD oder Fachkraft für Kinderschutz</li>
            <li>Eltern informieren (Ausnahme: wenn Gespräch das Kind gefährden würde)</li>
            <li>Bei dringendem Verdacht: Meldung ans Jugendamt</li>
          </ol>
        </div>
      </main>

      {/* ── Detail-Panel ── */}
      {selectedMassnahme && (
        <DetailPanel
          massnahme={selectedMassnahme}
          onClose={() => setSelectedMassnahme(null)}
        />
      )}
    </>
  )
}
