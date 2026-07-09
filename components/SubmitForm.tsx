"use client";

import { useState } from "react";

/*
 * The submission form — the one interactive island on /submit. It POSTs to
 * Web3Forms (a static-friendly form endpoint) so submissions arrive by email;
 * a maintainer then reviews consent and hand-writes the content file. All of
 * the field vocabulary (themes, reflection questions) is passed in from the
 * server so the form can never drift from the content model.
 *
 * Presentation only: no styling lives in content, and no content lives here.
 */

/** Shape of a reflection category, structurally matching REFLECTION_CATEGORIES. */
type Category = { id: string; label: string; questions: readonly string[] };

type Status = "idle" | "submitting" | "success" | "error";

const DEFAULT_WORKSHOP = "Vibe coding workshop";
const PLACEHOLDER_CREDIT = "Workshop participant";

// Shared control styling, built from the design tokens (see globals.css).
const fieldClass =
  "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-ink placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const labelClass = "block text-sm font-medium text-ink";
const helpClass = "mt-1 text-sm text-muted";
const legendClass = "text-base font-semibold text-ink";

export function SubmitForm({
  themes,
  categories,
  accessKey,
}: {
  themes: readonly string[];
  categories: readonly Category[];
  accessKey?: string;
}) {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [creditConsent, setCreditConsent] = useState<"yes" | "no">("yes");
  const [email, setEmail] = useState("");
  const [play, setPlay] = useState("");
  const [workshop, setWorkshop] = useState(DEFAULT_WORKSHOP);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [blurb, setBlurb] = useState("");
  const [reflections, setReflections] = useState(() =>
    categories.map((c) => ({
      id: c.id,
      label: c.label,
      questions: c.questions,
      questionIndex: 0,
      answer: "",
    })),
  );
  const [contentNote, setContentNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [botcheck, setBotcheck] = useState(false); // honeypot: real users never touch it
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const configured = Boolean(accessKey);

  function toggleTheme(theme: string) {
    setSelectedThemes((prev) =>
      prev.includes(theme)
        ? prev.filter((t) => t !== theme)
        : [...prev, theme],
    );
  }

  function updateReflection(
    id: string,
    patch: Partial<{ questionIndex: number; answer: string }>,
  ) {
    setReflections((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  const publishedCredit =
    creditConsent === "yes" && creator.trim() !== ""
      ? creator.trim()
      : PLACEHOLDER_CREDIT;

  /** A human-readable summary so the maintainer's email is easy to convert. */
  function buildMessage(): string {
    const lines: string[] = [];
    lines.push(`Game title: ${title.trim() || "—"}`);
    lines.push(`Published credit: ${publishedCredit}`);
    lines.push(`  · name provided: ${creator.trim() || "—"}`);
    lines.push(
      `  · consent to be credited publicly: ${creditConsent === "yes" ? "yes" : "no"}`,
    );
    lines.push(`Contact email (not published): ${email.trim() || "—"}`);
    lines.push(`Link to play: ${play.trim() || "—"}`);
    lines.push(`Workshop: ${workshop.trim() || "—"}`);
    lines.push(`Themes: ${selectedThemes.join(", ") || "—"}`);
    lines.push("");
    lines.push("Description:");
    lines.push(blurb.trim() || "—");
    lines.push("");
    lines.push("Behind the game:");
    const answered = reflections.filter((r) => r.answer.trim() !== "");
    if (answered.length === 0) {
      lines.push("—");
    } else {
      for (const r of answered) {
        lines.push(`• ${r.label} — ${r.questions[r.questionIndex]}`);
        lines.push(`  ${r.answer.trim()}`);
      }
    }
    lines.push("");
    lines.push(`Content note: ${contentNote.trim() || "—"}`);
    lines.push(
      `Consent: ${consent ? "confirmed happy to be considered" : "NOT confirmed"}`,
    );
    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const payload: Record<string, unknown> = {
      access_key: accessKey,
      subject: `New game submission: ${title.trim() || "untitled"}`,
      from_name: "Storymode Shorts",
      botcheck,
      game_title: title.trim(),
      published_credit: publishedCredit,
      name_provided: creator.trim(),
      credit_publicly: creditConsent === "yes" ? "yes" : "no",
      contact_email: email.trim(),
      play_link: play.trim(),
      workshop: workshop.trim(),
      themes: selectedThemes.join(", "),
      description: blurb.trim(),
      content_note: contentNote.trim(),
      consent: consent ? "confirmed" : "not confirmed",
      message: buildMessage(),
    };
    if (email.trim() !== "") payload.replyto = email.trim();
    for (const r of reflections) {
      if (r.answer.trim() !== "") {
        payload[`reflection_${r.id}`] =
          `${r.questions[r.questionIndex]} — ${r.answer.trim()}`;
      }
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again in a moment.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "We couldn't reach the submission service. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-line p-6"
      >
        <h2 className="text-xl font-semibold text-ink">Thank you — it's in.</h2>
        <p className="mt-2 text-ink/90">
          We've received your game. A person reads every submission, so it may be
          a little while before you hear back. If we have any questions about
          consent or credit, we'll use the email you gave us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 rounded-full border border-line px-4 py-1.5 text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Submit another game
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {!configured ? (
        <p className="rounded-md border border-line bg-paper p-4 text-sm text-muted">
          Submissions aren't switched on just yet. Please check back soon — or
          come to a workshop in the meantime.
        </p>
      ) : null}

      {/* ── The game ─────────────────────────────────────────── */}
      <fieldset className="space-y-5">
        <legend className={legendClass}>Your game</legend>

        <div>
          <label htmlFor="title" className={labelClass}>
            Game title <span className="text-muted">(required)</span>
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="play" className={labelClass}>
            Link to play it
          </label>
          <input
            id="play"
            type="url"
            inputMode="url"
            placeholder="https://your-name.itch.io/your-game"
            value={play}
            onChange={(e) => setPlay(e.target.value)}
            className={fieldClass}
          />
          <p className={helpClass}>
            Usually an itch.io link. Leave blank if it isn't published yet.
          </p>
        </div>

        <div>
          <label htmlFor="blurb" className={labelClass}>
            A short description
          </label>
          <textarea
            id="blurb"
            rows={3}
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            className={fieldClass}
          />
          <p className={helpClass}>
            A sentence or two about what the game is — in your own words.
          </p>
        </div>

        <fieldset>
          <legend className={labelClass}>Themes it touches</legend>
          <p className={helpClass}>Choose any that fit.</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {themes.map((theme) => (
              <li key={theme}>
                <label className="flex items-center gap-2 text-ink">
                  <input
                    type="checkbox"
                    checked={selectedThemes.includes(theme)}
                    onChange={() => toggleTheme(theme)}
                    className="h-4 w-4 rounded border-line text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                  <span>{theme}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <div>
          <label htmlFor="workshop" className={labelClass}>
            Which workshop?
          </label>
          <input
            id="workshop"
            type="text"
            value={workshop}
            onChange={(e) => setWorkshop(e.target.value)}
            className={fieldClass}
          />
        </div>
      </fieldset>

      {/* ── Behind the game (optional reflections) ───────────── */}
      <fieldset className="space-y-6">
        <legend className={legendClass}>Behind the game</legend>
        <p className="text-sm text-muted">
          Optional, but lovely to have. Pick the question that speaks to you in
          each row and answer in your own words.
        </p>

        {reflections.map((r) => (
          <div key={r.id} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {r.label}
            </p>
            <fieldset>
              <legend className="sr-only">
                Choose a question for {r.label}
              </legend>
              <div className="space-y-1.5">
                {r.questions.map((question, i) => (
                  <label
                    key={question}
                    className="flex items-start gap-2 text-ink"
                  >
                    <input
                      type="radio"
                      name={`question-${r.id}`}
                      checked={r.questionIndex === i}
                      onChange={() =>
                        updateReflection(r.id, { questionIndex: i })
                      }
                      className="mt-1 h-4 w-4 border-line text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    />
                    <span>{question}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label htmlFor={`answer-${r.id}`} className="sr-only">
              Your answer for {r.label}
            </label>
            <textarea
              id={`answer-${r.id}`}
              rows={2}
              value={r.answer}
              onChange={(e) =>
                updateReflection(r.id, { answer: e.target.value })
              }
              placeholder="Your answer…"
              className={fieldClass}
            />
          </div>
        ))}

        <div>
          <label htmlFor="content-note" className={labelClass}>
            A gentle heads-up (optional)
          </label>
          <input
            id="content-note"
            type="text"
            value={contentNote}
            onChange={(e) => setContentNote(e.target.value)}
            placeholder="e.g. Touches on grief and the loss of a pet."
            className={fieldClass}
          />
          <p className={helpClass}>
            If the game touches a tender subject, a one-line note lets players
            choose when to play.
          </p>
        </div>
      </fieldset>

      {/* ── You & consent ────────────────────────────────────── */}
      <fieldset className="space-y-5">
        <legend className={legendClass}>You</legend>

        <div>
          <label htmlFor="creator" className={labelClass}>
            Your name or the credit you'd like
          </label>
          <input
            id="creator"
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            placeholder={PLACEHOLDER_CREDIT}
            className={fieldClass}
          />
        </div>

        <fieldset>
          <legend className={labelClass}>
            May we credit you by that name publicly?
          </legend>
          <div className="mt-2 space-y-1.5">
            <label className="flex items-center gap-2 text-ink">
              <input
                type="radio"
                name="credit-consent"
                checked={creditConsent === "yes"}
                onChange={() => setCreditConsent("yes")}
                className="h-4 w-4 border-line text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              <span>Yes, credit me by this name</span>
            </label>
            <label className="flex items-center gap-2 text-ink">
              <input
                type="radio"
                name="credit-consent"
                checked={creditConsent === "no"}
                onChange={() => setCreditConsent("no")}
                className="h-4 w-4 border-line text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              <span>
                No — please publish me as &ldquo;{PLACEHOLDER_CREDIT}&rdquo;
              </span>
            </label>
          </div>
        </fieldset>

        <div>
          <label htmlFor="email" className={labelClass}>
            Your email <span className="text-muted">(never published)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
          <p className={helpClass}>
            So we can check in with you about consent or credit if we need to.
          </p>
        </div>

        <label className="flex items-start gap-2 text-ink">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-line text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <span>
            I made this game in a workshop and I'm happy for it to be considered
            for the collection. <span className="text-muted">(required)</span>
          </span>
        </label>
      </fieldset>

      {/* ── Submit ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <p className="sr-only" role="status" aria-live="polite">
          {status === "submitting"
            ? "Sending your submission…"
            : status === "error"
              ? `Submission failed. ${errorMsg}`
              : ""}
        </p>

        {status === "error" ? (
          <p className="rounded-md border border-line p-3 text-sm text-ink">
            {errorMsg}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!configured || status === "submitting"}
          className="rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-paper hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Submit your game"}
        </button>
      </div>
    </form>
  );
}
