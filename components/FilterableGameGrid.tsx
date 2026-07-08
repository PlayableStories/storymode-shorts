"use client";

import { useState } from "react";
import type { Game } from "@/lib/game";
import type { Theme } from "@/lib/themes";
import { GameCard } from "./GameCard";
import { ThemeFilter, type Filter } from "./ThemeFilter";

/**
 * The one interactive island on the home page. The server reads all games and
 * passes them in as props; filtering happens instantly in the browser (the
 * collection is small, so there is nothing to refetch).
 */
export function FilterableGameGrid({
  games,
  themes,
}: {
  games: Game[];
  themes: Theme[];
}) {
  const [active, setActive] = useState<Filter>("all");

  const visible =
    active === "all"
      ? games
      : games.filter((game) => game.themes.includes(active));

  return (
    <div>
      <div className="mb-8">
        <ThemeFilter themes={themes} active={active} onChange={setActive} />
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} game{visible.length === 1 ? "" : "s"} shown
      </p>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((game) => (
            <li key={game.slug}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No games with this theme yet.</p>
      )}
    </div>
  );
}
