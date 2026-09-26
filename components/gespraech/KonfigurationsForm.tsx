'use client'

import { useState, useEffect } from 'react'
import type {
  GespraechsKonfiguration, Schultyp, Klassenstufe, Gespraechsanlass,
  Familiensituation, Elterntyp, Schwierigkeit,
  ElternPerson, KindGeschlecht, Gespraechsinitiative, Sprachbarriere,
} from '@/types'
import { createClient } from '@/lib/supabase'
import {
  KLASSENSTUFE_LABEL,
  ANLASS_LABEL,
  ANLASS_OPTIONEN_BY_SCHULTYP,
  FAMILIE_LABEL,
  ELTERNTYP_LABEL,
  SCHWIERIGKEIT_LABEL,
} from '@/lib/szenarien-data'
import MeineFaelleDrawer, { type GespeicherterFall } from './MeineFaelleDrawer'

// ─── Konstanten ───────────────────────────────────────────────────────────────

const PERSONEN_OPTIONEN: ElternPerson[] = [
  'Mutter', 'Vater', 'Stiefmutter', 'Stiefvater',
  'Lebenspartnerin', 'Lebenspartner', 'Großmutter', 'Großvater',
  'Sonstige Bezugsperson',
]

const GESCHLECHT_OPTIONEN: [KindGeschlecht, string][] = [
  ['keine-angabe', 'Keine Angabe / nicht bekannt'],
  ['maedchen',     'Mädchen'],
  ['junge',        'Junge'],
  ['divers',       'Divers (amtlich)'],
  ['nicht-binaer', 'Nicht-binär'],
]

const INITIATIVE_OPTIONEN: [Gespraechsinitiative, string][] = [
  ['elternsprechtag', 'Elternsprechtag'],
  ['schule',          'Die Schule hat um das Gespräch gebeten'],
  ['eltern',          'Die Eltern haben um das Gespräch gebeten'],
]

const SPRACHBARRIERE_OPTIONEN: [Sprachbarriere, string][] = [
  ['deutsch', 'Gespräch auf Deutsch (keine Einschränkung)'],
  ['gering',  'Geringe Deutschkenntnisse'],
  ['keine',   'Keine Deutschkenntnisse'],
]

const SCHWIERIGKEIT_BESCHREIBUNG: Record<Schwierigkeit, string> = {
  'ruhige-see':    'Gesprächspartner ist grundsätzlich gesprächsbereit',
  'gegenwind':     'Spannungen vorhanden, aber konstruktiv lösbar',
  'gewitterfront': 'Hochkonflikthaftes Gespräch, maximale Herausforderung',
}

// Stand 26.09.2026. Beide Absätze müssen dasselbe sagen wie der Code und wie
// app/datenschutz/page.tsx (Abschnitte 4 und 5): Die Eingaben gehen an Anthropic,
// das beendete Gespräch wird im Konto gespeichert (/api/gespraech/session).
const DATENSCHUTZ_ABSATZ_1 =
  'Was du für die Simulation eingibst – die Angaben zum Fall, deine Beschreibung der Situation und deine Gesprächsbeiträge –, ' +
  'geht an die KI von Anthropic (USA), die daraus das Elterngespräch erzeugt. ' +
  'Wenn du das Gespräch beendest, wird es mit der Reflexion in deinem Konto gespeichert, damit du es später nachlesen kannst. ' +
  'Löschen kannst du es jederzeit.'

const DATENSCHUTZ_ABSATZ_2 =
  'Gib deshalb bitte keine echten Namen ein und nichts, woran man ein Kind, eine Familie oder eine Schule erkennen kann. ' +
  'Den Vornamen des Kindes kürzt die App auf den Anfangsbuchstaben – außer du bestätigst am Namensfeld, dass er erfunden ist.'

// Merkt sich nur, dass der Hinweis gelesen wurde – keine Einwilligung. Die Version im
// Namen sorgt dafür, dass ein geänderter Hinweis wieder erscheint.
const HINWEIS_SCHLUESSEL = 'datenschutz-hinweis-v2'

// ─── Hilfsfunktion ────────────────────────────────────────────────────────────

function truncateToInitial(name: string): string {
  const t = name.trim()
  if (!t) return ''
  return t.charAt(0).toUpperCase() + '.'
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  schultyp: Schultyp
  onStart: (config: GespraechsKonfiguration, fallGespeichert: boolean) => void
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function KonfigurationsForm({ schultyp, onStart }: Props) {

  // S5a – Datenschutz-Hinweis (nur Information, keine Einwilligung)
  const [showDatenschutz, setShowDatenschutz] = useState(false)
  const [nichtMehrZeigen, setNichtMehrZeigen] = useState(false)

  useEffect(() => {
    try {
      // Schlüssel der Fassung bis 25.09.2026 entfernen: Sie speicherten eine Zustimmung
      // „für diese Sitzung“ dauerhaft – Wortlaut und Verhalten passten nicht zusammen.
      localStorage.removeItem('datenschutz-permanent')
      sessionStorage.removeItem('datenschutz-bestaetigt')
      if (localStorage.getItem(HINWEIS_SCHLUESSEL) || sessionStorage.getItem(HINWEIS_SCHLUESSEL)) {
        setShowDatenschutz(false)
        return
      }
    } catch {
      // Speicher gesperrt (z. B. privates Fenster): Hinweis zeigen
    }
    setShowDatenschutz(true)
  }, [])

  function handleDatenschutzGelesen() {
    try {
      sessionStorage.setItem(HINWEIS_SCHLUESSEL, 'gelesen')
      if (nichtMehrZeigen) localStorage.setItem(HINWEIS_SCHLUESSEL, 'gelesen')
    } catch {
      // Speicher gesperrt: Der Hinweis erscheint beim nächsten Mal wieder
    }
    setShowDatenschutz(false)
  }

  // S3 – Personen
  const [person1, setPerson1] = useState<ElternPerson | ''>('')
  const [person2, setPerson2] = useState<ElternPerson | '–'>('–')

  // S5b / S5c – Kind. Der volle Vorname geht nur an die KI, wenn für GENAU diesen
  // Namen bestätigt ist, dass er erfunden ist – jede Änderung am Namen hebt das auf.
  const [kindName, setKindName] = useState('')
  const [nameErfunden, setNameErfunden] = useState(false)
  const [kindGeschlecht, setKindGeschlecht] = useState<KindGeschlecht>('keine-angabe')

  // S6 – Initiative
  const [gespraechsinitiative, setGespraechsinitiative] = useState<Gespraechsinitiative>('elternsprechtag')

  // Bestehende Felder
  const defaultKlassenstufe: Klassenstufe = schultyp === 'grundschule' ? '3-4' : '7-8'
  const [klassenstufe, setKlassenstufe] = useState<Klassenstufe>(defaultKlassenstufe)
  const [anlass, setAnlass] = useState<Gespraechsanlass>('leistungsabfall')
  const [familie, setFamilie] = useState<Familiensituation>('keine')
  const [elterntyp, setElterntyp] = useState<Elterntyp>('defensiv')
  const [schwierigkeit, setSchwierigkeit] = useState<Schwierigkeit>('gegenwind')

  // S11 – Sprachbarriere
  const [sprachbarriere, setSprachbarriere] = useState<Sprachbarriere>('deutsch')

  // S9 – Situationsfreitext
  const [situationText, setSituationText] = useState('')

  // S10 – Fall speichern
  const [fallSpeichern, setFallSpeichern] = useState(false)

  // S12 – Meine Fälle Drawer
  const [showMeineFaelle, setShowMeineFaelle] = useState(false)

  function ladeKonfiguration(fall: GespeicherterFall) {
    setPerson1(fall.person1 ?? '')
    setPerson2(fall.person2 ?? '–')
    setKlassenstufe(fall.klassenstufe)
    setAnlass(fall.gespraechsanlass)
    setFamilie(fall.familiensituation)
    setElterntyp(fall.elterntyp)
    if (fall.gespraechsinitiative) setGespraechsinitiative(fall.gespraechsinitiative)
    setSituationText(fall.situation_text ?? '')
    if (fall.kind_initial) setKindName(fall.kind_initial)
    setNameErfunden(false)
    if (fall.kind_geschlecht) setKindGeschlecht(fall.kind_geschlecht)
    if (fall.sprachbarriere) setSprachbarriere(fall.sprachbarriere as Sprachbarriere)
  }

  // S7 – Klassenstufen-Filter je Schultyp
  const klassenstufeOptionen = Object.entries(KLASSENSTUFE_LABEL).filter(([val]) => {
    if (schultyp === 'grundschule')  return val === '1-2' || val === '3-4'
    if (schultyp === 'mittelschule') return ['5-6', '7-8', '9-10'].includes(val)
    if (schultyp === 'realschule' || schultyp === 'gesamtschule')
                                     return ['5-6', '7-8', '9-10'].includes(val)
    // gymnasium: 5-12
    return val !== '1-2' && val !== '3-4'
  })

  // S15 – Gesprächsanlass-Filter je Schultyp
  const anlassOptionen = ANLASS_OPTIONEN_BY_SCHULTYP[schultyp].map(
    key => [key, ANLASS_LABEL[key]] as [string, string]
  )

  function getEffectiveKindName(): string | undefined {
    if (!kindName.trim()) return undefined
    return nameErfunden ? kindName.trim() : truncateToInitial(kindName)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!person1) return

    const config: GespraechsKonfiguration = {
      schultyp,
      klassenstufe,
      anlass,
      familie,
      elterntyp,
      schwierigkeit,
      person1:             person1 as ElternPerson,
      person2:             person2 !== '–' ? person2 as ElternPerson : undefined,
      kindName:            getEffectiveKindName(),
      kindGeschlecht:      kindGeschlecht !== 'keine-angabe' ? kindGeschlecht : undefined,
      gespraechsinitiative,
      situationText:       situationText.trim() || undefined,
      sprachbarriere:      sprachbarriere !== 'deutsch' ? sprachbarriere : undefined,
    }

    // S10 – Fall speichern (direkt via Supabase Browser-Client)
    if (fallSpeichern) {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          console.error('[Konfiguration speichern] Nicht authentifiziert')
        } else {
          const kindInitial = kindName.trim() ? truncateToInitial(kindName) : null
          const anlassLabel = ANLASS_LABEL[config.anlass as Gespraechsanlass] ?? config.anlass
          const klassLabel  = KLASSENSTUFE_LABEL[config.klassenstufe as Klassenstufe] ?? `Kl. ${config.klassenstufe}`
          const label = [
            kindInitial ? `${kindInitial},` : null,
            klassLabel,
            '–',
            anlassLabel,
          ].filter(Boolean).join(' ')

          const { error } = await supabase
            .from('elterngespraech_konfigurationen')
            .insert({
              user_id:              user.id,
              label,
              schultyp:             config.schultyp,
              klassenstufe:         config.klassenstufe,
              person1:              config.person1,
              person2:              config.person2 ?? null,
              elterntyp:            config.elterntyp,
              familiensituation:    config.familie,
              gespraechsinitiative: config.gespraechsinitiative ?? null,
              gespraechsanlass:     config.anlass,
              situation_text:       config.situationText ?? null,
              kind_initial:         kindInitial,
              kind_geschlecht:      config.kindGeschlecht ?? null,
              sprachbarriere:       config.sprachbarriere ?? null,
            })

          if (error) {
            console.error('[Konfiguration speichern] Supabase-Fehler:', error.message)
          }
        }
      } catch (err) {
        console.error('[Konfiguration speichern] Unerwarteter Fehler:', err)
      }
    }

    onStart(config, fallSpeichern)
  }

  return (
    <>
      {/* S12 – Meine Fälle Drawer */}
      <MeineFaelleDrawer
        open={showMeineFaelle}
        schultyp={schultyp}
        onClose={() => setShowMeineFaelle(false)}
        onLaden={ladeKonfiguration}
      />

      {/* S5a – Datenschutz-Modal */}
      {showDatenschutz && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h2
              className="text-2xl font-semibold text-[var(--c-dark)] mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Hinweis zum Datenschutz
            </h2>
            <p className="text-sm text-[var(--c-dark)] leading-relaxed mb-3">
              {DATENSCHUTZ_ABSATZ_1}
            </p>
            <p className="text-sm text-[var(--c-dark)] leading-relaxed mb-3">
              {DATENSCHUTZ_ABSATZ_2}
            </p>
            <p className="text-sm text-[var(--c-gray)] leading-relaxed mb-6">
              Einzelheiten und die Möglichkeit zum Löschen:{' '}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--c-teal)] underline"
              >
                Datenschutzerklärung
              </a>
            </p>
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={nichtMehrZeigen}
                onChange={e => setNichtMehrZeigen(e.target.checked)}
                className="w-4 h-4 accent-[var(--c-teal)]"
              />
              <span className="text-sm text-[var(--c-gray)]">
                Diesen Hinweis in diesem Browser nicht mehr anzeigen
              </span>
            </label>
            <button
              onClick={handleDatenschutzGelesen}
              className="w-full py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] transition-colors"
            >
              Verstanden
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-semibold text-[var(--c-dark)]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Gesprächsschmiede
            </h1>
            <p className="mt-2 text-base text-[var(--c-gray)]">
              Konfiguriere dein Szenario&nbsp;– dann übernimmt die KI die Elternrolle.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMeineFaelle(true)}
            className="shrink-0 mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors"
            style={{
              borderColor: 'var(--c-teal)',
              color: 'var(--c-teal)',
              background: 'transparent',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--c-mint)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            📂 Meine Fälle
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* S3 – Personen */}
          <div>
            <div className="text-sm font-semibold text-[var(--c-dark)] mb-3">
              Wer nimmt an dem Gespräch teil?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--c-dark)] mb-1">
                  Person 1 <span className="text-red-500 ml-0.5">*</span>
                </label>
                <select
                  required
                  value={person1}
                  onChange={e => setPerson1(e.target.value as ElternPerson | '')}
                  className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent"
                >
                  <option value="" disabled>Bitte wählen&nbsp;…</option>
                  {PERSONEN_OPTIONEN.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--c-dark)] mb-1">
                  Person 2{' '}
                  <span className="text-xs text-[var(--c-gray)] font-normal">(optional)</span>
                </label>
                <select
                  value={person2}
                  onChange={e => setPerson2(e.target.value as ElternPerson | '–')}
                  className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent"
                >
                  <option value="–">– (keine weitere Person)</option>
                  {PERSONEN_OPTIONEN.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* S5b / S5c – Kind */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--c-dark)] mb-1">
                Vorname des Kindes{' '}
                <span className="text-xs text-[var(--c-gray)] font-normal">(optional, bitte erfunden)</span>
              </label>
              <input
                type="text"
                value={kindName}
                onChange={e => { setKindName(e.target.value); setNameErfunden(false) }}
                placeholder={'z. B. Marie'}
                maxLength={50}
                className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent"
              />
              {kindName.trim() && (
                <>
                  <label className="flex items-start gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={nameErfunden}
                      onChange={e => setNameErfunden(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[var(--c-teal)]"
                    />
                    <span className="text-xs text-[var(--c-dark)]">
                      Der Name ist erfunden&nbsp;– vollständig verwenden
                    </span>
                  </label>
                  {!nameErfunden && (
                    <p className="text-xs text-[var(--c-gray)] mt-1">
                      Wird als „{truncateToInitial(kindName)}“ verwendet.
                    </p>
                  )}
                </>
              )}
            </div>
            <SelectField
              label="Geschlecht / Geschlechtsidentität des Kindes"
              value={kindGeschlecht}
              onChange={v => setKindGeschlecht(v as KindGeschlecht)}
              options={GESCHLECHT_OPTIONEN}
            />
          </div>

          {/* S6 – Gesprächsinitiative */}
          <SelectField
            label="Wie kommt es zu diesem Gespräch?"
            value={gespraechsinitiative}
            onChange={v => setGespraechsinitiative(v as Gespraechsinitiative)}
            options={INITIATIVE_OPTIONEN}
          />

          {/* S7 – Klassenstufe + S8 – Anlass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SelectField
              label="Klassenstufe"
              value={klassenstufe}
              onChange={v => setKlassenstufe(v as Klassenstufe)}
              options={klassenstufeOptionen}
            />
            <SelectField
              label="Gesprächsanlass"
              value={anlass}
              onChange={v => setAnlass(v as Gespraechsanlass)}
              options={anlassOptionen}
            />
          </div>

          {/* S4 – Familiensituation + Elterntyp mit „Nicht bekannt" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SelectField
              label="Familiensituation"
              value={familie}
              onChange={v => setFamilie(v as Familiensituation)}
              options={[
                ...Object.entries(FAMILIE_LABEL).filter(([k]) => k !== 'unbekannt'),
                ['unbekannt', 'Nicht bekannt'],
              ]}
            />
            <SelectField
              label="Elterntyp / Charaktertyp"
              value={elterntyp}
              onChange={v => setElterntyp(v as Elterntyp)}
              options={[
                ...Object.entries(ELTERNTYP_LABEL).filter(([k]) => k !== 'unbekannt'),
                ['unbekannt', 'Nicht bekannt'],
              ]}
            />
          </div>

          {elterntyp === 'unbekannt' && (
            <p className="text-xs text-[var(--c-gray)] -mt-3">
              Bei „Nicht bekannt“ leitet die KI das Elternverhalten aus dem Situationsfeld ab. Wenn auch das leer ist, spielt sie einen neutralen Gesprächspartner.
            </p>
          )}

          {/* S11 – Sprachbarriere */}
          <SelectField
            label="Deutschkenntnisse des Elternteils"
            value={sprachbarriere}
            onChange={v => setSprachbarriere(v as Sprachbarriere)}
            options={SPRACHBARRIERE_OPTIONEN}
          />

          {/* S9 – Situationsfreitext */}
          <div>
            <label className="block text-sm font-medium text-[var(--c-dark)] mb-1">
              Situation und Vorgeschichte{' '}
              <span className="text-xs text-[var(--c-gray)] font-normal">(optional)</span>
            </label>
            <textarea
              value={situationText}
              onChange={e => setSituationText(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder={'Beschreib, was du über die Situation und die Vorgeschichte weißt – je konkreter, desto gezielter geht die Simulation auf deinen Fall ein. Zum Beispiel: Wie ist das Kind bisher aufgefallen? Gab es schon Kontakte mit den Eltern? Was weißt du über die Familiendynamik? Was ist dein Ziel für dieses Gespräch?'}
              className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-[var(--c-gray)]">
                Bitte keine echten Namen und nichts, woran man das Kind, die Familie oder die Schule erkennt&nbsp;– beschreib die Situation verfremdet.
              </span>
              <span className="text-xs text-[var(--c-gray)] ml-2 shrink-0">
                {situationText.length}/1000
              </span>
            </div>
          </div>

          {/* Schwierigkeitsgrad */}
          <div>
            <label className="block text-sm font-medium text-[var(--c-dark)] mb-2">
              Schwierigkeitsgrad
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.entries(SCHWIERIGKEIT_LABEL) as [Schwierigkeit, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSchwierigkeit(value)}
                  className={`
                    p-4 rounded-xl border-2 text-left transition-all
                    ${schwierigkeit === value
                      ? 'border-[var(--c-teal)] bg-[var(--c-mint)]'
                      : 'border-[var(--c-gray-light)] bg-white hover:border-[var(--c-teal-light)]'
                    }
                  `}
                >
                  <div className="text-sm font-semibold text-[var(--c-dark)]">{label}</div>
                  <div className="text-xs text-[var(--c-gray)] mt-1">{SCHWIERIGKEIT_BESCHREIBUNG[value]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* S10 – Fall speichern */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={fallSpeichern}
              onChange={e => setFallSpeichern(e.target.checked)}
              className="w-4 h-4 accent-[var(--c-teal)]"
            />
            <span className="text-sm text-[var(--c-dark)]">
              Diesen Fall speichern, um später weiterzuarbeiten
            </span>
          </label>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!person1}
              className="w-full py-4 bg-[var(--c-teal)] text-white rounded-xl text-base font-semibold hover:bg-[var(--c-teal-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gespräch starten →
            </button>
            {!person1 && (
              <p className="text-xs text-[var(--c-gray)] mt-2 text-center">
                Bitte wähl mindestens eine Person aus (Person 1).
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

// ─── Hilfskomponente ──────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: [string, string][]
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--c-dark)] mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent"
      >
        {options.map(([val, lbl]) => (
          <option key={val} value={val}>{lbl}</option>
        ))}
      </select>
    </div>
  )
}
