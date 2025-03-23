/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  optimizeFonts: true,
  webpack(config) {
    return config
  },
}

module.exports = nextConfig

