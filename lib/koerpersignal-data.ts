import type { KoerpersignalItem } from '@/types'

export type { KoerpersignalItem }

export const KOERPERSIGNAL_ITEMS: KoerpersignalItem[] = [
  {
    id: 'ks-01',
    situation: 'Die Mutter sitzt mit überkreuzten Armen, lehnt sich leicht zurück und schaut demonstrativ auf ihr Handy, während Sie sprechen.',
    antworten: [
      'Das signalisiert Desinteresse – das Gespräch ist sinnlos.',
      'Mögliche Abwehr, Überforderung oder Desinteresse – aber auch Nervosität.',
      'Sie hört aufmerksam zu – Körpersignale bedeuten nichts.',
      'Sie fordert damit eine Pause.',
    ],
    korrektIndex: 1,
    erklaerung: 'Überkreuzte Arme und Blick auf das Handy können viele Dinge bedeuten: Abwehr, Angst, Überforderung oder schlicht Nervosität. Keine voreilige Deutung. Sinnvoll: Tempo rausnehmen, eine offene Frage stellen.',
    handlungsoptionen: [
      'Tempo rausnehmen, kurze Pause einbauen',
      'Direkt ansprechen: „Ich möchte sichergehen, dass ich mich klar ausgedrückt habe – was haben Sie gerade gehört?“',
      'Eine offene Frage stellen, die Raum für ihre Perspektive gibt',
    ],
  },
  {
    id: 'ks-02',
    situation: 'Ein Vater beugt sich während des Gesprächs mehrfach nach vorne, spricht lauter und gestikuliert dabei.',
    antworten: [
      'Er ist kurz davor, das Gespräch zu verlassen.',
      'Er ist engagiert und überzeugt von seiner Sicht – möglicherweise mit steigendem Erregungsniveau.',
      'Er versucht Sie einzuschüchtern.',
      'Er hat Schwierigkeiten beim Hören.',
    ],
    korrektIndex: 1,
    erklaerung: 'Vorneigen und lauter werden zeigt Engagement – aber auch ein steigendes Erregungsniveau. Die Reaktion sollte ruhig und nicht konfrontativ sein. Kein Gegenüberschreien.',
    handlungsoptionen: [
      'Ruhig und langsam sprechen – Tonfall senkt sich oft unwillkürlich mit',
      '„Ich höre, dass Ihnen das wichtig ist – darf ich kurz antworten?“',
      'Kurze Pause vorschlagen: „Lassen Sie uns einen Moment innehalten.“',
    ],
  },
  {
    id: 'ks-03',
    situation: 'Eine Mutter hält während des Gesprächs konstant Blickkontakt, nickt häufig und lehnt sich leicht vor.',
    antworten: [
      'Sie stimmt allem zu, was Sie sagen.',
      'Sie zeigt aktives Zuhören und Bereitschaft zur Kooperation.',
      'Sie versucht, Sie unter Druck zu setzen.',
      'Sie ist sehr nervös.',
    ],
    korrektIndex: 1,
    erklaerung: 'Blickkontakt, Nicken und Vorneigen signalisieren aktives Zuhören und Offenheit. Das ist eine gute Basis – aber Nicken bedeutet nicht automatisch Zustimmung. Nachfragen bleibt wichtig.',
    handlungsoptionen: [
      'Die positive Atmosphäre nutzen, um gemeinsam Lösungen zu erarbeiten',
      'Trotz kooperativem Auftreten nachfragen: „Wie sehen Sie das?“',
      'Konkrete Vereinbarungen treffen und festhalten',
    ],
  },
  {
    id: 'ks-04',
    situation: 'Eltern schauen sich mehrfach kurz an und wechseln kaum wahrnehmbare Blicke miteinander.',
    antworten: [
      'Sie haben etwas zu verbergen.',
      'Das ist ein Zeichen von Nervosität oder innerem Austausch – möglicherweise keine gemeinsame Linie.',
      'Sie stimmen Ihnen stillschweigend zu.',
      'Das ist bedeutungslos.',
    ],
    korrektIndex: 1,
    erklaerung: 'Kurze Seitenblicke zwischen Elternteilen können vieles signalisieren: Unsicherheit, Absprache oder auch Meinungsverschiedenheiten. Gut zu beobachten, aber nicht zu interpretieren.',
    handlungsoptionen: [
      'Beide Elternteile direkt einbeziehen: „Wie erleben Sie das, Herr/Frau X?“',
      'Raum für interne Rücksprache lassen: „Haben Sie kurz Gelegenheit, das miteinander abzusprechen?“',
      'Bei Spannungen zwischen Elternteilen: Fokus auf das Kind halten',
    ],
  },
  {
    id: 'ks-05',
    situation: 'Eine Mutter schaut während Ihres Sprechens wiederholt aus dem Fenster oder an die Wand.',
    antworten: [
      'Sie ist gelangweilt und respektiert Sie nicht.',
      'Sie könnte overwhelmed sein, sich schämen oder in Gedanken sein.',
      'Sie sucht nach einer Uhr.',
      'Das ist ein kulturspezifisches Verhalten ohne Bedeutung.',
    ],
    korrektIndex: 1,
    erklaerung: 'Wegschauen kann viele Bedeutungen haben: Überforderung, Scham, Nachdenken, aber auch Desinteresse. Nicht voreilig deuten. Eine offene, einladende Frage gibt ihr die Möglichkeit, wieder präsent zu werden.',
    handlungsoptionen: [
      'Ruhige Pause einbauen',
      '„Ich möchte sichergehen, dass das, was ich sage, für Sie relevant ist – was beschäftigt Sie gerade am meisten?“',
      'Weniger sprechen, mehr fragen',
    ],
  },
  {
    id: 'ks-06',
    situation: 'Ein Vater trommelt wiederholt mit den Fingern auf dem Tisch, während er Ihnen zuhört.',
    antworten: [
      'Er ist aggressiv und kurz vor einem Ausbruch.',
      'Ein Zeichen von Ungeduld, Nervosität oder Energieüberschuss.',
      'Er stimmt allem zu.',
      'Das ist bedeutungslos.',
    ],
    korrektIndex: 1,
    erklaerung: 'Fingertrommeln ist oft ein Zeichen von Ungeduld oder Nervosität – kein direkter Angriff. Es kann helfen, das Gesprächstempo anzupassen, eine konkrete Frage zu stellen oder das Gespräch stärker auf ihn zu fokussieren.',
    handlungsoptionen: [
      'Kürzere, klarere Aussagen machen – weniger Monolog',
      'Ihn direkt einladen: „Was ist Ihnen bei diesem Punkt besonders wichtig?“',
      'Wenn es anhält: Eine kurze Pause vorschlagen',
    ],
  },
  {
    id: 'ks-07',
    situation: 'Die Eltern lehnen sich beide zurück, verschränken die Arme und ihre Antworten werden einsilbiger.',
    antworten: [
      'Sie sind fertig mit dem Gespräch.',
      'Zunehmende Abwehrhaltung oder Rückzug – möglicherweise fühlen sie sich unter Druck.',
      'Sie sind zufrieden mit dem Gespräch.',
      'Sie haben Schmerzen.',
    ],
    korrektIndex: 1,
    erklaerung: 'Diese Kombination signalisiert zunehmenden Rückzug. Das Gespräch hat möglicherweise einen Punkt erreicht, der als bedrohlich oder unangenehm empfunden wird. Tempo rausnehmen und die Beziehungsebene stärken.',
    handlungsoptionen: [
      'Bewusst Druck rausnehmen: „Mir ist wichtig, dass wir heute gemeinsam zu einem guten Ergebnis kommen.“',
      'Eine einfache, offene Frage stellen, die keine Rechtfertigung erfordert',
      'Das Kind in den Mittelpunkt rücken: „Was wäre am besten für Lukas?“',
    ],
  },
  {
    id: 'ks-08',
    situation: 'Eine Mutter lächelt häufig, nickt, sagt aber kaum eigene Sätze und weicht konkreten Fragen aus.',
    antworten: [
      'Sie ist schüchtern, aber völlig einverstanden.',
      'Das Lächeln könnte soziale Höflichkeit sein – nicht inhaltliche Zustimmung. Möglicherweise Unsicherheit oder Angst.',
      'Sie hat keine eigene Meinung.',
      'Sie ist nicht interessiert.',
    ],
    korrektIndex: 1,
    erklaerung: 'Lächeln ohne eigene Aussagen kann ein Zeichen für soziale Anpassung, Unsicherheit oder Sprachbarriere sein. Konkrete, einfache Fragen mit Zeit und Raum helfen, echte Resonanz zu erzeugen.',
    handlungsoptionen: [
      'Einfache Ja/Nein-Fragen stellen und Raum für Pausen lassen',
      '„Was ist Ihnen heute besonders wichtig?“ – und dann wirklich warten',
      'Bei Sprachbarriere: visuell unterstützen, ruhig und klar sprechen',
    ],
  },
  {
    id: 'ks-09',
    situation: 'Ein Vater zieht den Stuhl während des Gesprächs ein Stück von Ihnen weg und wendet den Körper leicht ab.',
    antworten: [
      'Er möchte sitzen bequemer sitzen.',
      'Ein Signal von Unbehagen, Rückzug oder dem Wunsch nach mehr Abstand.',
      'Er zeigt Desinteresse und das Gespräch ist verloren.',
      'Das ist kulturell bedingt und bedeutungslos.',
    ],
    korrektIndex: 1,
    erklaerung: 'Körperliche Distanzvergrößerung signalisiert Unbehagen. Das ist ein Hinweis, nicht ein Urteil. Weniger Konfrontation, mehr Zuhören – und dem Gespräch Raum lassen.',
    handlungsoptionen: [
      'Gesprächston weicher und einladender gestalten',
      'Weniger Fakten, mehr Fragen: „Wie erleben Sie das?“',
      'Ihm aktiv das Wort geben',
    ],
  },
  {
    id: 'ks-10',
    situation: 'Eltern unterbrechen Sie wiederholt, beenden Ihre Sätze oder reden gleichzeitig mit Ihnen.',
    antworten: [
      'Sie respektieren Sie nicht – das Gespräch ist gescheitert.',
      'Hohe emotionale Aufladung oder Ungeduld. Sie haben viel zu sagen und wenig Vertrauen, gehört zu werden.',
      'Das ist normal und kein Problem.',
      'Sie kennen die Themen schon und wollen abkürzen.',
    ],
    korrektIndex: 1,
    erklaerung: 'Unterbrechen zeigt oft, dass Eltern befürchten, nicht gehört zu werden – oder sehr aufgeladen sind. Kurz, ruhig Grenzen setzen („Darf ich kurz zu Ende sprechen?“) und danach echtes Zuhören demonstrieren.',
    handlungsoptionen: [
      'Ruhig und klar: „Ich höre Sie gleich – darf ich den Gedanken erst zu Ende bringen?“',
      'Danach die volle Aufmerksamkeit aktiv geben',
      'Gesagtes kurz in eigenen Worten wiederholen: „Sie meinen also …“ – das signalisiert Gehörtwerden',
    ],
  },
  {
    id: 'ks-11',
    situation: 'Eine Mutter atmet hörbar aus, reibt sich kurz die Augen und lässt die Schultern sinken.',
    antworten: [
      'Sie ist gelangweilt.',
      'Erschöpfung oder emotionale Überlastung – das Gespräch berührt etwas Schwieriges.',
      'Sie ist erkältet.',
      'Sie signalisiert, dass das Gespräch zu lang ist.',
    ],
    korrektIndex: 1,
    erklaerung: 'Diese Signale zeigen emotionale und körperliche Erschöpfung. Ein kurzes Innehalten, echtes Mitgefühl („Ich merke, dass das gerade sehr viel ist für Sie“) kann die Atmosphäre deutlich verändern.',
    handlungsoptionen: [
      '„Möchten Sie kurz eine Pause machen?“',
      'Mitgefühl zeigen: „Das klingt, als ob Sie gerade sehr viel tragen.“',
      'Dann behutsam zur eigentlichen Frage zurückführen: „Was braucht Leon jetzt am meisten?“',
    ],
  },
  {
    id: 'ks-12',
    situation: 'Eltern sitzen die ersten Minuten steif, aufrecht und mit geschlossenem Gesicht. Im Verlauf des Gesprächs entspannen sich Schultern und Gesicht sichtbar.',
    antworten: [
      'Sie waren anfangs müde, jetzt sind sie wach.',
      'Abbau von Anspannung – das Gespräch entwickelt sich positiv, Vertrauen entsteht.',
      'Das Gesprächsthema ist jetzt unwichtig für sie.',
      'Sie haben sich auf das Gespräch eingestellt.',
    ],
    korrektIndex: 1,
    erklaerung: 'Entspannung im Verlauf ist ein sehr gutes Zeichen. Vertrauen wächst. Jetzt ist ein guter Moment, konkrete Vereinbarungen zu treffen – die Basis ist da.',
    handlungsoptionen: [
      'Das positive Klima nutzen und in Richtung gemeinsamer Lösungen lenken',
      'Vereinbarungen konkretisieren: „Was könnten wir gemeinsam vereinbaren?“',
      'Den Fortschritt im Gespräch anerkennen: „Ich bin froh, dass wir heute so offen sprechen konnten.“',
    ],
  },
]
