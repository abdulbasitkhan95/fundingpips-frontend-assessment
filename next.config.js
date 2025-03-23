/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This helps with Netlify deployments
  trailingSlash: false,
  // This ensures assets are properly referenced
  assetPrefix: process.env.NODE_ENV === "production" ? "/" : "",
}

module.exports = nextConfig

