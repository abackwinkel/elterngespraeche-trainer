// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Baustein {
  nummer: number
  wasTun: string
  beispielFormulierung: string
  material: string
}

export type Stufe = 'a' | 'b' | 'c'

export interface Massnahme {
  id: string              // "a01" ... "c05"
  stufe: Stufe
  nummer: number
  titel: string
  trigger: string
  ziel: string
  wannNicht: string[]
  bausteine: Baustein[]
  fallstricke: string[]
  eskalation: string
  schulformHinweis?: string
  vorlage?: string        // Markdown-Skelett (b01, b07)
  strukturHinweis?: string // Stufe C: Behördenstruktur
}

// ─── Stufe A — Sofortmaßnahmen (allein umsetzbar) ─────────────────────────────

export const MASSNAHMEN_A: Massnahme[] = [
  {
    id: 'a01',
    stufe: 'a',
    nummer: 1,
    titel: 'Sitzplatz verändern',
    trigger: 'Konzentrationsprobleme, soziale Konflikte, Bedarf an Nähe zur Lehrkraft.',
    ziel: 'Störfaktoren reduzieren, Lernbedingungen verbessern, Spannungen räumlich entlasten – ohne Bloßstellung.',
    wannNicht: [
      'als spontane Strafaktion im Affekt',
      'als einzige Reaktion auf Mobbing (braucht flankierend mehr)',
      'wenn Ursachen noch völlig unklar sind und eher familiär liegen',
    ],
    bausteine: [
      { nummer: 1, wasTun: '1–2 Wochen gezielt beobachten, wann genau die Probleme auftreten', beispielFormulierung: '„Ich schaue mir die nächsten Tage genau an, wann es für dich schwer wird, ruhig zu arbeiten.“', material: 'Beobachtungsbogen im Lehrerheft' },
      { nummer: 2, wasTun: 'Vorher kurzes Einzelgespräch (begründen, nicht überrumpeln)', beispielFormulierung: '„Ich habe gemerkt, dass es dir hier schwerfällt, dich zu konzentrieren. Ich schlage dir vor, dass du vorne links sitzt. Wir probieren das vier Wochen.“', material: 'Ruhiger Ort, Flur' },
      { nummer: 3, wasTun: 'Neuen Platz im Sitzplan sichtbar markieren', beispielFormulierung: '„Dein neuer Platz ist hier vorne links. Ich trage das auch in unseren Sitzplan ein.“', material: 'Sitzplan, Namensschild' },
      { nummer: 4, wasTun: 'Klasse sachlich informieren, ohne Defizite zu betonen', beispielFormulierung: '„Ich habe die Sitzordnung etwas angepasst, damit alle konzentrierter arbeiten können.“', material: 'Sitzplan an der Tafel' },
      { nummer: 5, wasTun: 'Überprüfungszeitraum vereinbaren', beispielFormulierung: '„Wir probieren das bis zu den Herbstferien. Danach setzen wir uns zusammen.“', material: 'Eintrag im Lehrerheft mit Datum' },
      { nummer: 6, wasTun: 'Eltern kurz informieren (nicht zwingend, aber empfehlenswert)', beispielFormulierung: '„Wir haben Leons Sitzplatz geändert, um seine Konzentration zu unterstützen. Wir melden uns wieder.“', material: 'Schul-App, Mitteilungsheft' },
    ],
    fallstricke: [
      'Sitzplatzwechsel als Strafe verkündet („Dann kommst du eben nach vorne“)',
      'Beweggründe nicht transparent gemacht',
      'keine Nachverfolgung – Maßnahme verpufft als Einzelaktion',
    ],
    eskalation: 'Wenn nach mehreren Wochen keine Verbesserung oder die Unruhe Ausdruck tieferer Probleme ist (familiäre Belastung, psychische Krise, massive Lernschwierigkeiten) → Beratungslehrkraft, Schulsozialarbeit oder schulpsychologische Beratung einbeziehen.',
  },
  {
    id: 'a02',
    stufe: 'a',
    nummer: 2,
    titel: 'Gezielte Ansprache im Unterricht',
    trigger: 'Kind wirkt „abwesend“, driftet weg, klinkt sich aus.',
    ziel: 'Ein „abgetauchtes“ Kind kurz emotional und kognitiv wieder anbinden – ohne Bloßstellung, ohne Belehrung, mit Wärme und Kürze.',
    wannNicht: [
      'wenn das Kind gerade stark emotional erregt ist (weint, wütend, im akuten Konflikt) → erst Deeskalation',
      'bei diagnostizierter Angststörung oder starker Schüchternheit → eher nach der Stunde im Flur als vor der Klasse',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Wahrnehmung leise spiegeln (am Platz, nicht vor der Klasse)', beispielFormulierung: '„Ich sehe, du schaust gerade lange aus dem Fenster. Ich frage mich, ob du gerade beim Thema bist.“', material: '–' },
      { nummer: 2, wasTun: 'Niederschwellige, geschlossene Frage stellen', beispielFormulierung: '„Bist du bei Aufgabe 2 oder 3?“ oder „Hast du die Überschrift schon geschrieben?“', material: 'Arbeitsblatt' },
      { nummer: 3, wasTun: 'Kleine, sofort umsetzbare Mini-Aufgabe geben', beispielFormulierung: '„Schreib bitte die nächste Zeile ab. Sag mir leise Bescheid, wenn du fertig bist.“', material: 'Heft, Stift' },
      { nummer: 4, wasTun: 'Direkt danach positive Rückmeldung', beispielFormulierung: '„Gut, dass du wieder eingestiegen bist. Mach in dem Tempo weiter.“', material: '–' },
      { nummer: 5, wasTun: 'Alternative Beteiligungsform anbieten (wenn Mündliches schwerfällt)', beispielFormulierung: '„Wenn du heute nichts sagen möchtest, markier die wichtigsten Wörter im Text. Ich schaue gleich drauf.“', material: 'Textmarker' },
      { nummer: 6, wasTun: 'Nach der Stunde 1–2 Min nachfragen', beispielFormulierung: '„Mir ist aufgefallen, dass du heute zwischendurch ganz weg warst. Magst du mir morgen vor der Stunde kurz sagen, wie es dir geht?“', material: 'Ruhiger Ort' },
    ],
    fallstricke: [
      'Ironischer Unterton vor der Klasse („Bist du auch mal wieder bei uns, Max?“)',
      'zu komplexe offene Fragen („Was denkst du dazu?“)',
      'zu häufige, kontrollierende Ansprache',
    ],
    eskalation: 'Wenn das Kind über Wochen kaum erreichbar bleibt, Leistungen einbrechen oder Alarmzeichen (häufiges Fehlen, Rückzug) hinzukommen → vertieftes Einzelgespräch, Eltern einbeziehen, ggf. Schulsozialarbeit/Schulpsychologie.',
  },
  {
    id: 'a03',
    stufe: 'a',
    nummer: 3,
    titel: 'Strukturierte Aufgabenformate',
    trigger: 'Überforderung, Leistungsabfall, „Hausaufgaben-Drama“ zu Hause.',
    ziel: 'Kognitive Belastung reduzieren, Erfolgserlebnisse ermöglichen – durch kleinschrittige, visuell klare Aufgaben.',
    wannNicht: [
      'wenn das Problem in einer massiven Stofflücke liegt (z. B. fehlende Grundrechenarten) → braucht Förderung statt Strukturierung',
      'in sehr leistungsstarken Lerngruppen kann Überstrukturierung bevormundend wirken',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Aufgaben in nummerierte Schritte gliedern, optisch getrennt', beispielFormulierung: '„1. Lies den Text leise. 2. Unterstreiche drei wichtige Wörter. 3. Schreibe in einem Satz auf, worum es geht.“', material: 'Arbeitsblatt mit klarer Trennung' },
      { nummer: 2, wasTun: 'Realistische Bearbeitungszeit sichtbar machen', beispielFormulierung: '„Für Aufgabe 1 und 2 habt ihr zusammen 10 Minuten. Ich schreibe die Zeit an die Tafel.“', material: 'Tafel, Timer' },
      { nummer: 3, wasTun: 'Beispielaufgabe vorab gemeinsam lösen', beispielFormulierung: '„Wir machen Aufgabe 1 einmal gemeinsam. Schaut, wie ich vorgehe, und nutzt das als Vorlage.“', material: 'Tafel, Doku-Kamera' },
      { nummer: 4, wasTun: 'Checkliste mit Kästchen anbieten', beispielFormulierung: '„Überschrift geschrieben? Datum? Aufgabe 1 erledigt? Aufgabe 2 erledigt?“', material: 'Kasten auf Arbeitsblatt' },
      { nummer: 5, wasTun: 'Arbeitsauftrag mündlich + schriftlich + visuell', beispielFormulierung: '„Ihr findet die drei Schritte auch hier an der Tafel. Lest dort nach, wenn ihr unsicher seid.“', material: 'Tafel, Beamer' },
      { nummer: 6, wasTun: 'Pflicht- und freiwillige Wahlaufgabe trennen', beispielFormulierung: '„Bearbeite Aufgabe A. Wenn du früher fertig bist, kannst du B als Zusatz versuchen.“', material: 'Arbeitsblatt zweigeteilt' },
    ],
    fallstricke: [
      'Nur formale Strukturierung – Aufgabe sieht ordentlich aus, ist aber inhaltlich weiterhin überfordernd',
      'Struktur nur einmal eingeführt, nicht wiederholt',
      'strukturierte Aufgaben nur für „die Schwachen“ → stigmatisierend',
    ],
    eskalation: 'Wenn einzelne Schüler trotz wiederholter Struktur kaum Fortschritte zeigen, Aufgaben verweigern oder in Panik geraten → Förderschullehrkraft hinzuziehen, sonderpädagogischen Bedarf prüfen, Eltern zu Beratungsgespräch einladen (Schulpsychologie, ggf. KJP).',
  },
  {
    id: 'a04',
    stufe: 'a',
    nummer: 4,
    titel: 'Beobachtungsnotizen anlegen',
    trigger: 'Vor Elterngespräch / wenn sich ein Muster verdichtet.',
    ziel: 'Verhaltens- oder Leistungsauffälligkeiten systematisch, wertfrei und zeitnah dokumentieren – als konkrete Grundlage fürs Elterngespräch.',
    wannNicht: [
      'bei eindeutig einmaligen, situativ erklärbaren Auffälligkeiten',
      'keine lückenlose Verhaltensüberwachung',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Anlass und Zeitraum vorher festlegen', beispielFormulierung: '„Beobachtung Konzentration im Deutschunterricht bei L. vom 15.09. bis 15.10.“', material: 'Überschrift im Lehrerheft' },
      { nummer: 2, wasTun: 'Einfache Spaltenstruktur anlegen', beispielFormulierung: '„Datum – Stunde – Beobachtung – Bemerkung“', material: 'A4-Blatt, Tabelle' },
      { nummer: 3, wasTun: 'Verhalten beschreibend notieren, nie wertend', beispielFormulierung: '„15.09., 3. Std.: 5-mal mit Nachbarn gesprochen, obwohl Stillarbeit. Blick häufig zum Fenster.“', material: '–' },
      { nummer: 4, wasTun: 'Auch Positives und Unauffälliges notieren', beispielFormulierung: '„22.09., 3. Std.: 20 Minuten ruhig gearbeitet, zweimal passend gemeldet.“', material: 'gleiche Tabelle' },
      { nummer: 5, wasTun: 'Datenschutz: Initialen statt voller Name, sicher verwahren', beispielFormulierung: '„L. statt vollem Namen. Heft abschließen oder Gerät passwortgeschützt.“', material: 'Abschließbarer Ort' },
      { nummer: 6, wasTun: 'Vor dem Gespräch sichten, Muster erkennen, 2–3 zentrale Beobachtungen auswählen', beispielFormulierung: '„An 6 von 10 Tagen starke Ablenkbarkeit, an 4 Tagen unauffällig.“', material: 'Markierstift, Zusammenfassung' },
    ],
    fallstricke: [
      'Wertende Begriffe wie „faul“, „uneinsichtig“, „unmotiviert“ einfließen lassen',
      'lückenhafte Dokumentation nur an Auffälligkeits-Tagen (verzerrt das Bild)',
      'Notizen offen liegen lassen (Datenschutz)',
    ],
    eskalation: 'Wenn die Auswertung ein zunehmendes Problemmuster zeigt, das durch erste Maßnahmen nicht gebessert wird → die Notizen werden zur Grundlage für Förderkonferenz, Schulpsychologie oder Hilfeplan.',
  },
  {
    id: 'a05',
    stufe: 'a',
    nummer: 5,
    titel: 'Gesprächstermin proaktiv anbieten',
    trigger: 'Erste, noch leichte Veränderungen – bevor das Problem sich verfestigt.',
    ziel: 'Frühzeitig eine vertrauensvolle Allianz mit den Eltern aufbauen, niedrigschwellige Schritte gemeinsam vereinbaren.',
    wannNicht: [
      'wenn das Problem bereits stark eskaliert ist und andere Stellen (Schulsozialarbeit, Jugendamt) beteiligt sind → erst Team-Abstimmung',
      'nicht mit alarmierendem Tonfall („Wir müssen dringend reden“) ohne Anlass-Hinweis',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Vorher in einem Satz für sich klären, was du besprechen willst', beispielFormulierung: '„Ich möchte mit den Eltern über Pauls nachlassende Hausaufgaben und Konzentration sprechen.“', material: 'Vermerk im Lehrerheft' },
      { nummer: 2, wasTun: 'Passenden Kontaktweg wählen (Heft, App, Anruf)', beispielFormulierung: 'bei ruhigen Themen Schul-App; bei sensiblen Themen Anruf', material: 'Schul-App, Telefon, Heft' },
      { nummer: 3, wasTun: 'Einladung knapp und freundlich formulieren, Termin vorschlagen', beispielFormulierung: '„Liebe Frau …, mir sind bei Anna ein paar Veränderungen aufgefallen, über die ich gern in Ruhe mit Ihnen sprechen möchte. Können Sie am … um … zu einem kurzen Gespräch kommen?“', material: 'Mitteilungsheft, App' },
      { nummer: 4, wasTun: 'Positiven Bezug einbauen, um Alarmstimmung zu vermeiden', beispielFormulierung: '„Mir ist wichtig, dass Lukas seine guten Fähigkeiten im Unterricht wieder besser zeigen kann.“', material: 'Zusatzsatz' },
      { nummer: 5, wasTun: 'Alternative Termine anbieten', beispielFormulierung: '„Falls der Termin ungünstig ist, melden Sie sich, dann finden wir gemeinsam eine andere Zeit.“', material: 'Sekretariat einbinden' },
      { nummer: 6, wasTun: 'Vorher 3 Punkte für sich notieren (mind. einer positiv)', beispielFormulierung: '„1. Beobachtungen, 2. Fragen an Eltern, 3. gemeinsamer nächster Schritt.“', material: 'Stichwortzettel' },
    ],
    fallstricke: [
      'Vage oder dramatische Einladung ohne Hinweis aufs Thema',
      'implizite Schuldzuweisung schon in der Einladung („wegen Ihres Kindes“)',
      'Termine einseitig diktieren, ohne Berufstätigkeit zu berücksichtigen',
    ],
    eskalation: 'Wenn Eltern auf wiederholte freundliche Angebote nicht reagieren oder mehrfach kurzfristig absagen, während sich die Situation beim Kind verstärkt → Klassenleitung/Schulleitung einbeziehen, schriftliche Einladung über Schulleitung, ggf. Schulsozialarbeit.',
  },
  {
    id: 'a06',
    stufe: 'a',
    nummer: 6,
    titel: 'Hausaufgaben-Heft einführen oder prüfen',
    trigger: 'Vergessen, schlechte Selbstorganisation, Eltern haben keinen Überblick.',
    ziel: 'Selbstorganisation durch ein klar sichtbares, täglich genutztes Instrument stärken – Schnittstelle zwischen Unterricht, Kind und Elternhaus.',
    wannNicht: [
      'wenn die Schule bereits ein verbindliches digitales System hat, das zuverlässig läuft (kein Parallelsystem)',
      'wenn das Problem nicht im Notieren liegt, sondern in Schulverweigerung/Motivation',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Einheitliches Heftformat festlegen (mit Kollegium abstimmen)', beispielFormulierung: '„Wir nutzen ab heute alle das gleiche Hausaufgaben-Heft.“', material: 'A5-Heft mit Wochenseiten' },
      { nummer: 2, wasTun: 'Festes Zeitfenster zum Eintragen einplanen (letzte 5 Min)', beispielFormulierung: '„Die letzten fünf Minuten sind immer für Hausaufgaben und Eintrag ins Heft reserviert.“', material: 'Tafel, Timer' },
      { nummer: 3, wasTun: 'Eintrag an Tafel vormachen, gemeinsam übertragen', beispielFormulierung: '„Schreibt bitte genau: ‚Deutsch: S. 34 Nr. 2–4 bis Mittwoch\'."', material: 'Tafel' },
      { nummer: 4, wasTun: 'Hefte stichprobenartig anschauen und positiv rückmelden', beispielFormulierung: '„Gut, dass du Datum und Fach deutlich aufgeschrieben hast.“', material: '–' },
      { nummer: 5, wasTun: 'Eltern beim Elterngespräch / per Mitteilung erklären, dass das Heft maßgeblich ist', beispielFormulierung: '„Bitte schauen Sie regelmäßig ins Hausaufgaben-Heft Ihres Kindes. Dort finden Sie alle Aufgaben.“', material: 'Infozettel, App' },
      { nummer: 6, wasTun: 'Mit Kind Plan B bei vergessenem Heft vereinbaren', beispielFormulierung: '„Wenn du dein Heft vergessen hast, fragst du eine Mitschülerin, ob du ein Foto von ihrer Seite machen darfst.“', material: 'Handy je nach Schulordnung' },
    ],
    fallstricke: [
      'Heft nur sporadisch thematisieren – ohne Ritual rutscht es weg',
      'zu viele parallele Kanäle (Heft, App, Tafel-Foto) ohne klare Hierarchie',
      'nur Defizite ansprechen („Du hast schon wieder nichts eingetragen“) statt Fortschritte',
    ],
    eskalation: 'Wenn trotz mehrwöchiger konsequenter Einführung weiterhin nichts notiert wird und Leistungen einbrechen → vertieftes Elterngespräch, mögliche Ursachen prüfen (LRS, AD(H)S, familiäre Belastung), ggf. Beratungslehrkraft / Schulpsychologie.',
  },
  {
    id: 'a07',
    stufe: 'a',
    nummer: 7,
    titel: 'Reminder-Ritual am Ende der Stunde',
    trigger: 'Material, Hausaufgaben oder Jacken bleiben regelmäßig liegen.',
    ziel: 'Durch einen kurzen, immer gleichen Abschluss der Stunde Vergesslichkeit reduzieren und Verantwortung einüben – positiv und gemeinsam.',
    wannNicht: [
      'in sehr kleinen, hoch selbstorganisierten Lerngruppen',
      'nie mit Defizit-Kommentaren verbinden („Ihr vergesst ja immer alles“)',
      'ersetzt keine strukturellen Probleme (unklare Hausaufgabenkultur)',
    ],
    bausteine: [
      { nummer: 1, wasTun: '5 Min vor Stundenende Ritual ansagen', beispielFormulierung: '„Wir sind in den letzten fünf Minuten. Wir machen unseren ‚Check\' für heute."', material: 'Uhr, Timer' },
      { nummer: 2, wasTun: 'Immer gleiche Mini-Checkliste sichtbar', beispielFormulierung: '„1. Hausaufgaben eingetragen? 2. Heft und Buch im Ranzen? 3. Federmappe, Trinkflasche, Jacke?“', material: 'Plakat mit Piktogrammen' },
      { nummer: 3, wasTun: 'Kinder prüfen aktiv mit (mitsprechen, mitschauen)', beispielFormulierung: '„Wenn ich ‚Hausaufgaben\' sage, schaut ihr in euer Heft."', material: '–' },
      { nummer: 4, wasTun: 'Positiv verstärken, wenn es klappt', beispielFormulierung: '„Heute haben fast alle ihre Sachen komplett. Das macht es euch morgen leichter.“', material: 'Smiley an Tafel' },
      { nummer: 5, wasTun: 'Vergessenes neutral benennen, ohne moralisieren', beispielFormulierung: '„Du hast dein Matheheft noch im Fach. Hol es und leg es in deinen Ranzen.“', material: 'Klassenfach' },
      { nummer: 6, wasTun: 'Nach Wochen anpassen / reduzieren', beispielFormulierung: '„Wir machen den Check nur noch Montag und Mittwoch, weil ihr schon sicher seid.“', material: 'Plakat hängen lassen' },
    ],
    fallstricke: [
      'Ritual zu lang oder belehrend → wird als lästig erlebt',
      'nur sporadisch durchgeführt (nach Chaos-Stunden) → mit Stress assoziiert',
      'Lehrkraft „performt“ allein, Kinder bleiben passiv',
    ],
    eskalation: 'Wenn einzelne Kinder trotz Ritual systematisch weiter vergessen und Lernnachteile entstehen → individuelles Gespräch mit Kind + Eltern, Ursachen klären, ggf. Schulsozialarbeit / Lerncoach.',
  },
  {
    id: 'a08',
    stufe: 'a',
    nummer: 8,
    titel: 'Klare Regel für Verspätungen kommunizieren',
    trigger: 'Häufiges Zuspätkommen, Unterrichtsbeginn wird gestört.',
    ziel: 'Verbindliche, faire Regel zum Umgang mit Verspätungen – transparent für Klasse und Eltern, mit Fokus auf Nachholen statt reiner Strafe.',
    wannNicht: [
      'wenn strukturelle Schulfaktoren (zu kurze Wechselzeiten zwischen weit entfernten Räumen) die Hauptursache sind → Kollegium / Schulleitung',
      'nie eigene Regel ohne Abstimmung mit der Schulordnung einführen',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Bestehende Schulordnung prüfen – was gilt bereits?', beispielFormulierung: '„Unsere Schulordnung sagt: pünktlich erscheinen, Verspätung melden.“', material: 'Schulordnung' },
      { nummer: 2, wasTun: 'Klassenregel kurz und konkret formulieren', beispielFormulierung: '„Regel: Wenn der Unterricht beginnt, bist du auf deinem Platz und hast dein Material bereit.“', material: 'Plakat' },
      { nummer: 3, wasTun: 'Folgehandlungen benennen (nachholen statt strafen)', beispielFormulierung: '„Wer bis zu 5 Min zu spät kommt, meldet sich kurz, wird ins Klassenbuch eingetragen und holt die verpasste Aufgabe nach.“', material: 'Klassenbuch' },
      { nummer: 4, wasTun: 'Regel mit Klasse besprechen und kurz begründen', beispielFormulierung: '„Ich möchte, dass wir alle in Ruhe starten können. Deshalb brauchen wir eine klare Abmachung.“', material: 'Gesprächskreis' },
      { nummer: 5, wasTun: 'Regel sichtbar im Klassenraum aushängen', beispielFormulierung: '„Regel zur Pünktlichkeit“ mit Uhr-Symbol an der Wand', material: 'Plakat' },
      { nummer: 6, wasTun: 'Eltern in 2–3 Sätzen informieren', beispielFormulierung: '„In unserer Klasse gilt: Unterrichtsbeginn 8:00 Uhr. Bei Verspätungen notieren wir das und sprechen es im Elterngespräch an.“', material: 'Mitteilung' },
      { nummer: 7, wasTun: 'Standardisierter Satz bei Verspätung – nicht jedes Mal neu diskutieren', beispielFormulierung: '„Du kommst fünf Minuten zu spät. Trag dich nach der Stunde im Verspätungsbogen ein.“', material: '–' },
    ],
    fallstricke: [
      'Drastische, unrealistische Drohungen („Beim nächsten Mal schicke ich dich nach Hause“)',
      'situative Anwendung (bei manchen streng, bei anderen großzügig) → Gerechtigkeitskonflikte',
      'Kinder mit langen Fahrwegen oder schwieriger Familiensituation pauschal verantwortlich machen',
    ],
    eskalation: 'Wenn trotz Regel und mehrfachem Gespräch weiter massiv zu spät → Klassenleitung, Schulleitung, ggf. Schulsozialarbeit. Bei hartnäckigem, absichtlichem Zuspätkommen: Ordnungsmaßnahmen prüfen (bundeslandspezifisch).',
  },
  {
    id: 'a09',
    stufe: 'a',
    nummer: 9,
    titel: 'Nachhol-Aufgabe statt Strafe',
    trigger: 'Vergessene Hausaufgaben, Zuspätkommen → lernorientierte Reaktion.',
    ziel: 'Versäumte Lernzeit oder Aufgabe nacharbeiten statt bestrafen – Verantwortung fürs eigene Lernen stärken.',
    wannNicht: [
      'wenn das Kind bereits massiv überfordert ist → mehr Arbeit verstärkt Frustration',
      'bei täglichem Vergessen oder Schulverweigerung reicht Nachhol-Aufgabe nicht',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Standardformulierung festlegen – gleicher Satz bei jedem Vorfall', beispielFormulierung: '„Du hast die Hausaufgabe heute nicht dabei. Du erhältst eine Nachhol-Aufgabe, damit du den Stoff trotzdem übst.“', material: '–' },
      { nummer: 2, wasTun: 'Nachhol-Blätter vorbereitet im Ordner haben (gleiche Struktur wie HA)', beispielFormulierung: '„Arbeitsblatt ‚Nachholen: Bruchrechnen – Level 1\'"', material: 'Ordner „Nachholen“' },
      { nummer: 3, wasTun: 'Konkretes Zeitfenster festlegen', beispielFormulierung: '„Du erledigst die Nachhol-Aufgabe bis morgen und zeigst sie mir vor Unterrichtsbeginn.“', material: 'Eintrag im Lehrerheft' },
      { nummer: 4, wasTun: 'Einfaches Tracking führen', beispielFormulierung: '„Datum – Anlass – Nachhol-Aufgabe – erledigt (J/N)“', material: 'Liste im Lehrerheft' },
      { nummer: 5, wasTun: 'Bei wiederholten Aufgaben Eltern kurz informieren', beispielFormulierung: '„Ihr Kind hat in dieser Woche zwei Nachhol-Aufgaben erhalten, da Hausaufgaben gefehlt haben.“', material: 'Mitteilungsheft, App' },
      { nummer: 6, wasTun: 'Nach Erledigung positiv abschließen', beispielFormulierung: '„Gut, dass du die Aufgabe nachgeholt hast. Damit bist du wieder auf dem gleichen Stand.“', material: '–' },
    ],
    fallstricke: [
      'Nachhol-Aufgaben zu umfangreich → wird als Strafarbeit erlebt',
      'inkonsequente Umsetzung (manche kriegen eine, andere nicht) → wirkt ungerecht',
      'kein gemeinsames Vorgehen im Kollegium → Eltern sind verwirrt',
    ],
    eskalation: 'Wenn ein Kind regelmäßig Nachhol-Aufgaben erhält, diese aber nicht erledigt und sich am Grundproblem (Vergessen, Verspätungen) nichts ändert → Gespräch mit Eltern, Ursachen klären (Lernstörung, Belastung, Motivation), ggf. Beratungslehrkraft/Schulsozialarbeit.',
  },
  {
    id: 'a10',
    stufe: 'a',
    nummer: 10,
    titel: 'Nachrichten-Ritual etablieren',
    trigger: 'Elternbriefe und Zettel kommen nicht zuhause an.',
    ziel: 'Sicherstellen, dass Mitteilungen zuverlässig vom Ranzen ins Elternhaus gelangen – fester Zeitpunkt, klarer Ort, klares Vorgehen.',
    wannNicht: [
      'wenn die Schule auf rein digitale Kommunikation umgestellt hat (dann Ritual für digitales Einloggen)',
      'nie mit Druck arbeiten („Wenn du das vergisst, bekommst du Ärger“)',
    ],
    bausteine: [
      { nummer: 1, wasTun: '„Postfach“ im Ranzen vereinbaren', beispielFormulierung: '„Alle Briefe für eure Eltern kommen ins vordere Fach bzw. in die ‚Postmappe\'."', material: 'Elternpost-Mappe' },
      { nummer: 2, wasTun: 'Festes Tageszeit-Signal („Post-Minute“)', beispielFormulierung: '„Wir machen jetzt unsere Post-Minute. Holt eure Postmappe raus.“', material: 'Uhr, kleines Klanginstrument' },
      { nummer: 3, wasTun: 'Mitteilungen austeilen und live einordnen lassen', beispielFormulierung: '„Legt den Zettel jetzt in eure Postmappe. Ich gehe einmal durch die Reihen und schaue.“', material: 'Elternbrief' },
      { nummer: 4, wasTun: 'Eltern mitteilen, wo Post zu finden ist', beispielFormulierung: '„Alle Mitteilungen stecken in der Postmappe im Ranzen Ihres Kindes. Bitte schauen Sie dort regelmäßig hinein.“', material: 'Elternbrief, App' },
      { nummer: 5, wasTun: 'Gelegentlich beiläufig nachfragen (ohne bloßzustellen)', beispielFormulierung: '„Wer von euch hat den Ausflugszettel gestern mit seinen Eltern besprochen? Hebt kurz die Hand.“', material: '–' },
      { nummer: 6, wasTun: 'Bei wichtigen Mitteilungen Unterschrift einfordern und einsammeln', beispielFormulierung: '„Auf diesem Zettel unterschreiben Sie bitte. Gebt den Zettel bis Freitag wieder ab.“', material: 'Brief mit Unterschriftsfeld' },
    ],
    fallstricke: [
      'Postmappe mit zu vielen Materialien überfüllt',
      'Drohungen statt Struktur',
      'Ritual nur bei „unangenehmen“ Mitteilungen → Postmappe wird negativ assoziiert',
    ],
    eskalation: 'Wenn wichtige Mitteilungen trotz Ritual nicht ankommen → zusätzlich direkter Kanal (Anruf, App-Nachricht). Wenn Eltern grundsätzlich nicht erreichbar wirken oder Mitteilungen ignorieren → Klassenleitung, Schulsozialarbeit, ggf. Schulleitung.',
  },
  {
    id: 'a11',
    stufe: 'a',
    nummer: 11,
    titel: 'Digitalen Elternkanal nutzen',
    trigger: 'SchoolFox, Schulmanager, Eltern-App – schnelle, dokumentierte Kommunikation.',
    ziel: 'Information und Absprachen zwischen Lehrkraft und Eltern niederschwellig, schnell und nachvollziehbar machen.',
    wannNicht: [
      'Private WhatsApp-Gruppen sind in der Regel kein zulässiger offizieller Kanal',
      'wenn ein relevanter Elternanteil keinen Zugang oder digitale Kompetenz hat → analoge Alternativen sichern',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Klären, welche App offiziell zugelassen ist', beispielFormulierung: '„Unsere Schule nutzt SchoolFox / Schulmanager. Private Messenger sind nicht vorgesehen.“', material: 'Dienstvereinbarung' },
      { nummer: 2, wasTun: 'Sicherstellen, dass alle Eltern Zugang haben', beispielFormulierung: '„Wenn Sie Hilfe beim Einrichten der App brauchen, wenden Sie sich ans Sekretariat oder an mich nach dem Elternabend.“', material: 'Zugangsbriefe' },
      { nummer: 3, wasTun: 'Kommunikationsregeln klar benennen (Themen, Antwortzeit)', beispielFormulierung: '„Sie können mich über die App zu organisatorischen Fragen kontaktieren. Ich antworte in der Regel innerhalb von zwei Werktagen.“', material: 'App-Nachricht an alle' },
      { nummer: 4, wasTun: 'Vereinbarungen aus Elterngesprächen kurz dort dokumentieren', beispielFormulierung: '„Wie besprochen, kontrollieren Sie in den nächsten 4 Wochen gemeinsam das Hausaufgaben-Heft.“', material: 'Nachrichtenfunktion' },
      { nummer: 5, wasTun: 'Sensible Themen NIE in der App – persönliches Gespräch anbieten', beispielFormulierung: '„Zu den schulischen Leistungen Ihres Kindes spreche ich gern persönlich. Bitte vereinbaren Sie einen Termin.“', material: 'Standardformulierung' },
      { nummer: 6, wasTun: 'Erreichbarkeit klar begrenzen', beispielFormulierung: '„Nachrichten, die nach 17 Uhr eingehen, beantworte ich am nächsten Schultag.“', material: 'Profiltext' },
    ],
    fallstricke: [
      'Erwartung, dass jede Kleinigkeit sofort und ausführlich geklärt wird → Überlastung',
      'emotionale Konflikte schriftlich austragen → Missverständnisse',
      'sensible Details in Gruppennachrichten teilen',
    ],
    eskalation: 'Wenn Eltern den Kanal nutzen, um zu beschimpfen, zu drohen oder unzumutbar zu fordern → Nachrichten sichern, Schulleitung informieren. Bei Hinweisen auf Kindeswohlgefährdung über die App → schulische Abläufe zur Gefährdungseinschätzung greifen lassen.',
  },
  {
    id: 'a12',
    stufe: 'a',
    nummer: 12,
    titel: 'Spiegelgespräch führen',
    trigger: 'Auffälliges Verhalten ohne erkennbaren Grund – gemeinsame „Spurensuche“.',
    ziel: 'Kind sein eigenes Verhalten wertfrei spiegeln, gemeinsam erste Erklärungen oder Lösungen entwickeln – keine Bewertung, keine Vernehmung.',
    wannNicht: [
      'in hoch emotionalen Situationen direkt nach einem Konflikt → erst Beruhigung',
      'nie mit inquisitorischem Ton – Einladung, keine Vernehmung',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Anlass benennen, Rahmen setzen', beispielFormulierung: '„Ich möchte kurz mit dir über die letzte Mathe-Stunde sprechen. Hast du jetzt fünf Minuten?“', material: 'Ruhiger Ort' },
      { nummer: 2, wasTun: 'Verhalten in Ich-Form spiegeln, ohne Bewertung', beispielFormulierung: '„Ich habe gesehen, dass du heute dreimal laut dazwischen gerufen hast, während andere gesprochen haben.“', material: '–' },
      { nummer: 3, wasTun: 'Offen nach der Sicht des Kindes fragen', beispielFormulierung: '„Wie war das für dich? Was war in dem Moment los bei dir?“', material: '–' },
      { nummer: 4, wasTun: 'Gefühle/Bedürfnisse benennen lassen', beispielFormulierung: '„Warst du vielleicht genervt, gelangweilt, unsicher? Was würdest du sagen?“', material: '–' },
      { nummer: 5, wasTun: 'Gemeinsam kleine Veränderung suchen', beispielFormulierung: '„Was könnte dir helfen, beim nächsten Mal nicht dazwischen zu rufen? Wollen wir ein Zeichen vereinbaren?“', material: 'kleines Kärtchen als Erinnerung' },
      { nummer: 6, wasTun: 'Kurze positive Vereinbarung festhalten', beispielFormulierung: '„Wir halten fest: Du hebst zuerst die Hand und wartest, bis du dran bist. Ich achte darauf, dich dranzunehmen.“', material: 'Notiz auf Karte' },
    ],
    fallstricke: [
      'Versteckte Standpauke statt offene Spurensuche',
      '„Warum“-Fragen, die das Kind nicht beantworten kann („Warum machst du das immer?“)',
      'nur nach negativen Ereignissen – auch positive Entwicklungen spiegeln',
    ],
    eskalation: 'Wenn sich Hinweise auf ernsthafte Belastungen zeigen (Gewalt zu Hause, Mobbing, massive Ängste, Depression) → Gespräch behutsam beenden, Aussagen ernstnehmen, schulische Abläufe zur Gefährdungseinschätzung (Schulsozialarbeit, Schulpsychologie, Schulleitung).',
  },
  {
    id: 'a13',
    stufe: 'a',
    nummer: 13,
    titel: 'Lob und positive Verstärkung gezielt einsetzen',
    trigger: 'Bei Demotivation, geringem Selbstvertrauen, beginnender Verweigerung.',
    ziel: 'Erwünschtes Verhalten sichtbar machen, Selbstwirksamkeit stärken – konkret, glaubwürdig, auf Anstrengung bezogen.',
    wannNicht: [
      'globales, inflationäres Lob („Ihr seid die beste Klasse“) nutzt sich ab',
      'Lob nicht ausschließlich an materielle Belohnungen koppeln',
      'nicht manipulativ einsetzen, um „Ruhe zu schaffen“ – Jugendliche spüren das',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Verhalten genau benennen, nicht globale Eigenschaft', beispielFormulierung: '„Mir gefällt, wie konzentriert du heute an Aufgabe 3 gearbeitet hast.“', material: '–' },
      { nummer: 2, wasTun: 'Anstrengung hervorheben, nicht nur das Ergebnis', beispielFormulierung: '„Du hast dir heute deutlich mehr Zeit für deine Zeichnung genommen. Das sieht man.“', material: '–' },
      { nummer: 3, wasTun: 'Fortschritt markieren', beispielFormulierung: '„Im Vergleich zu letzter Woche hast du dich heute öfter gemeldet. Das ist ein toller Schritt.“', material: 'Vermerk im Lehrerheft' },
      { nummer: 4, wasTun: 'Leise, persönliche Rückmeldung am Platz', beispielFormulierung: '„Ich merke, dass du dich bemühst, heute ruhiger zu sein. Danke dafür.“', material: '–' },
      { nummer: 5, wasTun: 'Gelegentlich positive Nachricht nach Hause', beispielFormulierung: '„Heute hat sich Ihr Kind im Mathematikunterricht sehr konzentriert gezeigt.“', material: 'Mitteilungsheft, App' },
      { nummer: 6, wasTun: 'Gruppen-Lob, ohne andere abzuwerten', beispielFormulierung: '„Mehrere von euch haben heute sehr gut zusammengearbeitet, besonders Tischgruppe 3.“', material: '–' },
    ],
    fallstricke: [
      'Unspezifisches „Super! Toll!“ → keine echte Rückmeldung',
      'immer dieselben Schüler loben → andere fühlen sich abgehängt',
      'offensichtlich manipulativ („nur damit Ruhe ist“)',
    ],
    eskalation: 'Wenn ein Kind trotz ehrlicher positiver Rückmeldungen anhaltend sehr abwertend über sich spricht („Ich kann sowieso nichts“) oder gar nicht reagiert → Hinweise auf depressive Entwicklung, Ängste, familiäre Abwertung → Schulsozialarbeit, Schulpsychologie, externe Hilfe.',
  },
  {
    id: 'a14',
    stufe: 'a',
    nummer: 14,
    titel: 'Kontakt bei positivem Erlebnis aufnehmen',
    trigger: 'Beziehungsdynamik zu Eltern verändern, die bisher nur „Problem-Anrufe“ kannten.',
    ziel: 'Kommunikationsmuster ausbalancieren – nicht nur bei Problemen melden, sondern auch bei Erfolgen. Schafft Vertrauen für spätere schwierige Gespräche.',
    wannNicht: [
      'unmittelbar nach harten Konflikten oder Ordnungsmaßnahmen → erst etwas Zeit lassen',
      'nie als reine pädagogische Taktik ohne echte Wertschätzung – Authentizität zählt',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Bewusst auch auf gelungene Situationen achten', beispielFormulierung: '„Heute hat T. sich in der Gruppenarbeit sehr kooperativ verhalten.“', material: 'Vermerk im Lehrerheft' },
      { nummer: 2, wasTun: 'Konkreten Anlass auswählen', beispielFormulierung: 'erste erfolgreiche Präsentation, ruhige Mitarbeit über mehrere Stunden, spontanes Helfen', material: 'Beobachtung' },
      { nummer: 3, wasTun: 'Kurze Nachricht (1–3 Sätze), so konkret wie möglich', beispielFormulierung: '„Ich möchte Ihnen kurz rückmelden, dass sich Ihre Tochter heute sehr engagiert an der Gruppenarbeit beteiligt hat. Das war schön zu sehen.“', material: 'Mitteilungsheft, App' },
      { nummer: 4, wasTun: 'Bei besonderem Anlass: kurz anrufen', beispielFormulierung: '„Ich wollte Ihnen nur kurz sagen, dass Ihr Sohn heute eine hervorragende Präsentation gehalten hat.“', material: 'Telefon' },
      { nummer: 5, wasTun: 'Kind vorher informieren', beispielFormulierung: '„Ich werde deinen Eltern heute schreiben, dass du das Referat so gut gemacht hast.“', material: '–' },
      { nummer: 6, wasTun: 'Später Bezug nehmen im nächsten Elterngespräch', beispielFormulierung: '„Sie erinnern sich vielleicht, dass ich Ihnen im Februar von der gelungenen Gruppenarbeit berichtet habe.“', material: 'Gesprächsnotizen' },
    ],
    fallstricke: [
      'Zu überschwänglich oder „zuckerwattig“ → wirkt unglaubwürdig',
      'positive Rückmeldung als Vorspann für Kritik nutzen („Er hat sich zwar einmal gut verhalten, aber sonst …“)',
      'nur bestimmte Kinder loben',
    ],
    eskalation: 'Per se keine Eskalation. Aber: Wenn Eltern auf positive Rückmeldungen extrem misstrauisch reagieren („Was wollen Sie denn jetzt von mir?“), ist das Vertrauensverhältnis stark gestört → Klassenleitung/Schulleitung in weitere Gespräche einbeziehen.',
  },
  {
    id: 'a15',
    stufe: 'a',
    nummer: 15,
    titel: 'Fehlzeiten dokumentieren und Muster erkennen',
    trigger: 'Gehäufte Fehltage, Verdacht auf Schulverweigerung/Schulabsentismus.',
    ziel: 'Anwesenheit systematisch erfassen, Muster erkennen (bestimmte Wochentage, Fächer, Phasen) – Grundlage für frühzeitige Maßnahmen und ggf. Jugendamtsmeldung.',
    wannNicht: [
      'bei klar medizinisch begründeten Fehlzeiten ohne Verweigerungshinweise → reguläres Klassenbuch reicht',
      'nie als „Erwischen“ framen – Hilfe-Fokus',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Eigene Übersicht für das Kind anlegen', beispielFormulierung: '„Monatsübersicht Fehlzeiten: Datum – entschuldigt/unentschuldigt – Bemerkung.“', material: 'A4-Blatt, Excel, schulische Software' },
      { nummer: 2, wasTun: 'Daten regelmäßig aus Klassenbuch übertragen', beispielFormulierung: '„KW 38: 2 Tage gefehlt (Mi/Do), entschuldigt mit ‚Bauchschmerzen\'."', material: 'Klassenbuch' },
      { nummer: 3, wasTun: 'Muster markieren (Wochentag, Fach, Zeitraum)', beispielFormulierung: '„Auffällig: Häufiges Fehlen an Montagen, besonders in Mathe-Stunden.“', material: 'Textmarker' },
      { nummer: 4, wasTun: 'Mit Übersicht ins Elterngespräch gehen', beispielFormulierung: '„In den letzten 8 Wochen war Ihr Kind an 6 Tagen nicht in der Schule, vor allem montags.“', material: 'Ausdruck' },
      { nummer: 5, wasTun: 'Bei deutlichen Mustern Schulleitung/Sozialarbeit informieren', beispielFormulierung: '„Es gibt Hinweise auf beginnenden Schulabsentismus. Wir sollten gemeinsam überlegen, welche Schritte nötig sind.“', material: 'Fallbesprechung' },
      { nummer: 6, wasTun: 'Vereinbarungen schriftlich festhalten', beispielFormulierung: '„Bei Krankheit melden Sie sich morgens telefonisch im Sekretariat. Bei unklaren Fällen bitten wir um ärztliches Attest.“', material: 'Vereinbarungsbogen' },
    ],
    fallstricke: [
      'Fehlzeiten zwar registrieren, aber nicht systematisch auswerten',
      'im Gespräch nur pauschal („Ihr Kind fehlt sehr häufig“) statt mit Daten → Abwehr',
      'Fehlzeiten als reines „Fehlverhalten“ sehen statt nach psychischen/familiären Ursachen zu fragen',
    ],
    eskalation: 'Bei längerem regelmäßigem Fehlen ohne Lösung → Jugendamt informieren (in vielen Bundesländern verpflichtend, bundeslandspezifische Vorgaben prüfen). Bei Hinweisen auf Schulangst, Mobbing oder andere Belastungen → Schulpsychologie, ggf. Kinder- und Jugendpsychiatrie einbinden.',
  },
]

// ─── Stufe B — Kooperative Maßnahmen (mit Eltern oder Schule) ─────────────────

export const MASSNAHMEN_B: Massnahme[] = [
  {
    id: 'b01',
    stufe: 'b',
    nummer: 1,
    titel: 'Verbindliche Vereinbarung schriftlich festhalten',
    trigger: 'Wenn gemeinsame Schritte über mehrere Wochen verfolgt werden sollen.',
    ziel: 'Klare, überprüfbare Absprachen zwischen Lehrkraft, Eltern und ggf. Kind festhalten – transparent, verbindlich, nachvollziehbar.',
    wannNicht: [
      'wenn noch kein gemeinsames Problembewusstsein besteht oder Eltern stark in Abwehrhaltung sind → erst Beziehung aufbauen',
      'bei einmaligen Vorfällen, die eher Klärung als Maßnahmenplan brauchen',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Schriftlichkeit am Gesprächsende ankündigen und begründen', beispielFormulierung: '„Damit wir alle wissen, wer was tut und wir in ein paar Wochen überprüfen können, ob sich etwas verbessert hat, würde ich vorschlagen, dass wir unsere Absprachen kurz schriftlich festhalten.“', material: 'Vereinbarungs-Vordruck' },
      { nummer: 2, wasTun: 'Gemeinsam formulieren, laut denken, Eltern aktiv einbeziehen', beispielFormulierung: '„Ich schreibe jetzt so auf, wie ich unsere Vereinbarung verstanden habe. Sagen Sie mir, wenn Sie etwas anders sehen oder ergänzen möchten.“', material: '–' },
      { nummer: 3, wasTun: 'Struktur: Ziel · Beitrag Lehrkraft · Beitrag Eltern · Beitrag Kind · Zeitraum · Überprüfungstermin', beispielFormulierung: '„Als Ziel schreibe ich: ‚Max kommt an mindestens vier von fünf Schultagen pünktlich zum Unterrichtsbeginn.\'"', material: 'Vereinbarungs-Vordruck' },
      { nummer: 4, wasTun: 'Wörtlich konkret formulieren, vage Aussagen vermeiden', beispielFormulierung: 'Eltern: „Wir sorgen dafür, dass Max bis 20:30 Uhr das Handy weglegt und der Wecker auf 7:00 Uhr gestellt ist.“ Lehrkraft: „Ich spreche Max morgens freundlich an und lobe seine Verbesserung im Klassenrat.“', material: '–' },
      { nummer: 5, wasTun: 'Am Ende laut vorlesen und alle unterschreiben lassen', beispielFormulierung: '„Ich lese unsere Vereinbarung jetzt noch einmal in Ruhe vor, damit wir sicher sind, dass wir alle dasselbe meinen.“', material: 'Vereinbarung mit Unterschriftsfeldern' },
      { nummer: 6, wasTun: 'Kopie an Eltern, Original in Klassenmappe, Termin in Kalender', beispielFormulierung: '„Ich mache eine Kopie für Sie. Ein Exemplar bleibt in der Klassenmappe.“', material: 'Kopierer, Kalender' },
      { nummer: 7, wasTun: 'Überprüfungstermin sofort fix machen', beispielFormulierung: '„Wir haben jetzt den 15.03. Wollen wir uns am 12.04. wieder zusammensetzen?“', material: 'Eintrag im Klassenbuch / digital' },
    ],
    fallstricke: [
      'Zu viele Ziele auf einmal – 5–6 Punkte sind nicht durchzuhalten; ein konkretes Ziel reicht',
      'vage Formulierungen („Max soll sich besser benehmen“) ohne überprüfbare Kriterien',
      '„Strafprotokoll“ – nur Pflichten für Kind und Eltern, kein Beitrag der Lehrkraft',
      'Überprüfungstermin nicht eingehalten → Vereinbarung verliert Glaubwürdigkeit',
    ],
    eskalation: 'Wenn nach 4–6 Wochen Erprobung kein Fortschritt erreicht ist und auch im Nachgespräch keine tragfähige Anpassung gelingt → Klassenkonferenz, Beratungslehrkraft/Schulsozialdienst einbeziehen.',
    vorlage: `Vorlage „Verbindliche Vereinbarung“:
– Name · Klasse · Datum
– Ziel der Vereinbarung: „Wir möchten gemeinsam erreichen, dass …“
– Beitrag der Schule / Lehrkraft: …
– Beitrag der Eltern: …
– Beitrag des Kindes (altersangemessen): …
– Zeitraum: von [Datum] bis [Datum] · Überprüfung am: [Datum]
– Unterschriften: Lehrkraft · Eltern · ggf. Kind`,
  },
  {
    id: 'b02',
    stufe: 'b',
    nummer: 2,
    titel: 'Kommunikationsheft oder App-Kanal etablieren',
    trigger: 'Regelmäßiger Abstimmungsbedarf, wiederkehrende Themen.',
    ziel: 'Niederschwelligen, verlässlichen Informationsaustausch zwischen Lehrkraft und Eltern ermöglichen – wenn etwas über längere Zeit beobachtet und rückgekoppelt werden muss.',
    wannNicht: [
      'wenn Eltern aus Sprach-, Lese- oder Lebenslage-Gründen schriftlich nicht zuverlässig erreichbar sind → mündliche Kanäle (Telefon, Abholzeit) statt Heft',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Im Elterngespräch begründen – Austausch, keine Kontrolle', beispielFormulierung: '„Damit wir die Veränderungen gut im Blick behalten und Sie schnell informiert sind, schlage ich vor, dass wir ein kleines Kommunikationsheft nutzen. Ich trage täglich kurz ein, wie es gelaufen ist. Sie können mir ebenfalls kurze Rückmeldungen hineinschreiben.“', material: '–' },
      { nummer: 2, wasTun: 'Medium gemeinsam wählen (Heft, App, kein privater Messenger)', beispielFormulierung: '„Unsere Schule nutzt die Lernplattform X. Ich kann dort eine kurze wöchentliche Nachricht zu Lara schreiben. Ist das für Sie in Ordnung, oder wäre ein Heft lieber?“', material: 'Heft, schulische App' },
      { nummer: 3, wasTun: 'Realistische Frequenz und Format festlegen (Ampel, Smileys, 1–2 Sätze)', beispielFormulierung: '„Ich trage jeden Tag 1–2 Sätze ein, z. B. ‚Mathe: konzentriert gearbeitet, HA vollständig.\' Sie melden einmal pro Woche kurz zurück, wie es zu Hause war."', material: 'Schema, Stempel/Symbole' },
      { nummer: 4, wasTun: 'Im Heft / als 1. App-Beitrag den Zweck schriftlich festhalten', beispielFormulierung: '„Dieses Heft dient der täglichen Rückmeldung zu Pauls Arbeitsverhalten und Hausaufgaben. Bitte sehen Sie täglich hinein und bestätigen mit Unterschrift.“', material: '–' },
      { nummer: 5, wasTun: 'Rolle des Kindes klären (Heft mitbringen, App selbst prüfen)', beispielFormulierung: '„Deine Aufgabe ist, das Heft jeden Morgen auf meinen Tisch zu legen und nach dem Unterricht wieder in deine Postmappe zu stecken.“', material: 'Postmappe' },
      { nummer: 6, wasTun: 'Rahmenregeln festlegen – Erreichbarkeit, was gehört nicht ins Heft', beispielFormulierung: '„Ich fülle das Heft einmal täglich aus. Umfangreiche Fragen besprechen wir besser im Gespräch oder am Telefon.“', material: '–' },
    ],
    fallstricke: [
      'Zu hohe Frequenz → Überlastung; auf Standardrückmeldung verkürzen',
      'nur Kritik notiert, Positives vergessen → demotiviert Kind und Eltern',
      'Eltern nutzen Heft für lange Beschwerden → freundlich auf persönliches Gespräch verweisen',
    ],
    eskalation: 'Wenn trotz verlässlicher Kommunikation keine Verbesserung oder der Kanal Spannungen verstärkt → erweitertes Gespräch, Schulsozialarbeit oder Beratungslehrkraft. Wenn das Heft Hinweise auf Überforderung der Eltern oder häusliche Probleme zeigt → interne Beratungsstrukturen, ggf. externe Hilfen.',
  },
  {
    id: 'b03',
    stufe: 'b',
    nummer: 3,
    titel: 'Nachfolgetermin vereinbaren',
    trigger: 'Wirkung des Erstgesprächs systematisch überprüfen, statt im Alltag versanden lassen.',
    ziel: 'Sicherstellen, dass die vereinbarten Schritte zu einem festgelegten Zeitpunkt gemeinsam überprüft und angepasst werden.',
    wannNicht: [
      'bei einmaliger, klar abgegrenzter Angelegenheit, die im Erstgespräch abgeschlossen wurde',
      'wenn Eltern signalisieren, dass aktuell nur sehr begrenzter Handlungsspielraum besteht → offene Wiedervorlage statt festem Termin',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Folgetermin am Ende des Erstgesprächs ansprechen', beispielFormulierung: '„Wir haben jetzt einiges verabredet. Damit wir gemeinsam schauen können, wie sich das entwickelt, würde ich gerne gleich einen Folgetermin vereinbaren.“', material: '–' },
      { nummer: 2, wasTun: 'Konkret werden – nicht „in vier Wochen“, sondern Datum + Uhrzeit', beispielFormulierung: '„Wie wäre Montag, der 18.11., um 14:30 Uhr? Passt das für Sie?“', material: 'Kalender' },
      { nummer: 3, wasTun: 'Zweck positiv rahmen – Feinjustierung, nicht Kontrolle', beispielFormulierung: '„Bei unserem nächsten Treffen wollen wir vor allem darauf schauen, was gut funktioniert hat, und dann entscheiden, ob wir weitermachen oder etwas verändern.“', material: '–' },
      { nummer: 4, wasTun: 'Schriftliche Bestätigung (Zettel oder App-Nachricht)', beispielFormulierung: '„Termin zur Rückmeldung: 21.02., 15:00 Uhr, Raum 103, mit Frau Müller. Thema: Rückblick auf Vereinbarung zu Hausaufgaben und Pünktlichkeit.“', material: 'Terminzettel' },
      { nummer: 5, wasTun: 'Inhalte des Folgegesprächs vorstrukturieren', beispielFormulierung: '„Beim nächsten Mal berichte ich kurz, wie ich Paul in der Schule erlebt habe. Dann bin ich gespannt, wie es zu Hause lief. Zum Schluss schauen wir, ob wir etwas anpassen müssen.“', material: '–' },
      { nummer: 6, wasTun: 'In Kalender und Schulverwaltungssoftware eintragen', beispielFormulierung: '–', material: 'Digitaler Kalender' },
    ],
    fallstricke: [
      'Folgetermin vage vereinbart, nicht schriftlich/digital festgehalten → wird vergessen',
      'nur stattfinden lassen, wenn „es schlecht läuft“ → Verstärkungspotenzial bei Erfolg geht verloren',
      'im Folgegespräch ausschließlich auf Defizite schauen, kleine Fortschritte nicht würdigen',
    ],
    eskalation: 'Wenn vereinbarte Schritte ohne nachvollziehbare Gründe kaum umgesetzt wurden oder sich die Situation verschlechtert → zusätzliche Unterstützung (Schulsozialarbeit, Beratungslehrkraft, Schulleitung). Wiederholtes Verschieben/Nicht-Erscheinen ohne triftigen Grund → Hinweis auf Überforderung; weitergehende Beratungsangebote oder externe Hilfen prüfen.',
  },
  {
    id: 'b04',
    stufe: 'b',
    nummer: 4,
    titel: 'Absprache zu Hausaufgaben-Unterstützung',
    trigger: 'Wenn zu Hause wenig oder keine Hilfe möglich ist.',
    ziel: 'Klären, wie das Kind verlässlich Unterstützung bekommt, wenn Eltern aus Zeit-, Sprach- oder Belastungsgründen wenig leisten können – mit realistischen Rollen für alle.',
    wannNicht: [
      'wenn die fehlenden Hausaufgaben Ausdruck von Verweigerung/Desinteresse des Kindes sind und Eltern grundsätzlich helfen könnten → Fokus auf Motivation des Kindes, nicht auf strukturelle Hilfen',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Thema wertschätzend, aber klar ansprechen', beispielFormulierung: '„Mir ist aufgefallen, dass Leon oft ohne oder mit unvollständigen Hausaufgaben kommt. Das ist im Alltag manchmal schwer zu organisieren. Ich würde gerne mit Ihnen überlegen, wie wir ihn unterstützen können – auch wenn Sie nicht immer Zeit haben, dabei zu helfen.“', material: '–' },
      { nummer: 2, wasTun: 'Was Eltern können / nicht können, ehrlich klären – ohne Wertung', beispielFormulierung: '„Wie sieht ein typischer Nachmittag bei Ihnen aus? Haben Sie einen ruhigen Platz? Manche Eltern können aus verschiedenen Gründen kaum helfen. Das ist keine Schande.“', material: '–' },
      { nummer: 3, wasTun: 'Schulische Angebote anbieten (Hausaufgabenbetreuung, OGS, Förderstunde, Lernpate)', beispielFormulierung: '„Wir haben montags und mittwochs Hausaufgabenbetreuung. Ich könnte Leon dort anmelden. Wäre das eine Entlastung?“', material: 'Anmeldeformular' },
      { nummer: 4, wasTun: 'Realistische Rolle für Eltern definieren', beispielFormulierung: '„Wenn Sie nicht inhaltlich helfen können, wäre es schon eine große Hilfe, wenn Sie einen festen Platz und eine feste Zeit ermöglichen und einmal kurz nachsehen, ob er angefangen hat. Z. B.: ‚Hast du deine Hausaufgaben begonnen?\'"', material: '–' },
      { nummer: 5, wasTun: 'Hausaufgaben-Umfang/-Format ggf. anpassen', beispielFormulierung: '„Ich möchte nicht, dass Leon an Aufgaben scheitert, die er ohne Hilfe gar nicht schaffen kann. Ich werde darauf achten, dass er den Kern im Unterricht beginnt und die HA eher Übung sind.“', material: '–' },
      { nummer: 6, wasTun: 'Vereinbarung schriftlich festhalten', beispielFormulierung: '„Ab 01.11. nimmt Leon Mo/Mi an der HA-Betreuung teil. Eltern unterschreiben im Kommunikationsheft, dass er an den anderen Tagen 30 Min an den HA gearbeitet hat.“', material: 'Kommunikationsheft' },
    ],
    fallstricke: [
      'Eltern trotz erkennbarer Überforderung weiter implizit unterstellen, sie „müssten eigentlich“ helfen → verstärkt Scham',
      'moralische Appelle („Sie müssen dringend mehr üben“) ohne strukturelle Hilfen',
      'Hausaufgaben so gestalten, dass sie ohne elterliche Unterstützung kaum machbar sind → benachteiligt bildungsferne Familien',
      'Defizit-Blick auf Eltern statt Partner-Blick',
    ],
    eskalation: 'Wenn das Kind trotz Angeboten massiv im Lernstand zurückfällt und Eltern nicht erreichbar/kooperationsbereit sind → Klassen- oder Förderkonferenz. Wenn Lebenssituation des Kindes so belastet ist, dass Grundbedürfnisse (Ruhe, Nahrung, emotionale Sicherheit) nicht erfüllt sind → Schulsozialdienst, im Notfall Jugendamt.',
  },
  {
    id: 'b05',
    stufe: 'b',
    nummer: 5,
    titel: 'Schulsozialdienst hinzuziehen',
    trigger: 'Soziale Probleme, schwierige Familiensituationen, Mobbing-Verdacht, beginnende Schulverweigerung.',
    ziel: 'Eine pädagogisch-sozialarbeiterische Fachkraft einbinden, die mit Schule, Kind und Eltern gemeinsam Unterstützungswege entwickelt – ohne zu stigmatisieren.',
    wannNicht: [
      'bei rein organisatorischen Fragen oder reinen Leistungsproblemen ohne psychosoziale Belastung – dann erst Fördermaßnahmen',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Schulsozialarbeit positiv und ressourcenorientiert vorstellen', beispielFormulierung: '„An unserer Schule haben wir Schulsozialarbeit. Das ist eine Kollegin, die speziell dafür da ist, bei schwierigen Situationen zu helfen – egal ob Konflikte, Unsicherheit beim Lernen oder Belastungen zu Hause. Ich habe den Eindruck, das könnte Ihnen und Ihrem Kind guttun.“', material: '–' },
      { nummer: 2, wasTun: 'Unterstreichen: kein „Melden“, sondern Beratung – Vertraulichkeit erklären', beispielFormulierung: '„Schulsozialarbeit arbeitet vertraulich und sucht gemeinsam mit Ihnen nach Lösungen. Es geht nicht darum, Sie zu kontrollieren, sondern Entlastung zu schaffen.“', material: '–' },
      { nummer: 3, wasTun: 'Nächsten Schritt vereinbaren, Einverständnis einholen', beispielFormulierung: '„Wenn Sie einverstanden sind, würde ich mit Frau X sprechen und sie könnte sich bei Ihnen melden, oder wir vereinbaren ein gemeinsames Gespräch zu viert. Sind Sie damit einverstanden, dass ich Ihre Kontaktdaten weitergebe?“', material: 'Einverständniserklärung' },
      { nummer: 4, wasTun: 'Konkret machen, was Schulsozialarbeit leisten kann', beispielFormulierung: '„Frau X könnte mit Ihrem Sohn über die Konflikte auf dem Schulhof sprechen und mit ihm üben, wie er reagieren kann. Außerdem könnte sie schauen, ob es außerhalb der Schule Angebote gibt, die Ihre Familie entlasten.“', material: '–' },
      { nummer: 5, wasTun: 'Einwilligung und abgesprochene Schritte dokumentieren', beispielFormulierung: '„Im Gespräch mit den Eltern von Lara vereinbart, Schulsozialarbeit einzubeziehen. Einverständnis liegt vor. Ziel: Unterstützung bei Konflikten und Entlastung der Familie.“', material: 'Kurzes Protokoll' },
      { nummer: 6, wasTun: 'Mit Kind altersgerecht erklären', beispielFormulierung: 'Grundschule: „Bei uns gibt es Frau X. Sie ist wie eine Vertrauensperson in der Schule. Du kannst mit ihr sprechen, wenn dich etwas traurig macht oder oft Streit gibt.“ Sek I: „Ich könnte mir vorstellen, dass es für dich hilfreich ist, einmal mit Herrn Y zu sprechen. Er hat viel Erfahrung mit Situationen, in denen Schule schwerfällt.“', material: '–' },
    ],
    fallstricke: [
      'Zu spät einschalten – wenn Probleme bereits stark verfestigt sind, sind Erwartungen unrealistisch',
      'als Sanktionsinstanz präsentieren („Wenn das so weitergeht, müssen wir die Schulsozialarbeit einschalten“) → Stigmatisierung',
      'sehr persönliche Informationen ohne Einwilligung der Eltern weitergeben (außer akute Gefährdung) – Datenschutz/Schweigepflicht',
      'überzogene Erwartungen wecken („das löst sich dann schon“)',
    ],
    eskalation: 'Wenn trotz Schulsozialarbeit Probleme bleiben oder sich verschärfen, insbesondere bei Hinweisen auf Kindeswohlgefährdung → gemeinsam mit Schulsozialarbeit prüfen, ob (anonymisierte) Beratung beim Jugendamt oder ein Hilfeverfahren angezeigt ist. Wenn Kooperation mit Eltern trotz Bemühen nicht zustande kommt → Schulleitung, schulinternes Krisenteam, externe Beratungsstellen.',
  },
  {
    id: 'b06',
    stufe: 'b',
    nummer: 6,
    titel: 'Beratungslehrkraft einschalten',
    trigger: 'Psychische Belastung, Mobbing-Verdacht, beginnende Schulverweigerung, komplexe Konflikte.',
    ziel: 'Eine neutrale, fachkundige Instanz einbinden, die im schulischen Rahmen beraten, im Einzelfall niedrigschwellig diagnostizieren und an externe Hilfen weiterleiten kann.',
    wannNicht: [
      'bei rein fachlichen Leistungsfragen ohne psychische Belastung',
      'bei klaren Disziplinverstößen, die ordnungsrechtliche Konsequenzen brauchen → Schulleitung / Klassenkonferenz zuerst',
      'Beratungslehrkraft ist keine Therapeutin – keine langfristige Behandlung',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Im Elterngespräch behutsam und ressourcenorientiert vorschlagen', beispielFormulierung: '„Ich merke, dass die Situation für Ihr Kind und auch für Sie sehr belastend ist. Ich kann im Unterricht einiges tun, stoße aber auch an Grenzen. An unserer Schule gibt es eine Kollegin, die als Beratungslehrkraft speziell für solche Situationen ausgebildet ist. Ich würde Ihnen gerne anbieten, sie mit ins Boot zu holen.“', material: '–' },
      { nummer: 2, wasTun: 'Erklären, was die Beratungslehrkraft konkret tut', beispielFormulierung: '„Sie führt zunächst ein vertrauliches Gespräch mit Ihrem Kind und überlegt dann gemeinsam mit Ihnen und ggf. mir, welche Schritte sinnvoll sind – eine Veränderung im Schulalltag, ein Gespräch mit der Klasse oder der Hinweis auf externe Beratungsstellen.“', material: '–' },
      { nummer: 3, wasTun: 'Formelle Einwilligung einholen, Schweigepflicht transparent machen', beispielFormulierung: '„Damit Frau X mit Ihrem Kind sprechen darf, brauche ich Ihr Einverständnis. Die Beratungslehrkraft unterliegt der Schweigepflicht; Informationen werden nur mit Ihrem Einverständnis weitergegeben.“', material: 'Einverständniserklärung' },
      { nummer: 4, wasTun: 'Rückmelde-Wege absprechen', beispielFormulierung: '„Wenn Sie einverstanden sind, spreche ich nach dem ersten Gespräch kurz mit Frau X. Wir können einen gemeinsamen Termin vereinbaren, bei dem wir zu dritt oder zu viert (mit Ihrem Kind) am Tisch sitzen.“', material: '–' },
      { nummer: 5, wasTun: 'Mit Kind altersangemessen sprechen', beispielFormulierung: 'Grundschule: „Es gibt bei uns eine Lehrerin, die ganz viel Zeit zum Zuhören hat. Sie heißt Frau X. Es ist wie ein Extra-Gespräch nur für dich, in dem du alles erzählen kannst.“ Sek I: „Du musst mit dieser Situation nicht allein klarkommen. Frau X ist dafür da, mit Jugendlichen Wege zu suchen, wie es besser laufen kann.“', material: '–' },
    ],
    fallstricke: [
      'Zu spät einschalten, erst bei massiver Eskalation → unrealistische Erwartungen',
      'als Drohkulisse benutzen („Wenn das so weitergeht, musst du zur Beratungslehrerin“) → verstärkt Scham/Abwehr',
      'ohne Wissen der Eltern vertrauliche Infos weitergeben (außer akute Gefährdungslage)',
      'das Problem vollständig „delegieren“ und sich aus pädagogischer Beziehungsarbeit zurückziehen',
    ],
    eskalation: 'Wenn trotz mehrerer Beratungssitzungen Hinweise auf psychische Störung, ernsthafte Gefährdung des Schulbesuchs oder schwere familiäre Belastung bestehen, die den schulischen Rahmen übersteigen → externe Hilfen (Kinder- und Jugendpsychotherapie, Erziehungsberatung, Jugendhilfe), Schulpsychologie, Schulleitung; bei Gefahr im Verzug Jugendamt.',
  },
  {
    id: 'b07',
    stufe: 'b',
    nummer: 7,
    titel: 'Förderplan erstellen',
    trigger: 'Anerkannter Förderbedarf oder stabile Auffälligkeiten in mehreren Fächern.',
    ziel: 'Individuelle Förderung strukturiert und nachvollziehbar gestalten – wenige klare Ziele, konkrete Maßnahmen, Überprüfungstermin. Gemeinsame Arbeitsgrundlage von Lehrkräften, Eltern und (altersangemessen) Kind.',
    wannNicht: [
      'für jede kleine Auffälligkeit → überlastet die Lehrkraft, entwertet das Instrument',
      'nicht als reine Aktenpflege, wenn die Schule nicht bereit ist, die Maßnahmen auch umzusetzen',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Nutzen erklären – kein Etikett, sondern Werkzeug', beispielFormulierung: '„Damit Linas Unterstützung nicht zufällig ist, sondern gut geplant, möchte ich einen Förderplan mit Ihnen gemeinsam erstellen. Wir halten fest, welche Ziele wir uns setzen, was wir in der Schule tun und was Sie zu Hause sinnvoll beitragen können.“', material: '–' },
      { nummer: 2, wasTun: 'SMART-Ziele formulieren – überprüfbar, statt vage', beispielFormulierung: '„Statt ‚besser in Mathe\' schreiben wir: ‚Lisa löst Additionsaufgaben im Zahlenraum bis 100 sicher und macht maximal zwei Fehler in zehn Aufgaben — bis zum [Datum].\'"', material: 'Förderplan-Vorlage' },
      { nummer: 3, wasTun: 'Stärken explizit benennen', beispielFormulierung: '„Lina ist mündlich sehr aktiv und hoch motiviert im Sachunterricht – darauf können wir aufbauen.“', material: '–' },
      { nummer: 4, wasTun: 'Maßnahmen im Unterricht konkret beschreiben (Wer · Wann · Wie)', beispielFormulierung: '„Jeden Montag in der ersten Deutschstunde arbeitet Kai mit drei anderen Kindern an der Lernkartei ‚Grundwortschatz 2\'. Ich überprüfe wöchentlich seine Kartei."', material: 'Lernkartei, Material' },
      { nummer: 5, wasTun: 'Realistische Beiträge für Eltern vorschlagen', beispielFormulierung: '„Es wäre eine große Unterstützung, wenn Sie jeden Abend 10 Minuten mit Maria laut lesen könnten. Sie müssen nicht korrigieren – geduldig zuhören und loben, wenn sie ein schwieriges Wort schafft, reicht.“', material: 'Lesetagebuch mit Unterschriftsfeld' },
      { nummer: 6, wasTun: 'Zeitraum und Überprüfungstermin festlegen, alle unterschreiben', beispielFormulierung: '„Der Förderplan gilt von [Datum] bis [Datum]. Überprüfungstermin: [Datum].“', material: 'Förderplan mit Unterschriften' },
    ],
    fallstricke: [
      'Zu viele Ziele → keines wird erreicht',
      'vage Maßnahmen („Förderung in Deutsch“)',
      'nur Defizite, keine Stärken',
      'Plan wird aufgesetzt, aber Maßnahmen nicht im Unterrichtsalltag umgesetzt → bleibt Papierprodukt',
      'Eltern als „Hilfslehrer“ überfordern',
    ],
    eskalation: 'Wenn trotz angepassten Maßnahmen über ein Schuljahr kein Fortschritt erkennbar ist → weitere Diagnostik prüfen (sonderpädagogischer Unterstützungsbedarf, LRS-Feststellung, Teilleistungsstörung). Förderplan kann Grundlage für Antrag auf Nachteilsausgleich werden. Eltern transparent informieren – fehlender Fortschritt ist kein „Versagen“, sondern Hinweis auf zusätzliche Unterstützungssysteme.',
    schulformHinweis: 'In vielen Ländern ist Förderplanung bei bestimmten Förderbedarfen verpflichtend – Vorgaben des eigenen Bundeslandes prüfen.',
    vorlage: `Förderplan-Vorlage (Kernelemente):
– Ausgangslage & Stärken
– Förderbereiche (z. B. Rechtschreibung, Lesegenauigkeit, mathematisches Grundverständnis)
– Konkrete Ziele (SMART)
– Maßnahmen in der Schule (je Ziel)
– Absprachen mit dem Elternhaus
– Zeitraum und Überprüfung
– Unterschriften: Lehrkraft · Eltern · (ggf. Kind)`,
  },
  {
    id: 'b08',
    stufe: 'b',
    nummer: 8,
    titel: 'Schulleitung informieren',
    trigger: 'Eskalation, Gewalt, rechtlich sensible Themen, ordnungsrechtliche Fragen.',
    ziel: 'Verantwortung auf die Leitungsebene ausweiten – entlastet die Lehrkraft, sichert rechtlich ab, mobilisiert schulische Ressourcen.',
    wannNicht: [
      'bei einmaligen kleineren Konflikten, die im Rahmen der üblichen Klassenführung lösbar sind → inflationäre Einbindung schwächt die Autorität der Schulleitung und signalisiert, Lehrkraft sei nicht alltagstauglich',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Situation schriftlich strukturieren – Datum, Beteiligte, Verlauf, bereits ergriffene Maßnahmen', beispielFormulierung: '„Am 12.03. kam es in Klasse 7b zu einem Vorfall: Schüler X hat Mitschüler Y in der Pause körperlich angegriffen. Ich habe die beiden getrennt und einzeln gesprochen. Am 13.03. führte ich ein Elterngespräch mit den Eltern von X, verabredet wurde …“', material: 'Internes Kurzprotokoll' },
      { nummer: 2, wasTun: 'Schriftliche Gesprächsbitte an Schulleitung', beispielFormulierung: '„Sehr geehrte Frau …, ich möchte Sie um ein Gespräch bitten zu einem Konflikt in 7b. Ich habe die Ereignisse und Maßnahmen kurz zusammengefasst und würde gerne beraten, wie wir weiter vorgehen – insbesondere zu möglichen Ordnungsmaßnahmen.“', material: 'E-Mail / Notiz' },
      { nummer: 3, wasTun: 'Im Gespräch klar zwischen Beobachtung, Aussagen Dritter und Einschätzung trennen', beispielFormulierung: 'Struktur: „Was ist passiert? Was wurde unternommen? Wie erlebe ich die Situation? Was wünsche ich von der Schulleitung?“', material: 'Notizen' },
      { nummer: 4, wasTun: 'Klare Erwartung formulieren', beispielFormulierung: '„Mein Ziel für dieses Gespräch ist, gemeinsam zu klären, welche Ordnungsmaßnahmen angemessen wären und wie wir die Eltern in die nächsten Schritte einbinden.“', material: '–' },
      { nummer: 5, wasTun: 'Eltern aktiv und vorab informieren – als Verantwortungserweiterung, nicht als „Anzeige“', beispielFormulierung: '„Die Situation ist inzwischen so komplex, dass ich sie nicht mehr allein verantworten möchte. Deshalb habe ich mit unserer Schulleiterin gesprochen. Wir können gerne einen gemeinsamen Termin vereinbaren, damit wir zu dritt über das weitere Vorgehen sprechen.“', material: '–' },
      { nummer: 6, wasTun: 'Mit Kind / Jugendlichem altersangemessen einordnen', beispielFormulierung: '„Wir gehen jetzt eine Stufe höher, weil es nicht mehr nur um deine Klasse geht, sondern auch um die Sicherheit und Rechte der anderen. Das ist kein Urteil über dich, sondern ein Schritt, um mit mehreren Erwachsenen Verantwortung zu übernehmen.“', material: '–' },
    ],
    fallstricke: [
      'Eltern erst im Nachhinein informieren („Ich habe das schon der Schulleitung gemeldet“) → wirkt wie Vertrauensbruch',
      'als Drohkulisse benutzen („Wenn Sie nicht kooperieren, gehe ich zur Schulleitung“)',
      'keine konkrete Erwartung mitbringen – Schulleitung muss Rolle selbst definieren',
    ],
    eskalation: 'Schulleitung entscheidet, ob Klassenkonferenz einberufen, Schulträger informiert, Jugendamt einbezogen oder Schulpsychologie kontaktiert wird. Maßnahme ist „ausgeschöpft“, wenn unter Leitung der Schulleitung alle schulischen Handlungsspielräume genutzt wurden und keine nachhaltige Verbesserung erreicht wird → externe Rechts- oder Fachberatung.',
  },
  {
    id: 'b09',
    stufe: 'b',
    nummer: 9,
    titel: 'Klassenkonferenz einberufen',
    trigger: 'Probleme ziehen sich durch mehrere Fächer, Mobbing, Versetzungsentscheidung, längerfristige Förderstrategie.',
    ziel: 'Fächerübergreifende Probleme gemeinsam analysieren, abgestimmte Maßnahmen festlegen, hohe Verbindlichkeit für Eltern und Kind herstellen. Bündelt Kollegium und schafft Transparenz.',
    wannNicht: [
      'wenn das Problem klar auf ein Fach begrenzt ist → informelle Abstimmung im kleinen Kollegenkreis reicht',
      'inflationärer Einsatz entwertet das Gremium',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Hinweise aus mehreren Fächern systematisch einholen', beispielFormulierung: '„Beobachten Sie bei [Name] in Ihrem Fach Auffälligkeiten, die Sie für eine mögliche Klassenkonferenz relevant halten? Bitte notieren Sie kurz Beispiele und schon ergriffene Maßnahmen.“', material: 'Kurze Kollegiums-Anfrage' },
      { nummer: 2, wasTun: 'Formell bei Schulleitung beantragen', beispielFormulierung: '„Hiermit beantrage ich als Klassenleitung der 8c die Einberufung einer Klassenkonferenz, da es bei der Schülerin Y zu fächerübergreifenden Leistungsabfällen und Verhaltensauffälligkeiten kommt. Mehrere Kolleginnen und Kollegen haben Beobachtungen gemeldet. Ziel: gemeinsam Maßnahmen zur Unterstützung und Entlastung zu vereinbaren.“', material: 'Antrag, Geschäftsordnung' },
      { nummer: 3, wasTun: 'Konferenz strukturiert moderieren: Ausgangslage → Fachberichte → Hypothesen → konkrete Maßnahmen', beispielFormulierung: '„Ab kommender Woche: Sitzordnung in Mathe. Frau Y übernimmt Förderpatenschaft Deutsch. Gespräch mit Eltern und Schülerin in 14 Tagen.“', material: 'Protokoll-Vorlage' },
      { nummer: 4, wasTun: 'Beschlüsse mit Verantwortlichkeit und Frist protokollieren', beispielFormulierung: '„Wer macht was bis wann?“ Jede Maßnahme bekommt einen Verantwortlichen und ein Datum.', material: 'Protokoll' },
      { nummer: 5, wasTun: 'Ergebnisse Eltern (und altersgerecht dem Kind) kommunizieren', beispielFormulierung: '„Wir haben in der Klassenkonferenz ausführlich über die Situation gesprochen. Alle Lehrkräfte haben ihre Beobachtungen eingebracht. Gemeinsam vereinbart: …“', material: '–' },
    ],
    fallstricke: [
      'Reines Diagnosegremium ohne konkrete Maßnahmen und Verantwortlichkeiten',
      'Kind nur defizitär darstellen, keine Stärken benennen',
      'Eltern erst nachträglich kurz informieren, kein Raum für Rückfragen',
      'zu umfangreiches Maßnahmenpaket → unrealistisch; lieber 2–3 priorisierte Schritte',
      'als reines „Disziplinargremium“ erleben statt kollegialer Unterstützung',
    ],
    eskalation: 'Beschlüsse können weitere Maßnahmen vorbereiten: Ordnungsmaßnahmen, sonderpädagogisches Feststellungsverfahren, Einbindung Schulträger oder Jugendamt. Wenn trotz Beschlüssen und Überprüfung keine Verbesserung → externe fachliche oder rechtliche Hilfe.',
    schulformHinweis: 'In der Grundschule meist weniger formell; für Eltern kann „Klassenkonferenz“ abschreckend wirken – wenn die Schulregeln es zulassen, eher von „Lehrkräftetreffen“ oder „Gespräch im Kollegium“ sprechen und Unterstützungsfokus betonen.',
  },
  {
    id: 'b10',
    stufe: 'b',
    nummer: 10,
    titel: 'Nachteilsausgleich beantragen',
    trigger: 'Anerkannte LRS, ADHS, chronische Krankheit, Hör-/Sehbeeinträchtigung.',
    ziel: 'Rahmenbedingungen der Leistungserbringung an die Beeinträchtigung anpassen (z. B. mehr Zeit, Hilfsmittel, separater Raum) – ohne das fachliche Anforderungsniveau zu senken.',
    wannNicht: [
      'ohne anerkannte Diagnose („nur Schwierigkeiten“)',
      'nicht zur Kompensation schlechter Noten oder als „gerechtere“ Note',
      'nicht als alleinige Lösung – ergänzt Förderung, ersetzt sie nicht',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Möglichkeit eines Antrags ansprechen (mit Eltern, ggf. Kind)', beispielFormulierung: '„Aufgrund der Diagnostik zu Lenas LRS haben wir die Möglichkeit zu prüfen, ob ein Nachteilsausgleich beantragt werden sollte – z. B. mehr Arbeitszeit oder Vorlesen von Aufgaben, soweit nach den Regelungen unseres Bundeslandes erlaubt.“', material: 'Gutachten / Bescheinigung' },
      { nummer: 2, wasTun: 'Antragsverfahren der Schule erklären', beispielFormulierung: '„Damit ein Nachteilsausgleich gewährt werden kann, müssen wir einen Antrag stellen. Ich brauche von Ihnen aktuelle Gutachten. Ich bespreche mit Schulleitung und Förderkoordination, welche Maßnahmen möglich sind, und Sie bekommen schriftliche Rückmeldung.“', material: 'Antragsformular' },
      { nummer: 3, wasTun: 'Konkrete Formen vorschlagen – abhängig von Beeinträchtigung', beispielFormulierung: 'LRS: Zeitverlängerung (25–50 %), Aufgaben vorlesen. ADHS: 10 Min mehr Zeit, separater Raum, Pausen. Hör-/Seh: Hilfsmittel, größere Schrift, FM-Anlagen.', material: 'je nach Bedarf' },
      { nummer: 4, wasTun: 'Mit Schüler:in im Alltag besprechen – kein Bonus, sondern Ausgleich', beispielFormulierung: '„Es geht nicht darum, dass du bessere Noten als andere bekommst, sondern dass du unter Bedingungen arbeitest, die deine Schwierigkeiten berücksichtigen. Stell dir vor, jemand müsste mit verbundenen Augen eine Aufgabe lösen – da wäre es fair, ihm ein Hilfsmittel zu geben, damit er zeigen kann, was er kann.“', material: '–' },
      { nummer: 5, wasTun: 'Schulkonzept zitieren, um Konsistenz zu zeigen', beispielFormulierung: '„Unsere Schule hat ein festes Konzept zum Umgang mit LRS, in dem der Nachteilsausgleich beschrieben ist. Wir halten uns daran, damit alle Kinder in ähnlichen Situationen vergleichbar behandelt werden.“', material: 'Schulkonzept' },
      { nummer: 6, wasTun: 'In der Grundschule: still und ohne Aufheben umsetzen – Stigmatisierung vermeiden', beispielFormulierung: '–', material: '–' },
    ],
    fallstricke: [
      'In Klasse/Kollegium nicht erklären → andere Eltern/Mitschüler:innen empfinden Bevorzugung',
      'formell genehmigen, aber nicht in allen Fächern konsequent umsetzen → Ungerechtigkeit',
      'Nachteilsausgleich als Alleinlösung – er ersetzt keine Förderung und keine pädagogische Begleitung',
    ],
    eskalation: 'Wenn trotz gewährten Ausgleichs die Anforderungen des Bildungsgangs nicht erreichbar bleiben oder die Belastung zu groß ist → Bildungsgangwechsel, intensivere sonderpädagogische Unterstützung, therapeutische Maßnahmen prüfen. Wenn Schule den Ausgleich aus Sicht der Eltern unzureichend gewährt → Eltern auf Beschwerdewege und unabhängige Beratungsstellen (Schulberatung, Ombudsstellen) hinweisen.',
    schulformHinweis: 'Die Regelungen sind bundeslandspezifisch – Erlasse des eigenen Bundeslandes prüfen, Schulleitung/Förderkoordination beraten lassen.',
  },
  {
    id: 'b11',
    stufe: 'b',
    nummer: 11,
    titel: 'Schüler aktiv in Gespräch einbeziehen',
    trigger: 'Dreiergespräch Kind/Eltern/Lehrkraft – bei Verhalten, Lernzielen, Konfliktreflexion.',
    ziel: 'Das Kind nicht zum Objekt zwischen Erwachsenen machen, sondern als aktive Person an seiner schulischen Entwicklung beteiligen – Eigenverantwortung stärken, Transparenz schaffen.',
    wannNicht: [
      'bei Themen, die das Kind stark beschämen könnten (intim-familiäre Probleme, Hinweise auf Kindeswohlgefährdung)',
      'wenn Eltern voraussichtlich vor allem Vorwürfe ans Kind richten und die Lehrkraft den schützenden Rahmen nicht herstellen kann → erst getrennte Gespräche, dann ggf. Dreiergespräch',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Eltern und Kind vorab über die Gesprächsform informieren', beispielFormulierung: 'Eltern: „Beim nächsten Gespräch würde ich gerne, dass Ihr Kind dabei ist. Es geht um Themen, die es direkt betreffen – Arbeitsverhalten und Hausaufgabenorganisation.“ Kind: „Beim nächsten Mal bist du mit im Gespräch. Wir reden darüber, wie es dir in der Schule geht und was wir verbessern wollen.“', material: '–' },
      { nummer: 2, wasTun: 'Mit Einstimmung starten – alle werden gehört', beispielFormulierung: '„Ich freue mich, dass wir heute zu dritt zusammensitzen. Wir wollen gemeinsam überlegen, was dir helfen kann, in der Schule gut zurechtzukommen. Ich schlage vor: Zuerst hören wir, wie du selbst die Situation erlebst, dann deine Eltern, dann ich aus Sicht der Schule.“', material: '–' },
      { nummer: 3, wasTun: 'Kind zuerst zu Wort kommen lassen, offene Fragen stellen', beispielFormulierung: 'Grundschule: „Wie fühlst du dich in der Schule? Wo ist es besonders anstrengend?“ Sek I: „Wenn du auf die letzten Wochen schaust: Was lief gut? Was nicht?“ – wertschätzend zusammenfassen, ohne sofort zu korrigieren', material: '–' },
      { nummer: 4, wasTun: 'Eltern- und Lehrkraft-Sicht in Ich-Form, ohne Etiketten', beispielFormulierung: '„Ich erlebe dich im Unterricht häufig so, dass du am Anfang gut mitmachst, aber nach etwa zehn Minuten abschaltest und mit deinem Nachbarn sprichst. Das führt dazu, dass du Aufgaben verpasst und dann frustriert bist.“', material: '–' },
      { nummer: 5, wasTun: 'Gemeinsam 1–2 konkrete Ziele festlegen, Kind möglichst mitformulieren lassen', beispielFormulierung: '„Was wäre dir wichtig, was sich verändern soll?“ → „Ich melde mich im Unterricht mindestens einmal pro Stunde“ oder „Ich beginne nach den HA nicht sofort mit dem Handy, sondern prüfe zuerst, ob alles erledigt ist.“', material: 'Notiz, ggf. Mit-Unterschrift' },
    ],
    fallstricke: [
      'Kind ist anwesend, kommt aber kaum zu Wort → Botschaft: deine Meinung zählt nicht',
      'langer Problemkatalog am Anfang → beschämt, defensive Haltung',
      'Eltern nutzen das Gespräch für massive Vorwürfe → aktiv moderieren, Fokus zurückholen',
      'Kind unrealistische Versprechen abringen',
    ],
    eskalation: 'Wenn trotz wiederholter Dreiergespräche keine Veränderungen oder die Zusammenarbeit mit den Eltern stark belastet ist → Beratungslehrkraft, Schulsozialarbeit, Klassenkonferenz oder externe Beratungsstellen.',
    schulformHinweis: 'Grundschule – viel Raum fürs Kind, Lob und Anerkennung am Anfang, Gefühls-/Skalen-Karten zur Unterstützung. Sek I – stärker Selbstverantwortung, Zukunfts-Fragen („Welche Ziele hast du für die nächsten zwei Jahre?“). Bei Jugendlichen ggf. mit Einzelgesprächen kombinieren – geschützter Raum für Sensibles.',
  },
]

// ─── Stufe C — Externe Fachstellen ────────────────────────────────────────────

export const MASSNAHMEN_C: Massnahme[] = [
  {
    id: 'c01',
    stufe: 'c',
    nummer: 1,
    titel: 'Schulpsychologischer Dienst',
    trigger: 'Leistungsabfall mit emotionalem Hintergrund, Schulangst, schulbezogene Verhaltensauffälligkeiten.',
    ziel: 'Eltern für eine schulpsychologische Beratung gewinnen – fachliche diagnostische Einschätzung und passgenaue Unterstützung bei schulbezogenen Problemen, die mit pädagogischen Mitteln nicht mehr ausreichend bearbeitbar sind.',
    wannNicht: [
      'wenn primär familiäre Konflikte oder Kindeswohl-Verdacht im Vordergrund stehen → Erziehungsberatung bzw. Jugendamt sind dann erste Adresse',
      'wenn ausschließlich medizinische Fragen → Kinderarzt',
      'nicht als Sanktion einsetzen („Wenn Sie nichts tun, müssen wir den Schulpsychologen einschalten“)',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Beobachtungen sachlich vorbereiten – Zeitraum, Häufigkeit, bereits erprobte Maßnahmen', beispielFormulierung: '„Mir ist in den letzten acht Wochen aufgefallen, dass Leon im Unterricht deutlich stiller geworden ist, häufiger fehlt und Klassenarbeiten stark schwächer ausfallen. Wir haben Sitznachbarn gewechselt und Erklärzeiten angeboten, aber die Situation hat sich nicht stabilisiert.“', material: 'Verlaufsprotokoll (geschützt)' },
      { nummer: 2, wasTun: 'Emotionale Ebene benennen und entlasten', beispielFormulierung: '„Ich kann nachvollziehen, dass das für Sie sehr belastend ist. Es ist völlig legitim und sinnvoll, sich in so einer Situation fachliche Unterstützung zu holen. Der Schulpsychologische Dienst ist genau dafür da.“', material: 'Info-Blatt der Schule / des SPD' },
      { nummer: 3, wasTun: 'Schulpsychologischen Dienst konkret vorstellen – kostenlos, vertraulich, freiwillig', beispielFormulierung: '„Der Schulpsychologische Dienst ist eine Beratungsstelle des Landes. Spezialisierte Psychologinnen kennen sich mit Lern- und Leistungsproblemen, Schulangst und Konflikten in der Schule aus. Die Beratung ist kostenlos, vertraulich und erfolgt nur, wenn Sie zustimmen.“', material: 'Kontaktdaten der zuständigen Stelle' },
      { nummer: 4, wasTun: 'Als gemeinsame Suchbewegung rahmen – kein „Weiterreichen“', beispielFormulierung: '„Ich möchte, dass wir gemeinsam schauen, wie wir Leon unterstützen können. Aus meiner Sicht wäre jetzt ein sinnvoller Schritt, zusätzlich einen Termin beim Schulpsychologischen Dienst zu vereinbaren. Ich bleibe Ihre Ansprechpartnerin in der Schule.“', material: 'Vermerk im Beratungsprotokoll' },
      { nummer: 5, wasTun: 'Konkrete Schritte zur Kontaktaufnahme – gemeinsam erste Mail entwerfen', beispielFormulierung: '„Wenn Sie möchten, formulieren wir hier gleich eine kurze Anfrage: ‚Guten Tag, wir sind die Eltern von Leon X aus 6b der Muster-Realschule. Auf Empfehlung der Klassenlehrerin möchten wir einen Beratungstermin vereinbaren, weil unser Sohn seit einigen Wochen starke Schwierigkeiten in der Schule hat.\'"', material: 'Vorgedrucktes Kärtchen für Eltern' },
      { nummer: 6, wasTun: 'Vertraulichkeit und Informationsfluss transparent machen', beispielFormulierung: '„Die Gespräche sind vertraulich. Wenn es sinnvoll ist, dass bestimmte Empfehlungen an die Schule zurückgemeldet werden, brauchen Sie dafür ein eigenes Einverständnis. Sie bestimmen mit, was weitergegeben wird.“', material: 'Schweigepflichtentbindung' },
      { nummer: 7, wasTun: 'Follow-up vereinbaren (ca. 6 Wochen)', beispielFormulierung: '„Damit wir den Faden nicht verlieren, würde ich gerne in etwa sechs Wochen mit Ihnen sprechen, ob Sie einen Termin bekommen konnten und Rückmeldungen erhalten haben.“', material: 'Kalender-Eintrag' },
    ],
    fallstricke: [
      'Erst bei massiver Eskalation einschalten → polarisierte Beteiligte, unrealistische Erwartungen',
      'drohende/stigmatisierende Formulierungen („Das ist jetzt der letzte Weg“)',
      'SPD auf „Gutachter“ reduzieren („Damit Sie die Diagnose für die Klassenwiederholung haben“) – verkennt den Beratungsauftrag',
    ],
    eskalation: 'Wenn trotz Empfehlung keine Kontaktaufnahme erfolgt und sich die Lage verschlechtert (Schulvermeidung, psychosomatische Beschwerden, psychische Krise) → weitere Fachstellen prüfen (Kinder- und Jugendpsychiatrie, Jugendamt). Bei Hinweisen auf Kindeswohlgefährdung oder behandlungsbedürftige Störungen → Eskalation über Schulleitung, Beratungslehrkraft oder schulisches Krisenteam.',
    schulformHinweis: 'Grundschule – bei Bedarf beim Erstkontakt telefonisch unterstützen, Eltern beim Formulieren der Anfrage helfen. Sek I – Jugendliche aktiv einbeziehen, Autonomie betonen („Du kannst dort ganz in Ruhe erzählen, wie sich Schule für dich anfühlt“).',
    strukturHinweis: 'Der SPD ist meist Schulämtern, Bezirksregierungen oder Landesinstituten zugeordnet, Zuständigkeit nach Schulamtsbezirken oder Regionen – an der eigenen Schule erfragen, welche Stelle regional zuständig ist und welche Anmeldewege es gibt (Telefon, Online, über Schulleitung).',
  },
  {
    id: 'c02',
    stufe: 'c',
    nummer: 2,
    titel: 'Erziehungsberatungsstelle',
    trigger: 'Familiäre Konflikte, Trennung/Scheidung, Erziehungsfragen, Eltern fühlen sich überfordert.',
    ziel: 'Eltern den Weg zu professioneller Unterstützung bei familiären Themen öffnen – kostenlos, freiwillig, vertraulich. Geht über die Zuständigkeit der Schule hinaus, berücksichtigt aber schulische Themen mit.',
    wannNicht: [
      'bei unmittelbarem Verdacht auf Kindeswohlgefährdung (Gewalt, Vernachlässigung, sexualisierte Übergriffe) → § 8a SGB VIII greift, Jugendamt direkte Ansprechstelle',
      'nie als Auflage formulieren („Sie müssen jetzt zur Erziehungsberatung, sonst …“)',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Familiäre Belastung behutsam ansprechen – nicht vorwurfsvoll', beispielFormulierung: '„Im Unterricht merke ich, dass Lara in letzter Zeit oft sehr angespannt wirkt. In unseren Gesprächen klang an, dass es bei Ihnen zu Hause gerade nicht einfach ist, auch wegen der Trennungssituation. Ich würde das gerne besser verstehen, soweit Sie erzählen möchten.“', material: 'Notizen aus früheren Gesprächen' },
      { nummer: 2, wasTun: 'Erziehungsberatung als niedrigschwellige Entlastung darstellen', beispielFormulierung: '„Es gibt in unserer Stadt eine Erziehungsberatungsstelle, in der Fachleute arbeiten, die sich genau mit solchen Situationen auskennen: Trennung, Streit um Regeln, unterschiedliche Erziehungsvorstellungen. Die Beratung ist kostenlos und vertraulich. Viele Eltern nutzen das ganz selbstverständlich, wenn sie merken, dass sie allein nicht weiterkommen.“', material: 'Übersicht regionaler Beratungsstellen' },
      { nummer: 3, wasTun: 'Bezug zur Schule klar machen', beispielFormulierung: '„Ich erlebe, dass sich die Spannungen, die Sie zu Hause beschrieben haben, auch in der Schule bemerkbar machen – Jonas ist oft müde, kann sich schlecht konzentrieren. Wenn Sie sich in der Erziehungsberatung Unterstützung holen, kann sich das positiv auf seinen Schulalltag auswirken.“', material: 'Kurzes Gesprächsprotokoll' },
      { nummer: 4, wasTun: 'Freiwilligkeit und Autonomie betonen', beispielFormulierung: '„Das ist ein Angebot, das Sie nutzen können, wenn es für Sie passt. Sie entscheiden, was Sie dort erzählen möchten. Mir ist wichtig, dass Sie wissen, dass es diese Möglichkeit gibt.“', material: '–' },
      { nummer: 5, wasTun: 'Adresse und erste Kontaktformulierung gemeinsam vorbereiten', beispielFormulierung: '„Die Beratungsstelle heißt ‚Familienberatung Mitte\', erreichbar unter … Wenn Sie möchten, formulieren wir jetzt eine kurze Mail: ‚Guten Tag, wir sind die Eltern von Lara X. Wir erleben seit einiger Zeit viele Konflikte und merken, dass unsere Tochter darunter leidet. Unsere Lehrerin hat uns empfohlen, einen Beratungstermin zu vereinbaren.\'"', material: 'Vordruck mit Kind- und Elternkontaktdaten' },
      { nummer: 6, wasTun: 'Eigene Rolle klar begrenzen', beispielFormulierung: '„Ich kann Sie im schulischen Rahmen begleiten. Eine umfassende Beratung zur Trennung kann und darf ich aber nicht leisten – dafür sind die Kolleginnen der Erziehungsberatung ausgebildet.“', material: '–' },
      { nummer: 7, wasTun: 'Schnittstelle Schule ↔ Beratung transparent klären', beispielFormulierung: '„Es ist möglich, dass die Erziehungsberatung – nur mit Ihrem Einverständnis – mit mir Kontakt aufnimmt. Wenn Sie das möchten, müssten Sie dort Ihr Einverständnis geben. Wir würden konkret klären, welche Informationen hilfreich sind und was vertraulich bleibt.“', material: 'Schweigepflichtentbindung' },
    ],
    fallstricke: [
      'Im „Genervt-Sein“ spontan empfehlen („Ich glaube, Sie sollten mal zur Erziehungsberatung gehen“) → wirkt wie Kritik an Elternkompetenz',
      'als Vorstufe zum Jugendamt darstellen → instrumentalisiert die Beratungsstelle',
      'Eindruck erwecken, Schule würde über Teilnahme informiert – Erziehungsberatung ist freiwillig und vertraulich',
    ],
    eskalation: 'Wenn familiäre Konflikte sich trotz Beratungsangebot verschärfen und Anzeichen für Kindeswohlgefährdung sichtbar werden → Jugendamt-Meldung prüfen. Wenn Eltern dringend notwendige Beratung wiederholt verweigern und das Kind im Alltag schwer beeinträchtigt ist → Eskalation über Schulsozialarbeit, Beratungslehrkraft, Schulpsychologie.',
    schulformHinweis: 'Grundschule – als „Begleitung für die ganze Familie“ rahmen. Sek I – Jugendliche selbst einbeziehen, gemeinsame Beratung anbieten („ein bis zwei Gespräche, in denen ihr in Ruhe schauen könnt, wie ihr besser miteinander klarkommt“).',
    strukturHinweis: 'Erziehungsberatung wird überwiegend von freien Trägern (Wohlfahrtsverbände, kirchliche Träger) oder Kommunen betrieben. In manchen Ländern auch „Familienberatungsstellen“ oder „Pädagogisch-psychologische Beratungsstellen“. Kostenfrei, niedrigschwellig, direkter Zugang ohne formellen Antrag.',
  },
  {
    id: 'c03',
    stufe: 'c',
    nummer: 3,
    titel: 'Kinderarzt / Hausarzt',
    trigger: 'Mögliche körperliche oder neurologische Ursachen, ADHS-Verdacht, Seh-/Hörprobleme, Schlafstörungen.',
    ziel: 'Eltern anregen, mit dem Kind die Kinderärztin / den Hausarzt aufzusuchen, um körperliche oder entwicklungsneurologische Ursachen abzuklären.',
    wannNicht: [
      'wenn primär psychosoziale Belastungen vorliegen, ohne Hinweise auf körperliche Ursachen → Eltern könnten sich missverstanden fühlen, Eindruck der „Somatisierung“',
      'nie als Lehrkraft selbst Diagnosen formulieren oder Therapien (Medikamente) empfehlen',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Beobachtungen beschreibend, nicht diagnostisch', beispielFormulierung: '„Mir ist aufgefallen, dass Samira sehr häufig die Augen zusammenkneift, wenn sie an die Tafel schaut, und sagt, sie könne die Schrift schlecht erkennen. Außerdem wirkt sie oft müde und legt den Kopf auf den Tisch.“', material: 'Beobachtungsprotokoll (Eltern können es mitnehmen)' },
      { nummer: 2, wasTun: 'Arztbesuch als Abklärung rahmen, nicht als Problemzuschreibung', beispielFormulierung: '„Ich möchte Sie bitten, das bei Gelegenheit mit Ihrer Kinderärztin zu besprechen – vielleicht steckt eine Sehschwäche oder etwas anderes Körperliches dahinter. Wenn sich nichts zeigt, wissen wir zumindest, dass wir an anderer Stelle schauen müssen.“', material: 'Schulisches Info-Blatt' },
      { nummer: 3, wasTun: 'Bei ADHS-Verdacht behutsam ansprechen – als Möglichkeit, nicht als Diagnose', beispielFormulierung: '„Ihr Sohn fällt mir durch starke motorische Unruhe auf. Er wechselt häufig die Position, hat große Schwierigkeiten, mehrere Minuten bei einer Aufgabe zu bleiben, selbst wenn er sich Mühe gibt. Diese Auffälligkeiten zeigen sich in verschiedenen Situationen. Es könnte sinnvoll sein, mit Ihrer Kinderärztin zu besprechen, ob eine Aufmerksamkeits- oder Aktivitätsstörung vorliegen könnte. Das kann sie deutlich besser einschätzen als ich.“', material: 'Standardisierte Beobachtungsbögen – nur auf Anfrage einsetzen' },
      { nummer: 4, wasTun: 'Zusammenarbeit mit Ärzten klar begrenzen', beispielFormulierung: '„Ich kann berichten, wie sich Ihr Kind im Unterricht verhält. Die Entscheidung, ob Diagnostik notwendig ist und ob eine medikamentöse Behandlung in Frage kommt, liegt ausschließlich bei Ihrer Ärztin. Gerne verfasse ich einen kurzen pädagogischen Bericht, wenn Sie das wünschen.“', material: 'Muster-Vorlage pädagogischer Bericht' },
      { nummer: 5, wasTun: 'Einverständnis für Informationsaustausch klären – Schweigepflichtentbindung', beispielFormulierung: '„Manchmal ist es hilfreich, wenn Ärztin und Schule sich austauschen. Das ist nur möglich, wenn Sie Ihr Einverständnis geben. Ohne Ihre Zustimmung geben wir keine Informationen weiter.“', material: 'Formular Schweigepflichtentbindung' },
      { nummer: 6, wasTun: 'Fragen für den Arzttermin formulieren helfen', beispielFormulierung: '„Sie könnten Ihre Kinderärztin z. B. fragen: ‚Wir haben Rückmeldungen zu Konzentration und Unruhe in der Schule bekommen. Können diese Auffälligkeiten eine körperliche oder neurologische Ursache haben? Gibt es Untersuchungen, die Sie empfehlen würden?\'"', material: 'Notizzettel für Eltern' },
      { nummer: 7, wasTun: 'Rückkehr der Infos in den schulischen Kontext gestalten', beispielFormulierung: '„Wenn Sie möchten, geben Sie mir nach dem Termin kurz Rückmeldung. Sie teilen nur das mit, was Sie teilen möchten. Diagnose-Infos behandle ich vertraulich und gebe sie nur an direkt arbeitende Kolleg:innen weiter.“', material: 'Vermerk im Beratungsprotokoll' },
    ],
    fallstricke: [
      'Medizinische Begriffe als gesichert nutzen („Ihr Sohn ist hyperaktiv“, „Ihre Tochter hat eine Depression“) → stigmatisiert',
      'Verantwortung auf die Diagnose schieben („Ohne Medikamente können wir ihn kaum beschulen“)',
      'Druck auf Eltern ausüben, bestimmte Therapien oder Medikamente zu akzeptieren',
    ],
    eskalation: 'Wenn trotz deutlicher Hinweise auf schwerwiegende gesundheitliche oder psychische Probleme keine Abklärung erfolgt und das Kind gefährdet scheint (Essstörung, Suizidäußerungen, Selbstverletzungen, abrupte massive Verhaltensänderung) → Schulpsychologie und Kinder- und Jugendpsychiatrie einbinden. Bei akuter Gefährdung Notruf / Jugendamt – auch ohne Einverständnis der Eltern.',
    schulformHinweis: 'Grundschule – gut in Bezug auf Entwicklungsaufgaben einbetten (Sehtest, Hörtest, motorische Entwicklung); bei ADHS-Verdacht entlastende Formulierungen („manche Kinder spüren ihren Motor stärker, Fachleute entscheiden, was das bedeutet“). Sek I – Jugendliche einbeziehen, ihre Perspektive ernstnehmen.',
    strukturHinweis: 'Niedergelassene Kinder- und Jugendärzte, organisiert über Kassenärztliche Vereinigungen – bundesweit ähnlich, regional unterschiedliche Versorgungsdichte. Bei ADHS und entwicklungsneurologischen Fragen zusätzlich sozialpädiatrische Zentren oder Kinder- und Jugendpsychiatrien.',
  },
  {
    id: 'c04',
    stufe: 'c',
    nummer: 4,
    titel: 'Kinder- und Jugendpsychiatrische Beratung (KJP)',
    trigger: 'Anhaltende oder schwere psychische Symptome – Depression, Angst, Zwang, Essstörung, Selbstverletzung, suizidale Äußerungen, psychotische Symptome.',
    ziel: 'Eltern bei deutlichen psychischen Symptomen zu einer fachärztlichen kinder- und jugendpsychiatrischen Einschätzung motivieren – qualifizierte Diagnose, Behandlung, gleichzeitige Entlastung der schulischen Situation.',
    wannNicht: [
      'bei milden, situationsgebundenen Reaktionen auf belastende Ereignisse (z. B. kurzfristige Traurigkeit nach Umzug) – erst schulische und niedrigschwellige Angebote (Schulsozialarbeit, SPD, Erziehungsberatung)',
      'nie als Drohmittel oder mit der Botschaft „schwer krank“',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Psychische Symptome sorgfältig und konkret beschreiben – keine vorschnellen Diagnosen', beispielFormulierung: '„In den letzten Monaten erlebe ich Ihre Tochter sehr verändert. Sie wirkt häufig niedergeschlagen, zieht sich zurück, beteiligt sich kaum am Unterricht und hat in einer Pause gesagt, dass ‚alles keinen Sinn mehr\' mache. Auch ihre Leistungen sind eingebrochen und sie wirkt sehr erschöpft."', material: 'Vertrauliche Beobachtungsnotizen' },
      { nummer: 2, wasTun: 'Ernsthaftigkeit einordnen – ohne Panik', beispielFormulierung: '„Aus meiner Sicht sind das Anzeichen, die wir ernst nehmen sollten. Jeder Mensch hat mal eine schwierigere Phase, aber die Häufung und Dauer der Veränderungen sprechen dafür, dass wir genauer hinschauen sollten.“', material: 'Schulinterne Leitlinien' },
      { nummer: 3, wasTun: 'KJP als Fachstelle erklären, Angst nehmen', beispielFormulierung: '„In der Kinder- und Jugendpsychiatrie arbeiten Ärztinnen, Psycholog:innen, die sich mit psychischen Problemen bei Kindern und Jugendlichen auskennen. Sie klären, ob eine behandlungsbedürftige Störung vorliegt und welche Unterstützung sinnvoll ist — Beratung, Therapie, manchmal stationäre Behandlung. Es geht nicht darum, Ihr Kind ‚wegzuschicken\', sondern gezielt zu helfen."', material: 'Info-Flyer der regionalen KJP' },
      { nummer: 4, wasTun: 'Suizidale Äußerungen klar und ohne Beschönigung ansprechen', beispielFormulierung: '„Ihre Tochter hat mir gegenüber gesagt, dass sie manchmal denkt, es wäre besser, nicht mehr zu leben. Solche Aussagen nehmen wir sehr ernst. Ich bin verpflichtet, Sie zu informieren, weil es ein Hinweis auf mögliche Suizidgefahr ist. Unsere Unterstützung in der Schule reicht hier nicht aus – es braucht unbedingt eine fachärztliche Abklärung.“', material: 'Schulinterner Notfallplan Suizidgefahr' },
      { nummer: 5, wasTun: 'Dringlichkeit und konkrete Schritte besprechen', beispielFormulierung: '„Ich empfehle Ihnen dringend, zeitnah einen Termin bei einer KJP-Praxis oder Institutsambulanz zu vereinbaren. Wenn Sie niemanden erreichen oder nur sehr langfristige Termine bekommen, wenden Sie sich an den kinderärztlichen Notdienst oder rufen direkt die Ambulanz der KJP an. Bei akuter Gefahr rufen Sie sofort den Notruf.“', material: 'Regionale Liste KJP-Praxen und -Kliniken' },
      { nummer: 6, wasTun: 'Zusammenarbeit und Rollen klären', beispielFormulierung: '„Wir können in der Schule entlasten – Gespräche, Nachteilsausgleich, flexible Leistungsnachweise. Diagnostik und Behandlung liegen bei der KJP. Mit Ihrer Zustimmung können wir uns mit den Behandelnden austauschen, wie wir den Schulalltag anpassen.“', material: 'Dokumentation schulischer Maßnahmen' },
      { nummer: 7, wasTun: 'Umgang mit Ängsten / Vorurteilen – ernst nehmen, ohne abzurücken', beispielFormulierung: '„Ich weiß, das Wort ‚Psychiatrie\' löst bei vielen Menschen Angst aus. Gleichzeitig sind das heute hochspezialisierte Einrichtungen, in denen sehr professionell geholfen wird. Es geht nicht darum, Ihr Kind zu ‚labeln\', sondern um die Unterstützung, die es braucht. Es ist Zeichen von Verantwortung, nicht von Versagen."', material: 'Erfahrungsberichte, Aufklärungsmaterial' },
    ],
    fallstricke: [
      'Suizidäußerungen oder massive Symptome relativieren („Das sind nur Pubertätsschwankungen“)',
      'zu vorsichtig formulieren – Dringlichkeit wird nicht erkannt',
      'andererseits Panik erzeugen („Wenn Sie jetzt nichts tun, passiert Schlimmes“)',
      'therapeutische Gespräche führen, die über die Lehrer-Rolle hinausgehen → überfordert Lehrkraft, bringt Kind in nicht haltbare Bindungssituation',
    ],
    eskalation: 'Bei akuter Suizidgefahr (konkrete Pläne, Vorbereitungen, kürzliche Selbstverletzung mit Absicht) → sofort Krisendienste / Notarzt / KJP-Notaufnahme – Empfehlung allein reicht nicht. Bei anhaltenden schweren Symptomen trotz laufender Behandlung → enge Abstimmung mit Behandelnden, ggf. Wechsel der Einrichtung. Wenn Eltern fachärztliche Hilfe trotz massiver Hinweise verweigern und Kindeswohl gefährdet ist → Jugendamt-Meldung prüfen.',
    schulformHinweis: 'Grundschule – KJP-Empfehlungen seltener, vor allem bei schweren Essstörungen, massiver Schulverweigerung, Angststörungen, Entwicklungsstörungen. Sek I – häufiger; auch mit Jugendlichen selbst sprechen (falls keine Akutgefährdung). Berufsschule: viele Schüler:innen volljährig → eigene Einwilligung zentral.',
    strukturHinweis: 'Praxen niedergelassener Fachärzt:innen, Kliniken, Tageskliniken, Institutsambulanzen. Regional unterschiedliche Versorgungsdichte, oft lange Wartezeiten. In vielen Ländern Krisendienste für akute Krisen – schulintern Übersicht pflegen.',
  },
  {
    id: 'c05',
    stufe: 'c',
    nummer: 5,
    titel: 'Jugendamt / Allgemeiner Sozialer Dienst (ASD)',
    trigger: 'Konkrete Hinweise auf Kindeswohlgefährdung – oder freiwillige Hilfen zur Erziehung bei massiver Überforderung.',
    ziel: 'Bei gravierenden Anzeichen einer Kindeswohlgefährdung rechtssicher und professionsangemessen handeln (§ 8a SGB VIII). Bei freiwilliger Inanspruchnahme: Eltern auf Hilfen zur Erziehung hinweisen.',
    wannNicht: [
      'als Druckmittel im Konflikt mit Eltern („Wenn Sie nicht kooperieren, muss ich das Jugendamt einschalten“) – beschädigt Vertrauen, belastet das Kind zusätzlich',
      'nicht weil Eltern Erziehungsvorstellungen haben, die nicht mit der Lehrkraft übereinstimmen, solange das Kindeswohl nicht verletzt ist',
    ],
    bausteine: [
      { nummer: 1, wasTun: 'Anzeichen systematisch dokumentieren – Datum, Beobachtung, Worte des Kindes, sichtbare Verletzungen, Verhalten. Zwischen Vermutung und Fakt unterscheiden', beispielFormulierung: '„12.03.: Schülerin X berichtet im Gespräch: ‚Papa war gestern wieder sehr laut und hat Sachen durch die Wohnung geworfen.\' Sichtbar: blaue Flecken am rechten Oberarm; auf Nachfrage: ‚Treppe runtergefallen\'. Stimmung: ängstlich, zurückhaltend."', material: 'Geschütztes Dokumentationssystem, schulinterner Kinderschutz-Leitfaden' },
      { nummer: 2, wasTun: 'Interne Beratung VOR Elterngespräch – Schulleitung, Beratungslehrkraft, Schulsozialarbeit, Kinderschutzbeauftragte', beispielFormulierung: '„Ich habe seit einigen Wochen bei Max Anzeichen, die mich an eine mögliche Gefährdung denken lassen. Ich möchte das mit Ihnen besprechen und prüfen, welche nächsten Schritte im Rahmen unseres § 8a-Verfahrens sinnvoll sind.“', material: 'Schulinterner Ablaufplan Kinderschutz' },
      { nummer: 3, wasTun: 'Transparenter Dialog mit Eltern – nur, wenn der Schutz des Kindes dadurch nicht zusätzlich gefährdet wird', beispielFormulierung: '„Uns sind in den letzten Wochen Dinge aufgefallen, die uns Sorgen um das Wohl Ihres Kindes machen – die wiederholten blauen Flecken, die starke Müdigkeit, Aussagen Ihres Kindes über lautes Geschrei zu Hause. Ich möchte mit Ihnen besprechen, wie es Ihrem Kind insgesamt geht und welche Unterstützung es gibt.“', material: 'Gesprächsleitfaden Kinderschutzgespräche' },
      { nummer: 4, wasTun: 'Jugendamt als Unterstützungsstelle erklären – nicht „Strafbehörde“', beispielFormulierung: '„Das Jugendamt hat den gesetzlichen Auftrag, Kinder zu schützen und Familien zu unterstützen. Es kann gemeinsam mit Ihnen schauen, welche Hilfen Sie entlasten können — Familienhilfe, Erziehungsberatung, andere Angebote. Ziel ist nicht, Ihnen etwas ‚wegzunehmen\', sondern dafür zu sorgen, dass es Ihrem Kind gut geht."', material: 'Info-Blatt Jugendhilfe / Hilfen zur Erziehung' },
      { nummer: 5, wasTun: 'Bei geplanter Meldung: Eltern transparent informieren (sofern Kind dadurch nicht gefährdet)', beispielFormulierung: '„Aufgrund der Beobachtungen und Gespräche sind wir als Schule zu der Einschätzung gekommen, dass wir unsere Sorge an das Jugendamt weitergeben müssen. Wir sind dazu gesetzlich verpflichtet, wenn gewichtige Anhaltspunkte für eine Gefährdung vorliegen. Das Jugendamt wird mit Ihnen Kontakt aufnehmen.“', material: 'Schulinternes Meldeformular' },
      { nummer: 6, wasTun: 'Rolle der einzelnen Lehrkraft klar verorten – über Schulleitung, nicht allein', beispielFormulierung: '„Ich möchte die Schulleitung informieren, weil ich die Verantwortung für die Meldung nicht allein tragen kann und dies meiner Rolle als Einzel-Lehrkraft nicht entspricht. Unser Schulkonzept sieht vor, dass solche Schritte über die Schulleitung koordiniert werden.“', material: 'Schulkonzept Kinderschutz, Landeserlass' },
      { nummer: 7, wasTun: 'Dokumentation und Nachverfolgung nach der Meldung', beispielFormulierung: '„25.04.: § 8a-Meldung an ASD. Inhalt: Sorge um körperliche Unversehrtheit und Vernachlässigung. Rückmeldung Jugendamt am 28.04.: Hausbesuch erfolgt, Hilfeplanung in Arbeit. Vereinbarung: Schule wird über relevante Ergebnisse informiert.“', material: 'Geschützter Dokumentationsordner' },
    ],
    fallstricke: [
      '„Wegschauen“ aus Unsicherheit oder Angst vor Konflikten mit Eltern → klar erkennbare Anzeichen werden nicht zeitnah gemeldet',
      'allein handeln, ohne Schulleitung/Beratung/Schulsozialarbeit',
      'dramatisieren oder Eltern mit Drohungen unter Druck setzen',
      'absolute Vertraulichkeit versprechen – bei Kindeswohlgefährdung darf das nicht zugesichert werden',
    ],
    eskalation: 'Sofortige Meldung bei konkreten gewichtigen Anhaltspunkten für erhebliche Kindeswohlgefährdung – Verdacht auf sexuelle Gewalt, wiederholte schwere körperliche Misshandlung, massive häusliche Gewalt, gravierende Vernachlässigung, akute Selbstgefährdung im familiären Kontext. Parallel ggf. Polizei / Rettungsdienste, wenn akute Gefahr im Verzug. Bei laufenden Hilfen, die nicht ausreichen → erneute Fallbesprechung mit ASD über die Schulleitung.',
    schulformHinweis: 'Grundschule – Anzeichen besonders ernst nehmen (Vernachlässigung, häusliche Gewalt, Überforderung); achtsam auf körperliche Hinweise, Versorgung, Grundstimmung. Sek I + Berufsschule – zusätzlich Alkohol/Drogen, sexuelle Ausbeutung, digitale Gewalt, schwere psychische Erkrankungen; Jugendliche werden vom Jugendamt stärker in Entscheidungen einbezogen; an Berufsschule auch Hilfen zur Verselbständigung.',
    strukturHinweis: 'Das Jugendamt ist eine kommunale Behörde, Aufgaben geregelt im SGB VIII. Innerhalb des Jugendamtes übernimmt der ASD typischerweise die Einzelfallhilfe und Reaktion auf Gefährdungsmeldungen. Bundeslandspezifische Unterschiede in Organisation, Bezeichnungen und § 8a-Verfahren – Landeserlasse beachten. Schulleitung in vielen Ländern zentrale offizielle Ansprechpartnerin gegenüber dem Jugendamt.',
  },
]

// ─── Kombiniert + Hilfsfunktion ───────────────────────────────────────────────

export const ALLE_MASSNAHMEN: Massnahme[] = [
  ...MASSNAHMEN_A,
  ...MASSNAHMEN_B,
  ...MASSNAHMEN_C,
]

export function getMassnahmeById(id: string): Massnahme | undefined {
  return ALLE_MASSNAHMEN.find(m => m.id === id)
}
