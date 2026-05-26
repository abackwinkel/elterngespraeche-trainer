'use client'

import { useState } from 'react'

// ─── Daten ─────────────────────────────────────────────────────────────────────

type MassnahmeItem = {
  id: string
  titel: string
  wann: string
  beispiel: string
}

type ExterneItem = {
  id: string
  titel: string
  wann: string
  hinweis: string
}

const SOFORTMASSNAHMEN: MassnahmeItem[] = [
  { id: 's1',  titel: 'Sitzplatz verändern',                          wann: 'Konzentrationsprobleme, soziale Konflikte',               beispiel: 'Kind sitzt vorne oder ans Fenster, weg von störenden Mitschülerinnen' },
  { id: 's2',  titel: 'Gezielte Ansprache im Unterricht',             wann: 'Wenn Kind nicht mehr erreichbar wirkt',                  beispiel: 'Ruhiges Kurzgespräch am Rande – signalisiert: „Ich sehe dich"' },
  { id: 's3',  titel: 'Strukturierte Aufgabenformate',                wann: 'Bei Überforderung oder Leistungsabfall',                 beispiel: 'Checklisten, Teilaufgaben, mehr Zeit bei Hausaufgaben' },
  { id: 's4',  titel: 'Beobachtungsnotizen anlegen',                  wann: 'Vor jedem Gespräch / zur Dokumentation',                 beispiel: 'Datum, konkrete Situation, Verhalten – keine Interpretationen' },
  { id: 's5',  titel: 'Gesprächstermin proaktiv anbieten',            wann: 'Bei ersten Anzeichen von Veränderung',                   beispiel: 'Nicht warten bis Eltern kommen – lieber früh ansprechen' },
  { id: 's6',  titel: 'Hausaufgaben-Heft einführen oder prüfen',      wann: 'Vergessen von Hausaufgaben, schlechte Selbstorganisation', beispiel: 'Tägliches Eintragen einfordern; kurz kontrollieren lassen' },
  { id: 's7',  titel: 'Reminder-Ritual am Ende der Stunde',           wann: 'Regelmäßiges Vergessen von Material oder Aufgaben',      beispiel: 'Letzte 5 Minuten: Aufgaben gemeinsam eintragen, Tasche packen' },
  { id: 's8',  titel: 'Klare Regel für Verspätungen kommunizieren',   wann: 'Häufiges Zuspätkommen',                                  beispiel: 'Mündlich und schriftlich: Was passiert bei Verspätung, wie holt man auf' },
  { id: 's9',  titel: 'Nachholaufgabe statt Strafe',                  wann: 'Zuspätkommen oder vergessene Hausaufgaben',              beispiel: 'Aufgabe bis morgen nachreichen – keine Bloßstellung, klare Konsequenz' },
  { id: 's10', titel: 'Nachrichten-Ritual etablieren',                wann: 'Mitteilungen werden nicht weitergegeben',                beispiel: 'Zettel im Heft einkleben, Elternteil soll unterschreiben und zurückgeben' },
  { id: 's11', titel: 'Digitalen Elternkanal nutzen',                 wann: 'Wenn Papierweg wiederholt versagt',                      beispiel: 'SchoolFox, Eltern-App, Schulmanager: Kurze direkte Push-Nachricht' },
  { id: 's12', titel: 'Spiegelgespräch führen',                       wann: 'Kind verhält sich auffällig, ohne den Grund zu benennen', beispiel: 'Vier Augen, sachlich: „Ich habe bemerkt, dass …" – ohne Bewertung' },
  { id: 's13', titel: 'Lob und positive Verstärkung gezielt einsetzen', wann: 'Bei Demotivation oder wenn Kind sich unsichtbar fühlt',  beispiel: 'Konkrete, echte Anerkennung – kein allgemeines Lob, sondern benennbares Verhalten' },
  { id: 's14', titel: 'Kontakt bei positivem Erlebnis aufnehmen',     wann: 'Wenn Kontakt bisher nur bei Problemen stattfand',        beispiel: 'Kurze Nachricht: „Max hat heute wirklich beeindruckt" – verändert Beziehungsdynamik' },
  { id: 's15', titel: 'Fehlzeiten dokumentieren und Muster erkennen', wann: 'Bei gehäuften Fehltagen oder frühen Schulverweigerungstendenzen', beispiel: 'Eigene Tabelle: wann, wie oft, mit/ohne Entschuldigung – Muster werden sichtbar' },
]

const KOOPERATIVE_MASSNAHMEN: MassnahmeItem[] = [
  { id: 'k1',  titel: 'Verbindliche Vereinbarung schriftlich festhalten', wann: 'Wenn Eltern und Schule gemeinsam handeln müssen',    beispiel: 'Klare Formulierung: wer macht was bis wann – beide unterschreiben' },
  { id: 'k2',  titel: 'Kommunikationsheft oder App-Kanal etablieren',    wann: 'Bei regelmäßigem Abstimmungsbedarf',                 beispiel: 'Kurze Rückmeldung per Notiz oder SchoolFox' },
  { id: 'k3',  titel: 'Nachfolgetermin vereinbaren',                      wann: 'Wenn Maßnahmen laufen, aber Wirkung unklar ist',    beispiel: 'In 4 Wochen: kurze Rückmeldung zum Stand – hält beide verbindlich' },
  { id: 'k4',  titel: 'Absprache zu Hausaufgaben-Unterstützung',          wann: 'Wenn Kind zuhause keine Unterstützung bekommt',     beispiel: 'Was können und wollen Eltern leisten – realistische, entlastende Vereinbarung' },
  { id: 'k5',  titel: 'Schulsozialdienst hinzuziehen',                    wann: 'Bei sozialen Problemen oder schwierigen Familiensituationen', beispiel: 'Vermittelnde Funktion – kein Vorwurf an die Familie' },
  { id: 'k6',  titel: 'Beratungslehrkraft einschalten',                   wann: 'Bei Anzeichen psychischer Belastung, Mobbing, Schulverweigerung', beispiel: 'Frühzeitig – nicht erst als Eskalationsstufe' },
  { id: 'k7',  titel: 'Förderplan erstellen',                             wann: 'Bei anerkannter Lernschwäche oder diagnostiziertem Förderbedarf', beispiel: 'Dokumentiertes Ziel, Maßnahmen, Zeitraum – schützt alle Seiten rechtlich' },
  { id: 'k8',  titel: 'Schulleitung informieren',                         wann: 'Wenn Gespräch eskaliert ist oder rechtliche Fragen entstehen', beispiel: 'Protokoll mitbringen, sachlich berichten' },
  { id: 'k9',  titel: 'Klassenkonferenz einberufen',                      wann: 'Bei Problemen, die mehrere Fächer betreffen',       beispiel: 'Gemeinsamer Blick aller Fachlehrkräfte – oft unterschiedliche Wahrnehmungen' },
  { id: 'k10', titel: 'Nachteilsausgleich beantragen',                    wann: 'Bei diagnostizierter Lernschwäche (LRS, ADHS)',     beispiel: 'Mehr Zeit oder andere Aufgabenform – formal beantragt, bundeslandspezifisch' },
  { id: 'k11', titel: 'Schüler aktiv in Gespräch einbeziehen',            wann: 'Wenn Kind zwischen Schule und Eltern „eingeklemmt" wirkt', beispiel: 'Dreiergespräch: Kind, Elternteil, Lehrkraft – Kind bekommt eine Stimme' },
]

const EXTERNE_STELLEN: ExterneItem[] = [
  { id: 'e1', titel: 'Schulpsychologischer Dienst',              wann: 'Leistungsabfall mit emotionalem Hintergrund, Schulangst',   hinweis: 'Auf eigene Initiative der Eltern oder auf Empfehlung der Lehrkraft' },
  { id: 'e2', titel: 'Erziehungsberatungsstelle',                wann: 'Familiäre Konflikte, Trennung/Scheidung, Erziehungsfragen', hinweis: 'Oft kostenlos, niedrigschwellig, anonym möglich' },
  { id: 'e3', titel: 'Kinderarzt / Hausarzt',                    wann: 'Körperliche Ursachen möglich (Schlaf, Ernährung, ADHS-Verdacht)', hinweis: 'Eltern können den Arzttermin selbst einleiten' },
  { id: 'e4', titel: 'Kinder- und Jugendpsychiatrische Beratung', wann: 'Anhaltende psychische Symptome',                          hinweis: 'Nicht diagnostizieren – behutsam ansprechen und weiterverweisen' },
  { id: 'e5', titel: 'Jugendamt / ASD',                          wann: 'Anhaltende Kindeswohlgefährdung oder konkrete Hinweise',   hinweis: 'Meldepflicht nach § 8a SGB VIII – zunächst intern besprechen' },
]

const TABS = [
  { id: 'sofort',   label: 'Sofortmaßnahmen' },
  { id: 'kooperativ', label: 'Kooperative Maßnahmen' },
  { id: 'extern',   label: 'Externe Unterstützung' },
]

// ─── Detail-Panel ─────────────────────────────────────────────────────────────

type SelectedItem =
  | { type: 'massnahme'; item: MassnahmeItem }
  | { type: 'extern'; item: ExterneItem }

function DetailPanel({ selected, onClose }: { selected: SelectedItem; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 40,
        }}
      />

      {/* Panel – Desktop: rechts; Mobile: unten */}
      <div
        style={{
          position: 'fixed',
          zIndex: 50,
          background: '#fff',
          overflowY: 'auto',
          // Desktop
          top: 0,
          right: 0,
          width: 'min(50%, 480px)',
          height: '100%',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        }}
        className="detail-panel"
      >
        <div style={{ padding: '2rem' }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'none', border: 'none',
              fontSize: '1.5rem', cursor: 'pointer',
              color: 'rgba(0,0,0,0.4)', lineHeight: 1, padding: '0.25rem',
            }}
            aria-label="Schließen"
          >×</button>

          {selected.type === 'massnahme' ? (
            <>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-teal)', margin: '0 0 0.5rem' }}>
                Maßnahme
              </p>
              <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1.5rem', lineHeight: 1.2, paddingRight: '2rem' }}>
                {selected.item.titel}
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '0.4rem' }}>
                  Wann einsetzen?
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, margin: 0 }}>
                  {selected.item.wann}
                </p>
              </div>

              <div style={{
                background: 'rgba(15,123,108,0.05)',
                border: '1px solid rgba(15,123,108,0.15)',
                borderRadius: '8px', padding: '1rem 1.25rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-teal)', marginBottom: '0.5rem' }}>
                  Konkretes Beispiel
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  {selected.item.beispiel}
                </p>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-teal)', margin: '0 0 0.5rem' }}>
                Externe Stelle
              </p>
              <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1.5rem', lineHeight: 1.2, paddingRight: '2rem' }}>
                {selected.item.titel}
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '0.4rem' }}>
                  Wann einbeziehen?
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, margin: 0 }}>
                  {selected.item.wann}
                </p>
              </div>

              <div style={{
                background: 'rgba(15,123,108,0.05)',
                border: '1px solid rgba(15,123,108,0.15)',
                borderRadius: '8px', padding: '1rem 1.25rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-teal)', marginBottom: '0.5rem' }}>
                  Hinweis
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6, margin: 0 }}>
                  {selected.item.hinweis}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 767px) {
          .detail-panel {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 75vh !important;
            border-radius: 16px 16px 0 0;
            box-shadow: 0 -4px 24px rgba(0,0,0,0.15) !important;
          }
        }
      `}</style>
    </>
  )
}

// ─── Zeilen-Komponenten ────────────────────────────────────────────────────────

function MassnahmeRow({ item, onClick }: { item: MassnahmeItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '0.875rem 1rem',
        background: 'none', border: 'none',
        borderBottom: '1px solid var(--c-lightgray)',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(15,123,108,0.04)' }}
      onMouseOut={e => { e.currentTarget.style.background = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-dark)', marginBottom: '0.2rem' }}>
            {item.titel}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.775rem', color: 'var(--c-teal)',
              background: 'rgba(15,123,108,0.07)', borderRadius: '4px',
              padding: '0.1rem 0.5rem', lineHeight: 1.6,
            }}>
              {item.wann}
            </span>
          </div>
        </div>
        <span style={{ color: 'rgba(0,0,0,0.25)', fontSize: '1rem', flexShrink: 0 }}>›</span>
      </div>
    </button>
  )
}

function ExterneRow({ item, onClick }: { item: ExterneItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '1rem 1rem',
        background: 'none', border: 'none',
        borderBottom: '1px solid var(--c-lightgray)',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(15,123,108,0.04)' }}
      onMouseOut={e => { e.currentTarget.style.background = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--c-dark)', marginBottom: '0.25rem' }}>
            {item.titel}
          </div>
          <p style={{ fontSize: '0.825rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
            {item.wann}
          </p>
        </div>
        <span style={{ color: 'rgba(0,0,0,0.25)', fontSize: '1rem', flexShrink: 0 }}>›</span>
      </div>
    </button>
  )
}

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export default function MassnahmenPage() {
  const [activeTab, setActiveTab] = useState('sofort')
  const [selected, setSelected] = useState<SelectedItem | null>(null)

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

      {/* Tab-Navigation */}
      <div style={{
        background: '#fff',
        borderBottom: '2px solid var(--c-lightgray)',
        padding: '0 1.5rem',
      }}>
        <div style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
          paddingTop: '0.9rem', marginBottom: '0.15rem',
        }}>
          Bereich wählen
        </div>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.1rem',
                  fontSize: '0.9rem', fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'var(--c-teal)' : 'rgba(0,0,0,0.5)',
                  background: 'none', border: 'none',
                  borderBottom: isActive ? '3px solid var(--c-teal)' : '3px solid transparent',
                  marginBottom: '-2px',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <main style={{ padding: '1.5rem 2rem', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          background: '#fff', borderRadius: '10px',
          border: '1px solid var(--c-lightgray)',
          overflow: 'hidden',
        }}>
          {activeTab === 'sofort' && (
            <div>
              <div style={{ padding: '1.25rem 1rem 0.5rem', borderBottom: '1px solid var(--c-lightgray)' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                  Diese Maßnahmen können Sie ohne Abstimmung mit anderen sofort einleiten.
                </p>
              </div>
              {SOFORTMASSNAHMEN.map(item => (
                <MassnahmeRow key={item.id} item={item} onClick={() => setSelected({ type: 'massnahme', item })} />
              ))}

              {/* §8a Hinweis */}
              <div style={{
                margin: '0',
                background: 'rgba(180, 83, 9, 0.04)',
                border: '0',
                borderTop: '4px solid rgba(180, 83, 9, 0.5)',
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
            </div>
          )}

          {activeTab === 'kooperativ' && (
            <div>
              <div style={{ padding: '1.25rem 1rem 0.5rem', borderBottom: '1px solid var(--c-lightgray)' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                  Diese Maßnahmen erfordern Abstimmung mit Eltern oder schulinternen Stellen.
                </p>
              </div>
              {KOOPERATIVE_MASSNAHMEN.map(item => (
                <MassnahmeRow key={item.id} item={item} onClick={() => setSelected({ type: 'massnahme', item })} />
              ))}
            </div>
          )}

          {activeTab === 'extern' && (
            <div>
              <div style={{ padding: '1.25rem 1rem 0.5rem', borderBottom: '1px solid var(--c-lightgray)' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                  Wenn schulinterne Maßnahmen nicht ausreichen oder besondere Fachkompetenz gefragt ist.
                </p>
              </div>
              {EXTERNE_STELLEN.map(item => (
                <ExterneRow key={item.id} item={item} onClick={() => setSelected({ type: 'extern', item })} />
              ))}
            </div>
          )}
        </div>
      </main>

      {selected && (
        <DetailPanel selected={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
