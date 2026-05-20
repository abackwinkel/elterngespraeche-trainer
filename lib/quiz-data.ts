import type { QuizFrage, QuizModul, Schwierigkeit } from '@/types'

export type { QuizFrage, QuizModul }

export const QUIZ_MODUL_LABEL: Record<QuizModul, string> = {
  gespraechsphasen: 'Gesprächsphasen',
  reaktionen:       'Reaktionen auf Elternverhalten',
  rechtswissen:     'Rechtswissen',
  gfk:              'GFK-Grundlagen',
  vorbereitung:     'Vorbereitung',
  koerpersignale:   'Körpersignale',
}

export const QUIZ_FRAGEN: QuizFrage[] = [
  // ── Gesprächsphasen ─────────────────────────────────────────────────────────
  {
    id: 'gp-01',
    modul: 'gespraechsphasen',
    schwierigkeit: 'ruhige-see',
    frage: 'In welcher Gesprächsphase sollten konkrete Vereinbarungen (wer macht was bis wann?) getroffen werden?',
    antworten: ['Begrüßung & Ankommen', 'Dialog & Zuhören', 'Ergebnis & Vereinbarungen', 'Themeneinführung'],
    korrektIndex: 2,
    erklaerung: 'Die Ergebnis-Phase dient dazu, das Gespräch in klare, umsetzbare Schritte zu überführen. Ohne konkrete Vereinbarungen bleibt vieles in der Luft.',
  },
  {
    id: 'gp-02',
    modul: 'gespraechsphasen',
    schwierigkeit: 'ruhige-see',
    frage: 'Was ist das Hauptziel der Themeneinführungs-Phase?',
    antworten: [
      'Eltern von der eigenen Sicht zu überzeugen',
      'Den Gesprächsanlass klar und wertfrei benennen',
      'Sofort Lösungsvorschläge machen',
      'Die eigene Dokumentation vorstellen',
    ],
    korrektIndex: 1,
    erklaerung: 'Die Themeneinführung soll Klarheit schaffen ohne Vorwurf. Wertfreies Benennen des Anlasses gibt Eltern die Möglichkeit, offen in das Gespräch zu gehen.',
  },
  {
    id: 'gp-03',
    modul: 'gespraechsphasen',
    schwierigkeit: 'gegenwind',
    frage: 'Eltern unterbrechen Sie mehrfach mit eigenen Kommentaren. In welcher Phase ist das am häufigsten problematisch?',
    antworten: ['Begrüßung', 'Themeneinführung', 'Dialog & Zuhören', 'Abschluss'],
    korrektIndex: 2,
    erklaerung: 'Im Dialog sind gegenseitiges Zuhören und Respekt entscheidend. Unterbrechungen hier stören den Vertrauensaufbau. Eine ruhige, nicht konfrontative Reaktion ("Ich höre Sie – darf ich kurz zu Ende sprechen?") ist meist wirksam.',
  },
  {
    id: 'gp-04',
    modul: 'gespraechsphasen',
    schwierigkeit: 'gewitterfront',
    frage: 'Das Gespräch ist emotional eskaliert. Welche Phase sollten Sie jetzt bewusst einleiten?',
    antworten: [
      'Sofort zur Ergebnis-Phase übergehen',
      'Zum Dialog & Zuhören zurückkehren und aktiv paraphrasieren',
      'Das Gespräch abbrechen und auf ein neues Treffen vertagen',
      'Die eigene Position klarer formulieren',
    ],
    korrektIndex: 1,
    erklaerung: 'Bei Eskalation hilft aktives Zuhören und Paraphrasieren: Eltern fühlen sich gehört, Spannung nimmt ab. Erst dann können Ergebnisse nachhaltig erarbeitet werden.',
  },

  // ── Reaktionen auf Elternverhalten ──────────────────────────────────────────
  {
    id: 're-01',
    modul: 'reaktionen',
    schwierigkeit: 'ruhige-see',
    frage: 'Ein Elternteil sagt: "Zuhause ist er aber ganz anders!" Was ist die beste erste Reaktion?',
    antworten: [
      'Widersprechen und auf eigene Beobachtungen bestehen',
      'Die Elternperspektive anerkennen und nachfragen',
      'Das Thema wechseln',
      'Zahlen und Fakten präsentieren',
    ],
    korrektIndex: 1,
    erklaerung: 'Die Aussage signalisiert defensives Verhalten. Anerkennen ("Das kann ich gut verstehen, dass er zuhause anders ist") und neugieriges Nachfragen öffnet Eltern mehr als Gegenbeweis.',
  },
  {
    id: 're-02',
    modul: 'reaktionen',
    schwierigkeit: 'gegenwind',
    frage: 'Eltern werden aggressiver und machen Sie persönlich verantwortlich. Was hilft in diesem Moment am meisten?',
    antworten: [
      'Ruhig bleiben und Deeskalationsformeln einsetzen ("Ich höre, dass Sie das sehr belastet...")',
      'Sofort sachliche Gegenargumente nennen',
      'Das Gespräch für beendet erklären',
      'Die Schulleitung zum Gespräch hinzubitten',
    ],
    korrektIndex: 0,
    erklaerung: 'Bei Aggression gilt: Ruhe bewahren und Verständnis zeigen, ohne zu kapitulieren. "Ich höre, dass Sie sich Sorgen machen" ist kein Schuldeingeständnis, aber nimmt Druck aus der Situation.',
  },
  {
    id: 're-03',
    modul: 'reaktionen',
    schwierigkeit: 'gegenwind',
    frage: 'Eine Mutter weint und das Gespräch droht zum Seelsorgegespräch zu werden. Was tun?',
    antworten: [
      'Mitgefühl zeigen und dann behutsam den Fokus auf das Kind zurücklenken',
      'Das Gespräch sofort verschieben',
      'Zur Sache kommen und die Emotionen übersehen',
      'Ihr anbieten, alles später per Mail zu klären',
    ],
    korrektIndex: 0,
    erklaerung: 'Mitgefühl ist wichtig – aber die eigene Rolle darf nicht wechseln. Eine ruhige Rückführung ("Ich merke, dass das gerade viel ist. Darf ich kurz zu Sophie kommen – was braucht sie jetzt am meisten?") hilft.',
  },
  {
    id: 're-04',
    modul: 'reaktionen',
    schwierigkeit: 'gewitterfront',
    frage: 'Eltern fordern lautstark eine Notenänderung und drohen mit Klage. Was ist jetzt die richtige Reaktion?',
    antworten: [
      'Klar und freundlich Grenzen setzen: "Eine Notenänderung liegt nicht in meinem Ermessen – das erkläre ich Ihnen gerne."',
      'Nachgeben, um die Situation zu beruhigen',
      'Sofort die Schulleitung anrufen',
      'Das Gespräch wortlos beenden',
    ],
    korrektIndex: 0,
    erklaerung: 'Grenzen setzen, ohne zu eskalieren: Die Forderung ernst nehmen, aber klar kommunizieren, was möglich ist und was nicht. Keine Versprechungen, kein Nachgeben unter Druck.',
  },
  {
    id: 're-05',
    modul: 'reaktionen',
    schwierigkeit: 'gewitterfront',
    frage: 'Ein schweigendes Elternteil gibt nur Einsilber-Antworten. Wie locken Sie es aus der Reserve?',
    antworten: [
      'Mit offenen Fragen und Pausen: "Was ist Ihnen bei diesem Thema besonders wichtig?"',
      'Mehr und mehr erklären, bis eine Reaktion kommt',
      'Das Schweigen als Zustimmung werten',
      'Die Fragen schriftlich mitgeben und später per Mail beantworten lassen',
    ],
    korrektIndex: 0,
    erklaerung: 'Offene Fragen ohne Druck sind der Schlüssel. Pausen aushalten. Das Schweigen könnte Überforderung, Sprachbarriere oder Angst signalisieren – Neugier statt Konfrontation.',
  },

  // ── Rechtswissen ─────────────────────────────────────────────────────────────
  {
    id: 'rw-01',
    modul: 'rechtswissen',
    schwierigkeit: 'ruhige-see',
    frage: 'Was regelt § 8a SGB VIII für Lehrkräfte?',
    antworten: [
      'Das Recht, Eltern Hausbesuche zu machen',
      'Die Pflicht, bei gewichtigen Anhaltspunkten für Kindeswohlgefährdung tätig zu werden',
      'Die Möglichkeit, Noten anzufechten',
      'Den Datenschutz bei Elterngesprächen',
    ],
    korrektIndex: 1,
    erklaerung: '§ 8a SGB VIII verpflichtet Fachkräfte, bei gewichtigen Anhaltspunkten für Kindeswohlgefährdung eine Gefährdungseinschätzung vorzunehmen und ggf. das Jugendamt einzuschalten.',
  },
  {
    id: 'rw-02',
    modul: 'rechtswissen',
    schwierigkeit: 'gegenwind',
    frage: 'Was dürfen Sie im Elterngespräch einem Elternteil über das Gespräch mit dem anderen Elternteil mitteilen – bei getrennt lebenden Eltern?',
    antworten: [
      'Alles, da beide sorgeberechtigt sind',
      'Nichts, da Datenschutz gilt',
      'Grundsätzlich beide informieren, aber keine Details aus Einzelgesprächen weitergeben',
      'Nur was das Kind explizit erlaubt hat',
    ],
    korrektIndex: 2,
    erklaerung: 'Beide sorgeberechtigten Elternteile haben Anspruch auf schulische Informationen. Inhalte aus Einzelgesprächen, insbesondere wenn ein Elternteil nicht anwesend war, sollten aber mit Bedacht kommuniziert werden.',
  },
  {
    id: 'rw-03',
    modul: 'rechtswissen',
    schwierigkeit: 'gegenwind',
    frage: 'Was muss in einem Gesprächsprotokoll dokumentiert werden?',
    antworten: [
      'Nur die Noten des Kindes',
      'Datum, Teilnehmende, Gesprächsthemen, Vereinbarungen, nächste Schritte',
      'Der vollständige Gesprächsverlauf wortwörtlich',
      'Nur Maßnahmen, die die Schule ergreift',
    ],
    korrektIndex: 1,
    erklaerung: 'Ein gutes Protokoll enthält Rahmendaten (wann, wer), das Thema, besprochene Punkte, Vereinbarungen und Folgeschritte. Es schützt alle Beteiligten und schafft Verbindlichkeit.',
  },
  {
    id: 'rw-04',
    modul: 'rechtswissen',
    schwierigkeit: 'gewitterfront',
    frage: 'Eltern verlangen Einsicht in die Notizen anderer Schüler aus Ihrem Unterricht. Was gilt?',
    antworten: [
      'Eltern haben grundsätzlich das Recht auf alle Unterlagen',
      'Datenschutz schützt Daten anderer Schüler – Einsicht in Fremdunterlagen ist nicht zulässig',
      'Sie dürfen alles zeigen, was Sie selbst notiert haben',
      'Das ist nur mit Genehmigung der Schulleitung möglich',
    ],
    korrektIndex: 1,
    erklaerung: 'Datenschutz (DSGVO + Schulrecht) schützt personenbezogene Daten anderer Schüler. Eltern haben Einsicht in die Leistungsdaten ihres eigenen Kindes – nicht in die anderer.',
  },

  // ── GFK-Grundlagen ────────────────────────────────────────────────────────────
  {
    id: 'gfk-01',
    modul: 'gfk',
    schwierigkeit: 'ruhige-see',
    frage: 'Was ist eine Beobachtung im Sinne der Gewaltfreien Kommunikation?',
    antworten: [
      '"Max ist faul."',
      '"Max hat in den letzten drei Wochen keine Hausaufgaben abgegeben."',
      '"Max scheint sich nicht zu kümmern."',
      '"Max will Ihre Autorität nicht anerkennen."',
    ],
    korrektIndex: 1,
    erklaerung: 'Eine Beobachtung beschreibt konkret, was wahrgenommen wurde – ohne Bewertung oder Interpretation. "Keine Hausaufgaben abgegeben" ist beobachtbar. "Faul" oder "kümmert sich nicht" sind Bewertungen.',
  },
  {
    id: 'gfk-02',
    modul: 'gfk',
    schwierigkeit: 'ruhige-see',
    frage: 'Welche der folgenden Aussagen formuliert eine Bitte im GFK-Sinn?',
    antworten: [
      '"Sie müssen Lena jeden Abend beim Lernen helfen."',
      '"Ich bitte Sie, Lena abends 20 Minuten beim Lernen zu begleiten."',
      '"Lena braucht mehr Unterstützung von zuhause."',
      '"Das liegt in Ihrer Verantwortung als Eltern."',
    ],
    korrektIndex: 1,
    erklaerung: 'Eine GFK-Bitte ist konkret, positiv formuliert und offen für ein Nein. "Ich bitte Sie, X zu tun" schafft Klarheit ohne Druck – anders als "Sie müssen" oder vage Forderungen.',
  },
  {
    id: 'gfk-03',
    modul: 'gfk',
    schwierigkeit: 'gegenwind',
    frage: 'Eltern sagen: "Ihr Unterricht ist langweilig – kein Wunder, dass Tobias nichts lernt." Welche GFK-Reaktion ist geeignet?',
    antworten: [
      'Zurückweisen: "Das stimmt nicht, mein Unterricht ist gut vorbereitet."',
      'Anerkennen und hinter die Aussage schauen: "Ich höre, dass Sie sich Sorgen machen, wie Tobias den Unterricht erlebt."',
      'Keine Reaktion zeigen',
      'Die Eltern darauf hinweisen, dass sie Tobias selbst befragen sollen',
    ],
    korrektIndex: 1,
    erklaerung: 'GFK bedeutet: Hinter eine Bewertung schauen und das zugrunde liegende Bedürfnis hören. Die Aussage signalisiert Sorge. Das anzusprechen öffnet das Gespräch mehr als Verteidigung.',
  },
  {
    id: 'gfk-04',
    modul: 'gfk',
    schwierigkeit: 'gewitterfront',
    frage: 'Welche Formulierung entspricht dem GFK-Prinzip "Bedürfnis benennen"?',
    antworten: [
      '"Sie machen das immer falsch."',
      '"Ich brauche in diesem Gespräch, dass wir gemeinsam nach Lösungen für Jonas suchen."',
      '"Jonas braucht einfach mehr Disziplin."',
      '"Wir sind uns hier offensichtlich nicht einig."',
    ],
    korrektIndex: 1,
    erklaerung: 'Ein Bedürfnis im GFK-Sinn wird in der Ich-Form ausgedrückt und beschreibt, was man sich wünscht – konstruktiv und ohne Vorwurf. "Ich brauche..." macht das eigene Bedürfnis transparent.',
  },

  // ── Körpersignale ─────────────────────────────────────────────────────────────
  {
    id: 'ks-q01',
    modul: 'koerpersignale',
    schwierigkeit: 'ruhige-see',
    frage: 'Was bedeutet es, wenn ein Elternteil Ihnen gegenüber konstant Blickkontakt hält, nickt und sich leicht vorbeugt?',
    antworten: [
      'Er oder sie stimmt allem zu, was Sie sagen.',
      'Er oder sie zeigt aktives Zuhören und Gesprächsbereitschaft.',
      'Er oder sie versucht, Sie unter Druck zu setzen.',
      'Er oder sie ist sehr nervös.',
    ],
    korrektIndex: 1,
    erklaerung: 'Blickkontakt, Nicken und Vorbeugen signalisieren aktives Zuhören und Offenheit – aber noch keine inhaltliche Zustimmung. Wichtig: Trotz kooperativer Körperhaltung weiterhin nachfragen, ob das Gesagte wirklich verstanden wurde.',
  },
  {
    id: 'ks-q02',
    modul: 'koerpersignale',
    schwierigkeit: 'ruhige-see',
    frage: 'Eltern lehnen sich beide zurück und die Antworten werden einsilbiger. Was signalisiert das?',
    antworten: [
      'Sie sind mit dem Gespräch zufrieden und entspannen sich.',
      'Zunehmende Abwehrhaltung – das Gespräch hat möglicherweise einen als bedrohlich empfundenen Punkt erreicht.',
      'Sie wollen das Gespräch bald beenden, weil sie einen anderen Termin haben.',
      'Das ist bedeutungslos – Körperhaltung und Gesprächsinhalt hängen nicht zusammen.',
    ],
    korrektIndex: 1,
    erklaerung: 'Rückwärtslehnen und Einsilbigkeit zusammen signalisieren Rückzug. Jetzt ist es sinnvoll, den Druck aus dem Gespräch zu nehmen: "Mir ist wichtig, dass wir heute gemeinsam zu einem guten Ergebnis kommen." Dann eine offene Frage stellen.',
  },
  {
    id: 'ks-q03',
    modul: 'koerpersignale',
    schwierigkeit: 'gegenwind',
    frage: 'Ein Vater beugt sich vor, spricht lauter und gestikuliert. Was ist die geeignete Reaktion als Lehrkraft?',
    antworten: [
      'Ebenfalls lauter werden, um Präsenz zu zeigen.',
      'Das Gespräch unterbrechen und die Schulleitung hinzuholen.',
      'Ruhig und langsam sprechen – der eigene Tonfall wirkt oft regulierend.',
      'Die Aussagen ignorieren und zum nächsten Thema übergehen.',
    ],
    korrektIndex: 2,
    erklaerung: 'Vorneigen und lauter werden zeigt hohes Erregungsniveau. Nicht spiegeln – das eskaliert. Stattdessen: Eigenes Sprechtempo und Lautstärke bewusst senken. "Ich höre, dass Ihnen das wichtig ist – darf ich kurz antworten?" gibt dem Gespräch Raum.',
  },
  {
    id: 'ks-q04',
    modul: 'koerpersignale',
    schwierigkeit: 'gewitterfront',
    frage: 'Eine Mutter lächelt häufig und nickt, macht aber kaum eigene Aussagen und weicht konkreten Fragen aus. Was tun?',
    antworten: [
      'Das Lächeln als Zustimmung werten und die Vereinbarungen festhalten.',
      'Das Gespräch abkürzen – sie ist offensichtlich einverstanden.',
      'Einfache, offene Fragen stellen und echte Pausen aushalten.',
      'Die Situation der Schulleitung melden, da das Verhalten verdächtig ist.',
    ],
    korrektIndex: 2,
    erklaerung: 'Lächeln ohne Inhalt kann soziale Höflichkeit, Unsicherheit oder eine Sprachbarriere signalisieren – keine echte Zustimmung. Konkrete, einfache offene Fragen stellen ("Was ist Ihnen heute besonders wichtig?") und Pausen wirklich aushalten, ohne sofort weiterzusprechen.',
  },

  // ── Vorbereitung ──────────────────────────────────────────────────────────────
  {
    id: 'vb-01',
    modul: 'vorbereitung',
    schwierigkeit: 'ruhige-see',
    frage: 'Was ist das wichtigste Element bei der Gesprächsvorbereitung?',
    antworten: [
      'Eine Liste aller Fehler des Kindes zusammenstellen',
      'Das Gesprächsziel definieren: Was soll am Ende anders sein?',
      'Sich auf Gegenargumente der Eltern vorbereiten',
      'Die letzte Klassenarbeit des Kindes dabei haben',
    ],
    korrektIndex: 1,
    erklaerung: 'Ohne klares Ziel verliert das Gespräch die Richtung. Das Ziel sollte konkret und lösungsorientiert sein – "Was soll nach dem Gespräch für das Kind besser sein?"',
  },
  {
    id: 'vb-02',
    modul: 'vorbereitung',
    schwierigkeit: 'gegenwind',
    frage: 'Wann sollte zusätzlich die Schulleitung oder Beratungslehrkraft hinzugezogen werden?',
    antworten: [
      'Bei jedem Elterngespräch',
      'Nur bei Scheidungssituationen',
      'Bei wiederholten Eskalationen, rechtlichen Androhungen oder Gefährdungshinweisen',
      'Wenn Eltern eine Notenänderung fordern',
    ],
    korrektIndex: 2,
    erklaerung: 'Schulleitung und Beratungslehrkraft sind keine Eskalationsstufe, sondern Ressourcen. Bei ernsteren Fällen – Eskalation, Rechtsandrohungen, Gefährdung – ist das Hinzuziehen professionell und angemessen.',
  },
  {
    id: 'vb-03',
    modul: 'vorbereitung',
    schwierigkeit: 'gegenwind',
    frage: 'Welches Setting ist für ein Elterngespräch am günstigsten?',
    antworten: [
      'Im Klassenzimmer am Lehrerpult',
      'Im Lehrerzimmer, während andere anwesend sind',
      'In einem ruhigen Raum mit Stühlen auf Augenhöhe',
      'In der Schulleitung, um Autorität zu signalisieren',
    ],
    korrektIndex: 2,
    erklaerung: 'Augenhöhe ist buchstäblich und symbolisch wichtig. Ein ruhiger, neutraler Raum ohne Rangsignale (kein Pult zwischen Lehrkraft und Eltern) fördert ein offenes Gespräch.',
  },
]

// ─── Hilfsfunktion: Fragen nach Modul + Schwierigkeit filtern ─────────────────

export function getFragenFuerModul(modul: QuizModul, schwierigkeit?: Schwierigkeit): QuizFrage[] {
  return QUIZ_FRAGEN.filter(
    f => f.modul === modul && (!schwierigkeit || f.schwierigkeit === schwierigkeit)
  )
}

export function getAllFragenFuerSchwierigkeit(schwierigkeit: Schwierigkeit): QuizFrage[] {
  return QUIZ_FRAGEN.filter(f => f.schwierigkeit === schwierigkeit)
}
