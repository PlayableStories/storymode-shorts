/**
 * A quiet status badge marking the sample games that ship with the repo, so
 * visitors know they aren't real, submitted games. Deliberately styled unlike a
 * theme tag (outline, not filled) so it reads as a status, not a theme — and it
 * is never part of the theme filter.
 */
export function PlaceholderTag() {
  return (
    <span className="inline-block rounded-full border border-line px-2.5 py-0.5 text-xs uppercase tracking-wide text-muted">
      Placeholder
    </span>
  );
}
