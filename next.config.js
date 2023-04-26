/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "dist",
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  // ...(process.env.NODE_ENV === "production" && {
  //   basePath: "/next",
  //   assetPrefix: "/next",
  // }),
  /**设置跨域请求 */
  // 路由重写
  async rewrites() {
    return [
      {
        source: "/love",
        destination: "https://bythewayer.com/love",
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
