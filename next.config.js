/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 350 * 100000,
  },
  swcMinify: true,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  output: "export",
  assetPrefix: ".",
  trailingSlash: false,
  /**设置跨域请求 */
  // 路由重写
  // async rewrites() {
  //   return [
  //     {
  //       source: "/love/:path*",
  //       destination: `${BLOG_URL}/love/:path*`,
  //     },
  //   ];
  // },
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
