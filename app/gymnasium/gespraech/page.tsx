'use client'

import { useState } from 'react'
import type { GespraechsKonfiguration } from '@/types'
import KonfigurationsForm from '@/components/gespraech/KonfigurationsForm'
import GespraechsInterface from '@/components/gespraech/GespraechsInterface'

export default function GespraechPage() {
  const [config, setConfig] = useState<GespraechsKonfiguration | null>(null)

  if (!config) {
    return (
      <div className="p-6 md:p-10">
        <KonfigurationsForm onStart={setConfig} />
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
