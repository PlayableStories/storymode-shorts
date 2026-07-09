/**
 * A quiet, optional "gentle heads-up" shown before a game, for ones that touch
 * tender subjects (grief, illness, and so on). Deliberately calm — not an alarm
 * box and not role="alert" (it isn't urgent) — just clearly legible before play.
 * The wording comes from the maker; the framing lives here.
 */
export function ContentNote({ note }: { note: string }) {
  return (
    <p className="rounded-md border border-line px-4 py-3 text-sm text-muted">
      <span className="text-ink">A gentle heads-up:</span> {note}
    </p>
  );
}
