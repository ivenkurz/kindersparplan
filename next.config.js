/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["recharts"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "lodash/range": require.resolve("lodash.range"),
    };
    return config;
  },
}

module.exports = nextConfig
