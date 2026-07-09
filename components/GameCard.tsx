import Link from "next/link";
import { getBlurb, type Game } from "@/lib/game";
import { ThemeTag } from "./ThemeTag";
import { PlaceholderTag } from "./PlaceholderTag";

/**
 * A game card for the home grid. Presentational only.
 * `thumbnail` in content is repo-relative (e.g. "thumbnails/slow.svg"); the
 * matching file is served from /public/thumbnails, so we prefix a "/".
 */
export function GameCard({ game }: { game: Game }) {
  const blurb = getBlurb(game);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line">
      <Link
        href={`/games/${game.slug}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {game.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/${game.thumbnail}`}
            alt={`Thumbnail for ${game.title}`}
            className="aspect-video w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-video w-full bg-line" aria-hidden="true" />
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-lg font-semibold leading-snug text-ink underline-offset-2 group-hover:underline">
            {game.title}
          </h3>
          <p className="text-sm text-muted">{game.creator}</p>
          {blurb ? <p className="text-sm text-ink/80">{blurb}</p> : null}
          {game.placeholder || game.themes.length > 0 ? (
            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
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
        </div>
      </Link>
    </article>
  );
}
