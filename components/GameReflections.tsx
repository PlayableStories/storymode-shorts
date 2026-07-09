import type { Reflection } from "@/lib/game";
import { categoryLabel } from "@/lib/reflections";

/**
 * The quiet "behind the game" movement: a maker's short answers, one per
 * category, read in order (seed → making → reflection). Each entry shows its
 * category label and the question the maker chose, with their answer beneath.
 *
 * Answers are plain participant text, so we render them as paragraphs (split on
 * blank lines) — no markdown, no raw HTML.
 */
export function GameReflections({
  reflections,
}: {
  reflections: Reflection[];
}) {
  if (reflections.length === 0) return null;

  return (
    <section aria-labelledby="behind-heading" className="mt-10 border-t border-line pt-8">
      <h2 id="behind-heading" className="sr-only">
        Behind the game
      </h2>
      <div className="space-y-8">
        {reflections.map((reflection, index) => (
          <div key={index}>
            <p className="text-xs uppercase tracking-wide text-muted">
              {categoryLabel(reflection.category)}
            </p>
            <h3 className="mt-1 text-base font-medium text-ink/80">
              {reflection.question}
            </h3>
            <div className="mt-2 space-y-3 text-lg leading-relaxed text-ink/90">
              {reflection.answer.split(/\n\s*\n/).map((paragraph, i) => (
                <p key={i}>{paragraph.trim()}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
