// ─── Schultyp ─────────────────────────────────────────────────────────────────

export type Schultyp = 'gymnasium' | 'realschule' | 'gesamtschule' | 'grundschule' | 'mittelschule'

// ─── Elterntypen & Schwierigkeit ──────────────────────────────────────────────

export type Elterntyp =
  | 'kooperativ'
  | 'defensiv'
  | 'aggressiv'
  | 'weinend'
  | 'passiv'
  | 'uebergriffig'
  | 'unbekannt'  // S4: KI leitet Verhalten aus Freitext ab

export type Schwierigkeit = 'ruhige-see' | 'gegenwind' | 'gewitterfront'

export type Gespraechsanlass =
  // Basisoptionen (alle Schultypen)
  | 'nicht-bekannt'
  | 'allgemein'
  | 'eltern-anliegen'
  | 'leistungsabfall'
  | 'versetzung'
  | 'verhalten'
  | 'mobbing'
  | 'gefaehrdung'
  | 'sonstiges'
  // Grundschule
  | 'uebergangsempfehlung'
  | 'zurueckstellung'
  // Mittelschule
  | 'beruf'
  | 'uebergang-berufsschule-ausbildung'
  | 'abschluss-perspektive'
  // Realschule
  | 'kurswechsel-hauptreal'
  | 'uebergang-beruf-gymnasium'
  // Gymnasium
  | 'kurswahl-oberstufe'
  | 'fehlzeiten'
  | 'abiturplanung'
  | 'nichtversetzung'
  // Gesamtschule
  | 'eg-kurswechsel'
  | 'uebergang-oberstufe'

export type Klassenstufe = '1-2' | '3-4' | '5-6' | '7-8' | '9-10' | 'oberstufe'

export type Familiensituation =
  | 'keine'
  | 'scheidung'
  | 'alleinerziehend'
  | 'migration'
  | 'leistungsdruck'
  | 'multiproblem'
  | 'unbekannt'  // S4: KI leitet Verhalten aus Freitext ab

// ─── S3: Elternpersonen ───────────────────────────────────────────────────────

export type ElternPerson =
  | 'Mutter'
  | 'Vater'
  | 'Stiefmutter'
  | 'Stiefvater'
  | 'Lebenspartnerin'
  | 'Lebenspartner'
  | 'Großmutter'
  | 'Großvater'
  | 'Sonstige Bezugsperson'

// ─── S5c: Geschlecht / Geschlechtsidentität ───────────────────────────────────

export type KindGeschlecht = 'maedchen' | 'junge' | 'divers' | 'nicht-binaer' | 'keine-angabe'

// ─── S6: Gesprächsinitiative ──────────────────────────────────────────────────

export type Gespraechsinitiative = 'elternsprechtag' | 'schule' | 'eltern'

// ─── S11: Sprachbarriere ──────────────────────────────────────────────────────

export type Sprachbarriere = 'deutsch' | 'gering' | 'keine'

// ─── Szenario ────────────────────────────────────────────────────────────────

export interface Szenario {
  id: string
  schultyp: Schultyp
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
  schultyp: Schultyp
  klassenstufe: Klassenstufe
  anlass: Gespraechsanlass
  familie: Familiensituation
  elterntyp: Elterntyp
  schwierigkeit: Schwierigkeit
  // S3 – Wer nimmt teil
  person1?: ElternPerson
  person2?: ElternPerson
  // S5b – Kind
  kindName?: string
  // S5c – Geschlecht
  kindGeschlecht?: KindGeschlecht
  // S6 – Gesprächsinitiative
  gespraechsinitiative?: Gespraechsinitiative
  // S9 – Situationsfreitext
  situationText?: string
  // S11 – Sprachbarriere
  sprachbarriere?: Sprachbarriere
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
