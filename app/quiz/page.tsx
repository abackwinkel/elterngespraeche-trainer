'use client'

import { useState, useMemo } from 'react'
import { QUIZ_FRAGEN } from '@/lib/quiz-data'
import type { QuizModul } from '@/types'

const MODUL_LABEL: Record<QuizModul, string> = {
  gespraechsphasen: 'Gesprächsphasen',
  reaktionen:       'Elternreaktionen',
  rechtswissen:     'Rechtswissen',
  gfk:              'Klärende Kommunikation',
  vorbereitung:     'Gesprächsvorbereitung',
  koerpersignale:   'Körpersignale',
  massnahmen:       'Maßnahmen & Folgeschritte',
}

const MODUL_EMOJI: Record<QuizModul, string> = {
  gespraechsphasen: '💬',
  reaktionen:       '🤝',
  rechtswissen:     '⚖️',
  gfk:              '🌱',
  vorbereitung:     '📋',
  koerpersignale:   '👁️',
  massnahmen:       '🗂️',
}

const MODUL_FARBE: Record<string, string> = {
  gespraechsphasen: 'bg-teal-50 border-teal-200 text-teal-700',
  reaktionen:       'bg-blue-50 border-blue-200 text-blue-700',
  rechtswissen:     'bg-red-50 border-red-200 text-red-700',
  gfk:              'bg-purple-50 border-purple-200 text-purple-700',
  vorbereitung:     'bg-amber-50 border-amber-200 text-amber-700',
  koerpersignale:   'bg-green-50 border-green-200 text-green-700',
  massnahmen:       'bg-orange-50 border-orange-200 text-orange-700',
}

export default function QuizPage() {
  const [selectedModul, setSelectedModul] = useState<QuizModul | null>(null)
  const [frageIndex, setFrageIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [korrektCount, setKorrektCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const fragen = useMemo(
    () => selectedModul ? QUIZ_FRAGEN.filter(f => f.modul === selectedModul) : [],
    [selectedModul]
  )
  const frage = fragen[frageIndex]
  const isLast = frageIndex === fragen.length - 1

  function handleModulSelect(modul: QuizModul) {
    setSelectedModul(modul)
    setFrageIndex(0)
    setSelectedAnswer(null)
    setIsChecked(false)
    setKorrektCount(0)
    setIsFinished(false)
  }

  function handleCheck() {
    if (selectedAnswer === null) return
    setIsChecked(true)
    if (selectedAnswer === frage.korrektIndex) {
      setKorrektCount(c => c + 1)
    }
    fetch('/api/quiz/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frageId: frage.id, antwortIndex: selectedAnswer }),
    }).catch(() => {})
  }

  function handleWeiter() {
    if (isLast) {
      setIsFinished(true)
    } else {
      setFrageIndex(i => i + 1)
      setSelectedAnswer(null)
      setIsChecked(false)
    }
  }

  function handleNeustart() {
    setSelectedModul(null)
    setFrageIndex(0)
    setSelectedAnswer(null)
    setIsChecked(false)
    setKorrektCount(0)
    setIsFinished(false)
  }

  // ── Modul-Auswahl ─────────────────────────────────────────────────────────────
  if (!selectedModul) {
    const moduls = Array.from(new Set(QUIZ_FRAGEN.map(f => f.modul))) as QuizModul[]
    return (
      <div className="p-6 md:p-10 max-w-3xl">
        <h1
          className="text-3xl font-semibold text-[var(--c-dark)] mb-2"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Wissensquiz
        </h1>
        <p className="text-base text-[var(--c-gray)] mb-8">
          Wähle ein Themengebiet und teste dein Wissen zu Elterngesprächen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moduls.map(modul => {
            const count = QUIZ_FRAGEN.filter(f => f.modul === modul).length
            return (
              <button
                key={modul}
                onClick={() => handleModulSelect(modul)}
                className={`
                  border-2 rounded-2xl p-6 text-left
                  hover:shadow-lg hover:-translate-y-1
                  transition-all duration-200
                  ${MODUL_FARBE[modul] ?? 'bg-white border-[var(--c-gray-light)]'}
                `}
              >
                <div className="text-3xl mb-3">{MODUL_EMOJI[modul]}</div>
                <div className="text-lg font-semibold mb-1">{MODUL_LABEL[modul]}</div>
                <div className="text-sm opacity-70">{count} Fragen</div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Ergebnis ──────────────────────────────────────────────────────────────────
  if (isFinished) {
    const percent = Math.round((korrektCount / fragen.length) * 100)
    return (
      <div className="p-6 md:p-10 max-w-2xl">
        <div className="bg-white rounded-2xl border border-[var(--c-gray-light)] p-8 text-center">
          <div className="text-5xl font-bold text-[var(--c-teal)] mb-2">{percent}%</div>
          <div
            className="text-xl font-semibold text-[var(--c-dark)] mb-1"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {korrektCount} von {fragen.length} richtig
          </div>
          <p className="text-[var(--c-gray)] text-base mb-8">
            {percent >= 80 ? 'Sehr gut! Du kennst dieses Thema sehr sicher.' :
             percent >= 60 ? 'Solide Basis – noch ein bisschen Übung und du hast es drauf.' :
             'Das Thema braucht noch etwas Auffrischung. Probiere es nochmal!'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleModulSelect(selectedModul)}
              className="px-6 py-3 border border-[var(--c-gray-light)] rounded-xl text-sm font-semibold text-[var(--c-gray)] hover:bg-[var(--c-offwhite)] transition-colors"
            >
              Nochmal
            </button>
            <button
              onClick={handleNeustart}
              className="px-6 py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] transition-colors"
            >
              Anderes Thema
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Frage ─────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleNeustart}
          className="text-sm text-[var(--c-gray)] hover:text-[var(--c-dark)] transition-colors"
        >
          ← Thema wechseln
        </button>
        <span className="text-sm text-[var(--c-gray)]">
          {frageIndex + 1} / {fragen.length}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--c-gray-light)] p-6 mb-4">
        <div className="mb-1 text-xs font-semibold text-[var(--c-teal)] uppercase tracking-wide">
          {MODUL_LABEL[frage.modul]}
        </div>
        <p className="text-base font-medium text-[var(--c-dark)] mb-5 leading-relaxed">
          {frage.frage}
        </p>

        <div className="space-y-3">
          {frage.antworten.map((antwort, idx) => {
            let style = 'border-[var(--c-gray-light)] hover:border-[var(--c-teal-light)] hover:bg-[var(--c-mint)]'
            if (isChecked) {
              if (idx === frage.korrektIndex) {
                style = 'border-green-400 bg-green-50'
              } else if (idx === selectedAnswer && selectedAnswer !== frage.korrektIndex) {
                style = 'border-red-300 bg-red-50'
              } else {
                style = 'border-[var(--c-gray-light)] opacity-50'
              }
            } else if (selectedAnswer === idx) {
              style = 'border-[var(--c-teal)] bg-[var(--c-mint)]'
            }

            return (
              <button
                key={idx}
                onClick={() => !isChecked && setSelectedAnswer(idx)}
                disabled={isChecked}
                className={`w-full text-left border-2 rounded-xl px-4 py-3 text-base transition-colors ${style}`}
              >
                {antwort}
              </button>
            )
          })}
        </div>

        {isChecked && (
          <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${selectedAnswer === frage.korrektIndex ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
            <span className="font-semibold">{selectedAnswer === frage.korrektIndex ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
            {frage.erklaerung}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!isChecked ? (
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] disabled:opacity-40 transition-colors"
          >
            Antwort prüfen
          </button>
        ) : (
          <button
            onClick={handleWeiter}
            className="px-6 py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] transition-colors"
          >
            {isLast ? 'Auswertung ansehen' : 'Nächste Frage →'}
          </button>
        )}
      </div>
    </div>
  )
}
