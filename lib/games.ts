import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isTheme } from "./themes";
import { categoryOrder, isReflectionCategory } from "./reflections";
import type { Game, Reflection } from "./game";

/*
 * The content reader (server-only — it uses the filesystem). Reads the
 * markdown files in content/games/*.md — the single source of truth — and
 * turns them into typed Game objects.
 *
 * For v2 (Supabase), you would write a module with these same functions and
 * swap the re-export in lib/content-source.ts. The rest of the app imports
 * from content-source and never knows the difference.
 */

const GAMES_DIR = path.join(process.cwd(), "content", "games");

function toStringOr(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

/**
 * Read optional "behind the game" reflections from frontmatter. Keeps only
 * well-formed entries (known category + non-empty question and answer) and
 * sorts them seed → making → reflection.
 */
function parseReflections(value: unknown): Reflection[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (r): r is { category: unknown; question: unknown; answer: unknown } =>
        typeof r === "object" && r !== null,
    )
    .map((r) => ({
      category: r.category,
      question: typeof r.question === "string" ? r.question.trim() : "",
      answer: typeof r.answer === "string" ? r.answer.trim() : "",
    }))
    .filter(
      (r): r is Reflection =>
        isReflectionCategory(r.category) &&
        r.question !== "" &&
        r.answer !== "",
    )
    .sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category));
}

function parseGameFile(fileName: string): Game {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(GAMES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const themes = (Array.isArray(data.themes) ? data.themes : []).filter(
    isTheme,
  );

  return {
    slug,
    title: toStringOr(data.title, slug),
    creator: toStringOr(data.creator, "Workshop participant"),
    themes,
    workshop: toStringOr(data.workshop, ""),
    thumbnail: toStringOr(data.thumbnail, ""),
    play: toStringOr(data.play, "#"),
    embed:
      typeof data.embed === "string" && data.embed.trim() !== ""
        ? data.embed
        : undefined,
    blurb:
      typeof data.blurb === "string" && data.blurb.trim() !== ""
        ? data.blurb
        : undefined,
    addedAt: toStringOr(data.addedAt, ""),
    body: content.trim(),
    reflections: parseReflections(data.reflections),
    contentNote:
      typeof data.contentNote === "string" && data.contentNote.trim() !== ""
        ? data.contentNote.trim()
        : undefined,
  };
}

/** All games, newest first (by addedAt). */
export function getAllGames(): Game[] {
  if (!fs.existsSync(GAMES_DIR)) return [];
  return fs
    .readdirSync(GAMES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseGameFile)
    .sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));
}

export function getGameBySlug(slug: string): Game | undefined {
  return getAllGames().find((g) => g.slug === slug);
}

/** The themes actually used across the collection, in the fixed order. */
export function getAllThemes() {
  const used = new Set<Game["themes"][number]>();
  for (const game of getAllGames()) {
    for (const theme of game.themes) used.add(theme);
  }
  return Array.from(used);
}
