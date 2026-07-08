/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nothing special needed. Thumbnails are copied from /thumbnails into
  // /public/thumbnails by scripts/copy-thumbnails.mjs (see package.json),
  // so Next serves them as static files with zero extra config.
};

export default nextConfig;
