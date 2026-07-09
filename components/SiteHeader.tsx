import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5">
        <Link
          href="/"
          className="rounded-sm text-lg font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Storymode Shorts
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5">
          <Link
            href="/submit"
            className="rounded-sm text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Submit a game
          </Link>
          <Link
            href="/about"
            className="rounded-sm text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
