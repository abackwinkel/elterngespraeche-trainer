// Typdeklaration für die SSOT-Sanitizer-Kopie lib/germanTypography.mjs
// (Skill deutsche-typografie). Bei Funktionsänderungen dort auch hier nachziehen.

export interface SanitizeOpts {
  umlauts?: boolean
  nbsp?: boolean
}

export declare const EN: string
export declare const EM: string
export declare const ELL: string
export declare const NBSP: string

export declare function normalizeGermanQuotes(input: string): string
export declare function fixApostrophes(input: string): string
export declare function fixEllipsis(input: string): string
export declare function nbspBeforeDash(input: string): string
export declare function applyNbspRules(input: string): string
export declare function fixAsciiUmlautWords(input: string): string
export declare function sanitizeGermanText(input: string, opts?: SanitizeOpts): string
export declare function sanitizeGermanTextSafe(input: string, opts?: SanitizeOpts): string
export declare function sanitizeJsonDeep<T>(value: T, opts?: SanitizeOpts): T
export declare function repairGermanQuotedJson(s: string): string
export declare function repairMixedQuotesInJson(s: string): string
export declare function normalizeStreamChunk(input: string): string
export declare function checkGermanTypography(
  text: string
): Array<{ rule: string; line: number; match: string }>

export declare const RECHTSCHREIB_REGEL: string
export declare const RECHTSCHREIB_REGEL_JSON: string
export declare const TYPOGRAFIE_REGEL: string
