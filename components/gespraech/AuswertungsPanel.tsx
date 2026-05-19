'use client'

import type { FeedbackResponse } from '@/types'

interface Props {
  feedback: FeedbackResponse | null
  isLoading: boolean
}

export default function AuswertungsPanel({ feedback, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="h-4 bg-[var(--c-mint)] rounded w-3/4" />
        <div className="h-4 bg-[var(--c-mint)] rounded w-full" />
        <div className="h-4 bg-[var(--c-mint)] rounded w-2/3" />
      </div>
    )
  }

  if (!feedback) {
    return (
      <p className="text-sm text-[var(--c-gray)] italic">
        Auswertung erscheint nach deiner ersten Eingabe.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <FeedbackItem
        icon="✓"
        iconColor="text-green-600"
        bgColor="bg-green-50"
        borderColor="border-green-200"
        label="Was gut war"
        text={feedback.gut}
      />
      {feedback.besser && (
        <FeedbackItem
          icon="⚠"
          iconColor="text-amber-600"
          bgColor="bg-amber-50"
          borderColor="border-amber-200"
          label="Was besser gehen könnte"
          text={feedback.besser}
        />
      )}
      {feedback.alternativ && (
        <FeedbackItem
          icon="💡"
          iconColor="text-[var(--c-teal)]"
          bgColor="bg-[var(--c-mint)]"
          borderColor="border-[var(--c-teal-light)]"
          label="Alternative Formulierung"
          text={feedback.alternativ}
        />
      )}
    </div>
  )
}

function FeedbackItem({
  icon,
  iconColor,
  bgColor,
  borderColor,
  label,
  text,
}: {
  icon: string
  iconColor: string
  bgColor: string
  borderColor: string
  label: string
  text: string
}) {
  return (
    <div className={`rounded-lg border ${bgColor} ${borderColor} p-3`}>
      <div className={`font-semibold ${iconColor} mb-1.5`} style={{ fontSize: '0.875rem' }}>
        {icon} {label}
      </div>
      <p className="text-[var(--c-dark)] leading-relaxed" style={{ fontSize: '0.875rem' }}>{text}</p>
    </div>
  )
}
