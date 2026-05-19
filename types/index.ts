// ─── Elterntypen & Schwierigkeit ──────────────────────────────────────────────

export type Elterntyp =
  | 'kooperativ'
  | 'defensiv'
  | 'aggressiv'
  | 'weinend'
  | 'passiv'
  | 'uebergriffig'

export type Schwierigkeit = 'ruhige-see' | 'gegenwind' | 'gewitterfront'

export type Gespraechsanlass =
  | 'leistungsabfall'
  | 'versetzung'
  | 'verhalten'
  | 'mobbing'
  | 'gefaehrdung'
  | 'beruf'
  | 'allgemein'

export type Klassenstufe = '5-6' | '7-8' | '9-10' | 'oberstufe'

export type Familiensituation =
  | 'keine'
  | 'scheidung'
  | 'alleinerziehend'
  | 'migration'
  | 'leistungsdruck'
  | 'multiproblem'

// ─── Szenario ────────────────────────────────────────────────────────────────

export interface Szenario {
  id: string
  schultyp: 'gymnasium'
  klassenstufe: Klassenstufe
  anlass: Gespraechsanlass
  familie: Familiensituation
  elterntyp: Elterntyp
  elternName: string
  kindName: string
  opener: string
  hintergrund: string
  situationsbeschreibungen?: string[]
}

// ─── Gesprächs-Session ───────────────────────────────────────────────────────

export type TurnRole = 'elternteil' | 'lehrkraft' | 'situation'

export interface Turn {
  role: TurnRole
  content: string
  timestamp: string
}

export interface GespraechsKonfiguration {
  schultyp: 'gymnasium'
  klassenstufe: Klassenstufe
  anlass: Gespraechsanlass
  familie: Familiensituation
  elterntyp: Elterntyp
  schwierigkeit: Schwierigkeit
}

// ─── API: Elternteil-Route ────────────────────────────────────────────────────

export interface ElternteilRequest {
  messages: { role: 'user' | 'assistant'; content: string }[]
  elterntyp: Elterntyp
  schwierigkeit: Schwierigkeit
  szenarioKontext: string
  sessionStart?: boolean
  opener?: string
}

// ─── API: Feedback-Route ─────────────────────────────────────────────────────

export interface FeedbackRequest {
  userTurn: string
  elternTurn: string
  szenarioKontext: string
}

export interface FeedbackResponse {
  gut: string
  besser: string | null
  alternativ: string | null
}

// ─── API: Reflexion-Route ────────────────────────────────────────────────────

export interface ReflexionRequest {
  turns: Turn[]
  szenarioKontext: string
  elterntyp: Elterntyp
  schwierigkeit: Schwierigkeit
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export type QuizModul =
  | 'gespraechsphasen'
  | 'reaktionen'
  | 'rechtswissen'
  | 'gfk'
  | 'vorbereitung'
  | 'koerpersignale'

export interface QuizFrage {
  id: string
  modul: QuizModul
  schwierigkeit: Schwierigkeit
  frage: string
  antworten: string[]
  korrektIndex: number
  erklaerung: string
}

// ─── Körpersignal ─────────────────────────────────────────────────────────────

export interface KoerpersignalItem {
  id: string
  situation: string
  antworten: string[]
  korrektIndex: number
  erklaerung: string
  handlungsoptionen: string[]
}

// ─── Subscription ────────────────────────────────────────────────────────────

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'beta'

export interface UserProfile {
  id: string
  trial_started_at: string
  subscription_status: SubscriptionStatus
  created_at: string
}
