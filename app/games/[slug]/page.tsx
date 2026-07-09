import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getGameBySlug } from "@/lib/content-source";
import { GameEmbed } from "@/components/GameEmbed";
import { Markdown } from "@/components/Markdown";
import { ThemeTag } from "@/components/ThemeTag";
import { PlaceholderTag } from "@/components/PlaceholderTag";
import { ContentNote } from "@/components/ContentNote";
import { GameReflections } from "@/components/GameReflections";

export function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Not found — Storymode Shorts" };
  return {
    title: `${game.title} — Storymode Shorts`,
    description: `${game.title}, selected from ${game.workshop || "a workshop"}.`,
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <main id="main" className="mx-auto max-w-reading px-5 py-12">
      <p className="mb-6">
        <Link
          href="/"
          className="rounded-sm text-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Back to the collection
        </Link>
      </p>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {game.title}
      </h1>
      <p className="mt-2 text-muted">{game.creator}</p>

      {game.placeholder || game.themes.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {game.placeholder ? <PlaceholderTag /> : null}
          {game.themes.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {game.themes.map((theme) => (
                <li key={theme}>
                  <ThemeTag theme={theme} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {game.contentNote ? (
        <div className="mt-8">
          <ContentNote note={game.contentNote} />
        </div>
      ) : null}

      <div className="mt-8">
        <GameEmbed game={game} />
      </div>

      {game.body ? (
        <div className="mt-8 text-lg">
          <Markdown>{game.body}</Markdown>
        </div>
      ) : null}

      <GameReflections reflections={game.reflections} />

      {game.workshop ? (
        <p className="mt-8 text-sm text-muted">
          Selected from {game.workshop}.
        </p>
      ) : null}
    </main>
  );
}
