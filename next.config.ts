import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: [],
  },

  // firebase-admin (via jwks-rsa -> jose) ships an ES Module that
  // Turbopack's server bundler can't require() correctly, which was
  // crashing /api/refund-order before it could even run. Marking it
  // as an external package tells Next.js to load it natively via
  // Node's own require() at runtime instead of bundling it — this
  // is the standard fix for this exact error.
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
