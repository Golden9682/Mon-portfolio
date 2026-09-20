/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a production build run next to an active `next dev` without both
  // fighting over the same .next folder (e.g. NEXT_DIST_DIR=.next-build).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Tree-shake icon imports instead of pulling the whole icon set.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
