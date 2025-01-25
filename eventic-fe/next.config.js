/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return config
  },
  images: {
    domains: [] // whitelist
  }
}


module.exports = nextConfig
