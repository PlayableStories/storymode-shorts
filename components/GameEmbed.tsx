import type { Game } from "@/lib/content-source";

/**
 * How to play a game.
 * - If the game has an `embed` URL, show a responsive iframe (with an
 *   accessible title) plus a visible "Open in a new tab" link fallback.
 * - Otherwise, show a clear "Play this game" button using `play`.
 * - If `play` is just the "#" placeholder, show a quiet "coming soon" note.
 */
export function GameEmbed({ game }: { game: Game }) {
  const hasPlayLink = Boolean(game.play) && game.play !== "#";

  if (game.embed) {
    return (
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-line">
          <iframe
            src={game.embed}
            title={`Play ${game.title}`}
            className="h-full w-full"
            allowFullScreen
          />
        </div>
        {hasPlayLink ? (
          <p className="mt-2 text-sm">
            <a
              href={game.play}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open in a new tab
            </a>
          </p>
        ) : null}
      </div>
    );
  }

  if (hasPlayLink) {
    return (
      <a
        href={game.play}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-md bg-accent px-5 py-2.5 font-medium text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Play this game
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <p className="rounded-md border border-line px-4 py-3 text-sm text-muted">
      A link to play this game is coming soon.
    </p>
  );
}
