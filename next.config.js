/** @type {import('next').NextConfig} */

const BLOG_URL = "https://bythewayer.com";

//  ssr 配置 https://zhuanlan.zhihu.com/p/597748856
const nextConfig = {
  reactStrictMode: true,
  // output: "standalone",
  output: "export",
  swcMinify: true,
  assetPrefix: ".",
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  basePath: "/next",
  // ...(process.env.NODE_ENV === "production" && {
  //   basePath: "/next",
  //   assetPrefix: "/next",
  // }),
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
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
