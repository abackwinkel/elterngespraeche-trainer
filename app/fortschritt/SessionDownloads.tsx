'use client'

import { useState } from 'react'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export interface SessionData {
  id: string
  created_at: string
  elterntyp: string
  schwierigkeit: string
  gespraechsanlass: string | null
  turns: Array<{ role: string; content: string }>
  reflexion: string | null
}

const ELTERNTYP_LABEL: Record<string, string> = {
  kooperativ: 'Kooperativ', defensiv: 'Defensiv',
  aggressiv: 'Aggressiv', weinend: 'Überfordernd',
  passiv: 'Passiv', uebergriffig: 'Übergriffig',
}
const SCHWIERIGKEIT_LABEL: Record<string, string> = {
  'ruhige-see':    'Ruhige See',
  'gegenwind':     'Gegenwind',
  'gewitterfront': 'Gewitterfront',
}

const S = 24
const LS = { line: 276, lineRule: 'auto' as const }
const TEAL = '0F7B6C'

function germanDate(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
}

function parsedElternteilParagraphs(content: string): Paragraph[] {
  const parts = content.split(/\*([^*]+)\*/)
  const result: Paragraph[] = []
  parts.forEach((part, i) => {
    if (!part.trim()) return
    if (i % 2 === 1) {
      const capped = part.trim().charAt(0).toUpperCase() + part.trim().slice(1)
      result.push(new Paragraph({
        children: [new TextRun({ text: capped, italics: true, color: '666666', size: S })],
        spacing: { before: 100, after: 100, line: LS.line, lineRule: LS.lineRule },
      }))
    } else {
      for (const line of part.trim().split('\n')) {
        if (line.trim()) {
          result.push(new Paragraph({
            children: [new TextRun({ text: line, size: S })],
            spacing: { before: 80, after: 60, line: LS.line, lineRule: LS.lineRule },
          }))
        }
      }
    }
  })
  return result
}

function markdownParagraphs(text: string): Paragraph[] {
  const result: Paragraph[] = []
  for (const line of text.split('\n')) {
    const stripped = line.trim()
    if (!stripped) {
      result.push(new Paragraph({ spacing: { after: 80, line: LS.line, lineRule: LS.lineRule } }))
      continue
    }
    if (stripped.match(/^#{1,2}\s/)) continue
    const bold = stripped.match(/^\*\*(.+)\*\*$/)
    if (bold) {
      result.push(new Paragraph({
        children: [new TextRun({ text: bold[1], bold: true, size: S, color: '333333' })],
        spacing: { before: 280, after: 80, line: LS.line, lineRule: LS.lineRule },
      }))
      continue
    }
    const parts = stripped.split(/\*\*([^*]+)\*\*/)
    result.push(new Paragraph({
      children: parts.map((p, i) => new TextRun({ text: p, bold: i % 2 === 1, size: S })),
      spacing: { after: 80, line: LS.line, lineRule: LS.lineRule },
    }))
  }
  return result
}

async function buildSessionDocx(session: SessionData): Promise<Blob> {
  const datum = germanDate(session.created_at)
  const elternLabel = ELTERNTYP_LABEL[session.elterntyp] ?? session.elterntyp
  const schwLabel = SCHWIERIGKEIT_LABEL[session.schwierigkeit] ?? session.schwierigkeit

  const children: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: 'Gesprächsprotokoll', bold: true, size: 32, color: TEAL })],
      spacing: { after: 80, line: LS.line, lineRule: LS.lineRule },
    }),
    new Paragraph({
      children: [new TextRun({ text: `Datum: ${datum}  ·  Elterntyp: ${elternLabel}  ·  Schwierigkeit: ${schwLabel}`, size: S - 2, color: '666666' })],
      spacing: { after: 320, line: LS.line, lineRule: LS.lineRule },
    }),
  ]

  for (const turn of session.turns) {
    if (turn.role === 'situation') {
      children.push(new Paragraph({
        children: [new TextRun({ text: `[${turn.content}]`, italics: true, color: '888888', size: S - 2 })],
        spacing: { before: 160, after: 160, line: LS.line, lineRule: LS.lineRule },
      }))
    } else if (turn.role === 'elternteil') {
      children.push(new Paragraph({
        children: [new TextRun({ text: 'Elternteil:', bold: true, size: S })],
        spacing: { before: 280, after: 60, line: LS.line, lineRule: LS.lineRule },
      }))
      children.push(...parsedElternteilParagraphs(turn.content))
    } else {
      children.push(new Paragraph({
        children: [new TextRun({ text: 'Lehrkraft:', bold: true, size: S })],
        spacing: { before: 280, after: 60, line: LS.line, lineRule: LS.lineRule },
      }))
      for (const line of turn.content.split('\n')) {
        children.push(new Paragraph({
          children: [new TextRun({ text: line, size: S })],
          spacing: { after: 60, line: LS.line, lineRule: LS.lineRule },
        }))
      }
    }
  }

  if (session.reflexion) {
    children.push(new Paragraph({
      children: [new TextRun({ text: 'Reflexion', bold: true, size: 26, color: TEAL })],
      spacing: { before: 480, after: 80, line: LS.line, lineRule: LS.lineRule },
    }))
    children.push(...markdownParagraphs(session.reflexion))
  }

  return Packer.toBlob(new Document({ sections: [{ children }] }))
}

export default function SessionDownloads({ sessions }: { sessions: SessionData[] }) {
  if (sessions.length === 0) return null

  return (
    <section style={{
      background: '#fff', borderRadius: '10px',
      border: '1px solid var(--c-lightgray)',
      padding: '1.75rem', marginTop: '1.5rem',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
        fontSize: '1.52rem', fontWeight: 600,
        color: 'var(--c-dark)', margin: '0 0 1rem',
      }}>
        Gesprächsverläufe
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sessions.map(s => <SessionRow key={s.id} session={s} />)}
      </div>
    </section>
  )
}

function SessionRow({ session }: { session: SessionData }) {
  const [loading, setLoading] = useState(false)
  const datum = germanDate(session.created_at)
  const elternLabel = ELTERNTYP_LABEL[session.elterntyp] ?? session.elterntyp
  const schwLabel = SCHWIERIGKEIT_LABEL[session.schwierigkeit] ?? session.schwierigkeit

  async function download() {
    setLoading(true)
    try {
      const blob = await buildSessionDocx(session)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Gespräch-${elternLabel}-${datum}.docx`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      padding: '0.65rem 0.875rem',
      background: 'var(--c-offwhite)', borderRadius: '8px',
      border: '1px solid var(--c-lightgray)',
    }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--c-gray)', minWidth: '7rem' }}>{datum}</span>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-dark)', flex: 1 }}>
        {elternLabel}
        <span style={{ fontWeight: 400, color: 'var(--c-gray)', marginLeft: '0.4rem' }}>· {schwLabel}</span>
      </span>
      {session.reflexion && (
        <span style={{ fontSize: '0.75rem', color: 'var(--c-teal)', background: 'rgba(15,123,108,0.07)', borderRadius: '12px', padding: '0.15rem 0.5rem' }}>
          + Reflexion
        </span>
      )}
      <button
        onClick={download}
        disabled={loading}
        style={{
          fontSize: '0.78rem', fontWeight: 500,
          color: 'var(--c-teal)', background: 'transparent',
          border: '1px solid rgba(15,123,108,0.3)',
          borderRadius: '6px', padding: '0.3rem 0.65rem',
          cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1,
          transition: 'background 0.15s',
        }}
      >
        {loading ? '…' : '↓ Gespräch'}
      </button>
    </div>
  )
}
