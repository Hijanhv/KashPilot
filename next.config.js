const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  env: {
    NEXT_PUBLIC_CELO_RPC_URL: process.env.NEXT_PUBLIC_CELO_RPC_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AGENT_PRIVATE_KEY: process.env.AGENT_PRIVATE_KEY,
  },
}

module.exports = withPWA(nextConfig)
