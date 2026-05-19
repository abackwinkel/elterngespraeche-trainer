'use client'

import { useState } from 'react'
import { KOERPERSIGNAL_ITEMS as KOERPERSIGNALE } from '@/lib/koerpersignal-data'

export default function KoerpersignalePage() {
  const [index, setIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [korrektCount, setKorrektCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const item = KOERPERSIGNALE[index]
  const isLast = index === KOERPERSIGNALE.length - 1

  function handleCheck() {
    if (selectedAnswer === null) return
    setIsChecked(true)
    if (selectedAnswer === item.korrektIndex) {
      setKorrektCount(c => c + 1)
    }
  }

  function handleWeiter() {
    if (isLast) {
      setIsFinished(true)
    } else {
      setIndex(i => i + 1)
      setSelectedAnswer(null)
      setIsChecked(false)
    }
  }

  function handleNeustart() {
    setIndex(0)
    setSelectedAnswer(null)
    setIsChecked(false)
    setKorrektCount(0)
    setIsFinished(false)
  }

  if (isFinished) {
    const percent = Math.round((korrektCount / KOERPERSIGNALE.length) * 100)
    return (
      <div className="p-6 md:p-10 max-w-2xl">
        <h1 className="text-3xl font-semibold text-[var(--c-dark)] mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Körpersignale lesen
        </h1>
        <div className="bg-white rounded-2xl border border-[var(--c-gray-light)] p-8 text-center">
          <div className="text-5xl font-bold text-[var(--c-teal)] mb-2">{percent}%</div>
          <div className="text-xl font-semibold text-[var(--c-dark)] mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>
            {korrektCount} von {KOERPERSIGNALE.length} richtig
          </div>
          <p className="text-[var(--c-gray)] text-base mb-8">
            {percent >= 80 ? 'Ausgezeichnet! Du liest nonverbale Signale sehr sicher.' :
             percent >= 60 ? 'Gutes Gespür – mit etwas Übung wirst du noch sicherer.' :
             'Körpersignale brauchen Übung. Probiere es nochmal!'}
          </p>
          <button
            onClick={handleNeustart}
            className="px-6 py-3 bg-[var(--c-teal)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--c-teal-light)] transition-colors"
          >
            Nochmal üben
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-[var(--c-dark)] mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Körpersignale lesen
        </h1>
        <p className="text-base text-[var(--c-gray)]">
          Was sagt die Körpersprache – und wie reagierst du?
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm text-[var(--c-gray)]">
        <span>Situation {index + 1} von {KOERPERSIGNALE.length}</span>
        <div className="flex gap-1">
          {KOERPERSIGNALE.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i < index ? 'bg-[var(--c-teal)]' :
                i === index ? 'bg-[var(--c-teal-light)]' :
                'bg-[var(--c-gray-light)]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--c-gray-light)] p-6 mb-4">
        <div className="bg-[var(--c-mint)] rounded-xl p-4 mb-5">
          <p className="text-base text-[var(--c-dark)] italic leading-relaxed">
            *{item.situation}*
          </p>
        </div>

        <p className="text-sm font-semibold text-[var(--c-dark)] mb-3">
          Wie interpretierst du dieses Signal am besten?
        </p>

        <div className="space-y-3">
          {item.antworten.map((antwort, idx) => {
            let style = 'border-[var(--c-gray-light)] hover:border-[var(--c-teal-light)] hover:bg-[var(--c-mint)]'
            if (isChecked) {
              if (idx === item.korrektIndex) {
                style = 'border-green-400 bg-green-50'
              } else if (idx === selectedAnswer && selectedAnswer !== item.korrektIndex) {
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
          <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${selectedAnswer === item.korrektIndex ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
            <div className="font-semibold mb-1">{selectedAnswer === item.korrektIndex ? '✓ Richtig! ' : 'Erklärung: '}{item.erklaerung}</div>
            {item.handlungsoptionen.length > 0 && (
              <div className="mt-2">
                <span className="font-semibold">Mögliche Reaktionen:</span>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  {item.handlungsoptionen.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
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
            {isLast ? 'Auswertung ansehen' : 'Nächste Situation →'}
          </button>
        )}
      </div>
    </div>
  )
}
