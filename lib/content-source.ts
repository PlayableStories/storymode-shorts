/*
 * The single door the server uses to READ content.
 *
 * Server components (the pages) import the data functions from here — never
 * from ./games directly. In v1 that's the markdown reader. For v2 (Supabase),
 * write a module with the same function signatures and change these
 * re-exports to point at it. No UI code needs to change.
 *
 * Note: this module pulls in filesystem code, so it is server-only. Client
 * components (cards, filter) import the `Game` type and `getBlurb` from
 * ./game instead, which is pure and has no server-only imports.
 */
export { getAllGames, getGameBySlug, getAllThemes } from "./games";
export { getBlurb } from "./game";
export type { Game } from "./game";
