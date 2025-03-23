/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ]
  },
}

module.exports = nextConfig

