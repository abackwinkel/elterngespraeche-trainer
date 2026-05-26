/**
 * Normalisiert KI-generierte Texte für die Anzeige.
 * Aktuell: Anführungszeichen → deutsche Typografie.
 * Kann für andere Projekte (z. B. ManuskriptKompass) wiederverwendet werden.
 */

/**
 * Ersetzt englische / ASCII-Anführungszeichen durch deutsche Typografie.
 *
 * Deutsches Schema:
 *   „  = DOUBLE LOW-9 QUOTATION MARK  -- öffnet (unten)
 *   “  = LEFT DOUBLE QUOTATION MARK   -- schließt (oben)
 *
 * Runde 1: englische Curly-Paare (“...”) -> deutsch
 * Runde 2: ASCII-Paare (U+0022) -> deutsch
 */
export function normalizeGermanQuotes(text: string): string {
  if (!text) return text
  // Runde 1: englische geschweifte Anführungszeichen “...” -> deutsch „...“
  let result = text.replace(/“([^”]*?)”/g, '„$1“')
  // Runde 2: ASCII-Anführungszeichen "..." -> deutsch „...“
  result = result.replace(/"([^"]*?)"/g, '„$1“')
  return result
}