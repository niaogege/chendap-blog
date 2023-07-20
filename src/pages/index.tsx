import Head from "next/head";
import type { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { MyLinks } from "@/components/layout/myLinks";
import Link from "next/link";
const Page: NextPageWithLayout = () => {
  const title = `Chendap' Blog`;
  const links = [
    { text: "个人博客", link: "https://bythewayer.com" },
    { text: "个人学习", link: "http://learn.bythewayer.com/" },
    { text: "个人所爱", link: "http://love.bythewayer.com/" },
    { text: "VitePress", link: "https://vitepress.vuejs.org/" },
    {
      text: "tailwindcss",
      link: "https://tailwindcss.com/docs/installation",
    },
  ];
  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-120px)] min-h-min">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="w-screen h-screen flex justify-center items-center flex-col">
        <h1 className="mb-2 w-[300px] flex justify-center">
          <Link
            href="/post"
            className="dark:text-darkPrimary 
            relative font-bold text-3xl w-full h-10 inline-block text-center mx-0 
            group 
            underline
            overflow-hidden text-orange-300
            "
          >
            <span
              className="font-bold absolute left-0 top-0 inline-block w-full h-10 text-3xl
              overflow-hidden
              translate-x-[-100%]
              transition-transform
              duration-700
              before:inline-block
              before:content-[attr(data-content)]
              before:w-full
              before:text-blue-700
              dark:before:text-red-700
              before:underline
              before:translate-x-[100%]
              before:transition-transform
              before:duration-700
              group-hover:translate-x-0
              group-hover:before:translate-x-0
              "
              data-content={`${title}`}
            ></span>
            {title}
          </Link>
        </h1>
        <div className="flex flex-row flex-wrap">
          {links &&
            links.map((link) => {
              return (
                <a
                  href={link.link}
                  key={link.link}
                  className="m-2 p-2 border-one whitespace-break-spaces dark:text-white"
                  rel="nolollow"
                >
                  {link.text}
                </a>
              );
            })}
        </div>
      </main>
    </div>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
