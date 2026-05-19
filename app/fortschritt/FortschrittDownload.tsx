'use client'

interface Props {
  totalSessions: number
  totalQuiz: number
  quizRate: number | null
  quizByModule: { label: string; total: number; correct: number; rate: number | null }[]
  sessionTypen: { label: string; count: number }[]
}

export default function FortschrittDownload({ totalSessions, totalQuiz, quizRate, quizByModule, sessionTypen }: Props) {
  function handleDownload() {
    const datum = new Date().toLocaleDateString('de-DE')
    let text = `Lernfortschritt – Elterngespräche-Trainer\n`
    text += `Stand: ${datum}\n`
    text += `${'─'.repeat(50)}\n\n`

    text += `Übersicht\n`
    text += `  Trainierte Gespräche: ${totalSessions}\n`
    text += `  Quiz-Fragen beantwortet: ${totalQuiz}\n`
    if (quizRate !== null) text += `  Quiz-Trefferquote gesamt: ${quizRate} %\n`

    if (quizByModule.some(m => m.total > 0)) {
      text += `\nQuiz-Ergebnisse nach Modul\n`
      for (const m of quizByModule) {
        if (m.total > 0) {
          text += `  ${m.label}: ${m.correct}/${m.total} richtig (${m.rate} %)\n`
        } else {
          text += `  ${m.label}: noch nicht geübt\n`
        }
      }
    }

    if (sessionTypen.length > 0) {
      text += `\nGeübte Elterntypen\n`
      for (const t of sessionTypen) {
        text += `  ${t.label}: ${t.count}×\n`
      }
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fortschritt-${datum.replace(/\./g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      style={{
        fontSize: '0.82rem', fontWeight: 500,
        color: 'var(--c-teal)', background: 'rgba(15,123,108,0.06)',
        border: '1px solid rgba(15,123,108,0.2)',
        borderRadius: '8px', padding: '0.45rem 0.9rem',
        cursor: 'pointer', transition: 'background 0.15s',
      }}
    >
      ↓ Fortschritt herunterladen
    </button>
  )
}
