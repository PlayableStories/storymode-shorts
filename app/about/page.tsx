import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Storymode Shorts",
  description:
    "What Storymode Shorts is, how it connects to Into Storymode's workshops, and how to get involved.",
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-reading px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        About
      </h1>

      <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/90">
        <p>
          Storymode Shorts is a small, warm collection of short browser games
          made by people taking part in Into Storymode's vibe coding workshops.
          Everything here was selected from a workshop — it is never a
          &ldquo;best of.&rdquo; Meaning comes before mechanics.
        </p>
        <p>
          Into Storymode runs{" "}
          <a
            href="https://intostorymode.com"
            className="text-accent underline underline-offset-2"
          >
            Playable Stories
          </a>
          , a programme of events and workshops exploring games as a
          storytelling medium. In the vibe coding workshop, people with no
          technical background use AI prompting to make and publish a short game
          in a single sitting.
        </p>
        <p>
          The games themselves live elsewhere (usually on itch.io); this
          collection catalogues them and links out so you can play each one.
        </p>
      </div>

      <section aria-labelledby="get-involved" className="mt-10">
        <h2 id="get-involved" className="text-xl font-semibold">
          Get involved
        </h2>
        <div className="mt-3 space-y-4 text-lg leading-relaxed text-ink/90">
          <p>
            Want to make a short game of your own? Come to a workshop. You can
            find the materials and upcoming sessions here:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              {/* TODO: replace with the real Eventbrite / workshop sign-up link. */}
              <a
                href="#"
                className="text-accent underline underline-offset-2"
              >
                Upcoming workshops (sign-up link coming soon)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/PlayableStories/vibe-coding-workshop"
                className="text-accent underline underline-offset-2"
              >
                Vibe coding workshop materials
              </a>
            </li>
          </ul>
        </div>
      </section>

      <p className="mt-10">
        <Link
          href="/"
          className="rounded-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Back to the collection
        </Link>
      </p>
    </main>
  );
}
