import Head from "next/head";
import Link from "next/link";
import type { NextPageWithLayout } from "@/types/page";
import { FaGithub } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { TbBrandJuejin } from "react-icons/tb";
import { Layout } from "@/components/layout";
import { MyLinks } from "@/components/layout/myLinks";
const Page: NextPageWithLayout = () => {
  const title = `Chendap Blog`;
  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-120px)] min-h-min">
      <Head>
        <title>chendap Blog 踏踏实实</title>
      </Head>
      <main className="w-screen h-screen flex justify-center items-center flex-col">
        <h1 className="mb-2 w-[200px] flex justify-center">
          <Link
            href="/post"
            className="underline-offset-1 dark:text-darkPrimary relative font-bold px-2 w-full h-10 inline-block text-center mx-0 group 
            transition ease-in overflow-hidden text-orange-500 duration-1000"
          >
            <span
              className="font-bold px-2 absolute left-0 top-0 inline-block w-full h-10 overflow-hidden 
              translate-x-[-100%]
              transition
              duration-1000
              ease-in
              before:inline-block 
              before:content-[attr(data-content)] 
              before:translate-x-[-100%] 
              before:transition
              before:text-blue-600 
              group-hover:translate-x-0 
              group-hover:before:translate-x-0"
              data-content={`This is ${title}`}
            ></span>
            This is {title}
          </Link>
        </h1>
        <MyLinks />
      </main>
    </div>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
