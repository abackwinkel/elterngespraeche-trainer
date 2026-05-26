'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration } from '@/types'
import KonfigurationsForm from '@/components/gespraech/KonfigurationsForm'
import GespraechsInterface from '@/components/gespraech/GespraechsInterface'

type StartData = { config: GespraechsKonfiguration; fallGespeichert: boolean }

export default function RealschuleGespraechPage() {
  const [startData, setStartData] = useState<StartData | null>(null)

  if (!startData) {
    return (
      <div className="p-6 md:p-10">
        <a href="/realschule" className="inline-block text-sm text-[var(--c-gray)] hover:text-[var(--c-dark)] transition-colors mb-6">
          ← Zurück zur Realschule
        </a>
        <KonfigurationsForm schultyp="realschule" onStart={(c, fg) => setStartData({ config: c, fallGespeichert: fg })} />
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
