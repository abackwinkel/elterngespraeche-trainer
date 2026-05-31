// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface SymptomMeasures {
  a: string[]
  b: string[]
  c: string[]
}

export interface Symptom {
  id: string              // "s01" ... "s13"
  label: string
  subtitle: string
  priority?: 'urgent'    // s12, s13
  topNotice?: string      // bei urgent: Warnbanner-Text
  measures: SymptomMeasures
}

// ─── 13 Symptome (Reihenfolge: häufig & alltagsnah zuerst, Krisen am Ende) ────

export const SYMPTOME: Symptom[] = [
  {
    id: 's01',
    label: 'Häufiges Zuspätkommen',
    subtitle: 'Kommt regelmäßig zu spät',
    measures: {
      a: ['a08', 'a09', 'a04', 'a15'],
      b: ['b01', 'b03', 'b05'],
      c: ['c02', 'c05'],
    },
  },
  {
    id: 's02',
    label: 'Hausaufgaben fehlen oder unvollständig',
    subtitle: 'Vergisst HA, schlechte Selbstorganisation',
    measures: {
      a: ['a06', 'a07', 'a09', 'a03'],
      b: ['b04', 'b01', 'b02'],
      c: ['c03'],
    },
  },
  {
    id: 's03',
    label: 'Konzentrationsprobleme, klinkt sich aus',
    subtitle: 'Wirkt abwesend, „taucht ab"',
    measures: {
      a: ['a01', 'a02', 'a03', 'a04', 'a12'],
      b: ['b06', 'b07'],
      c: ['c01', 'c03'],
    },
  },
  {
    id: 's04',
    label: 'Plötzlicher Leistungsabfall',
    subtitle: 'Leistungen brechen ein',
    measures: {
      a: ['a04', 'a05', 'a12', 'a02'],
      b: ['b06', 'b09', 'b03'],
      c: ['c01', 'c02', 'c03', 'c04'],
    },
  },
  {
    id: 's05',
    label: 'Demotivation, Resignation',
    subtitle: 'Wirkt entmutigt, sagt „Ich kann das eh nicht"',
    measures: {
      a: ['a13', 'a14', 'a02', 'a12', 'a03'],
      b: ['b11', 'b06', 'b07'],
      c: ['c01', 'c04'],
    },
  },
  {
    id: 's06',
    label: 'Unterrichtsstörungen, auffälliges Verhalten',
    subtitle: 'Stört wiederholt, ohne klaren Grund',
    measures: {
      a: ['a01', 'a02', 'a12', 'a04', 'a13'],
      b: ['b01', 'b09', 'b06', 'b08'],
      c: ['c01', 'c03'],
    },
  },
  {
    id: 's07',
    label: 'Mobbing-Verdacht, Konflikte mit Mitschüler:innen',
    subtitle: 'Wird ausgegrenzt oder ist Auslöser',
    measures: {
      a: ['a04', 'a12', 'a02', 'a01'],
      b: ['b05', 'b06', 'b09', 'b08'],
      c: ['c01', 'c04'],
    },
  },
  {
    id: 's08',
    label: 'Häufiges Fehlen, Schulangst, Schulverweigerung',
    subtitle: 'Fehlt gehäuft, körperliche Beschwerden morgens',
    measures: {
      a: ['a15', 'a04', 'a05', 'a02'],
      b: ['b01', 'b06', 'b05', 'b08'],
      c: ['c01', 'c04', 'c05'],
    },
  },
  {
    id: 's09',
    label: 'Anerkannte LRS, ADHS, Förderbedarf',
    subtitle: 'Diagnose liegt vor — wie weitergehen?',
    measures: {
      a: ['a03', 'a04', 'a13'],
      b: ['b07', 'b10', 'b04', 'b01'],
      c: ['c01', 'c03'],
    },
  },
  {
    id: 's10',
    label: 'Familiäre Belastung, Eltern überfordert',
    subtitle: 'Trennung, Krise, „Ich weiß nicht mehr weiter"',
    measures: {
      a: ['a05', 'a04', 'a14'],
      b: ['b05', 'b04', 'b03', 'b06'],
      c: ['c02', 'c05'],
    },
  },
  {
    id: 's11',
    label: 'Mitteilungen kommen nicht zu Eltern, Kontakt schwierig',
    subtitle: 'Zettel verschwinden, Eltern reagieren nicht',
    measures: {
      a: ['a10', 'a11', 'a14'],
      b: ['b02', 'b05', 'b08'],
      c: ['c02'],
    },
  },
  {
    id: 's12',
    label: 'Verdacht auf Kindeswohlgefährdung',
    subtitle: 'Blaue Flecken, Vernachlässigung, häusliche Gewalt',
    priority: 'urgent',
    topNotice: 'Schulleitung zwingend einbeziehen. Nicht allein handeln. § 8a SGB VIII.',
    measures: {
      a: ['a04'],
      b: ['b08', 'b05', 'b06'],
      c: ['c05'],
    },
  },
  {
    id: 's13',
    label: 'Akute psychische Krise, Suizidäußerungen',
    subtitle: 'Sagt „alles keinen Sinn", Selbstverletzung',
    priority: 'urgent',
    topNotice: 'Bei akuter Suizidgefahr: Krisendienst, Notarzt oder KJP-Notaufnahme sofort. Empfehlung allein reicht nicht.',
    measures: {
      a: ['a04'],
      b: ['b08', 'b06', 'b05'],
      c: ['c04', 'c05'],
    },
  },
]

export function getSymptomById(id: string): Symptom | undefined {
  return SYMPTOME.find(s => s.id === id)
}
