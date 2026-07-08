import { getAllGames, getAllThemes } from "@/lib/content-source";
import { FilterableGameGrid } from "@/components/FilterableGameGrid";

export default function HomePage() {
  const games = getAllGames();
  const themes = getAllThemes();

  return (
    <main id="main" className="mx-auto max-w-5xl px-5 py-12">
      <section aria-labelledby="intro-heading" className="mb-10 max-w-reading">
        <h1
          id="intro-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Storymode Shorts
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/90">
          A small collection of short games, each selected from one of Into
          Storymode's vibe coding workshops. They are quiet, personal, and made
          in a single sitting — small playable stories about a memory, a
          feeling, or a moment. Take your time with them.
        </p>
      </section>

      <section aria-label="Games">
        <FilterableGameGrid games={games} themes={themes} />
      </section>
    </main>
  );
}
