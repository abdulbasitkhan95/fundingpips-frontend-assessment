/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This helps with Netlify deployments
  trailingSlash: false,
  // This ensures assets are properly referenced
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  // Ensure CSS is properly loaded
  optimizeFonts: true,
  // Add this to ensure CSS modules work properly
  webpack(config) {
    return config
  },
}

module.exports = nextConfig

