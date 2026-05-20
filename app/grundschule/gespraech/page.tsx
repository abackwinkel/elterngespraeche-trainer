'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration } from '@/types'
import KonfigurationsForm from '@/components/gespraech/KonfigurationsForm'
import GespraechsInterface from '@/components/gespraech/GespraechsInterface'

export default function GrundschuleGespraechPage() {
  const [config, setConfig] = useState<GespraechsKonfiguration | null>(null)

  if (!config) {
    return (
      <div className="p-6 md:p-10">
        <a href="/grundschule" className="inline-block text-sm text-[var(--c-gray)] hover:text-[var(--c-dark)] transition-colors mb-6">
          ← Zurück zur Grundschule
        </a>
        <KonfigurationsForm schultyp="grundschule" onStart={setConfig} />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 h-full">
      <GespraechsInterface
        config={config}
        onNeustart={() => setConfig(null)}
      />
    </div>
  )
}
