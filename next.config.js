/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LMYC_BACKEND_HOST: process.env.LMYC_BACKEND_HOST
  }
}

module.exports = nextConfig
