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

const DATENSCHUTZ_ABSATZ_1 =
  'Für die Simulation können Sie einen Vornamen des Kindes eingeben – das macht das Training realistischer. ' +
  'Ihre Eingaben werden nicht auf unseren Servern gespeichert und nur für diese Sitzung verwendet. ' +
  'Sie werden jedoch an die KI-Schnittstelle übermittelt, die das Gespräch generiert.'

const DATENSCHUTZ_ABSATZ_2 =
  'Wenn Sie keinen echten Namen eingeben möchten, kürzen wir ihn automatisch auf den Anfangsbuchstaben. ' +
  'So bleibt das Gespräch trotzdem persönlich – ohne dass ein Klarname übertragen wird.'

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

  // S5a – Datenschutz-Modal
  const [showDatenschutz, setShowDatenschutz] = useState(false)
  const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false)
  const [nichtMehrZeigen, setNichtMehrZeigen] = useState(false)

  useEffect(() => {
    // localStorage: dauerhaft unterdrückt (z. B. nach „Nicht mehr anzeigen")
    const permanent = localStorage.getItem('datenschutz-permanent')
    if (permanent) {
      setDatenschutzAkzeptiert(permanent === 'consent')
      setShowDatenschutz(false)
      return
    }
    // sessionStorage: für diese Browser-Session bereits bestätigt
    if (sessionStorage.getItem('datenschutz-bestaetigt')) {
      setDatenschutzAkzeptiert(true)
      setShowDatenschutz(false)
      return
    }
    setShowDatenschutz(true)
  }, [])

  function handleDatenschutzWeiter() {
    if (datenschutzAkzeptiert) {
      sessionStorage.setItem('datenschutz-bestaetigt', '1')
    }
    if (nichtMehrZeigen) {
      localStorage.setItem('datenschutz-permanent', datenschutzAkzeptiert ? 'consent' : 'no-consent')
    }
    setShowDatenschutz(false)
  }

  // S3 – Personen
  const [person1, setPerson1] = useState<ElternPerson | ''>('')
  const [person2, setPerson2] = useState<ElternPerson | '–'>('–')

  // S5b / S5c – Kind
  const [kindName, setKindName] = useState('')
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
    return datenschutzAkzeptiert ? kindName.trim() : truncateToInitial(kindName)
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
            <p className="text-sm text-[var(--c-dark)] leading-relaxed mb-6">
              {DATENSCHUTZ_ABSATZ_2}
            </p>
            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={datenschutzAkzeptiert}
                onChange={e => setDatenschutzAkzeptiert(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[var(--c-teal)]"
              />
              <span className="text-sm text-[var(--c-dark)]">
                Ich bin mir bewusst, dass ich einen echten Vornamen eingebe, und stimme der Übermittlung für diese Sitzung zu.
              </span>
            </label>
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={nichtMehrZeigen}
                onChange={e => setNichtMehrZeigen(e.target.checked)}
                className="w-4 h-4 accent-[var(--c-teal)]"
              />
              <span className="text-sm text-[var(--c-gray)]">
                Diesen Hinweis nicht mehr anzeigen
              </span>
            </label>
            <button
              onClick={handleDatenschutzWeiter}
              className="w-full py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] transition-colors"
            >
              Weiter
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
              Konfiguriere dein Szenario – dann übernimmt die KI die Elternrolle.
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
                  <option value="" disabled>Bitte wählen …</option>
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
                <span className="text-xs text-[var(--c-gray)] font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={kindName}
                onChange={e => setKindName(e.target.value)}
                placeholder={datenschutzAkzeptiert ? 'z. B. Marie' : 'Nur Anfangsbuchstabe wird verwendet'}
                maxLength={50}
                className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent"
              />
              {kindName.trim() && !datenschutzAkzeptiert && (
                <p className="text-xs text-[var(--c-gray)] mt-1">
                  Wird als „{truncateToInitial(kindName)}" verwendet.
                </p>
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
              Bei „Nicht bekannt" leitet die KI das Elternverhalten aus dem Situationsfeld ab. Wenn auch das leer ist, spielt sie einen neutralen Gesprächspartner.
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
              placeholder="Beschreiben Sie, was Sie über die Situation und Vorgeschichte wissen – je konkreter Ihre Angaben, desto gezielter kann die Simulation auf Ihren Fall eingehen. Zum Beispiel: Wie ist das Kind bisher aufgefallen? Gab es bereits Kontakte mit den Eltern? Was wissen Sie über die Familiendynamik? Was ist Ihr Ziel für dieses Gespräch?"
              className="w-full border border-[var(--c-gray-light)] rounded-lg px-3 py-2 text-base text-[var(--c-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-[var(--c-gray)]">
                Bitte geben Sie hier keine echten Namen ein – beschreiben Sie die Situation ohne Klarnamen.
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
                Bitte wählen Sie mindestens eine Person aus (Person 1).
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
