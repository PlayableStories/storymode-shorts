/*
 * The fixed, closed vocabulary of themes — the ONE place this list lives.
 * Used by the content reader (to validate/drop unknown themes) and the
 * filter UI. The catalogue script keeps a small mirrored copy; if you add
 * a theme here, update scripts/build-catalogue.mjs too (it says where).
 */
export const THEMES = [
  "care",
  "memory",
  "identity",
  "place",
  "community",
  "politics",
  "lived experience",
] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" && (THEMES as readonly string[]).includes(value)
  );
}
