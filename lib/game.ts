import type { Theme } from "./themes";
import type { ReflectionCategory } from "./reflections";

/*
 * The Game shape and pure helpers — no filesystem, no server-only code — so
 * these are safe to import into client components (like the cards and filter).
 * The actual reading of markdown files lives in games.ts (server-only).
 */

/** One maker reflection: a chosen question from a category, and its answer. */
export interface Reflection {
  category: ReflectionCategory;
  question: string;
  answer: string;
}

export interface Game {
  /** Filename without ".md" — used in the /games/[slug] URL. */
  slug: string;
  title: string;
  /** Name, pseudonym, or group. Defaults to "Workshop participant". */
  creator: string;
  themes: Theme[];
  workshop: string;
  /** Repo-relative path, e.g. "thumbnails/slow.svg". */
  thumbnail: string;
  /** Link to play (itch.io etc.), or "#" placeholder. */
  play: string;
  /** Optional itch.io iframe embed URL; falls back to `play`. */
  embed?: string;
  /** Optional one-line blurb; if absent, we derive one from the body. */
  blurb?: string;
  addedAt: string;
  /** The markdown description (raw). */
  body: string;
  /**
   * Optional "behind the game" reflections — 0 or 3 entries, one per category,
   * ordered seed → making → reflection.
   */
  reflections: Reflection[];
  /** Optional one-line "gentle heads-up" for tender subjects. */
  contentNote?: string;
}

/**
 * A short one-line blurb for a card: the game's `blurb` field if set,
 * otherwise the first sentence/line of its description.
 */
export function getBlurb(game: Game): string {
  if (game.blurb) return game.blurb;
  const firstLine = game.body.split("\n").find((l) => l.trim() !== "") ?? "";
  const firstSentence = firstLine.split(/(?<=[.!?])\s/)[0];
  return firstSentence.trim();
}
