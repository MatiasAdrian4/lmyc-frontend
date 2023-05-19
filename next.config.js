/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    LMYC_BACKEND_HOST_EXTERNAL: process.env.LMYC_BACKEND_HOST_EXTERNAL,
    LMYC_BACKEND_HOST_INTERNAL: process.env.LMYC_BACKEND_HOST_INTERNAL
  }
}

module.exports = nextConfig
