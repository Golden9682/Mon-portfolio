/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Tree-shake icon imports instead of pulling the whole icon set.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
