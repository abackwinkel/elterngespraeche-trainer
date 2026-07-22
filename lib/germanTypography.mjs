// german_typography.mjs — SSOT für deutsche Typografie in User-sichtbarem Text.
//
// Herkunft: erprobter Kern aus ManuskriptKompass (kompass/src/lib/textSanitizer.js,
// prod-getestet), erweitert um Apostroph-, Ellipsen- und NBSP-vor-Gedankenstrich-Regeln.
// Alle Sonderzeichen als \u-Escapes — sicher bei jedem File-Encoding/Bundler.
//
// Nutzung als Modul:   import { sanitizeGermanText, sanitizeGermanTextSafe,
//                               sanitizeJsonDeep, repairGermanQuotedJson,
//                               RECHTSCHREIB_REGEL, RECHTSCHREIB_REGEL_JSON,
//                               TYPOGRAFIE_REGEL } from './german_typography.mjs';
// Nutzung als CLI:     node german_typography.mjs --test
//                      node german_typography.mjs --check datei.md ...
//                      node german_typography.mjs --fix datei.md ...
//                      node german_typography.mjs < in.txt > out.txt
//
// WICHTIG (JSON-Sicherheit): sanitizeGermanText NIEMALS auf rohe JSON-Strings,
// Quellcode oder Original-Manuskripttexte anwenden, die für String-Matching
// gebraucht werden. Für JSON: erst parsen, dann sanitizeJsonDeep (nur Werte).
// Für Markdown/Fließtext mit Codeblöcken: sanitizeGermanTextSafe.

// ── Unicode-Konstanten ────────────────────────────────────────────────────────
export const EN   = '–'; // – Halbgeviertstrich (Gedankenstrich, Ziel)
export const EM   = '—'; // — Geviertstrich (im Deutschen falsch)
export const ELL  = '…'; // … Auslassungspunkte (EIN Zeichen)
export const NBSP = ' '; // geschütztes Leerzeichen
const DLO  = '„'; // „ dt. öffnendes doppeltes AZ
const DCL  = '“'; // “ dt. schließendes doppeltes AZ / engl. öffnend
const DRC  = '”'; // ” engl. schließendes doppeltes AZ
const SLO  = '‚'; // ‚ dt. öffnendes einfaches AZ
const SCL  = '‘'; // ‘ dt. schließendes einfaches AZ / engl. öffnend
const APO  = '’'; // ’ Apostroph / engl. schließendes einfaches AZ
const LETTER = 'A-Za-z0-9ÄÖÜäöüß';

// ── Anführungszeichen (kontextsensitiv, idempotent) — Kompass-Kern ────────────
export function normalizeGermanQuotes(input) {
  if (input == null) return input;
  let s = String(input);

  const OPEN_CTX = '(^|[\\s(\\[{' + EN + DLO + SLO + '])';

  // 1) Geviertstrich -> Halbgeviertstrich; gespreizter Bindestrich -> Gedankenstrich
  s = s.replace(/—/g, EN);
  s = s.replace(/(\S) -(?= )/g, '$1 ' + EN);
  s = s.replace(/(\s)-(?=\s)/g, '$1' + EN);

  // 2) Curly quotes kontextsensitiv -> deutsche Form („…“ und ‚…‘); korrektes
  //    Deutsch bleibt unverändert, englische Paare werden überführt.
  s = s.split(DRC).join(DCL);
  s = s.replace(new RegExp(OPEN_CTX + DCL, 'g'), '$1' + DLO);
  s = s.replace(new RegExp(OPEN_CTX + SCL, 'g'), '$1' + SLO);
  //    Apostroph zwischen Buchstaben (geht’s) bleibt; sonst wird ’ Schluss-AZ.
  //    AUSNAHME: Nach s/ß/x/z am Wortende ist ’ der Duden-Genitiv (D 16,
  //    „Grass’ Blechtrommel“) und KEIN schliessendes Zitatzeichen. Ohne diese
  //    Ausnahme macht diese Zeile aus einem korrekten Apostroph ein ‘.
  s = s.replace(new RegExp('(^|[^sßxzSXZ])' + APO + '(?![' + LETTER + '])', 'g'), '$1' + SCL);

  // 3) LLM-Fehler: zwei öffnende AZ statt öffnend+schließend.
  //    Das gerade " ist in der Zeichenklasse AUSGESCHLOSSEN (Befund 22.07.2026):
  //    Bei zwei Mischpaaren in einem String („A?" oder „B?") liegt zwischen den
  //    beiden „ ein gerades " — das ist der Schluss des ERSTEN Paares, nicht der
  //    Inhalt eines offenen. Ohne den Ausschluss frisst sich diese Regel darüber
  //    hinweg und macht aus dem zweiten öffnenden „ ein englisches “.
  //    Die Mischpaare erledigt danach Regel 3b einzeln und korrekt.
  s = s.replace(
    new RegExp(DLO + '([^' + DLO + DCL + '"\\n]{1,400})' + DLO, 'g'),
    DLO + '$1' + DCL
  );

  // 3b) Mischpaar: deutsches öffnendes AZ mit geradem ASCII-Schluss („Wort") -> „Wort“.
  //     Lookahead auf Nicht-Buchstabe, damit ein INNERES ASCII-Paar („Er sagte "x" …)
  //     nicht fälschlich als Schluss gegriffen wird.
  s = s.replace(
    new RegExp(DLO + '([^' + DLO + DCL + '"\\n]{1,400})"(?![' + LETTER + '])', 'g'),
    DLO + '$1' + DCL
  );

  // 4) Gerade ASCII-Doppel-AZ -> deutsche Form
  for (let i = 0; i < 3; i++) {
    const before = s;
    s = s.replace(/"([^"\n]{1,400})"/g, DLO + '$1' + DCL);
    if (s === before) break;
  }

  // 5) Gerade ASCII-Einzel-AZ -> ‚…‘ (nur an klarer Zitat-Position)
  for (let i = 0; i < 3; i++) {
    const before = s;
    s = s.replace(
      new RegExp('(^|\\s|\\(|\\[|' + DLO + ")'([^'\\n]{1,200})'(?=[\\s.,;:!?)\\]" + DCL + DRC + ']|$)', 'g'),
      '$1' + SLO + '$2' + SCL
    );
    if (s === before) break;
  }

  // 6) AUFFANGREGEL — nach den Regeln 3b–5 darf KEIN gerades Doppel-AZ übrig
  //    sein. Die Regeln davor brauchen ein Paar "…" oder ein vorangehendes „;
  //    beides fehlt auf FRAGMENTEN, die hinter dem öffnenden „ beginnen
  //    (`ihr Bande!"`). Genau dort blieb das verwaiste Zeichen bisher stehen.
  //    Statt eines Partnerzeichens entscheidet hier die POSITION.
  //    Guillemets (»…« / «…») bleiben unangetastet.
  s = s.replace(new RegExp(OPEN_CTX + '"(?=\\S)', 'g'), '$1' + DLO);
  s = s.split('"').join(DCL);
  //    Einfache Zeichen analog: Nach der Paar-Regel übrig gebliebene ' sind
  //    Apostrophe (D 13/14/16) — dafür ist fixApostrophes zuständig, das VOR
  //    dieser Funktion läuft. Was hier noch ankommt, ist ein Zitatzeichen
  //    ohne Partner und wird nach Position entschieden.
  s = s.replace(new RegExp(OPEN_CTX + "'(?=\\S)", 'g'), '$1' + SLO);
  s = s.split("'").join(SCL);

  return s;
}

// ── Apostroph ─────────────────────────────────────────────────────────────────
// ' ` ´ -> ’ nach Duden D 13–D 16. VOR normalizeGermanQuotes laufen lassen,
// damit Wort-interne ' nicht als Zitatzeichen missdeutet werden.
//
// ABGRENZUNG (wichtig): Diese Funktion entscheidet NICHT, OB an einer Stelle ein
// Apostroph stehen darf — das ist Orthografie (kein Apostroph vor Plural-s oder
// normalem Genitiv-s: „die Studios“, „Brechts Dramen“) und bleibt Sache des
// Lektorats bzw. der Autorin. Hier wird ausschliesslich das ZEICHEN normalisiert.
//
// Frueher bewusst auf „zwischen Buchstaben“ beschraenkt, weil Wortanfang und
// Wortende mit einfachen Zitatzeichen kollidieren. Aufgeloest (22.07.2026), indem
// die Paar-Regel fuer '…' ZUERST laeuft: Was danach an Einzelgaengern uebrig
// bleibt, ist praktisch immer ein Apostroph.
export function fixApostrophes(input) {
  if (input == null) return input;
  let s = String(input);
  // D 13/15: zwischen Buchstaben/Ziffern — geht’s, D’Artagnan, Ku’damm
  s = s.replace(new RegExp('([' + LETTER + '])[\'´`](?=[' + LETTER + '])', 'g'), '$1' + APO);
  // D 14: Wortanfang vor Kleinbuchstabe/Ziffer — ’ne, ’s ist spät, ’90er
  s = s.replace(new RegExp('(^|[\\s(\\[{])[\'´`](?=[a-zäöüß0-9])', 'g'), '$1' + APO);
  // D 16: Genitiv nach s/ß/x/z am Wortende — Grass’ Blechtrommel, Marx’ Philosophie
  s = s.replace(new RegExp('([sßxzSXZ])[\'´`](?![' + LETTER + '])', 'g'), '$1' + APO);
  // ´ und ` sind NIE Anfuehrungszeichen — was uebrig ist, ist Apostroph.
  s = s.replace(/[´`]/g, APO);
  return s;
}

// ── Ellipse ───────────────────────────────────────────────────────────────────
// Drei+ Punkte -> … (EIN Zeichen); vorhandenes Leerzeichen davor -> NBSP.
// Ob ein Wort abgebrochen („Verd…“) oder abgeschlossen („kam nicht …“) ist,
// weiß nur der Autor bzw. das LLM — der Sanitizer erhält die vorhandene Setzung
// und schützt sie nur. Die inhaltliche Regel gehört in den Prompt (TYPOGRAFIE_REGEL).
export function fixEllipsis(input) {
  if (input == null) return input;
  let s = String(input);
  s = s.replace(/\.{3,}/g, ELL);
  s = s.replace(new RegExp('[ \\t]+(' + ELL + ')', 'g'), NBSP + '$1');
  return s;
}

// ── NBSP vor Gedankenstrich ───────────────────────────────────────────────────
// " – " -> NBSP + "– ": der Gedankenstrich rutscht nie allein an den Zeilenanfang.
// Nur wenn nach dem Strich Leerraum/Zeilenende folgt (= Gedankenstrich); der
// Bis-Strich (2010–2020) und ein Dialog-Strich am Zeilenanfang bleiben unberührt.
export function nbspBeforeDash(input) {
  if (input == null) return input;
  return String(input).replace(
    new RegExp('[ \\t]+' + EN + '(?=[\\s' + NBSP + ']|$)', 'g'),
    NBSP + EN
  );
}

// ── Geschützte Leerzeichen (Abkürzungen, Einheiten, Verweise) — Kompass-Kern ──
export function applyNbspRules(input) {
  if (input == null) return input;
  let s = String(input);
  const N = NBSP;

  // Mehrteilige Abkürzungen: z. B., d. h., u. a. — Lookahead statt Konsumieren,
  // damit auch Ketten (u. a. m.) vollständig erfasst werden und die Regel
  // in EINEM Durchlauf idempotent ist.
  s = s.replace(/([a-zA-ZäöüÄÖÜ]\.) (?=[a-zA-ZäöüÄÖÜ]\.)/g, `$1${N}`);
  // Titel/Anrede vor Namen
  s = s.replace(/\b(Dr|Prof|Hr|Fr|Sr|Jr|St)\. /g, `$1.${N}`);
  // § und juristische Kürzel vor Zahlen
  s = s.replace(/§ (\d)/g, `§${N}$1`);
  s = s.replace(/\b(Art|Abs|Ziff|Nr|Kap)\. (\d)/g, `$1.${N}$2`);
  // Zahl + Maßeinheit / % / Grad / Währung / Uhr
  const unitPat = 'km\\/h|m\\/s|kW\\/h|kHz|MHz|GHz|kW|MW|km|cm|mm|nm|kg|mg|μg|ml|cl|dl|ms|min|CHF|g|m|l|h|s|t|V|A|W';
  s = s.replace(new RegExp(`(\\d+) (${unitPat})(?!\\w)`, 'g'), `$1${N}$2`);
  s = s.replace(/(\d+) (°C|°F|°)/g, `$1${N}$2`);
  s = s.replace(/(\d+) ([%‰€$£])/g, `$1${N}$2`);
  s = s.replace(/(\d+) (Uhr)\b/g, `$1${N}$2`);
  // Seiten-/Abbildungsverweise
  s = s.replace(/\b(Seite|Seiten) (\d)/g, `$1${N}$2`);
  s = s.replace(/\b(S\.|Abb\.) (\d)/g, `$1${N}$2`);
  // Ordinalzahl vor großgeschriebenem Nomen (1. Kapitel, 2. Auflage)
  s = s.replace(/(\d+\.) ([A-ZÄÖÜ][a-zäöü])/g, `$1${N}$2`);

  return s;
}

// ── Umlaut-Heilung (kuratierte, eindeutige Wörter) — Kompass-Kern ─────────────
const ASCII_UMLAUT_MAP = {
  fuer: 'für', fuers: 'fürs', ueber: 'über', ueberall: 'überall', ueberhaupt: 'überhaupt',
  gegenueber: 'gegenüber', zurueck: 'zurück', natuerlich: 'natürlich', spaeter: 'später',
  spaetestens: 'spätestens', frueher: 'früher', frueh: 'früh', waehrend: 'während',
  ausserdem: 'außerdem', schliesslich: 'schließlich', regelmaessig: 'regelmäßig',
  gruen: 'grün', schoen: 'schön', koennen: 'können', koennte: 'könnte', koennten: 'könnten',
  muessen: 'müssen', muesste: 'müsste', muessten: 'müssten', duerfen: 'dürfen',
  duerfte: 'dürfte', waere: 'wäre', waeren: 'wären', wuerde: 'würde', wuerden: 'würden',
  moechte: 'möchte', moechten: 'möchten', haeufig: 'häufig', haeufiger: 'häufiger',
  taeglich: 'täglich', gefuehl: 'gefühl', gefuehle: 'gefühle', saetze: 'sätze',
  woerter: 'wörter', erzaehlt: 'erzählt', erzaehlung: 'erzählung', erzaehler: 'erzähler',
  erzaehlerin: 'erzählerin', ueberarbeitung: 'überarbeitung', ueberarbeitet: 'überarbeitet',
  ueberarbeiten: 'überarbeiten', laesst: 'lässt', faellt: 'fällt', haelt: 'hält',
  traegt: 'trägt', laeuft: 'läuft', gehoert: 'gehört', gehoeren: 'gehören',
  benoetigt: 'benötigt', groesse: 'größe', groesser: 'größer', oefter: 'öfter',
  uebrig: 'übrig', zunaechst: 'zunächst', moeglich: 'möglich', moeglichst: 'möglichst',
  unmoeglich: 'unmöglich', persoenlich: 'persönlich', gewoehnlich: 'gewöhnlich',
  ungewoehnlich: 'ungewöhnlich', staerker: 'stärker', laenger: 'länger', kuerzer: 'kürzer',
  kuerzt: 'kürzt', gekuerzt: 'gekürzt', heisst: 'heißt', fuehrt: 'führt', fuehlt: 'fühlt', fuegt: 'fügt',
  erklaert: 'erklärt', erwaehnt: 'erwähnt', veraendert: 'verändert', aendert: 'ändert',
  aehnlich: 'ähnlich', koerperlich: 'körperlich', naehe: 'nähe',
};
const ASCII_UMLAUT_RE = new RegExp('\\b(' + Object.keys(ASCII_UMLAUT_MAP).join('|') + ')\\b', 'gi');

export function fixAsciiUmlautWords(input) {
  if (input == null) return input;
  return String(input).replace(ASCII_UMLAUT_RE, (m) => {
    const rep = ASCII_UMLAUT_MAP[m.toLowerCase()];
    if (!rep) return m;
    if (m === m.toLowerCase()) return rep;
    if (m === m.toUpperCase()) return rep.toUpperCase();
    if (m[0] === m[0].toUpperCase() && m.slice(1) === m.slice(1).toLowerCase()) {
      return rep[0].toUpperCase() + rep.slice(1);
    }
    return m; // Misch-Schreibweise: lieber nicht anfassen
  });
}

// ── Gesamt-Sanitizer ──────────────────────────────────────────────────────────
/**
 * Wendet alle Typografie-Regeln auf REINEN deutschen Fließtext an. Idempotent.
 * NICHT auf rohe JSON-Strings, Quellcode oder match-kritische Originaltexte!
 * @param {string} input
 * @param {{umlauts?: boolean, nbsp?: boolean}} opts
 */
export function sanitizeGermanText(input, opts = {}) {
  if (input == null) return input;
  const { umlauts = true, nbsp = true } = opts;
  let s = String(input);
  s = fixApostrophes(s);
  s = normalizeGermanQuotes(s);
  s = fixEllipsis(s);
  s = nbspBeforeDash(s);
  if (nbsp) s = applyNbspRules(s);
  if (umlauts) s = fixAsciiUmlautWords(s);
  return s;
}

// ── Sichere Variante für Markdown/Mischtext ───────────────────────────────────
// Schützt Codefences, Inline-Code, URLs und E-Mail-Adressen vor der Ersetzung —
// dort würden deutsche AZ statt " oder NBSP-Einfügungen Code und Links zerstören.
const PROTECTED_SEG = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|https?:\/\/[^\s)\]}"'<>]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

export function sanitizeGermanTextSafe(input, opts = {}) {
  if (input == null) return input;
  return String(input)
    .split(PROTECTED_SEG)
    .map((seg, i) => (i % 2 === 1 ? seg : sanitizeGermanText(seg, opts)))
    .join('');
}

// ── JSON-sichere Anwendung ────────────────────────────────────────────────────
/**
 * Wendet den Sanitizer auf ein GEPARSTES JSON-Objekt an: nur String-WERTE
 * werden behandelt, Schlüssel und Struktur bleiben unberührt. So können
 * JSON-Dateien/-Antworten nie kaputtgehen. Reihenfolge immer:
 * JSON.parse -> sanitizeJsonDeep -> JSON.stringify.
 */
export function sanitizeJsonDeep(value, opts = {}) {
  if (typeof value === 'string') return sanitizeGermanTextSafe(value, opts);
  if (Array.isArray(value)) return value.map((v) => sanitizeJsonDeep(v, opts));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = sanitizeJsonDeep(v, opts);
    return out;
  }
  return value;
}

/**
 * Repariert JSON, in dem ein LLM deutsche Anführungszeichen („…“) als
 * String-Begrenzer benutzt hat (Kompass-Kern, prod-erprobt). Gültiges JSON
 * bleibt unverändert.
 */
export function repairGermanQuotedJson(s) {
  const esc = (t) => t
    .replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    .replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  let out = String(s || '');
  out = out.replace(
    new RegExp('([{,]\\s*)' + DLO + '([^' + DLO + DCL + '\\n]{1,60})' + DCL + '(\\s*:)', 'g'),
    (m, a, key, c) => a + '"' + esc(key) + '"' + c
  );
  out = out.replace(
    new RegExp('(:\\s*)' + DLO + '([\\s\\S]*?)' + DCL + '(\\s*[,}\\]])', 'g'),
    (m, a, val, c) => a + '"' + esc(val) + '"' + c
  );
  return out;
}

// ── Streaming ─────────────────────────────────────────────────────────────────
// Einzelne Stream-Chunks NIE voll normalisieren (Anführungszeichen-Kontext ist
// zerrissen, Regeln greifen falsch). Pro Chunk ist nur die kontextfreie
// em->en-Ersetzung sicher; Vollnormalisierung erst über den fertigen Text.
export function normalizeStreamChunk(input) {
  if (input == null) return input;
  return String(input).replace(/—/g, EN);
}

// ── LLM-Prompt-Regeln (SSOT) ──────────────────────────────────────────────────
// In jeden System-Prompt, der deutschen Text erzeugt. Das Modell SPIEGELT die
// Schreibweise des Prompts — Prompts deshalb selbst IMMER in echter deutscher
// Rechtschreibung verfassen (nie ue/oe/ae!). Für JSON-Antworten zwingend die
// _JSON-Variante, sonst setzt das Modell deutsche AZ als String-Begrenzer.
export const RECHTSCHREIB_REGEL =
`Schreibe deine gesamte Antwort in normaler deutscher Rechtschreibung: echte Umlaute
(ä, ö, ü, ß) – NIEMALS Ersatzschreibungen wie ae/oe/ue – und deutsche
Anführungszeichen („ vorne unten, “ hinten oben; einfache: ‚…‘).`;

export const RECHTSCHREIB_REGEL_JSON =
`Schreibe alle Textinhalte in normaler deutscher Rechtschreibung: echte Umlaute
(ä, ö, ü, ß) – NIEMALS Ersatzschreibungen wie ae/oe/ue. WICHTIG zur JSON-Syntax:
Schlüssel und String-Begrenzer sind IMMER gerade ASCII-Anführungszeichen ("…");
deutsche Anführungszeichen („ … “) verwendest du nur INNERHALB von String-Werten,
wenn du wörtlich zitierst.`;

export const TYPOGRAFIE_REGEL =
`Typografie: Als Gedankenstrich immer den Halbgeviertstrich – verwenden (niemals — oder -).
Auslassungspunkte immer als einzelnes Zeichen …: Nach einem vollständigen Wort steht davor
ein Leerzeichen („er kam nicht …“), bei einem Wortabbruch folgt … direkt auf den
letzten Buchstaben („Verd…“). Als Apostroph immer ’ (geht’s), nie ' oder \`.`;

// ── Prüfmodus: Verstöße finden, ohne zu ändern ────────────────────────────────
export function checkGermanTypography(text) {
  const findings = [];
  const push = (rule, re) => {
    const rx = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    let m;
    while ((m = rx.exec(text)) !== null) {
      const line = text.slice(0, m.index).split('\n').length;
      findings.push({ rule, line, match: m[0].slice(0, 40) });
      if (findings.length > 500) return;
      if (m.index === rx.lastIndex) rx.lastIndex++;
    }
  };
  push('Geviertstrich statt Halbgeviertstrich', /—/g);
  push('Drei Punkte statt Ellipse …', /\.{3,}/g);
  push('Gerades doppeltes Anführungszeichen', /"[^"\n]{1,400}"/g);
  push('Mischpaar „…" (ASCII-Schluss)', new RegExp(DLO + '[^' + DLO + DCL + '"\\n]{1,400}"', 'g'));
  push('Englisches Anführungszeichen', new RegExp(DRC, 'g'));
  push('Tipp-Apostroph im Wort', new RegExp('[' + LETTER + '][\'´`][' + LETTER + ']', 'g'));
  push('Normales Leerzeichen vor Gedankenstrich', new RegExp(' ' + EN + '(?=\\s|$)', 'g'));
  push('Normales Leerzeichen vor Ellipse', new RegExp(' ' + ELL, 'g'));
  push('Umlaut-Ersatzschreibung', ASCII_UMLAUT_RE);
  push('Gespreizter Bindestrich als Gedankenstrich', /\S -(?= )/g);
  return findings;
}

// ── Selbsttest + CLI ──────────────────────────────────────────────────────────
function runSelfTest() {
  const t = [];
  const eq = (name, got, want) => t.push({ name, ok: got === want, got, want });

  eq('ASCII-AZ -> deutsch', sanitizeGermanText('Er sagte "Hallo" zu ihr.'), 'Er sagte „Hallo“ zu ihr.');
  eq('Deutsche AZ idempotent', sanitizeGermanText('„Hallo“'), '„Hallo“');
  eq('Englische AZ -> deutsch', sanitizeGermanText('“Hallo”'), '„Hallo“');
  eq('Mischpaar „…" -> deutsch', sanitizeGermanText('Das Wort „alle" fällt oft.'), 'Das Wort „alle“ fällt oft.');
  // Regression 22.07.2026: ZWEI Mischpaare in einem String. Regel 3 hielt das
  // gerade " des ersten Paares für Inhalt und machte aus dem zweiten „ ein “.
  eq('Zwei Mischpaare nacheinander', sanitizeGermanText('Frage „A?" oder „B?" Ende'), 'Frage „A?“ oder „B?“ Ende');
  eq('Echte Doppel-Öffnung bleibt geheilt', sanitizeGermanText('Er sagte „Hallo„ laut'), 'Er sagte „Hallo“ laut');
  // Fragment-Fälle (Befund 22.07.2026): kein Partnerzeichen, kein vorangehendes „
  eq('Fragment: verwaister ASCII-Schluss', sanitizeGermanText('ihr feige Schweinebande!"'), 'ihr feige Schweinebande!“');
  eq('Fragment: verwaister Schluss im Wort', sanitizeGermanText('Willkommen"-Fußmatte'), 'Willkommen“-Fußmatte');
  eq('Fragment: verwaister Anfang', sanitizeGermanText('"Wenn ihr aufmacht'), '„Wenn ihr aufmacht');
  eq('Guillemets bleiben', sanitizeGermanText('»Guten Tag«, sagte er.'), '»Guten Tag«, sagte er.');
  // Apostroph nach Duden D 13–D 16 (22.07.2026)
  eq('Apostroph Wortanfang (D 14)', sanitizeGermanText("So 'n Blödsinn, 'ne Farbe"), 'So ’n Blödsinn, ’ne Farbe');
  eq('Apostroph Jahreszahl (D 14)', sanitizeGermanText("die '90er Jahre"), 'die ’90er Jahre');
  eq('Genitiv-Apostroph (D 16)', sanitizeGermanText("Grass' Blechtrommel"), 'Grass’ Blechtrommel');
  eq('Kein Apostroph erfunden', sanitizeGermanText('Brechts Dramen, die Studios'), 'Brechts Dramen, die Studios');
  eq('Einfache AZ', sanitizeGermanText("Das 'Ding' da."), 'Das ‚Ding‘ da.');
  eq('Apostroph aus Tippzeichen', sanitizeGermanText("So geht's doch!"), 'So geht’s doch!');
  eq('Apostroph aus Akzent', sanitizeGermanText('So geht´s doch!'), 'So geht’s doch!');
  eq('Geviertstrich -> Halbgeviert + NBSP', sanitizeGermanText('Wort — Wort'), 'Wort' + NBSP + '– Wort');
  eq('Gespreizter Bindestrich', sanitizeGermanText('Wort - Wort'), 'Wort' + NBSP + '– Wort');
  eq('Bis-Strich bleibt', sanitizeGermanText('2010–2020'), '2010–2020');
  eq('Ellipse nach Wort', sanitizeGermanText('Er kam nicht ...'), 'Er kam nicht' + NBSP + '…');
  eq('Ellipse bei Wortabbruch', sanitizeGermanText('Verd... nochmal'), 'Verd… nochmal');
  eq('Umlaut-Heilung', sanitizeGermanText('Das waere schoen fuer dich.'), 'Das wäre schön für dich.');
  eq('Kein Falsch-Umlaut', sanitizeGermanText('Das Abenteuer im Feuer.'), 'Das Abenteuer im Feuer.');
  eq('NBSP Abkürzung', sanitizeGermanText('z. B. hier'), 'z.' + NBSP + 'B. hier');
  eq('NBSP Einheit', sanitizeGermanText('Es sind 10 kg schwer.'), 'Es sind 10' + NBSP + 'kg schwer.');
  eq('NBSP Prozent', sanitizeGermanText('Rund 25 % mehr.'), 'Rund 25' + NBSP + '% mehr.');
  eq('NBSP Ordinal', sanitizeGermanText('Im 3. Kapitel steht es.'), 'Im 3.' + NBSP + 'Kapitel steht es.');
  eq('Safe: Codefence bleibt', sanitizeGermanTextSafe('Text "a" davor\n```\nconst x = "b";\n```\ndanach'),
     'Text „a“ davor\n```\nconst x = "b";\n```\ndanach');
  eq('Safe: Inline-Code bleibt', sanitizeGermanTextSafe('Nutze `x = "y"` hier.'), 'Nutze `x = "y"` hier.');
  eq('Safe: URL bleibt', sanitizeGermanTextSafe('Mehr auf https://example.de/pfad-zu-seite hier ...'),
     'Mehr auf https://example.de/pfad-zu-seite hier' + NBSP + '…');

  const json = { titel: 'Der "Test"', liste: ['fuer dich ...'], anzahl: 3 };
  const rt = sanitizeJsonDeep(json);
  eq('JSON: Wert saniert', rt.titel, 'Der „Test“');
  eq('JSON: Array-Wert saniert', rt.liste[0], 'für dich' + NBSP + '…');
  eq('JSON: Nicht-String unberührt', String(rt.anzahl), '3');
  let parseOk = true;
  try { JSON.parse(JSON.stringify(rt)); } catch { parseOk = false; }
  eq('JSON: bleibt parsebar', String(parseOk), 'true');
  eq('JSON-Reparatur', repairGermanQuotedJson('{„titel“: „Der Text“}'), '{"titel": "Der Text"}');

  // Idempotenz über alles
  const probe = 'Er sagte "Hallo" — und ging ... So geht\'s. z. B. 10 kg, 25 %.';
  eq('Idempotent', sanitizeGermanText(sanitizeGermanText(probe)), sanitizeGermanText(probe));

  const failed = t.filter((x) => !x.ok);
  for (const x of t) {
    console.log((x.ok ? 'OK  ' : 'FAIL') + ' ' + x.name + (x.ok ? '' : `\n     got:  ${JSON.stringify(x.got)}\n     want: ${JSON.stringify(x.want)}`));
  }
  console.log(`\n${t.length - failed.length}/${t.length} Tests bestanden.`);
  return failed.length === 0;
}

// Projektkopie heißt germanTypography.mjs — beide Namen erkennen (Skill-Original: german_typography.mjs)
const isCli = typeof process !== 'undefined' && process.argv[1] &&
  /german_?[Tt]ypography\.mjs$/.test(process.argv[1].replace(/\\/g, '/'));

if (isCli) {
  const [, , mode, ...files] = process.argv;
  const fs = await import('node:fs');
  if (mode === '--test') {
    process.exit(runSelfTest() ? 0 : 1);
  } else if (mode === '--check') {
    let total = 0;
    for (const f of files) {
      const findings = checkGermanTypography(fs.readFileSync(f, 'utf8'));
      total += findings.length;
      if (findings.length) {
        console.log(`\n${f}: ${findings.length} Funde`);
        for (const x of findings.slice(0, 50)) console.log(`  Zeile ${x.line}: [${x.rule}] ${JSON.stringify(x.match)}`);
        if (findings.length > 50) console.log(`  ... und ${findings.length - 50} weitere`);
      } else {
        console.log(`${f}: sauber`);
      }
    }
    process.exit(total ? 1 : 0);
  } else if (mode === '--fix') {
    for (const f of files) {
      const raw = fs.readFileSync(f, 'utf8');
      let out;
      if (f.toLowerCase().endsWith('.json')) {
        out = JSON.stringify(sanitizeJsonDeep(JSON.parse(raw)), null, 2) + '\n';
      } else {
        out = sanitizeGermanTextSafe(raw);
      }
      if (out !== raw) { fs.writeFileSync(f, out, 'utf8'); console.log(`${f}: korrigiert`); }
      else console.log(`${f}: unverändert`);
    }
  } else {
    // stdin -> stdout (Markdown-sicher)
    const chunks = [];
    process.stdin.on('data', (c) => chunks.push(c));
    process.stdin.on('end', () => process.stdout.write(sanitizeGermanTextSafe(Buffer.concat(chunks).toString('utf8'))));
  }
}
