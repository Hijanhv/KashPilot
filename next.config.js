/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CELO_RPC_URL: process.env.NEXT_PUBLIC_CELO_RPC_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AGENT_PRIVATE_KEY: process.env.AGENT_PRIVATE_KEY,
  },
}

module.exports = nextConfig
