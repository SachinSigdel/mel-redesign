import type { NextConfig } from "next";

/* Content Security Policy: which sources the browser may load anything from.
   Everything is self-hosted (fonts by next/font, images, scripts), so most of it is 'self'. The exceptions:
   - 'unsafe-inline' for scripts and styles: Next.js puts small inline scripts in each page to start React,
     and the alternative (a nonce per request) would make every page render on demand instead of being static;
   - 'unsafe-eval' in development only, which React needs for its debugging tools;
   - the Google Maps embed on the contact page. */
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "frame-ancestors 'none'", // no other site can show this one in a frame (clickjacking)
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" }, // the same rule as frame-ancestors, for older browsers
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // don't advertise the framework in an X-Powered-By header
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
