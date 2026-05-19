'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { GespraechsKonfiguration, Turn, FeedbackResponse } from '@/types'
import { buildSzenarioKontext, findSzenario, SITUATIONSBESCHREIBUNGEN_POOL, SZENARIEN } from '@/lib/szenarien-data'
import AuswertungsPanel from './AuswertungsPanel'

interface Props {
  config: GespraechsKonfiguration
  onNeustart: () => void
}

const SITUATION_INTERVAL = 3 // Situationsbeschreibung alle ~3 Züge einblenden

export default function GespraechsInterface({ config, onNeustart }: Props) {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [feedbackEnabled, setFeedbackEnabled] = useState(true)
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null)
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false)
  const [reflexion, setReflexion] = useState('')
  const [isStreamingreflexion, setIsStreamingReflexion] = useState(false)
  const [showReflexion, setShowReflexion] = useState(false)
  const [sessionSaved, setSessionSaved] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const szenario = findSzenario(config.elterntyp, config.anlass, config.klassenstufe, config.familie)
  const szenarioKontext = buildSzenarioKontext(szenario ?? SZENARIEN[0], config)
  const turnCountRef = useRef(0)
  const situationIndexRef = useRef(0)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Opener vom Elternteil einholen (sessionStart)
  useEffect(() => {
    if (initialized) return
    setInitialized(true)
    fetchElternteilResponse([], true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [turns])

  async function fetchElternteilResponse(currentTurns: Turn[], sessionStart = false) {
    setIsStreaming(true)
    const messages = currentTurns
      .filter(t => t.role !== 'situation')
      .map(t => ({
        role: t.role === 'elternteil' ? 'assistant' as const : 'user' as const,
        content: t.content,
      }))

    const body = {
      messages,
      elterntyp: config.elterntyp,
      schwierigkeit: config.schwierigkeit,
      szenarioKontext,
      sessionStart,
      opener: szenario?.opener,
    }

    let elternText = ''
    const placeholderTurn: Turn = { role: 'elternteil', content: '', timestamp: new Date().toISOString() }

    setTurns(prev => [...prev, placeholderTurn])

    try {
      const res = await fetch('/api/gespraech/elternteil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        elternText += decoder.decode(value, { stream: true })
        setTurns(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'elternteil', content: elternText, timestamp: new Date().toISOString() }
          return updated
        })
      }
    } finally {
      setIsStreaming(false)
      textareaRef.current?.focus()
    }

    return elternText
  }

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming || sessionEnded) return

    setInput('')
    turnCountRef.current += 1

    const lehrkraftTurn: Turn = { role: 'lehrkraft', content: trimmed, timestamp: new Date().toISOString() }
    let nextTurns: Turn[] = []

    setTurns(prev => {
      nextTurns = [...prev, lehrkraftTurn]
      return nextTurns
    })

    // Gelegentlich Situationsbeschreibung einblenden
    if (turnCountRef.current % SITUATION_INTERVAL === 0) {
      const pool = szenario?.situationsbeschreibungen ?? SITUATIONSBESCHREIBUNGEN_POOL
      const idx = situationIndexRef.current % pool.length
      situationIndexRef.current += 1
      const sitTurn: Turn = { role: 'situation', content: pool[idx], timestamp: new Date().toISOString() }
      nextTurns = [...nextTurns, sitTurn]
      setTurns(nextTurns)
    }

    // Elternteil-Antwort streamen
    const elternText = await fetchElternteilResponse(nextTurns)

    // Per-Turn-Feedback (wenn aktiviert)
    if (feedbackEnabled && elternText) {
      setIsLoadingFeedback(true)
      try {
        const res = await fetch('/api/gespraech/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userTurn: trimmed, elternTurn: elternText, szenarioKontext }),
        })
        const data = await res.json()
        setFeedback(data)
      } catch {
        // Feedback schweigend ignorieren
      } finally {
        setIsLoadingFeedback(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isStreaming, sessionEnded, feedbackEnabled, szenarioKontext])

  async function handleGespraechBeenden() {
    if (isStreaming || sessionEnded) return
    setSessionEnded(true)
    setShowReflexion(true)
    setIsStreamingReflexion(true)

    const allTurns = turns
    let reflexionText = ''

    try {
      const res = await fetch('/api/gespraech/reflexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turns: allTurns,
          szenarioKontext,
          elterntyp: config.elterntyp,
          schwierigkeit: config.schwierigkeit,
        }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          reflexionText += decoder.decode(value, { stream: true })
          setReflexion(reflexionText)
        }
      }
    } finally {
      setIsStreamingReflexion(false)
    }

    // Session in Supabase speichern
    try {
      await fetch('/api/gespraech/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schultyp: config.schultyp,
          klassenstufe: config.klassenstufe,
          gespraechsanlass: config.anlass,
          familiensituation: config.familie,
          elterntyp: config.elterntyp,
          schwierigkeit: config.schwierigkeit,
          turns: allTurns,
          reflexion: reflexionText,
        }),
      })
      setSessionSaved(true)
    } catch {
      // Session-Speicherung schweigend ignorieren
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--c-gray-light)]">
        <div>
          <h2 className="text-xl font-semibold text-[var(--c-dark)]" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Gesprächsschmiede
          </h2>
          <p className="text-sm text-[var(--c-gray)] mt-0.5">
            {szenario?.elternName ?? 'Elternteil'} · {config.elterntyp} · {config.schwierigkeit}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-[var(--c-gray)] cursor-pointer select-none">
            <div
              onClick={() => setFeedbackEnabled(v => !v)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${feedbackEnabled ? 'bg-[var(--c-teal)]' : 'bg-[var(--c-gray-light)]'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${feedbackEnabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            Sofort-Auswertung
          </label>
        </div>
      </div>

      {/* Hauptbereich: Chat + Auswertung */}
      <div className={`flex gap-4 flex-1 min-h-0 ${feedbackEnabled ? 'flex-row' : 'flex-col'}`}>
        {/* Chat-Spalte */}
        <div className={`flex flex-col min-h-0 ${feedbackEnabled ? 'flex-[65]' : 'flex-1'}`}>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4" style={{ maxHeight: 'calc(100vh - 340px)' }}>
            {turns.map((turn, i) => (
              <TurnBubble key={i} turn={turn} />
            ))}
            {isStreaming && turns.length > 0 && turns[turns.length - 1].role === 'elternteil' && turns[turns.length - 1].content === '' && (
              <div className="flex gap-2 items-center text-[var(--c-gray)] text-sm">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Eingabe */}
          {!sessionEnded && (
            <div className="space-y-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Deine Antwort als Lehrkraft... (Enter zum Senden, Shift+Enter für Zeilenumbruch)"
                rows={3}
                disabled={isStreaming}
                className="w-full border border-[var(--c-gray-light)] rounded-xl px-4 py-3 text-base text-[var(--c-dark)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--c-teal)] focus:border-transparent disabled:opacity-50"
              />
              <div className="flex gap-2 justify-between">
                <button
                  onClick={handleGespraechBeenden}
                  disabled={isStreaming || turns.length < 2}
                  className="px-4 py-2 rounded-xl border border-[var(--c-gray-light)] text-sm text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] disabled:opacity-40 transition-colors"
                >
                  Gespräch beenden
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="px-6 py-2 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] disabled:opacity-40 transition-colors"
                >
                  Senden →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Auswertungs-Spalte (nur wenn Toggle ein) */}
        {feedbackEnabled && (
          <div className="flex-[35] bg-[var(--c-offwhite)] rounded-xl p-4 border border-[var(--c-gray-light)] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            <h3 className="text-sm font-semibold text-[var(--c-dark)] mb-3">Sofort-Auswertung</h3>
            <AuswertungsPanel feedback={feedback} isLoading={isLoadingFeedback} />
          </div>
        )}
      </div>

      {/* Reflexions-Overlay */}
      {showReflexion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl">
            <div className="p-6 border-b border-[var(--c-gray-light)]">
              <h2 className="text-2xl font-semibold text-[var(--c-dark)]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Reflexion
              </h2>
              <p className="text-sm text-[var(--c-gray)] mt-1">Gesamtauswertung deines Gesprächs</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {isStreamingreflexion && !reflexion && (
                <div className="flex gap-2 items-center text-[var(--c-gray)] text-sm">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
                  <span className="ml-2">Auswertung wird erstellt…</span>
                </div>
              )}
              {reflexion && (
                <div className="text-base text-[var(--c-dark)] leading-relaxed whitespace-pre-wrap">
                  {reflexion}
                  {isStreamingreflexion && <span className="animate-pulse">▍</span>}
                </div>
              )}
            </div>
            {!isStreamingreflexion && (
              <div className="p-6 border-t border-[var(--c-gray-light)] flex gap-3">
                <button
                  onClick={onNeustart}
                  className="flex-1 py-3 border border-[var(--c-gray-light)] rounded-xl text-sm font-semibold text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] transition-colors"
                >
                  Neues Gespräch
                </button>
                <a
                  href="/fortschritt"
                  className="flex-1 py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold text-center hover:bg-[var(--c-teal-light)] transition-colors"
                >
                  Fortschritt ansehen
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TurnBubble({ turn }: { turn: Turn }) {
  if (turn.role === 'situation') {
    return (
      <p className="text-sm text-[var(--c-gray)] italic text-center px-4">
        *{turn.content}*
      </p>
    )
  }

  const isElternteil = turn.role === 'elternteil'
  return (
    <div className={`flex ${isElternteil ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
          isElternteil
            ? 'bg-white border border-[var(--c-gray-light)] text-[var(--c-dark)] rounded-tl-sm'
            : 'bg-[var(--c-teal)] text-white rounded-tr-sm'
        }`}
      >
        {isElternteil && (
          <div className="text-xs font-semibold text-[var(--c-gray)] mb-1">Elternteil</div>
        )}
        <p className="whitespace-pre-wrap">{turn.content}</p>
      </div>
    </div>
  )
}
