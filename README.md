# Storymode Shorts

A small, warm, public collection of short games made by people taking part in
**Into Storymode's vibe coding workshops**. Each game here was *selected from* a
workshop — it is never a "best of." Meaning comes before mechanics.

This repo works as **two things at once**:

1. **A catalogue you can read right here on GitHub.** See **[GAMES.md](GAMES.md)**
   for the full list — every game, with a link to play it.
2. **A website** ([shorts.intostorymode.com](https://shorts.intostorymode.com))
   that reads the exact same content files. Styling lives only in the website;
   the content stands on its own without it.

> **Note:** the three games currently in the collection are **placeholder
> samples** with placeholder credits. They will be replaced with real, consented
> games from workshops.

## How it connects to the workshops

Into Storymode runs **Playable Stories**, a programme of events and workshops
exploring games as a storytelling medium. In the **vibe coding workshop**, people
with no technical background use AI prompting to make and publish a short browser
game in a single sitting.

The games themselves are hosted elsewhere (usually itch.io). This repo doesn't
host the playable builds — it *catalogues* them and links out.

- Workshop materials: **https://github.com/PlayableStories/vibe-coding-workshop**

## How the content works

All content is plain markdown, and it is the single source of truth. One file per
game lives in [`content/games/`](content/games), with YAML frontmatter for the
details and a short markdown description in the body:

```markdown
---
title: "Slow"
creator: "Workshop participant"   # name, pseudonym, or group — see consent below
themes: [care]                    # from the fixed list below
workshop: "Vibe coding workshop"
thumbnail: "thumbnails/slow.svg"  # repo-relative, so it renders on GitHub too
play: "#"                         # link to play (itch.io etc.); "#" = coming soon
embed: ""                         # optional itch.io iframe embed URL; falls back to play
addedAt: "2026-07-02"
---

A tiny game about slowing down.
```

The **themes** are a fixed list: `care`, `memory`, `identity`, `place`,
`community`, `politics`, `lived experience`.

## Adding a game

You don't need to touch any design or code to add a game:

1. Copy an existing file in `content/games/` and give it a new name, e.g.
   `content/games/my-game.md`. The filename (without `.md`) becomes its web
   address.
2. Fill in the frontmatter and write a short description in the body.
3. Add a thumbnail image to the `thumbnails/` folder and point `thumbnail:` at it
   (keep the path repo-relative, like `thumbnails/my-game.svg`, so it renders on
   GitHub too).
4. Regenerate the catalogue so GAMES.md stays up to date:

   ```bash
   npm run catalogue
   ```

That's it. The website will pick the new game up automatically.

## Consent & credits (important)

Creator names and game titles are **only ever real with the participant's
permission**. Until then, use the placeholder credit `"Workshop participant"`.

Adding a real credit is a **one-field edit**: change the `creator:` line in that
game's markdown file. **Never invent or hard-code a real participant's name
anywhere.**

## Running the site locally

This project needs a modern **Node (18 or newer)**. The system default may be an
old version, so activate a modern one first:

```bash
nvm use 24        # or: nvm install 24 && nvm use 24
node -v           # must print v18+ — if it prints v14, nvm didn't activate
```

Then:

```bash
npm install
npm run dev       # open http://localhost:3000
```

## Regenerating GAMES.md

`GAMES.md` is **generated** from the content files — don't edit it by hand. After
adding or changing a game, run:

```bash
npm run catalogue
```

(It also regenerates automatically as part of `npm run build`.)

## Deploying to Vercel

The site deploys to [Vercel](https://vercel.com) with **zero extra config**:

1. Import the `PlayableStories/storymode-shorts` repo in Vercel.
2. Vercel auto-detects Next.js — no settings to change. The build step
   regenerates thumbnails and GAMES.md automatically.
3. Point the domain `shorts.intostorymode.com` at the project.

## Project layout

```
content/games/   the games — plain markdown, the single source of truth
thumbnails/      thumbnail images (repo-relative, render on GitHub and the site)
lib/             the content layer (reads markdown; swap here for a database in v2)
app/             the website pages (Next.js App Router)
components/      the website's building blocks — ALL styling lives here
scripts/         build-catalogue (writes GAMES.md) and copy-thumbnails
```

Content is durable and portable; the look can change freely around it. A future
version may move the store to a database (Supabase) — because everything reads
through `lib/content-source.ts`, that swap won't touch the pages or content.
