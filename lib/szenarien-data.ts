import type {
  Szenario, Elterntyp, Schwierigkeit, Gespraechsanlass,
  Klassenstufe, Familiensituation,
} from '@/types'

export type { Elterntyp, Schwierigkeit, Gespraechsanlass, Klassenstufe, Familiensituation }

// ─── Labels für die UI ────────────────────────────────────────────────────────

export const ELTERNTYP_LABEL: Record<Elterntyp, string> = {
  kooperativ:  'Kooperativ-offen',
  defensiv:    'Defensiv-verletzt',
  aggressiv:   'Aggressiv-vorwurfsvoll',
  weinend:     'Überfordernd-weinend',
  passiv:      'Schweigend-passiv',
  uebergriffig:'Übergriffig-fordernd',
}

export const SCHWIERIGKEIT_LABEL: Record<Schwierigkeit, string> = {
  'ruhige-see':   'Ruhige See',
  'gegenwind':    'Gegenwind',
  'gewitterfront':'Gewitterfront',
}

export const ANLASS_LABEL: Record<Gespraechsanlass, string> = {
  leistungsabfall: 'Leistungsabfall',
  versetzung:      'Versetzungsgefährdung',
  verhalten:       'Verhaltensauffälligkeiten',
  mobbing:         'Soziale Konflikte & Mobbing',
  gefaehrdung:     'Gefährdungseinschätzung',
  beruf:           'Berufsorientierung',
  allgemein:       'Allgemeines Entwicklungsgespräch',
}

export const KLASSENSTUFE_LABEL: Record<Klassenstufe, string> = {
  '5-6':       '5./6. Klasse',
  '7-8':       '7./8. Klasse',
  '9-10':      '9./10. Klasse',
  'oberstufe': 'Oberstufe (11./12.)',
}

export const FAMILIE_LABEL: Record<Familiensituation, string> = {
  keine:         'Keine Besonderheit',
  scheidung:     'Scheidung / Trennung',
  alleinerziehend:'Alleinerziehend',
  migration:     'Migrationshintergrund',
  leistungsdruck:'Hoher Leistungsdruck durch Familie',
  multiproblem:  'Multiproblemfamilie',
}

// ─── Situationsbeschreibungen (Körpersignale im Gespräch) ─────────────────────
// Werden gelegentlich zwischen Gesprächszügen eingeblendet.
// Format: kursiv, beobachtbare Verhaltensweisen — keine Deutungen.

export const SITUATIONSBESCHREIBUNGEN_POOL: string[] = [
  'Die Mutter faltet die Hände und schaut zur Seite. Ihr Tonfall wird flacher.',
  'Der Vater lehnt sich zurück und verschränkt die Arme vor der Brust.',
  'Die Mutter schaut demonstrativ auf ihr Handy, während Sie sprechen.',
  'Die Eltern wechseln kurz einen Blick miteinander, ohne etwas zu sagen.',
  'Der Vater trommelt leise mit den Fingern auf dem Tisch.',
  'Die Mutter beugt sich vor und ihre Stimme wird lauter.',
  'Die Eltern sitzen näher zusammen, die Mutter legt kurz die Hand auf den Arm des Vaters.',
  'Der Vater nickt, aber sein Blick wandert an Ihnen vorbei.',
  'Die Mutter atmet hörbar aus und reibt sich kurz die Augen.',
  'Die Eltern schweigen einen Moment. Beide schauen auf den Tisch.',
  'Der Vater dreht den Stuhl leicht von Ihnen weg.',
  'Die Mutter tippt mit dem Stift auf ihren Block, ohne zu schreiben.',
]

// ─── Szenarien ────────────────────────────────────────────────────────────────

export const SZENARIEN: Szenario[] = [
  // Szenario 1: Versetzungsgefährdung / Aggressiv / Bildungsnahe Familie
  {
    id: 'gymn-versetzung-aggressiv-berger',
    schultyp: 'gymnasium',
    klassenstufe: '9-10',
    anlass: 'versetzung',
    familie: 'leistungsdruck',
    elterntyp: 'aggressiv',
    elternName: 'Herr und Frau Berger',
    kindName: 'Maximilian',
    opener: 'Wir haben Maximilians Leistungen selbst überprüft. Wir glauben nicht, dass das an Max liegt – er war immer ein sehr guter Schüler. Wir würden gerne wissen, was in Ihrem Unterricht schiefläuft.',
    hintergrund: 'Elternprofil: Herr und Frau Berger, beide anwesend, Sohn Maximilian (männlich), 10. Klasse. Leistungen haben sich im letzten Halbjahr deutlich verschlechtert, Versetzung gefährdet. Beide Eltern sind Akademiker mit hohen Erwartungen. Sie sehen die Schule in der Verantwortung.',
    situationsbeschreibungen: [
      'Herr Berger legt seine Unterlagen auf den Tisch und schaut Sie direkt an.',
      'Frau Berger schreibt etwas in ihr Notizbuch, während Sie sprechen.',
    ],
  },

  // Szenario 2: Mobbing / Übergriffig / Scheidungssituation
  {
    id: 'gymn-mobbing-uebergriffig-koch',
    schultyp: 'gymnasium',
    klassenstufe: '7-8',
    anlass: 'mobbing',
    familie: 'scheidung',
    elterntyp: 'uebergriffig',
    elternName: 'Frau Koch',
    kindName: 'Lena',
    opener: 'Ich erwarte, dass Sie mir jetzt erklären, was Sie in den letzten vier Wochen unternommen haben. Ich habe hier alles dokumentiert. Wenn das nicht aufhört, werde ich rechtliche Schritte einleiten.',
    hintergrund: 'Elternprofil: Frau Koch, Mutter, Tochter Lena, 8. Klasse. Lena wird seit Wochen von einer Clique ausgegrenzt. Mutter fordert sofortige Schulmaßnahmen und hat alles dokumentiert. Eltern leben getrennt, Vater hat ein anderes Sorgerechtsmodell vorgeschlagen. Frau Koch ist angespannt und unter Druck.',
    situationsbeschreibungen: [
      'Frau Koch öffnet eine Mappe und legt Ausdrucke auf den Tisch.',
      'Frau Koch tritt leicht den Stuhl nach hinten, ihr Tonfall wird lauter.',
    ],
  },

  // Szenario 3: Leistungsabfall / Überfordernd-weinend / Oberstufe
  {
    id: 'gymn-leistung-weinend-lange',
    schultyp: 'gymnasium',
    klassenstufe: 'oberstufe',
    anlass: 'leistungsabfall',
    familie: 'keine',
    elterntyp: 'weinend',
    elternName: 'Frau Lange',
    kindName: 'Sophie',
    opener: 'Ich weiß ehrlich gesagt nicht mehr weiter... Sophie redet kaum noch mit mir. Ich mache mir so große Sorgen, aber ich weiß nicht, was ich tun soll.',
    hintergrund: 'Elternprofil: Frau Lange, Mutter, Tochter Sophie, 12. Klasse. Sophie hat massive Leistungseinbrüche, wirkt erschöpft und sozial zurückgezogen. Mutter ist selbst am Limit, Vater häufig beruflich unterwegs. Frau Lange ist emotional überfordert und sucht Halt.',
    situationsbeschreibungen: [
      'Frau Lange hält kurz inne und greift nach einem Taschentuch.',
      'Frau Lange schaut aus dem Fenster. Ihre Schultern sind hochgezogen.',
    ],
  },

  // Szenario 4: Verhaltensauffälligkeiten / Defensiv / 5./6. Klasse
  {
    id: 'gymn-verhalten-defensiv-mueller',
    schultyp: 'gymnasium',
    klassenstufe: '5-6',
    anlass: 'verhalten',
    familie: 'keine',
    elterntyp: 'defensiv',
    elternName: 'Herr Müller',
    kindName: 'Jonas',
    opener: 'Ja, ich weiß, dass Sie Beobachtungen gemacht haben. Aber ich muss ehrlich sagen – zuhause ist Jonas ganz anders. Mit uns ist er immer freundlich und kooperativ. Ich frage mich, ob das wirklich an Jonas liegt oder vielleicht auch an der Klasse.',
    hintergrund: 'Elternprofil: Herr Müller, Vater, Sohn Jonas, 6. Klasse. Jonas fällt durch störendes Verhalten im Unterricht auf, häufige Konflikte mit Mitschülern. Vater ist defensiv, fühlt sich als Elternteil kritisiert. Zeigt kein bösen Willen, ist aber schwer zu erreichen.',
    situationsbeschreibungen: [
      'Herr Müller nickt, lehnt sich aber leicht zurück.',
      'Herr Müller zieht kurz die Augenbrauen hoch und verschränkt kurz die Arme.',
    ],
  },

  // Szenario 5: Berufsorientierung / Passiv / 9./10. Klasse / Migrationskontext
  {
    id: 'gymn-beruf-passiv-yilmaz',
    schultyp: 'gymnasium',
    klassenstufe: '9-10',
    anlass: 'beruf',
    familie: 'migration',
    elterntyp: 'passiv',
    elternName: 'Frau Yilmaz',
    kindName: 'Amir',
    opener: 'Ja. ... Danke.',
    hintergrund: 'Elternprofil: Frau Yilmaz, Mutter, Sohn Amir, 10. Klasse. Berufsorientierungsgespräch. Frau Yilmaz spricht Deutsch mit starkem Akzent, ist sichtlich unsicher. Gibt kaum Reaktion, antwortet mit Ja/Nein. Möglicherweise Sprachbarriere, Überforderung oder kulturell andere Gesprächsnormen.',
    situationsbeschreibungen: [
      'Frau Yilmaz lächelt kurz und schaut dann auf ihre Hände.',
      'Frau Yilmaz nickt, aber ihr Blick ist nicht auf Sie gerichtet.',
    ],
  },

  // Szenario 6: Allgemeines Entwicklungsgespräch / Kooperativ / 7./8. Klasse
  {
    id: 'gymn-allgemein-kooperativ-hofmann',
    schultyp: 'gymnasium',
    klassenstufe: '7-8',
    anlass: 'allgemein',
    familie: 'alleinerziehend',
    elterntyp: 'kooperativ',
    elternName: 'Herr Hofmann',
    kindName: 'Emma',
    opener: 'Guten Tag. Ich freue mich, dass wir heute die Möglichkeit haben zu sprechen. Emma erzählt zuhause viel von der Schule – ich bin gespannt, wie Sie sie erleben.',
    hintergrund: 'Elternprofil: Herr Hofmann, alleinerziehender Vater, Tochter Emma, 8. Klasse. Allgemeines Entwicklungsgespräch. Herr Hofmann ist kooperativ und offen. Er kommt mit dem Willen, gemeinsam zu lösen. Dennoch: Er schützt Emma und hat eigene Sichtweise auf ihr soziales Leben.',
    situationsbeschreibungen: [
      'Herr Hofmann nickt und schreibt eine kurze Notiz.',
      'Herr Hofmann lehnt sich vor und schaut Sie direkt an.',
    ],
  },
]

// ─── Hilfsfunktion: Szenario für eine Konfiguration finden ───────────────────

export function findSzenario(
  elterntyp: Elterntyp,
  anlass: Gespraechsanlass,
  klassenstufe: Klassenstufe,
  familie: Familiensituation,
): Szenario | null {
  // Exakter Treffer
  const exact = SZENARIEN.find(
    s => s.elterntyp === elterntyp && s.anlass === anlass &&
         s.klassenstufe === klassenstufe && s.familie === familie
  )
  if (exact) return exact

  // Typ + Anlass
  const byTypeAnlass = SZENARIEN.find(
    s => s.elterntyp === elterntyp && s.anlass === anlass
  )
  if (byTypeAnlass) return byTypeAnlass

  // Nur Typ
  return SZENARIEN.find(s => s.elterntyp === elterntyp) ?? SZENARIEN[0]
}

// ─── Szenario-Kontext-String für Prompts ─────────────────────────────────────

export function buildSzenarioKontext(
  szenario: Szenario,
  config: { klassenstufe: Klassenstufe; anlass: Gespraechsanlass; familie: Familiensituation }
): string {
  return `Elternteil(e): ${szenario.elternName}
Kind: ${szenario.kindName}
Schultyp: Gymnasium, ${KLASSENSTUFE_LABEL[config.klassenstufe]}
Gesprächsanlass: ${ANLASS_LABEL[config.anlass]}
Familiensituation: ${FAMILIE_LABEL[config.familie]}
Hintergrund: ${szenario.hintergrund}`
}
