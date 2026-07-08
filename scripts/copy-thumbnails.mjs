// Copies the canonical thumbnails from /thumbnails (repo root, where they
// render on GitHub) into /public/thumbnails so the website can serve them.
//
// Runs automatically before `npm run dev` and `npm run build`. You normally
// never run this by hand. Needs Node 18+ (remember: `nvm use 24`).

import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "thumbnails");
const DEST = path.join(process.cwd(), "public", "thumbnails");

if (!fs.existsSync(SRC)) {
  console.log("No /thumbnails folder — nothing to copy.");
  process.exit(0);
}

fs.mkdirSync(DEST, { recursive: true });

let count = 0;
for (const file of fs.readdirSync(SRC)) {
  fs.copyFileSync(path.join(SRC, file), path.join(DEST, file));
  count += 1;
}

console.log(`Copied ${count} thumbnail(s) to public/thumbnails.`);
