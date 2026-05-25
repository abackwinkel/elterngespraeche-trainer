import type {
  Szenario, Schultyp, Elterntyp, Schwierigkeit, Gespraechsanlass,
  Klassenstufe, Familiensituation, GespraechsKonfiguration,
  KindGeschlecht, Gespraechsinitiative, Sprachbarriere,
} from '@/types'

export type { Schultyp, Elterntyp, Schwierigkeit, Gespraechsanlass, Klassenstufe, Familiensituation }

// ─── Labels für die UI ────────────────────────────────────────────────────────

export const SCHULTYP_LABEL: Record<Schultyp, string> = {
  gymnasium:    'Gymnasium',
  realschule:   'Realschule',
  gesamtschule: 'Gesamtschule',
  grundschule:  'Grundschule',
  mittelschule: 'Mittelschule',
}

export const ELTERNTYP_LABEL: Record<Elterntyp, string> = {
  kooperativ:  'Kooperativ-offen',
  defensiv:    'Defensiv-verletzt',
  aggressiv:   'Aggressiv-vorwurfsvoll',
  weinend:     'Überfordernd-weinend',
  passiv:      'Schweigend-passiv',
  uebergriffig:'Übergriffig-fordernd',
  unbekannt:   'Nicht bekannt',
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
  '1-2':       '1./2. Klasse',
  '3-4':       '3./4. Klasse',
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
  unbekannt:     'Nicht bekannt',
}

export const GESCHLECHT_LABEL: Record<KindGeschlecht, string> = {
  maedchen:     'Mädchen',
  junge:        'Junge',
  divers:       'Divers (amtlich)',
  'nicht-binaer':'Nicht-binär',
  'keine-angabe':'Keine Angabe',
}

export const INITIATIVE_LABEL: Record<Gespraechsinitiative, string> = {
  elternsprechtag: 'Elternsprechtag',
  schule:          'Schule hat um das Gespräch gebeten',
  eltern:          'Eltern haben um das Gespräch gebeten',
}

const INITIATIVE_PROMPT: Record<Gespraechsinitiative, string> = {
  elternsprechtag: 'Elternsprechtag – du kommst zum regulären Gespräch ohne vorab angekündigtes konkretes Anliegen.',
  schule:          'Die Schule hat dieses Gespräch erbeten – du weißt, dass es ein Thema gibt, kennst es aber nicht im Detail und kommst möglicherweise angespannt.',
  eltern:          'Du hast selbst um dieses Gespräch gebeten und kommst mit einem eigenen Anliegen. Die Lehrkraft kennt den Grund noch nicht.',
}

const SPRACHBARRIERE_ANWEISUNG: Record<Sprachbarriere, string | null> = {
  deutsch: null,
  gering:  'Sprachbarriere: Geringe Deutschkenntnisse – antworte in vereinfachtem, teils gebrochenem Deutsch. Kurze Sätze, gelegentliche Verständnislücken, gelegentlich einzelne Wörter einer anderen Sprache. Signalisiere Unsicherheit z. B. mit „Ich … nicht ganz verstehen."',
  keine:   'Sprachbarriere: Keine Deutschkenntnisse – simuliere schwere Verständigungsprobleme. Gestik, Mimik, internationale Wörter, Übersetzungsversuche. Du kannst vollständige Sätze in einer anderen Sprache verwenden (je nach Situationstext, sonst Türkisch oder Arabisch).',
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
    opener: 'Ich weiß ehrlich gesagt nicht mehr weiter … Sophie redet kaum noch mit mir. Ich mache mir so große Sorgen, aber ich weiß nicht, was ich tun soll.',
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
    opener: 'Ja. … Danke.',
    hintergrund: 'Elternprofil: Frau Yilmaz, Mutter, Sohn Amir, 10. Klasse. Berufsorientierungsgespräch. Frau Yilmaz spricht Deutsch mit starkem Akzent, ist sichtlich unsicher. Gibt kaum Reaktion, antwortet mit Ja/Nein. Möglicherweise Sprachbarriere, Überforderung oder kulturell andere Gesprächsnormen.',
    situationsbeschreibungen: [
      'Frau Yilmaz lächelt kurz und schaut dann auf ihre Hände.',
      'Frau Yilmaz nickt, aber ihr Blick ist nicht auf Sie gerichtet.',
    ],
  },

  // Szenario 7: Gefährdungseinschätzung / Defensiv / Multiproblemfamilie / 5./6. Klasse
  {
    id: 'gymn-gefaehrdung-defensiv-wagner',
    schultyp: 'gymnasium',
    klassenstufe: '5-6',
    anlass: 'gefaehrdung',
    familie: 'multiproblem',
    elterntyp: 'defensiv',
    elternName: 'Frau Wagner',
    kindName: 'Tim',
    opener: 'Ich weiß gar nicht, warum ich hier bin. Tim sagt, ihm geht es gut. Ich glaube, das wird alles aufgebauscht.',
    hintergrund: 'Elternprofil: Frau Wagner, Mutter, Sohn Tim (männlich), 5. Klasse. Tim kommt wiederholt ungewaschen und ohne Frühstück in die Schule, wirkt erschöpft und ängstlich. Erste Hinweise auf Vernachlässigung. Frau Wagner wirkt überfordert, leugnet Probleme und verteidigt sich sofort. Schul-interne Gefährdungseinschätzung wurde eingeleitet.',
    situationsbeschreibungen: [
      'Frau Wagner verschränkt die Arme und weicht Ihrem Blick aus.',
      'Frau Wagner atmet kurz scharf aus und schüttelt leicht den Kopf.',
    ],
  },

  // Szenario 8: Verhaltensauffälligkeiten / Aggressiv / Scheidung / 7./8. Klasse
  {
    id: 'gymn-verhalten-aggressiv-richter',
    schultyp: 'gymnasium',
    klassenstufe: '7-8',
    anlass: 'verhalten',
    familie: 'scheidung',
    elterntyp: 'aggressiv',
    elternName: 'Herr Richter',
    kindName: 'Felix',
    opener: 'Ich habe Felix gefragt, was los ist. Er sagt, er wird in Ihrer Klasse von Mitschülern provoziert. Wenn Sie das nicht in den Griff kriegen, dann überlege ich, ob das noch die richtige Schule für ihn ist.',
    hintergrund: 'Elternprofil: Herr Richter, Vater, Sohn Felix (männlich), 7. Klasse. Scheidung vor einem Jahr, Felix wechselt wöchentlich zwischen Elternteilen. Zunehmende Aggressionen im Unterricht und auf dem Schulhof. Herr Richter macht die Schule verantwortlich und ist selbst in einer belastenden Situation.',
    situationsbeschreibungen: [
      'Herr Richter legt die Hände flach auf den Tisch.',
      'Herr Richter lehnt sich vor und fixiert Sie mit seinem Blick.',
    ],
  },

  // Szenario 9: Leistungsabfall / Passiv / Leistungsdruck / 9./10. Klasse
  {
    id: 'gymn-leistung-passiv-schneider',
    schultyp: 'gymnasium',
    klassenstufe: '9-10',
    anlass: 'leistungsabfall',
    familie: 'leistungsdruck',
    elterntyp: 'passiv',
    elternName: 'Herr und Frau Schneider',
    kindName: 'Lara',
    opener: 'Ja. Wir hören Ihnen zu.',
    hintergrund: 'Elternprofil: Herr und Frau Schneider, beide anwesend, Tochter Lara, 10. Klasse. Lara hatte bis zur 8. Klasse sehr gute Noten, jetzt deutlicher Leistungsabfall. Beide Eltern haben hohe Erwartungen und haben bisher nie an einem Gespräch teilgenommen – sie sind da, aber verschlossen. Möglicherweise überfordert mit der Situation oder bewusst zurückhaltend, weil sie das Problem nicht wahrhaben wollen.',
    situationsbeschreibungen: [
      'Herr Schneider nickt, schaut aber an Ihnen vorbei.',
      'Frau Schneider faltet die Hände auf dem Schoß und hält sie still.',
    ],
  },

  // Szenario 10: Soziale Konflikte & Mobbing / Kooperativ / keine Besonderheit / 5./6. Klasse
  {
    id: 'gymn-mobbing-kooperativ-braun',
    schultyp: 'gymnasium',
    klassenstufe: '5-6',
    anlass: 'mobbing',
    familie: 'keine',
    elterntyp: 'kooperativ',
    elternName: 'Frau Braun',
    kindName: 'Mia',
    opener: 'Guten Tag. Ich bin froh, dass Sie sich die Zeit nehmen. Mia hat mir erzählt, dass sie in der Klasse manchmal ausgeschlossen wird – ich wollte das gerne mit Ihnen besprechen.',
    hintergrund: 'Elternprofil: Frau Braun, Mutter, Tochter Mia, 6. Klasse. Mia wird von einer kleinen Clique wiederholt ausgegrenzt – nichts Dramatisches, aber anhaltend. Frau Braun ist sachlich, offen und kooperationsbereit. Sie sucht gemeinsam nach Lösungen, hat aber klare Erwartungen an die Schule.',
    situationsbeschreibungen: [
      'Frau Braun hält Blickkontakt und nickt ruhig.',
      'Frau Braun macht sich kurz eine Notiz.',
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

  // ─── Realschule ───────────────────────────────────────────────────────────────

  // RS-1: Leistungsabfall / Aggressiv / Scheidung / 7./8. Klasse
  {
    id: 'real-leistung-aggressiv-hartmann',
    schultyp: 'realschule',
    klassenstufe: '7-8',
    anlass: 'leistungsabfall',
    familie: 'scheidung',
    elterntyp: 'aggressiv',
    elternName: 'Frau Hartmann',
    kindName: 'Kevin',
    opener: 'Ich verstehe das nicht. Kevin ist doch kein schlechter Schüler. Ich frage mich, ob er bei Ihnen überhaupt fair benotet wird.',
    hintergrund: 'Elternprofil: Frau Hartmann, Mutter, Sohn Kevin (männlich), 7. Klasse. Kevin hat seit der Trennung der Eltern stark nachgelassen – Noten in Deutsch und Mathe gefährdet. Frau Hartmann lebt allein mit ihm, arbeitet Vollzeit und ist selbst emotional belastet. Sie reagiert mit Angriff, weil sie sich schuldig fühlt.',
    situationsbeschreibungen: [
      'Frau Hartmann verschränkt die Arme und schaut Sie scharf an.',
      'Frau Hartmann tippt auf den Tisch und ihre Stimme wird lauter.',
    ],
  },

  // RS-2: Verhaltensauffälligkeiten / Kooperativ / Migrationshintergrund / 5./6. Klasse
  {
    id: 'real-verhalten-kooperativ-celik',
    schultyp: 'realschule',
    klassenstufe: '5-6',
    anlass: 'verhalten',
    familie: 'migration',
    elterntyp: 'kooperativ',
    elternName: 'Herr und Frau Çelik',
    kindName: 'Selin',
    opener: 'Guten Tag. Wir kommen, weil wir Selin helfen wollen. Bitte sagen Sie uns ehrlich, was los ist.',
    hintergrund: 'Elternprofil: Herr und Frau Çelik, beide anwesend, Tochter Selin (weiblich), 6. Klasse. Selin fällt durch zunehmende Stimmungsschwankungen und Rückzug auf. Eltern sprechen Deutsch mit Akzent, aber beide engagiert. Sie sind kooperativ und möchten verstehen, wie sie zuhause unterstützen können. Vorsicht: Kulturell ist es ungewohnt, Probleme offen vor Fremden zu besprechen.',
    situationsbeschreibungen: [
      'Frau Çelik flüstert kurz etwas auf Türkisch zu ihrem Mann.',
      'Herr Çelik nickt und schaut Sie direkt an.',
    ],
  },

  // RS-3: Versetzungsgefährdung / Defensiv / Leistungsdruck / 9./10. Klasse
  {
    id: 'real-versetzung-defensiv-gruber',
    schultyp: 'realschule',
    klassenstufe: '9-10',
    anlass: 'versetzung',
    familie: 'leistungsdruck',
    elterntyp: 'defensiv',
    elternName: 'Herr Gruber',
    kindName: 'Tobias',
    opener: 'Ja, ich weiß, dass es Probleme gibt. Aber Tobias gibt sich wirklich Mühe. Wir lernen jeden Abend zusammen. Ich bin mir nicht sicher, ob das wirklich an ihm liegt.',
    hintergrund: 'Elternprofil: Herr Gruber, Vater, Sohn Tobias (männlich), 10. Klasse. Tobias ist in zwei Fächern versetzungsgefährdet. Vater hat hohe Erwartungen, will aber Tobias schützen und sieht die Schule als mitverantwortlich. Er ist nicht böswillig, aber wenig selbstkritisch.',
    situationsbeschreibungen: [
      'Herr Gruber lehnt sich leicht zurück und schaut zur Seite.',
      'Herr Gruber nickt zögernd, seine Arme bleiben verschränkt.',
    ],
  },

  // ─── Gesamtschule ─────────────────────────────────────────────────────────────

  // GS-1: Soziale Konflikte & Mobbing / Übergriffig / Scheidung / 7./8. Klasse
  {
    id: 'ges-mobbing-uebergriffig-bauer',
    schultyp: 'gesamtschule',
    klassenstufe: '7-8',
    anlass: 'mobbing',
    familie: 'scheidung',
    elterntyp: 'uebergriffig',
    elternName: 'Frau Bauer',
    kindName: 'Niklas',
    opener: 'Ich habe Screenshots. Ich habe alles. Niklas wird seit Monaten fertiggemacht und ich will wissen, was Sie dagegen unternommen haben. Wenn das hier nicht aufhört, gehe ich zur Schulbehörde.',
    hintergrund: 'Elternprofil: Frau Bauer, Mutter, Sohn Niklas (männlich), 8. Klasse. Niklas ist in eine Mobbing-Situation verwickelt – teils Opfer, teils Mitläufer. Mutter ist nach der Scheidung sehr angespannt, hat das Gefühl, immer kämpfen zu müssen. Kommt mit einer Dokumentenmappe und hohem Anspruch auf sofortige Lösungen.',
    situationsbeschreibungen: [
      'Frau Bauer legt eine Mappe auf den Tisch und öffnet sie demonstrativ.',
      'Frau Bauer lehnt sich vor, ihr Tonfall wird schärfer.',
    ],
  },

  // GS-2: Berufsorientierung / Passiv / keine Besonderheit / 9./10. Klasse
  {
    id: 'ges-beruf-passiv-wolf',
    schultyp: 'gesamtschule',
    klassenstufe: '9-10',
    anlass: 'beruf',
    familie: 'keine',
    elterntyp: 'passiv',
    elternName: 'Frau Wolf',
    kindName: 'Jana',
    opener: 'Mmh. Okay.',
    hintergrund: 'Elternprofil: Frau Wolf, Mutter, Tochter Jana (weiblich), 10. Klasse. Berufsorientierungsgespräch. Jana hat keine klare Richtung, ihre Noten sind mittelmäßig. Frau Wolf wirkt erschöpft und desinteressiert – möglicherweise überfordert oder hat das Gefühl, dass Schule nicht ihr Thema ist. Antwortet einsilbig, initiiert nichts.',
    situationsbeschreibungen: [
      'Frau Wolf schaut auf ihr Handy und legt es dann zögernd weg.',
      'Frau Wolf nickt kurz, ohne den Blick zu heben.',
    ],
  },

  // GS-3: Allgemeines Entwicklungsgespräch / Weinend / Alleinerziehend / 5./6. Klasse
  {
    id: 'ges-allgemein-weinend-peters',
    schultyp: 'gesamtschule',
    klassenstufe: '5-6',
    anlass: 'allgemein',
    familie: 'alleinerziehend',
    elterntyp: 'weinend',
    elternName: 'Frau Peters',
    kindName: 'Leon',
    opener: 'Ich mache mir so viele Sorgen um Leon. Er schläft schlecht, er isst kaum … ich weiß nicht mehr, wie ich ihm noch helfen soll.',
    hintergrund: 'Elternprofil: Frau Peters, alleinerziehende Mutter, Sohn Leon (männlich), 6. Klasse. Leon hat soziale Schwierigkeiten und wirkt in der Schule häufig traurig und zurückgezogen. Frau Peters ist emotional am Limit, kümmert sich allein und ohne Unterstützung. Sie sucht Verständnis und praktische Hilfe, bricht aber schnell in Tränen aus.',
    situationsbeschreibungen: [
      'Frau Peters greift nach ihrem Taschentuch.',
      'Frau Peters schaut kurz weg und atmet tief durch.',
    ],
  },

  // ─── Grundschule ──────────────────────────────────────────────────────────────

  // GRU-1: Allgemeines Entwicklungsgespräch / Kooperativ / 1./2. Klasse / keine Besonderheit
  {
    id: 'gru-allgemein-kooperativ-hoffmann',
    schultyp: 'grundschule',
    klassenstufe: '1-2',
    anlass: 'allgemein',
    familie: 'keine',
    elterntyp: 'kooperativ',
    elternName: 'Frau Hoffmann',
    kindName: 'Mathis',
    opener: 'Guten Tag. Ich wollte mal hören, wie Mathis sich so macht. Zuhause erzählt er manchmal, dass er nicht so gerne in die Schule will – das hat mich ein bisschen überrascht.',
    hintergrund: 'Elternprofil: Frau Hoffmann, Mutter, Sohn Mathis (männlich), 2. Klasse. Allgemeines Entwicklungsgespräch. Mathis lernt solide, fällt aber durch zunehmenden Widerwillen gegen den Schulweg auf. Frau Hoffmann ist kooperativ und aufgeschlossen, möchte verstehen, was in der Schule passiert, und gemeinsam Lösungen finden.',
    situationsbeschreibungen: [
      'Frau Hoffmann nickt ruhig und schaut Sie offen an.',
      'Frau Hoffmann notiert sich kurz etwas.',
    ],
  },

  // GRU-2: Verhaltensauffälligkeiten / Aggressiv / 3./4. Klasse / Scheidung
  {
    id: 'gru-verhalten-aggressiv-baum',
    schultyp: 'grundschule',
    klassenstufe: '3-4',
    anlass: 'verhalten',
    familie: 'scheidung',
    elterntyp: 'aggressiv',
    elternName: 'Herr Baum',
    kindName: 'Noah',
    opener: 'Mir hat Noah erzählt, dass er letzte Woche vom Unterricht ausgeschlossen wurde. Ich halte das für völlig übertrieben und möchte wissen, wie das begründet ist.',
    hintergrund: 'Elternprofil: Herr Baum, Vater, Sohn Noah (männlich), 4. Klasse. Noah verhält sich seit der Trennung der Eltern zunehmend auffällig – Auseinandersetzungen mit Mitschülern, Verweigerung von Aufgaben. Herr Baum lebt getrennt von der Mutter, kommt zu diesem Gespräch allein und reagiert defensiv-aggressiv. Er fühlt sich als Elternteil übergangen.',
    situationsbeschreibungen: [
      'Herr Baum legt die Arme auf dem Tisch verschränkt vor sich.',
      'Herr Baum lehnt sich vor und fixiert Sie direkt.',
    ],
  },

  // GRU-3: Gefährdungseinschätzung / Defensiv / 1./2. Klasse / Multiproblemfamilie
  {
    id: 'gru-gefaehrdung-defensiv-schreiber',
    schultyp: 'grundschule',
    klassenstufe: '1-2',
    anlass: 'gefaehrdung',
    familie: 'multiproblem',
    elterntyp: 'defensiv',
    elternName: 'Frau Schreiber',
    kindName: 'Amelie',
    opener: 'Ich weiß eigentlich nicht, warum ich hier sein muss. Amelie geht es gut. Sie ist halt manchmal müde.',
    hintergrund: 'Elternprofil: Frau Schreiber, Mutter, Tochter Amelie (weiblich), 2. Klasse. Amelie kommt wiederholt erschöpft und ungepflegt in die Schule, wirkt ängstlich und klammert sich an die Lehrperson. Erste Hinweise auf häusliche Vernachlässigung. Frau Schreiber ist überfordert, lebt in einer instabilen Situation und weicht Konflikten aus. Sie bagatellisiert alle Beobachtungen.',
    situationsbeschreibungen: [
      'Frau Schreiber zieht die Schultern hoch und weicht Ihrem Blick aus.',
      'Frau Schreiber atmet kurz aus und schüttelt kaum merklich den Kopf.',
    ],
  },

  // ─── Mittelschule ─────────────────────────────────────────────────────────────

  // MIT-1: Versetzungsgefährdung / Aggressiv / 9./10. Klasse / Leistungsdruck
  {
    id: 'mit-versetzung-aggressiv-maier',
    schultyp: 'mittelschule',
    klassenstufe: '9-10',
    anlass: 'versetzung',
    familie: 'leistungsdruck',
    elterntyp: 'aggressiv',
    elternName: 'Herr und Frau Maier',
    kindName: 'Lukas',
    opener: 'Wir können das nicht nachvollziehen. Lukas gibt sich Mühe. Das muss an der Bewertung liegen – er war früher immer im Mittelfeld, und jetzt plötzlich das.',
    hintergrund: 'Elternprofil: Herr und Frau Maier, beide anwesend, Sohn Lukas (männlich), 9. Klasse. Lukas ist in zwei Fächern versetzungsgefährdet. Die Eltern haben hohe Erwartungen und verknüpfen den Schulabschluss mit konkreten Berufswünschen. Sie sind frustriert und sehen die Schule in der Mitverantwortung. Herr Maier führt das Gespräch, Frau Maier bestärkt ihn.',
    situationsbeschreibungen: [
      'Herr Maier lehnt sich vor und tippt mit dem Zeigefinger auf den Tisch.',
      'Frau Maier nickt und schaut Sie scharf an.',
    ],
  },

  // MIT-2: Verhaltensauffälligkeiten / Übergriffig / 5./6. Klasse / Scheidung
  {
    id: 'mit-verhalten-uebergriffig-bergmann',
    schultyp: 'mittelschule',
    klassenstufe: '5-6',
    anlass: 'verhalten',
    familie: 'scheidung',
    elterntyp: 'uebergriffig',
    elternName: 'Frau Bergmann',
    kindName: 'Alina',
    opener: 'Ich habe von Alina gehört, dass sie immer als Schuldige dasteht, obwohl andere anfangen. Das macht mich wütend. Ich will wissen, was Sie konkret dagegen tun.',
    hintergrund: 'Elternprofil: Frau Bergmann, Mutter, Tochter Alina (weiblich), 5. Klasse. Alina ist nach dem Umzug infolge der Scheidung neu in der Klasse und hat Schwierigkeiten, sich einzufügen. Es kommt zu Konflikten, bei denen Alina eskaliert. Frau Bergmann kämpft in vielen Lebensbereichen gleichzeitig und kommt mit hohem Anspruch auf sofortige Konsequenzen.',
    situationsbeschreibungen: [
      'Frau Bergmann öffnet ihr Handy und zeigt Ihnen eine Nachricht.',
      'Frau Bergmann lehnt sich vor, ihre Stimme wird lauter.',
    ],
  },

  // MIT-3: Berufsorientierung / Passiv / 9./10. Klasse / Migrationshintergrund
  {
    id: 'mit-beruf-passiv-demir',
    schultyp: 'mittelschule',
    klassenstufe: '9-10',
    anlass: 'beruf',
    familie: 'migration',
    elterntyp: 'passiv',
    elternName: 'Herr Demir',
    kindName: 'Burak',
    opener: 'Ja.',
    hintergrund: 'Elternprofil: Herr Demir, Vater, Sohn Burak (männlich), 10. Klasse. Berufsorientierungsgespräch. Burak hat unklare Zukunftsvorstellungen, die Noten sind ausreichend. Herr Demir spricht wenig Deutsch, ist sichtlich unsicher und antwortet kaum. Er ist anwesend, weil die Schule ihn eingeladen hat, nicht aus eigenem Interesse. Möglicherweise liegt eine Sprachbarriere vor, möglicherweise kulturell andere Erwartungen an Schulgespräche.',
    situationsbeschreibungen: [
      'Herr Demir schaut auf die Tischfläche und nickt kaum wahrnehmbar.',
      'Herr Demir verschränkt die Hände vor sich und schweigt.',
    ],
  },
]

// ─── Hilfsfunktion: Szenario für eine Konfiguration finden ───────────────────

export function findSzenario(
  schultyp: Schultyp,
  elterntyp: Elterntyp,
  anlass: Gespraechsanlass,
  klassenstufe: Klassenstufe,
  familie: Familiensituation,
): Szenario | null {
  const pool = SZENARIEN.filter(s => s.schultyp === schultyp)

  // 'unbekannt' hat kein eigenes Szenario – Fallback auf erstes passendes
  if (elterntyp === 'unbekannt') {
    return pool[0] ?? SZENARIEN[0]
  }

  // Exakter Treffer
  const exact = pool.find(
    s => s.elterntyp === elterntyp && s.anlass === anlass &&
         s.klassenstufe === klassenstufe && s.familie === familie
  )
  if (exact) return exact

  // Typ + Anlass
  const byTypeAnlass = pool.find(
    s => s.elterntyp === elterntyp && s.anlass === anlass
  )
  if (byTypeAnlass) return byTypeAnlass

  // Nur Typ
  return pool.find(s => s.elterntyp === elterntyp) ?? pool[0] ?? SZENARIEN[0]
}

// ─── Szenario-Kontext-String für Prompts ─────────────────────────────────────

export function buildSzenarioKontext(
  szenario: Szenario,
  config: GespraechsKonfiguration,
): string {
  // S3: Personenzeile aus Formular-Auswahl oder Szenario-Name
  let elternteilStr: string
  if (config.person1) {
    if (config.person2) {
      // Marker [PRIMÄR]/[SEKUNDÄR] für buildElternteilSystemPrompt
      elternteilStr = `${config.person1} [PRIMÄR] und ${config.person2} [SEKUNDÄR]`
    } else {
      elternteilStr = config.person1
    }
  } else {
    elternteilStr = szenario.elternName
  }

  // S5b/S5c: Kindzeile
  let kindStr = config.kindName ?? szenario.kindName
  if (config.kindGeschlecht && config.kindGeschlecht !== 'keine-angabe') {
    kindStr += ` (${GESCHLECHT_LABEL[config.kindGeschlecht]})`
  }

  const lines: string[] = [
    `Elternteil(e): ${elternteilStr}`,
    `Kind: ${kindStr}`,
    `Schultyp: ${SCHULTYP_LABEL[szenario.schultyp]}, ${KLASSENSTUFE_LABEL[config.klassenstufe]}`,
  ]

  // S6: Gesprächsinitiative
  if (config.gespraechsinitiative) {
    lines.push(`Gesprächsinitiative: ${INITIATIVE_PROMPT[config.gespraechsinitiative]}`)
  }

  lines.push(`Gesprächsanlass: ${ANLASS_LABEL[config.anlass]}`)
  lines.push(`Familiensituation: ${config.familie !== 'unbekannt' ? FAMILIE_LABEL[config.familie] : 'nicht bekannt'}`)
  lines.push(`Hintergrund: ${szenario.hintergrund}`)

  // S4/S9: Elterntyp unbekannt → KI leitet Verhalten aus Freitext ab
  if (config.elterntyp === 'unbekannt') {
    if (config.situationText?.trim()) {
      lines.push(`Elternverhalten: Leite das Verhalten des Elternteils aus der folgenden Schilderung ab – ${config.situationText.trim()}`)
    } else {
      lines.push('Elternverhalten: Nicht vorgegeben – spiele einen unvorhersehbaren, neutralen Gesprächspartner.')
    }
  } else if (config.situationText?.trim()) {
    lines.push(`Zusätzliche Situation/Vorgeschichte: ${config.situationText.trim()}`)
  }

  // S11: Sprachbarriere
  const sprachHinweis = config.sprachbarriere
    ? SPRACHBARRIERE_ANWEISUNG[config.sprachbarriere]
    : null
  if (sprachHinweis) lines.push(sprachHinweis)

  return lines.join('\n')
}
