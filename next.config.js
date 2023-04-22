/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  /**设置跨域请求 */
  // 路由重写
  // async rewrites() {
  //   return [
  //     {
  //       source: "/post/page/:page",
  //       destination: "/post",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
