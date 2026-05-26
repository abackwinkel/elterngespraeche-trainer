'use client'

import { useState, useEffect } from 'react'
import type {
  Schultyp, Elterntyp, Familiensituation, Gespraechsanlass,
  ElternPerson, KindGeschlecht, Gespraechsinitiative, Klassenstufe,
} from '@/types'

// ─── Typ für einen gespeicherten Fall (DB-Row) ────────────────────────────────

export interface GespeicherterFall {
  id: string
  label: string
  schultyp: Schultyp
  klassenstufe: Klassenstufe
  person1: ElternPerson
  person2: ElternPerson | null
  elterntyp: Elterntyp
  familiensituation: Familiensituation
  gespraechsinitiative: Gespraechsinitiative | null
  gespraechsanlass: Gespraechsanlass
  situation_text: string | null
  kind_initial: string | null
  kind_geschlecht: KindGeschlecht | null
  sprachbarriere: string | null
  created_at: string
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  schultyp: Schultyp
  onClose: () => void
  onLaden: (fall: GespeicherterFall) => void
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function MeineFaelleDrawer({ open, schultyp, onClose, onLaden }: Props) {
  const [faelle, setFaelle] = useState<GespeicherterFall[]>([])
  const [loading, setLoading] = useState(false)
  const [loeschenId, setLoeschenId] = useState<string | null>(null)
  const [loeschenLaeuft, setLoeschenLaeuft] = useState(false)

  // Fälle laden, wenn Drawer geöffnet wird
  useEffect(() => {
    if (!open) return
    setLoading(true)
    setLoeschenId(null)
    fetch(`/api/gespraech/konfiguration?schultyp=${schultyp}`)
      .then(r => r.json())
      .then(d => setFaelle(d.konfigurationen ?? []))
      .catch(() => setFaelle([]))
      .finally(() => setLoading(false))
  }, [open, schultyp])

  async function handleLoeschen(id: string) {
    setLoeschenLaeuft(true)
    try {
      const res = await fetch(`/api/gespraech/konfiguration?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setFaelle(prev => prev.filter(f => f.id !== id))
      }
    } finally {
      setLoeschenId(null)
      setLoeschenLaeuft(false)
    }
  }

  function formatDatum(iso: string) {
    return new Date(iso).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
        style={{ borderLeft: '1px solid var(--c-gray-light)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--c-gray-light)' }}
        >
          <div>
            <h2
              className="text-2xl font-semibold text-[var(--c-dark)]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Meine Fälle
            </h2>
            <p className="text-xs text-[var(--c-gray)] mt-0.5">
              Gespeicherte Konfigurationen – klicke auf Laden, um das Formular vorzubefüllen.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--c-gray)] hover:text-[var(--c-dark)] transition-colors text-2xl leading-none ml-4"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        {/* Inhalt */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Lade-Zustand */}
          {loading && (
            <p className="text-sm text-[var(--c-gray)] text-center py-10">
              Wird geladen …
            </p>
          )}

          {/* Leerzustand */}
          {!loading && faelle.length === 0 && (
            <div className="text-center py-12 px-4">
              <p className="text-4xl mb-4">📂</p>
              <p className="text-sm font-semibold text-[var(--c-dark)] mb-2">
                Noch keine Fälle gespeichert
              </p>
              <p className="text-xs text-[var(--c-gray)] leading-relaxed max-w-xs mx-auto">
                Aktiviere beim nächsten Gespräch die Checkbox „Diesen Fall speichern",
                um ihn hier wieder aufrufen zu können.
              </p>
            </div>
          )}

          {/* Fall-Liste */}
          {!loading && faelle.map(fall => (
            <div
              key={fall.id}
              className="rounded-xl p-4 mb-3"
              style={{ border: '1px solid var(--c-gray-light)', background: 'white' }}
            >
              {/* Fall-Info */}
              <div className="mb-3">
                <div className="text-sm font-semibold text-[var(--c-dark)] leading-snug">
                  {fall.label}
                </div>
                <div className="text-xs text-[var(--c-gray)] mt-1">
                  {fall.person1}
                  {fall.person2 ? ` + ${fall.person2}` : ''}
                  {' · '}
                  {formatDatum(fall.created_at)}
                </div>
                {fall.situation_text && (
                  <p
                    className="text-xs text-[var(--c-gray)] mt-2 leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {fall.situation_text}
                  </p>
                )}
              </div>

              {/* Aktionen */}
              <div className="flex gap-2">
                <button
                  onClick={() => { onLaden(fall); onClose() }}
                  className="flex-1 py-2 text-sm font-semibold bg-[var(--c-teal)] text-white rounded-lg hover:bg-[var(--c-teal-light)] transition-colors"
                >
                  Laden
                </button>

                {loeschenId === fall.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleLoeschen(fall.id)}
                      disabled={loeschenLaeuft}
                      className="px-3 py-2 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {loeschenLaeuft ? '…' : 'Wirklich löschen'}
                    </button>
                    <button
                      onClick={() => setLoeschenId(null)}
                      disabled={loeschenLaeuft}
                      className="px-3 py-2 text-xs rounded-lg transition-colors disabled:opacity-50"
                      style={{
                        border: '1px solid var(--c-gray-light)',
                        color: 'var(--c-gray)',
                      }}
                    >
                      Abbrechen
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setLoeschenId(fall.id)}
                    className="px-3 py-2 text-xs rounded-lg transition-colors hover:text-red-500"
                    style={{
                      border: '1px solid var(--c-gray-light)',
                      color: 'var(--c-gray)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.borderColor = '#fca5a5'
                      e.currentTarget.style.color = '#ef4444'
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.borderColor = 'var(--c-gray-light)'
                      e.currentTarget.style.color = 'var(--c-gray)'
                    }}
                  >
                    Löschen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
