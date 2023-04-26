import Head from "next/head";
import Link from "next/link";
import type { NextPageWithLayout } from "@/types/page";
import { FaGithub } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { TbBrandJuejin } from "react-icons/tb";
import { Layout } from "@/components/layout";
const Page: NextPageWithLayout = () => {
  const SOCIAL_ITEMS = [
    {
      icon: <FaGithub />,
      href: "https://github.com/niaogege",
    },
    {
      icon: <TbBrandJuejin />,
      href: "https://juejin.cn/user/676954891892855",
    },
    {
      icon: <SiAboutdotme />,
      href: "/about",
    },
  ];
  const title = `Chendap' Blog`;
  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-120px)] min-h-min">
      <Head>
        <title>chendap Blog 踏踏实实</title>
      </Head>
      <main>
        <h1 className="mb-2">
          This is{" "}
          <Link
            href="/post"
            className="underline-offset-1 dark:text-darkPrimary"
          >
            {title}
          </Link>
        </h1>
        <section className="flex flex-row justify-center">
          {SOCIAL_ITEMS.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.href}
                className="p-1 hover:text-red-500"
              >
                {item.icon}
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
