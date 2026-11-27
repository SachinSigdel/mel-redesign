import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Turbopack keeps a disk cache of dev builds between restarts. With the Tailwind loader below it
    // kept serving an old globals.css after edits, so CSS changes didn't show in `npm run dev`.
    // Production builds aren't affected.
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
