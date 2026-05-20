'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration, Schultyp, Klassenstufe, Gespraechsanlass, Familiensituation, Elterntyp, Schwierigkeit } from '@/types'
import {
  KLASSENSTUFE_LABEL,
  ANLASS_LABEL,
  FAMILIE_LABEL,
  ELTERNTYP_LABEL,
  SCHWIERIGKEIT_LABEL,
} from '@/lib/szenarien-data'

interface Props {
  schultyp: Schultyp
  onStart: (config: GespraechsKonfiguration) => void
}

const SCHWIERIGKEIT_BESCHREIBUNG: Record<Schwierigkeit, string> = {
  'ruhige-see':    'Gesprächspartner ist grundsätzlich gesprächsbereit',
  'gegenwind':     'Spannungen vorhanden, aber konstruktiv lösbar',
  'gewitterfront': 'Hochkonflikthaftes Gespräch, maximale Herausforderung',
}

export default function KonfigurationsForm({ schultyp, onStart }: Props) {
  const [klassenstufe, setKlassenstufe] = useState<Klassenstufe>('7-8')
  const [anlass, setAnlass] = useState<Gespraechsanlass>('leistungsabfall')
  const [familie, setFamilie] = useState<Familiensituation>('keine')
  const [elterntyp, setElterntyp] = useState<Elterntyp>('defensiv')
  const [schwierigkeit, setSchwierigkeit] = useState<Schwierigkeit>('gegenwind')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onStart({ schultyp, klassenstufe, anlass, familie, elterntyp, schwierigkeit })
  }

  const klassenstufeOptionen = Object.entries(KLASSENSTUFE_LABEL).filter(
    ([val]) => schultyp === 'realschule' ? val !== 'oberstufe' : true
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--c-dark)]" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Gesprächsschmiede
        </h1>
        <p className="mt-2 text-base text-[var(--c-gray)]">
          Konfiguriere dein Szenario – dann übernimmt die KI die Elternrolle.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            options={Object.entries(ANLASS_LABEL)}
          />
          <SelectField
            label="Familiensituation"
            value={familie}
            onChange={v => setFamilie(v as Familiensituation)}
            options={Object.entries(FAMILIE_LABEL)}
          />
          <SelectField
            label="Elterntyp"
            value={elterntyp}
            onChange={v => setElterntyp(v as Elterntyp)}
            options={Object.entries(ELTERNTYP_LABEL)}
          />
        </div>

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

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-[var(--c-teal)] text-white rounded-xl text-base font-semibold hover:bg-[var(--c-teal-light)] transition-colors"
          >
            Gespräch starten →
          </button>
        </div>
      </form>
    </div>
  )
}

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
