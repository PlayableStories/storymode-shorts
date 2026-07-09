import type { Metadata } from "next";
import Link from "next/link";
import { THEMES } from "@/lib/themes";
import { REFLECTION_CATEGORIES } from "@/lib/reflections";
import { SubmitForm } from "@/components/SubmitForm";

export const metadata: Metadata = {
  title: "Submit a game — Storymode Shorts",
  description:
    "Made a short game in an Into Storymode workshop? Share it to be considered for the collection.",
};

export default function SubmitPage() {
  return (
    <main id="main" className="mx-auto max-w-reading px-5 py-12">
      <p className="mb-6">
        <Link
          href="/"
          className="rounded-sm text-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Back to the collection
        </Link>
      </p>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Submit a game
      </h1>

      <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/90">
        <p>
          Made a short game in one of our workshops? We'd love to see it. Share
          the details below and it goes into the collection's reading pile.
        </p>
        <p className="text-base text-muted">
          A person reads every submission — nothing appears automatically. We
          only ever use your real name or your own words with your permission,
          and we'll email you first if anything's unclear.
        </p>
      </div>

      <div className="mt-10">
        <SubmitForm
          themes={THEMES}
          categories={REFLECTION_CATEGORIES}
          accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
        />
      </div>
    </main>
  );
}
