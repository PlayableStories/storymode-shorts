export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted">
        <p>
          Storymode Shorts is part of{" "}
          <a
            href="https://intostorymode.com"
            className="rounded-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Into Storymode
          </a>
          , exploring games as a storytelling medium.
        </p>
        <p className="mt-2">
          Made in the{" "}
          <a
            href="https://github.com/PlayableStories/vibe-coding-workshop"
            className="rounded-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            vibe coding workshop
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
