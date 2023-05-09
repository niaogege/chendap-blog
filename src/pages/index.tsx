import Head from "next/head";
import type { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { MyLinks } from "@/components/layout/myLinks";
const Page: NextPageWithLayout = () => {
  const title = `Chendap' Blog`;
  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-120px)] min-h-min">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="w-screen h-screen flex justify-center items-center flex-col">
        <h1 className="mb-2 w-[300px] flex justify-center">
          <a
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
          </a>
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
