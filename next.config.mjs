/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.externals = [
      ...(config.externals || []),
      {
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
      },
    ];
    return config;
  },
};

export default nextConfig;
