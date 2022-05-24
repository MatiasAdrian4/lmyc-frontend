/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LMYC_BACKEND_HOST: "http://localhost:8000/lubricentro_myc"
  }
}

module.exports = nextConfig
