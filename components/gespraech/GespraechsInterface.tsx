'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import type { GespraechsKonfiguration, Turn, FeedbackResponse } from '@/types'
import { buildSzenarioKontext, findSzenario, SITUATIONSBESCHREIBUNGEN_POOL, SZENARIEN, SCHWIERIGKEIT_LABEL, ELTERNTYP_LABEL } from '@/lib/szenarien-data'
import { normalizeGermanQuotes } from '@/lib/text-sanitizer'
import AuswertungsPanel from './AuswertungsPanel'

interface Props {
  config: GespraechsKonfiguration
  onNeustart: () => void
  fallVorherGespeichert?: boolean
}

const SITUATION_INTERVAL = 3

export default function GespraechsInterface({ config, onNeustart, fallVorherGespeichert = false }: Props) {
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
  const [notizen, setNotizen] = useState('')
  const [fallNachtraeglichGespeichert, setFallNachtraeglichGespeichert] = useState(false)
  const [isSavingFall, setIsSavingFall] = useState(false)

  const szenario = findSzenario(config.schultyp, config.elterntyp, config.anlass, config.klassenstufe, config.familie)
  const szenarioKontext = buildSzenarioKontext(szenario ?? SZENARIEN[0], config)
  // Bei freier Konfiguration oder 'unbekannt' keinen fixen Opener verwenden
  const scenarioOpener = (config.person1 || config.elterntyp === 'unbekannt') ? undefined : szenario?.opener
  // Sprecherbezeichnung: aus Formular-Konfiguration (Person 1/2) oder Szenario-Name
  const configPersonLabel = config.person1
    ? config.person2 ? `${config.person1} & ${config.person2}` : config.person1
    : undefined
  const turnCountRef = useRef(0)
  const situationIndexRef = useRef(0)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    let messages = currentTurns
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
      opener: scenarioOpener,
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

      if (!res.ok) {
        let detail = ''
        try { const j = await res.json(); detail = j?.error ?? '' } catch { /* ignore */ }
        // 401: Sitzung abgelaufen, 429: Rate-Limit – beide brauchen keinen „Serverfehler“-Ton.
        const errMsg =
          res.status === 401
            ? 'Die Anmeldung ist abgelaufen – bitte neu anmelden, dann geht es weiter.'
            : res.status === 429
              ? detail || 'Zu viele Anfragen in kurzer Zeit – bitte einen Moment warten.'
              : `Serverfehler (${res.status})${detail ? ': ' + detail : ''} – bitte Seite neu laden.`
        setTurns(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'elternteil', content: errMsg, timestamp: new Date().toISOString() }
          return updated
        })
        return
      }

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

    // Anführungszeichen nach Streaming-Ende normalisieren
    const normalizedElternText = normalizeGermanQuotes(elternText)
    if (normalizedElternText !== elternText) {
      setTurns(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last?.role === 'elternteil') {
          updated[updated.length - 1] = { ...last, content: normalizedElternText }
        }
        return updated
      })
    }
    return normalizedElternText
  }

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming || sessionEnded) return

    setInput('')
    turnCountRef.current += 1

    // Build nextTurns directly from `turns` (which is in the dependency array) to
    // avoid a React 18 batching race where the setState updater runs after
    // fetchElternteilResponse is already called, leaving nextTurns as [].
    const lehrkraftTurn: Turn = { role: 'lehrkraft', content: trimmed, timestamp: new Date().toISOString() }
    let nextTurns = [...turns, lehrkraftTurn]
    setTurns(nextTurns)

    if (turnCountRef.current % SITUATION_INTERVAL === 0) {
      const pool = szenario?.situationsbeschreibungen ?? SITUATIONSBESCHREIBUNGEN_POOL
      const idx = situationIndexRef.current % pool.length
      situationIndexRef.current += 1
      const sitTurn: Turn = { role: 'situation', content: pool[idx], timestamp: new Date().toISOString() }
      nextTurns = [...nextTurns, sitTurn]
      setTurns(nextTurns)
    }

    const elternText = await fetchElternteilResponse(nextTurns)

    if (feedbackEnabled && elternText) {
      setIsLoadingFeedback(true)
      try {
        const res = await fetch('/api/gespraech/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userTurn: trimmed,
            elternTurn: elternText,
            szenarioKontext,
            elterntyp: config.elterntyp,
            schwierigkeit: config.schwierigkeit,
          }),
        })
        if (res.ok) {
          setFeedback(await res.json())
        } else {
          // Auth-/Limit-Fall sichtbar machen statt still zu schlucken.
          let detail = ''
          try { const j = await res.json(); detail = j?.error ?? '' } catch { /* ignore */ }
          setFeedback({
            gut: res.status === 401
              ? 'Die Anmeldung ist abgelaufen – bitte neu anmelden.'
              : detail || 'Die Auswertung konnte nicht geladen werden.',
            besser: null,
            alternativ: null,
          })
        }
      } catch {
        // Feedback schweigend ignorieren
      } finally {
        setIsLoadingFeedback(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isStreaming, sessionEnded, feedbackEnabled, szenarioKontext, turns])

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

      if (!res.ok) {
        let detail = ''
        try { const j = await res.json(); detail = j?.error ?? '' } catch { /* ignore */ }
        reflexionText = res.status === 401
          ? 'Die Anmeldung ist abgelaufen – bitte neu anmelden, dann lässt sich die Auswertung erneut abrufen.'
          : detail || 'Die Auswertung konnte nicht geladen werden.'
        setReflexion(reflexionText)
        return
      }

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
      // Anführungszeichen nach Streaming-Ende normalisieren
      if (reflexionText) setReflexion(normalizeGermanQuotes(reflexionText))
    }

    try {
      const res = await fetch('/api/gespraech/session', {
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
      if (res.ok) setSessionSaved(true)
    } catch {
      // Session-Speicherung schweigend ignorieren
    }
  }

  async function saveKonfigurationNachtraeglich() {
    if (isSavingFall || fallNachtraeglichGespeichert) return
    setIsSavingFall(true)
    try {
      const res = await fetch('/api/gespraech/konfiguration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schultyp:            config.schultyp,
          klassenstufe:        config.klassenstufe,
          person1:             config.person1 ?? null,
          person2:             config.person2 ?? null,
          elterntyp:           config.elterntyp,
          familie:             config.familie,
          gespraechsinitiative: config.gespraechsinitiative ?? null,
          anlass:              config.anlass,
          situationText:       config.situationText ?? null,
          kind_initial:        config.kindName ?? null,
          kindGeschlecht:      config.kindGeschlecht ?? null,
          sprachbarriere:      config.sprachbarriere ?? null,
        }),
      })
      if (res.ok) setFallNachtraeglichGespeichert(true)
    } catch {
      // Speichern schweigend ignorieren
    } finally {
      setIsSavingFall(false)
    }
  }

  async function downloadGespraech() {
    const elternLabel = ELTERNTYP_LABEL[config.elterntyp] ?? config.elterntyp
    const schwLabel = SCHWIERIGKEIT_LABEL[config.schwierigkeit] ?? config.schwierigkeit
    const datum = germanDate()

    const children: Paragraph[] = [
      docHeading('Gesprächsprotokoll'),
      docMeta(`Datum: ${datum}  ·  Elterntyp: ${elternLabel}  ·  Schwierigkeit: ${schwLabel}`),
    ]

    for (const turn of turns) {
      if (turn.role === 'situation') {
        children.push(docSituationParagraph(turn.content))
      } else if (turn.role === 'elternteil') {
        children.push(docLabel('Elternteil:'))
        children.push(...elternteilContentToDocxParagraphs(turn.content))
      } else {
        children.push(docLabel('Lehrkraft:'))
        for (const line of turn.content.split('\n')) {
          children.push(docBody(line))
        }
      }
    }

    if (notizen.trim()) {
      children.push(docSubheading('Meine Notizen'))
      for (const line of notizen.split('\n')) {
        children.push(docBody(line))
      }
    }

    const doc = buildDoc(children)
    const blob = await Packer.toBlob(doc)
    triggerDownload(blob, `Gespräch-${datum}.docx`)
  }

  async function downloadReflexion(reflexionText: string) {
    const elternLabel = ELTERNTYP_LABEL[config.elterntyp] ?? config.elterntyp
    const datum = germanDate()

    const children: Paragraph[] = [
      docHeading('Reflexion'),
      docMeta(`Datum: ${datum}  ·  Elterntyp: ${elternLabel}`),
      ...markdownToDocxParagraphs(reflexionText),
    ]

    if (notizen.trim()) {
      children.push(docSubheading('Meine Notizen'))
      for (const line of notizen.split('\n')) {
        children.push(docBody(line))
      }
    }

    const doc = buildDoc(children)
    const blob = await Packer.toBlob(doc)
    triggerDownload(blob, `Reflexion-${datum}.docx`)
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
            {configPersonLabel ?? szenario?.elternName ?? 'Elternteil'} · {ELTERNTYP_LABEL[config.elterntyp] ?? config.elterntyp} · {SCHWIERIGKEIT_LABEL[config.schwierigkeit] ?? config.schwierigkeit}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-[var(--c-gray)] cursor-pointer select-none">
            <div
              onClick={() => setFeedbackEnabled(v => !v)}
              className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer"
              style={{ background: feedbackEnabled ? 'var(--c-teal)' : '#9ca3af' }}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${feedbackEnabled ? 'translate-x-4' : 'translate-x-0.5'}`}
              />
            </div>
            Sofort-Auswertung
          </label>
          {sessionEnded && (
            <button
              onClick={downloadGespraech}
              className="px-3 py-1.5 text-xs border border-[var(--c-gray-light)] rounded-lg text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] transition-colors"
            >
              ↓ Gespräch
            </button>
          )}
        </div>
      </div>

      {/* Hauptbereich: Chat + Auswertung */}
      <div className={`flex gap-4 flex-1 min-h-0 ${feedbackEnabled ? 'flex-row' : 'flex-col'}`}>
        {/* Chat-Spalte */}
        <div className={`flex flex-col min-h-0 ${feedbackEnabled ? 'flex-[65]' : 'flex-1'}`}>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4" style={{ maxHeight: 'calc(100vh - 340px)' }}>
            {turns.map((turn, i) => (
              <TurnBubble key={i} turn={turn} elternName={configPersonLabel ?? szenario?.elternName} />
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
                placeholder="Deine Antwort als Lehrkraft … (Enter zum Senden, Shift+Enter für Zeilenumbruch)"
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
          <div className="flex-[35] flex flex-col gap-3 min-h-0">
            <div className="bg-[var(--c-offwhite)] rounded-xl p-4 border border-[var(--c-gray-light)] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--c-dark)', marginBottom: '0.75rem' }}>Sofort-Auswertung</h3>
              <AuswertungsPanel feedback={feedback} isLoading={isLoadingFeedback} />
            </div>
            {/* Notizen */}
            <div className="bg-white rounded-xl border border-[var(--c-gray-light)] p-4 flex flex-col flex-1 min-h-0">
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--c-dark)', marginBottom: '0.5rem' }}>Meine Notizen</h3>
              <textarea
                value={notizen}
                onChange={e => setNotizen(e.target.value)}
                placeholder="Gedanken, Beobachtungen, Ideen …"
                className="flex-1 resize-none text-[var(--c-dark)] bg-transparent focus:outline-none leading-relaxed"
                style={{ minHeight: '80px', fontSize: '0.95rem' }}
              />
            </div>
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
                  <span className="ml-2">Auswertung wird erstellt …</span>
                </div>
              )}
              {reflexion && (
                <div className="text-base text-[var(--c-dark)] leading-relaxed">
                  {renderMarkdown(reflexion)}
                  {isStreamingreflexion && <span className="animate-pulse">▍</span>}
                </div>
              )}
              {notizen.trim() && !isStreamingreflexion && (
                <div className="mt-6 pt-4 border-t border-[var(--c-gray-light)]">
                  <div className="text-xs font-semibold text-[var(--c-gray)] uppercase tracking-wide mb-2">Meine Notizen</div>
                  <p className="text-sm text-[var(--c-dark)] whitespace-pre-wrap leading-relaxed">{notizen}</p>
                </div>
              )}
            </div>
            {!isStreamingreflexion && (
              <div className="p-6 border-t border-[var(--c-gray-light)] flex gap-3 flex-wrap">
                <button
                  onClick={onNeustart}
                  className="flex-1 py-3 border border-[var(--c-gray-light)] rounded-xl text-sm font-semibold text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] transition-colors"
                >
                  Neues Gespräch
                </button>
                <button
                  onClick={() => downloadReflexion(reflexion)}
                  className="flex-1 py-3 border border-[var(--c-teal)] text-[var(--c-teal)] rounded-xl text-sm font-semibold hover:bg-[var(--c-mint)] transition-colors"
                >
                  ↓ Reflexion herunterladen
                </button>
                <button
                  onClick={downloadGespraech}
                  className="flex-1 py-3 border border-[var(--c-gray-light)] rounded-xl text-sm font-semibold text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] transition-colors"
                >
                  ↓ Gesprächsprotokoll
                </button>
                {fallVorherGespeichert || fallNachtraeglichGespeichert ? (
                  <div className="flex-1 py-3 rounded-xl text-sm font-semibold text-center text-[var(--c-teal)] bg-[var(--c-mint)] border border-[var(--c-teal)]">
                    ✓ Fall gespeichert
                  </div>
                ) : (
                  <button
                    onClick={saveKonfigurationNachtraeglich}
                    disabled={isSavingFall}
                    className="flex-1 py-3 border border-[var(--c-gray-light)] rounded-xl text-sm font-semibold text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] transition-colors disabled:opacity-50"
                  >
                    {isSavingFall ? '…' : '＋ Fall speichern'}
                  </button>
                )}
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

// ─── DOCX-Hilfsfunktionen ──────────────────────────────────────────────────

const S = 24        // 12pt (half-points)
const LS = { line: 276, lineRule: 'auto' as const }  // 1.15 Zeilenabstand
const TEAL = '0F7B6C'

function germanDate(d = new Date()): string {
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
}

function buildDoc(children: Paragraph[]) {
  return new Document({ sections: [{ children }] })
}

function docHeading(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, color: TEAL })],
    spacing: { after: 80, line: LS.line, lineRule: LS.lineRule },
  })
}

function docSubheading(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: TEAL })],
    spacing: { before: 400, after: 80, line: LS.line, lineRule: LS.lineRule },
  })
}

function docMeta(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: S - 2, color: '666666' })],
    spacing: { after: 320, line: LS.line, lineRule: LS.lineRule },
  })
}

function docLabel(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: S })],
    spacing: { before: 280, after: 60, line: LS.line, lineRule: LS.lineRule },
  })
}

function docBody(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: S })],
    spacing: { after: 60, line: LS.line, lineRule: LS.lineRule },
  })
}

function docSituationParagraph(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `[${text}]`, italics: true, color: '888888', size: S - 2 })],
    spacing: { before: 160, after: 160, line: LS.line, lineRule: LS.lineRule },
  })
}

function elternteilContentToDocxParagraphs(content: string): Paragraph[] {
  const parts = content.split(/\*([^*]+)\*/)
  const paragraphs: Paragraph[] = []
  parts.forEach((part, i) => {
    if (!part.trim()) return
    if (i % 2 === 1) {
      const capped = part.trim().charAt(0).toUpperCase() + part.trim().slice(1)
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: capped, italics: true, color: '666666', size: S })],
        spacing: { before: 100, after: 100, line: LS.line, lineRule: LS.lineRule },
      }))
    } else {
      for (const line of part.trim().split('\n')) {
        if (line.trim()) {
          paragraphs.push(new Paragraph({
            children: [new TextRun({ text: line, size: S })],
            spacing: { before: 100, after: 60, line: LS.line, lineRule: LS.lineRule },
          }))
        }
      }
    }
  })
  return paragraphs
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function markdownToDocxParagraphs(text: string): Paragraph[] {
  const result: Paragraph[] = []
  for (const line of text.split('\n')) {
    const stripped = line.trim()
    if (!stripped) {
      result.push(new Paragraph({ spacing: { after: 80, line: LS.line, lineRule: LS.lineRule } }))
      continue
    }
    const h = stripped.match(/^#{1,2}\s+(.+)/)
    if (h) {
      result.push(docSubheading(h[1]))
      continue
    }
    const bold = stripped.match(/^\*\*(.+)\*\*$/)
    if (bold) {
      result.push(new Paragraph({
        children: [new TextRun({ text: bold[1], bold: true, size: S, color: '333333' })],
        spacing: { before: 280, after: 80, line: LS.line, lineRule: LS.lineRule },
      }))
      continue
    }
    result.push(new Paragraph({
      children: parseInlineBold(stripped),
      spacing: { after: 80, line: LS.line, lineRule: LS.lineRule },
    }))
  }
  return result
}

function parseInlineBold(text: string): TextRun[] {
  const parts = text.split(/\*\*([^*]+)\*\*/)
  return parts.map((part, i) => new TextRun({ text: part, bold: i % 2 === 1, size: S }))
}

function renderMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    const stripped = line.trim()
    if (!stripped) return <div key={i} style={{ height: '0.6rem' }} />
    const h = stripped.match(/^#{1,2}\s+(.+)/)
    if (h) return null // Titel-Zeile ausblenden (UI hat eigenen Header)
    const bold = stripped.match(/^\*\*(.+)\*\*$/)
    if (bold) {
      return (
        <p key={i} style={{ fontWeight: 700, color: 'var(--c-dark)', marginTop: '1.1rem', marginBottom: '0.2rem', fontSize: '0.95rem' }}>
          {bold[1]}
        </p>
      )
    }
    return (
      <p key={i} style={{ margin: '0 0 0.45rem', lineHeight: 1.7 }}>
        {renderInlineBold(stripped)}
      </p>
    )
  })
}

function renderInlineBold(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

function renderElternteilContent(content: string) {
  // Körpersignal-Beschreibungen (*...*) kursiv mit Teal-Balken, Sprache normal
  const parts = content.split(/\*([^*]+)\*/)
  return parts.map((part, i) => {
    if (!part.trim()) return null
    if (i % 2 === 1) {
      return (
        <div
          key={i}
          style={{
            borderLeft: '3px solid var(--c-teal)',
            paddingLeft: '0.65rem',
            marginBottom: '0.4rem',
            marginTop: '0.2rem',
            fontStyle: 'italic',
            fontSize: '0.875em',
            color: 'rgba(26,26,26,0.55)',
            lineHeight: 1.5,
          }}
        >
          {part.trim()}
        </div>
      )
    }
    return (
      <p key={i} className="whitespace-pre-wrap" style={{ marginBottom: '0.25rem' }}>
        {part.trim()}
      </p>
    )
  })
}

function TurnBubble({ turn, elternName }: { turn: Turn; elternName?: string }) {
  if (turn.role === 'situation') {
    return (
      <p className="text-sm text-[var(--c-gray)] italic text-center px-4">
        {turn.content}
      </p>
    )
  }

  const isElternteil = turn.role === 'elternteil'

  // Parse Sprecher-Präfix: „Herr/Frau Name:" (vorgefertigte Szenarien)
  // oder Rollennamen wie „Mutter:", „Vater:" (Formular-Konfiguration)
  let speakerLabel = elternName ?? 'Elternteil'
  let displayContent = turn.content
  if (isElternteil) {
    const prefixMatch = turn.content.match(
      /^((?:Herr|Frau)\s+\S+|Mutter|Vater|Stiefmutter|Stiefvater|Lebenspartnerin|Lebenspartner|Großmutter|Großvater|Sonstige Bezugsperson)\s*:\s*/i
    )
    if (prefixMatch) {
      speakerLabel = prefixMatch[1]
      displayContent = turn.content.slice(prefixMatch[0].length)
    }
  }

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
          <div className="text-xs font-semibold text-[var(--c-gray)] mb-2">{speakerLabel}</div>
        )}
        {isElternteil
          ? renderElternteilContent(displayContent)
          : <p className="whitespace-pre-wrap">{turn.content}</p>
        }
      </div>
    </div>
  )
}
