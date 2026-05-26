'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration } from '@/types'
import KonfigurationsForm from '@/components/gespraech/KonfigurationsForm'
import GespraechsInterface from '@/components/gespraech/GespraechsInterface'

type StartData = { config: GespraechsKonfiguration; fallGespeichert: boolean }

export default function GespraechPage() {
  const [startData, setStartData] = useState<StartData | null>(null)

  if (!startData) {
    return (
      <div className="p-6 md:p-10">
        <a href="/gymnasium" className="inline-block text-sm text-[var(--c-gray)] hover:text-[var(--c-dark)] transition-colors mb-6">
          ← Zurück zum Gymnasium
        </a>
        <KonfigurationsForm schultyp="gymnasium" onStart={(c, fg) => setStartData({ config: c, fallGespeichert: fg })} />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 h-full">
      <GespraechsInterface
        config={startData.config}
        fallVorherGespeichert={startData.fallGespeichert}
        onNeustart={() => setStartData(null)}
      />
    </div>
  )
}
