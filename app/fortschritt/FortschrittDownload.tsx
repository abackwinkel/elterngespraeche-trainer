'use client'

import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'

interface Props {
  totalSessions: number
  totalQuiz: number
  quizRate: number | null
  quizByModule: { label: string; total: number; correct: number; rate: number | null }[]
  sessionTypen: { label: string; count: number }[]
}

export default function FortschrittDownload({ totalSessions, totalQuiz, quizRate, quizByModule, sessionTypen }: Props) {
  async function handleDownload() {
    const d = new Date()
    const datum = `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`

    const row = (label: string, value: string) =>
      new Paragraph({
        children: [
          new TextRun({ text: `${label}: `, bold: true, size: 23 }),
          new TextRun({ text: value, size: 23 }),
        ],
        spacing: { after: 60 },
      })

    const children: Paragraph[] = [
      new Paragraph({ text: 'Lernfortschritt', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({
        children: [new TextRun({ text: `Stand: ${datum}`, size: 22, color: '555555' })],
        spacing: { after: 300 },
      }),
      new Paragraph({ text: 'Übersicht', heading: HeadingLevel.HEADING_2 }),
      row('Trainierte Gespräche', String(totalSessions)),
      row('Quiz-Fragen beantwortet', String(totalQuiz)),
      ...(quizRate !== null ? [row('Quiz-Trefferquote gesamt', `${quizRate} %`)] : []),
    ]

    if (quizByModule.some(m => m.total > 0)) {
      children.push(new Paragraph({ text: 'Quiz-Ergebnisse nach Modul', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }))
      for (const m of quizByModule) {
        const val = m.total > 0 ? `${m.correct}/${m.total} richtig (${m.rate} %)` : 'noch nicht geübt'
        children.push(row(m.label, val))
      }
    }

    if (sessionTypen.length > 0) {
      children.push(new Paragraph({ text: 'Geübte Elterntypen', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }))
      for (const t of sessionTypen) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `${t.label}: ${t.count}×`, size: 23 })],
          spacing: { after: 60 },
        }))
      }
    }

    const doc = new Document({ sections: [{ children }] })
    const blob = await Packer.toBlob(doc)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Fortschritt-${datum}.docx`
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
