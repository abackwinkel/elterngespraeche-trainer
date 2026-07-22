import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { User } from '@supabase/supabase-js'

/**
 * Stellt sicher, dass der Request von einem eingeloggten Nutzer kommt.
 * Es gibt in diesem Projekt keine middleware.ts – /api ist also komplett ungeschuetzt,
 * jede KI-/Daten-Route muss Auth selbst pruefen. Sonst kann jeder im Internet die
 * (kostenpflichtigen) Anthropic-Endpunkte aufrufen.
 *
 * Verwendung:
 *   const auth = await requireUser()
 *   if ('error' in auth) return auth.error
 *   // ab hier: auth.user ist garantiert vorhanden
 */
export async function requireUser(): Promise<{ user: User } | { error: NextResponse }> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return { error: NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 }) }
  }
  return { user }
}

/* ── Rate-Limiting der KI-Endpunkte (portiert aus dem NLP-Trainer, Commit 5173bb7) ──
 *
 * Zaehler liegen in Upstash Redis (REST-API, kein npm-Paket noetig). Env-Variablen:
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash direkt)
 *   oder KV_REST_API_URL + KV_REST_API_TOKEN            (Vercel-Marketplace „Upstash for Redis")
 * Ohne Konfiguration und bei Redis-Fehlern: fail open — die App bleibt benutzbar,
 * das Limit ist dann nur nicht aktiv (gleiches Prinzip wie Fair-Use im Kompass).
 */

/** Limits pro User ueber ALLE KI-Endpunkte zusammen; per Env uebersteuerbar. */
const DEFAULT_PER_MINUTE = 30
const DEFAULT_PER_DAY = 500

function limitFromEnv(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function redisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return url && token ? { url, token } : null
}

let warnedNoRedis = false

/**
 * Zaehlt den Call und meldet, ob ein Limit ueberschritten ist.
 * Fixed-Window-Zaehler: 1-Minuten-Fenster (Burst) + UTC-Tages-Fenster (Kontingent).
 * Ein Pipeline-Roundtrip (INCR + EXPIRE NX je Fenster).
 */
async function rateLimitScope(userId: string): Promise<'minute' | 'day' | null> {
  const cfg = redisConfig()
  if (!cfg) {
    if (!warnedNoRedis) {
      console.warn('[rate-limit] Kein Redis konfiguriert (UPSTASH_REDIS_REST_URL bzw. KV_REST_API_URL) – Limit inaktiv (fail open)')
      warnedNoRedis = true
    }
    return null
  }

  const minuteKey = `rl:m:${userId}:${Math.floor(Date.now() / 60_000)}`
  const dayKey = `rl:d:${userId}:${new Date().toISOString().slice(0, 10)}`

  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', minuteKey],
        ['EXPIRE', minuteKey, '120', 'NX'],
        ['INCR', dayKey],
        ['EXPIRE', dayKey, '93600', 'NX'], // 26 h: ueberlebt das UTC-Tagesende sicher
      ]),
      signal: AbortSignal.timeout(1500),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Redis-Antwort ${res.status}`)
    const results = (await res.json()) as Array<{ result?: unknown }>
    const minuteCount = Number(results[0]?.result)
    const dayCount = Number(results[2]?.result)
    if (Number.isFinite(dayCount) && dayCount > limitFromEnv('RATE_LIMIT_PER_DAY', DEFAULT_PER_DAY)) return 'day'
    if (Number.isFinite(minuteCount) && minuteCount > limitFromEnv('RATE_LIMIT_PER_MINUTE', DEFAULT_PER_MINUTE)) return 'minute'
    return null
  } catch (err) {
    console.warn('[rate-limit] Pruefung fehlgeschlagen – Request erlaubt (fail open):', err)
    return null
  }
}

function rateLimitResponse(scope: 'minute' | 'day'): NextResponse {
  const message =
    scope === 'day'
      ? 'Das tägliche KI-Kontingent ist erreicht – morgen geht es weiter.'
      : 'Zu viele Anfragen in kurzer Zeit – bitte einen Moment warten und dann erneut versuchen.'
  return NextResponse.json(
    { error: message },
    { status: 429, headers: { 'Retry-After': scope === 'day' ? '3600' : '60' } }
  )
}

/**
 * Guard fuer KI-Routen (Anthropic-Calls): Auth-Pflicht + Rate-Limit in einem Schritt.
 * Daten-Routen ohne KI-Kosten (Speichern, Einstellungen, Loeschen) nutzen weiter requireUser.
 *
 * Verwendung wie requireUser:
 *   const auth = await requireAiUser()
 *   if ('error' in auth) return auth.error
 */
export async function requireAiUser(): Promise<{ user: User } | { error: NextResponse }> {
  const auth = await requireUser()
  if ('error' in auth) return auth
  const scope = await rateLimitScope(auth.user.id)
  if (scope) return { error: rateLimitResponse(scope) }
  return auth
}

/** Standard-Obergrenze fuer einzelne Textfelder (Zeichen). */
export const MAX_FIELD = 6000
/** Hoehere Obergrenze fuer Transkripte/Gespraechsverlaeufe. */
export const MAX_TRANSCRIPT = 40000

/**
 * Prueft, ob ein String-Feld die Laengenobergrenze ueberschreitet.
 * Nicht-Strings werden ignoriert (die eigentliche Typpruefung macht der Aufrufer).
 */
export function tooLong(value: unknown, max = MAX_FIELD): boolean {
  return typeof value === 'string' && value.length > max
}

/** 413-Antwort fuer zu lange Eingaben. */
export function tooLongResponse(): NextResponse {
  return NextResponse.json({ error: 'Eingabe zu lang' }, { status: 413 })
}

/**
 * Gesamtlaenge eines Gespraechsverlaufs (Summe aller content-Felder).
 * Verhindert, dass ein Angreifer das Transkript-Limit durch viele kurze Turns umgeht.
 */
export function turnsTooLong(turns: unknown, max = MAX_TRANSCRIPT): boolean {
  if (!Array.isArray(turns)) return false
  if (turns.length > 500) return true
  let total = 0
  for (const t of turns) {
    const content = (t as { content?: unknown })?.content
    if (typeof content === 'string') total += content.length
    if (total > max) return true
  }
  return false
}
