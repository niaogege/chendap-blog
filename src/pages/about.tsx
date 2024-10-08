import { NextPageWithLayout } from "@/types/page"
import { Layout } from "@/components/layout"
import Link from "next/link"
const Page = () => {
  const links = [
    { text: "个人博客", link: "https://bythewayer.com" },
    { text: "个人学习", link: "http://learn.bythewayer.com/" },
    { text: "个人所爱", link: "http://love.bythewayer.com/" },
    { text: "VitePress", link: "https://vitepress.vuejs.org/" },
    {
      text: "tailwindcss",
      link: "https://www.tailwindcss.cn/docs/guides/vue-3-vite",
    },
  ]
  return (
    <section className="flex flex-col items-start justify-start max-w-5xl mx-auto h-[calc(100vh-120px)] min-h-min p-4">
      <h1 className="text-2xl font-bold my-2">About Me</h1>
      <h1>nickName: chendapeng</h1>
      <h1>qq: 291003932</h1>
      <h1>email: 291003932@qq.com</h1>
      <div>hobby: calligraphy coding</div>
      <h1 className="text-2xl font-bold my-3">Time Line</h1>
      <div className="my-2">
        <time>2021.6-至今</time>
        <div>喜马拉雅 Web front-end developer</div>
      </div>
      <div className="my-2">
        <time>2017.11-2021.5</time>
        <div>苏宁大数据中心 Web front-end developer</div>
      </div>
      <details className="w-full">
        <summary className="pt-2 pb-2 text-base font-medium cursor-pointer">
          More
        </summary>
        <div className="ml-1">
          <div>
            <time>2017.2-2017.11</time>
            <div>南京厚建 Web front-end developer</div>
          </div>
        </div>
      </details>
      <div className="text-2xl font-bold my-3">友联</div>
      <div className="flex flex-row flex-wrap">
        {links &&
          links.map((link) => {
            return (
              <Link
                href={link.link}
                key={link.link}
                className="m-2 p-2 border-one whitespace-break-spaces dark:text-white"
              >
                {link.text}
              </Link>
            )
          })}
      </div>
    </section>
  )
}

;(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>
}
export default Page
