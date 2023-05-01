/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["img.icons8.com", "cdn-icons.flaticon.com", "www.flaticon.es", "cdn-icons-png.flaticon.com"]
  },
}

module.exports = nextConfig
