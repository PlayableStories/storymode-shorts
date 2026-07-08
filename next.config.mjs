/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a fully static site into ./out — no Node server at runtime — so it
  // can be hosted on GitHub Pages. Everything is generated at build time.
  output: "export",

  // Emit directory-style URLs (/games/slow/index.html) so paths resolve
  // cleanly on a static host like GitHub Pages.
  trailingSlash: true,

  // The static export has no image optimisation server. We use plain <img>,
  // but this keeps things safe if next/image is ever added.
  images: { unoptimized: true },

  // Thumbnails are copied from /thumbnails into /public/thumbnails by
  // scripts/copy-thumbnails.mjs (see package.json), so they ship as static
  // files with zero extra config.
};

export default nextConfig;
